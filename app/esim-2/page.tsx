'use client';


import { useEffect, useMemo, useState } from 'react';
import { Esim2CheckoutForm } from './Esim2CheckoutForm';


interface FlatPackage {
    package_id: string;
    country_title: string;
    country_code: string;
    operator_title: string;
    title: string;
    data: string;
    day: number;
    is_unlimited: boolean;
    price: number;
    currency: string;
}


// Exact HUUBOI brand palette (from tailwind.config.js) — used as literal
// hex values here so this page renders correctly regardless of whether
// Tailwind's class scanner has picked up this file yet.
const GOLD = '#C8A96E';
const GOLD_LIGHT = '#E2C98A';
const INK = '#080807';
const INK_SOFT = '#111110';
const CREAM = '#F5EFE4';
const CREAM_DIM = '#E0D6C4';


// These CSS custom properties are set globally by the site's root layout
// (see fontFamily config), so they work here without needing Tailwind.
const FONT_DISPLAY = 'var(--font-cormorant), Georgia, serif';
const FONT_UI = 'var(--font-bebas), sans-serif';
const FONT_BODY = 'var(--font-dm), sans-serif';


export default function EsimPlansPage() {
    const [packages, setPackages] = useState<FlatPackage[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<FlatPackage | null>(null);
    const [expanded, setExpanded] = useState<Set<string>>(new Set());


    function toggleCountry(country: string) {
        setExpanded(prev => {
            const next = new Set(prev);
            if (next.has(country)) next.delete(country);
            else next.add(country);
            return next;
        });
    }


    useEffect(() => {
        fetch('/api/esim-2/packages')
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                setPackages(data.packages);
            })
            .catch(err => setError(err.message || 'Could not load plans.'));
    }, []);


    const filtered = useMemo(() => {
        if (!packages) return [];
        const q = query.trim().toLowerCase();
        if (!q) return packages;
        return packages.filter(
            p => p.country_title.toLowerCase().includes(q) || p.country_code.toLowerCase().includes(q),
        );
    }, [packages, query]);


    const grouped = useMemo(() => {
        const map = new Map<string, FlatPackage[]>();
        for (const pkg of filtered) {
            const key = pkg.country_title;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(pkg);
        }
        // Sort countries alphabetically; sort each country's plans by price ascending.
        return Array.from(map.entries())
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([country, plans]) => [country, plans.sort((a, b) => a.price - b.price)] as const);
    }, [filtered]);


    // While actively searching, auto-expand every matching country so the
    // person doesn't have to click through collapsed sections to see results.
    useEffect(() => {
        if (query.trim()) {
            setExpanded(new Set(grouped.map(([country]) => country)));
        }
    }, [query, grouped]);


    return (
        <main style={styles.page}>
            <div style={styles.container}>
                <p style={styles.eyebrow}>STAY CONNECTED</p>
                <h1 style={styles.heading}>
                    Data, wherever <span style={styles.italic}>the world</span> takes you
                </h1>
                <p style={styles.sub}>
                    Local and regional eSIM data plans for 200+ destinations. Pick a plan, check out, and your eSIM
                    arrives by email — ready to scan before you land.
                </p>


                <input
                    type="text"
                    placeholder="Search a country or region…"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={styles.search}
                />


                {error && <p style={styles.error}>{error}</p>}
                {!packages && !error && <p style={styles.loading}>Loading plans…</p>}


                <div style={styles.groups}>
                    {grouped.map(([country, plans]) => {
                        const isOpen = expanded.has(country);
                        return (
                            <div key={country}>
                                <button
                                    style={styles.countryHeading}
                                    onClick={() => toggleCountry(country)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{country}</span>
                                    <span style={styles.countryMeta}>
                                        {plans.length} plan{plans.length !== 1 ? 's' : ''} {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                {isOpen && (
                                    <div style={styles.grid}>
                                        {plans.map(pkg => (
                                            <button
                                                key={pkg.package_id}
                                                onClick={() => setSelected(pkg)}
                                                style={{
                                                    ...styles.card,
                                                    ...(selected?.package_id === pkg.package_id
                                                        ? styles.cardSelected
                                                        : {}),
                                                }}
                                            >
                                                <span style={styles.cardData}>
                                                    {pkg.is_unlimited ? 'Unlimited' : pkg.data} · {pkg.day} days
                                                </span>
                                                <span style={styles.cardPrice}>
                                                    ${pkg.price.toFixed(2)} {pkg.currency}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>


            {selected && (
                <>
                    <div style={styles.backdrop} onClick={() => setSelected(null)} />
                    <div style={styles.drawer}>
                        <button style={styles.closeBtn} onClick={() => setSelected(null)} aria-label="Close">
                            ✕
                        </button>


                        <p style={styles.drawerEyebrow}>SELECTED PLAN</p>
                        <p style={styles.checkoutTitle}>
                            {selected.country_title} — {selected.is_unlimited ? 'Unlimited' : selected.data},{' '}
                            {selected.day} days
                        </p>
                        <p style={styles.checkoutPrice}>
                            ${selected.price.toFixed(2)} {selected.currency}
                        </p>


                        <Esim2CheckoutForm
                            packageId={selected.package_id}
                            priceLabel={`${selected.currency} ${selected.price.toFixed(2)}`}
                            onClose={() => setSelected(null)}
                        />
                    </div>
                </>
            )}
        </main>
    );
}


const styles: Record<string, React.CSSProperties> = {
    page: { background: INK, color: CREAM, minHeight: '100vh', padding: '64px 24px', fontFamily: FONT_BODY },
    container: { maxWidth: 880, margin: '0 auto' },
    eyebrow: { fontFamily: FONT_UI, letterSpacing: '0.14em', fontSize: 12, color: GOLD, marginBottom: 12 },
    heading: { fontFamily: FONT_DISPLAY, fontSize: 40, lineHeight: 1.15, marginBottom: 16, maxWidth: 640 },
    italic: { fontStyle: 'italic', color: GOLD_LIGHT },
    sub: { fontSize: 16, lineHeight: 1.6, color: CREAM_DIM, maxWidth: 560, marginBottom: 32 },
    search: {
        width: '100%',
        padding: '14px 16px',
        background: INK,
        border: `1px solid ${GOLD}33`,
        borderRadius: 6,
        color: CREAM,
        fontSize: 15,
        marginBottom: 20,
        fontFamily: FONT_BODY,
    },
    error: { color: '#E38B6E', marginBottom: 16 },
    loading: { color: '#8A877E', marginBottom: 16 },
    groups: { display: 'flex', flexDirection: 'column', gap: 32 },
    countryHeading: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: FONT_DISPLAY,
        fontSize: 22,
        fontWeight: 500,
        color: CREAM,
        marginBottom: 14,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: 8,
    },
    countryMeta: { fontFamily: FONT_UI, fontSize: 12, letterSpacing: '0.04em', color: `${CREAM_DIM}99` },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 },
    card: {
        textAlign: 'left',
        background: INK_SOFT,
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 6,
        padding: '18px 16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
    },
    cardSelected: { border: `1px solid ${GOLD}` },
    cardData: { fontSize: 13, color: `${CREAM_DIM}B3` },
    cardPrice: { fontFamily: FONT_UI, fontSize: 15, color: GOLD, marginTop: 4 },
    backdrop: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        zIndex: 40,
    },
    drawer: {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: 'min(420px, 100vw)',
        background: INK_SOFT,
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        padding: '32px 28px',
        zIndex: 50,
        boxShadow: '-8px 0 24px rgba(0,0,0,0.4)',
        overflowY: 'auto',
        fontFamily: FONT_BODY,
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        background: 'transparent',
        border: 'none',
        color: `${CREAM_DIM}B3`,
        fontSize: 18,
        cursor: 'pointer',
    },
    drawerEyebrow: { fontFamily: FONT_UI, letterSpacing: '0.12em', fontSize: 11, color: GOLD, marginBottom: 12, marginTop: 8 },
    checkoutTitle: { fontSize: 19, marginBottom: 6, lineHeight: 1.4 },
    checkoutPrice: { fontFamily: FONT_UI, fontSize: 22, color: GOLD, marginBottom: 24 },
    cta: {
        width: '100%',
        padding: '14px 16px',
        background: GOLD,
        color: INK,
        border: 'none',
        borderRadius: 6,
        fontSize: 15,
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: FONT_UI,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
    },
    fineprint: { fontSize: 12, color: '#8A877E', marginTop: 12 },
};




