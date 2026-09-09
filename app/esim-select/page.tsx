import Link from 'next/link';

const GOLD = '#C8A96E';
const GOLD_LIGHT = '#E2C98A';
const INK = '#080807';
const INK_SOFT = '#111110';
const CREAM = '#F5EFE4';
const CREAM_DIM = '#E0D6C4';

const FONT_DISPLAY = 'var(--font-cormorant), Georgia, serif';
const FONT_UI = 'var(--font-bebas), sans-serif';
const FONT_BODY = 'var(--font-dm), sans-serif';

export default function EsimSelectPage() {
    return (
        <main style={styles.page}>
            <div style={styles.container}>
                <p style={styles.eyebrow}>STAY CONNECTED</p>
                <h1 style={styles.heading}>
                    Choose your <span style={styles.italic}>eSIM store</span>
                </h1>
                <p style={styles.sub}>
                    We offer two eSIM options for travelers. Pick whichever fits your trip — both are backed by
                    HUUBOI support.
                </p>

                <div style={styles.grid}>
                    <Link href="/esim" style={styles.card}>
                        <span style={styles.cardTitle}>Classic eSIM Store</span>
                        <span style={styles.cardDesc}>Our original eSIM store — trusted plans, familiar checkout.</span>
                        <span style={styles.cardCta}>CONTINUE →</span>
                    </Link>

                    <Link href="/esim-2" style={styles.card}>
                        <span style={styles.cardTitle}>New eSIM Store</span>
                        <span style={styles.cardDesc}>
                            Our newest eSIM option — expanded destinations, freshly launched.
                        </span>
                        <span style={styles.cardCta}>CONTINUE →</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: { background: INK, color: CREAM, minHeight: '100vh', padding: '64px 24px', fontFamily: FONT_BODY },
    container: { maxWidth: 880, margin: '0 auto' },
    eyebrow: { fontFamily: FONT_UI, letterSpacing: '0.14em', fontSize: 12, color: GOLD, marginBottom: 12 },
    heading: { fontFamily: FONT_DISPLAY, fontSize: 40, lineHeight: 1.15, marginBottom: 16, maxWidth: 640 },
    italic: { fontStyle: 'italic', color: GOLD_LIGHT },
    sub: { fontSize: 16, lineHeight: 1.6, color: CREAM_DIM, maxWidth: 560, marginBottom: 40 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 },
    card: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        textDecoration: 'none',
        color: 'inherit',
        background: INK_SOFT,
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8,
        padding: '28px 24px',
    },
    cardTitle: { fontSize: 20, fontWeight: 600, color: CREAM },
    cardDesc: { fontSize: 14, color: `${CREAM_DIM}B3`, lineHeight: 1.5 },
    cardCta: { fontFamily: FONT_UI, letterSpacing: '0.03em', fontSize: 13, color: GOLD, marginTop: 8 },
};
