'use client';

const GOLD = '#C8A96E';
const INK = '#080807';
const CREAM = '#F5EFE4';
const CREAM_DIM = '#E0D6C4';
const FONT_DISPLAY = 'var(--font-cormorant), Georgia, serif';
const FONT_BODY = 'var(--font-dm), sans-serif';

export default function OrderConfirmationPage() {
    return (
        <main
            style={{
                background: INK,
                color: CREAM,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                fontFamily: FONT_BODY,
            }}
        >
            <div style={{ maxWidth: 480, textAlign: 'center' }}>
                <p style={{ color: GOLD, fontSize: 13, letterSpacing: '0.12em', marginBottom: 16 }}>
                    PAYMENT SUCCESSFUL
                </p>
                <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: 32, marginBottom: 16 }}>Your eSIM is on its way</h1>
                <p style={{ color: CREAM_DIM, lineHeight: 1.6 }}>
                    Check your email for your QR code and install instructions — it usually arrives within a minute
                    or two.
                </p>
                <a
                    href="/esim-2"
                    style={{
                        display: 'inline-block',
                        marginTop: 32,
                        color: GOLD,
                        textDecoration: 'none',
                        fontSize: 14,
                    }}
                >
                    ← Back to eSIM plans
                </a>
            </div>
        </main>
    );
}
