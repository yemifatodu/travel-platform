'use client';

import { useEffect } from 'react';

export default function ClientStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .dest-grid-home {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      .pkg-grid-home {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
      }
      .test-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }

      .tpwl-widget .wl-tabs__item--hotels, 
      .tpwl-widget [data-tab="hotels"],
      .tpwl-widget .mewtwo-hotels-checkbox { 
        display: none !important; 
      }

      .tpwl-widget button[type="submit"],
      .tpwl-widget .wl-button--primary {
        background: #C8A96E !important;
        color: #080807 !important;
        font-family: '"'"'Bebas Neue'"'"', sans-serif !important;
        letter-spacing: 0.1em !important;
      }

      @media (max-width: 768px) {
        .dest-grid-home { grid-template-columns: repeat(2, 1fr); }
        .pkg-grid-home { grid-template-columns: repeat(2, 1fr); }
        .test-grid { grid-template-columns: 1fr; }
        
        .mobile-hero-container {
          min-height: auto !important;
          padding-bottom: 20px !important;
        }
        .hero-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .hero-buttons a {
          margin-left: 0 !important;
          text-align: center;
        }
        
        .responsive-flex-cards a {
          flex: 0 0 calc(50% - 8px) !important;
          padding: 10px !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 8px;
        }
        .responsive-flex-cards a div span {
          font-size: 1.1rem !important;
        }
        .responsive-flex-cards a div div {
          font-size: 0.6rem !important;
        }
        .responsive-flex-cards a p {
          display: none !important;
        }
        .responsive-flex-cards a > span {
          display: none !important;
        }
        
        .test-grid-container {
          width: 100% !important;
          padding: 0 16px;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
