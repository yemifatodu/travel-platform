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
          font-family: 'DM Sans', sans-serif;
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

      
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        aria-label="Chat on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      <div className="wa-tooltip">Chat with us on WhatsApp</div>
    </>
  )
}
