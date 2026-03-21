'use client'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2347033736377'

export function WhatsAppButton() {
  const message = encodeURIComponent('Hi HUUBOI, I would like to plan a trip. Can you help?')
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  return (
    <>
      <style>{`
        .wa-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.4);
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: wa-pulse 3s ease-in-out infinite;
        }
        .wa-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(37,211,102,0.6);
        }
        .wa-tooltip {
          position: fixed;
          bottom: 36px;
          right: 92px;
          z-index: 999;
          background: rgba(8,8,7,0.95);
          border: 1px solid rgba(200,169,110,0.2);
          color: rgba(245,239,228,0.85);
          padding: 8px 14px;
          font-family: DM Sans, sans-serif;
          font-size: 0.8rem;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .wa-btn:hover + .wa-tooltip {
          opacity: 1;
        }
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.4); }
          50% { box-shadow: 0 4px 32px rgba(37,211,102,0.7); }
        }
        @media (max-width: 480px) {
          .wa-btn { bottom: 20px; right: 20px; width: 50px; height: 50px; }
          .wa-tooltip { display: none; }
        }
      `}</style>
      <a href={url} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat on WhatsApp">
        <span style={{ fontSize: '1.6rem' }}>💬</span>
      </a>
      <div className="wa-tooltip">Chat with us on WhatsApp</div>
    </>
  )
}
