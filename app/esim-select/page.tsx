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
        <>
            <style>{`
                .huuboi-card {
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .huuboi-card:hover {
                    border-color: ${GOLD} !important;
                    transform: translateY(-4px);
                    box-shadow: 0 12px 30px rgba(200, 169, 110, 0.12);
                }
                .huuboi-card:hover .card-cta-arrow {
                    transform: translateX(4px);
                }
                .card-cta-arrow {
                    transition: transform 0.3s ease;
                    display: inline-block;
                }
            `}</style>

            <main style={styles.page}>
                <div style={styles.container}>
                    <p style={styles.eyebrow}>STAY CONNECTED</p>
                    <h1 style={styles.heading}>
                        Choose your <span style={styles.italic}>eSIM experience</span>
                    </h1>
                    <p style={styles.sub}>
                        Select the store that best fits your travel needs. Both options are backed by 
                        premium HUUBOI support.
                    </p>

                    <div style={styles.grid}>
                        {/* HUUBOI CLASSIC */}
                        <Link href="/esim" className="huuboi-card" style={styles.card}>
                            <span style={styles.cardTitle}>HUUBOI CLASSIC</span>
                            <span style={styles.cardDesc}>Original store, trusted plans.</span>
                            <span style={styles.cardCta}>
                                CONTINUE <span className="card-cta-arrow">→</span>
                            </span>
                        </Link>

                        {/* HUUBOI SIGNATURE */}
                        <Link href="/esim-2" className="huuboi-card" style={styles.card}>
                            <span style={styles.cardTitle}>HUUBOI SIGNATURE</span>
                            <span style={styles.cardDesc}>Newest launch, expanded reach.</span>
                            <span style={styles.cardCta}>
                                CONTINUE <span className="card-cta-arrow">→</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: { 
        background: INK, 
        color: CREAM, 
        minHeight: '100vh', 
        padding: '80px 24px', 
        fontFamily: FONT_BODY,
        display: 'flex',
        alignItems: 'center',
    },
    container: { 
        maxWidth: 900, 
        margin: '0 auto',
        width: '100%'
    },
    eyebrow: { 
        fontFamily: FONT_UI, 
        letterSpacing: '0.2em', 
        fontSize: 13, 
        color: GOLD, 
        marginBottom: 16 
    },
    heading: { 
        fontFamily: FONT_DISPLAY, 
        fontSize: 48, 
        lineHeight: 1.1, 
        marginBottom: 20, 
        maxWidth: 640,
        fontWeight: 400
    },
    italic: { 
        fontStyle: 'italic', 
        color: GOLD_LIGHT 
    },
    sub: { 
        fontSize: 16, 
        lineHeight: 1.6, 
        color: CREAM_DIM, 
        maxWidth: 560, 
        marginBottom: 48 
    },
    grid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 24 
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        textDecoration: 'none',
        color: 'inherit',
        background: INK_SOFT,
        border: '1px solid rgba(200, 169, 110, 0.15)',
        borderRadius: 12,
        padding: '36px 32px',
    },
    cardTitle: { 
        fontFamily: FONT_UI, 
        fontSize: 28, 
        letterSpacing: '0.05em',
        color: GOLD,
        lineHeight: 1
    },
    cardDesc: { 
        fontSize: 15, 
        color: CREAM_DIM, 
        lineHeight: 1.5 
    },
    cardCta: { 
        fontFamily: FONT_UI, 
        letterSpacing: '0.1em', 
        fontSize: 14, 
        color: GOLD, 
        marginTop: 16 
    },
};