'use client'
import { useEffect } from 'react'

const WIDGET_URL_1 = "https://tpwidg.com/content?currency=USD&trs=508095&shmarker=710879&locale=en&powered_by=true&transfer_options_limit=10&transfer_options=MCR&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true&campaign_id=1&promo_id=3879"
const WIDGET_URL_2 = "https://tpwidg.com/content?trs=508095&shmarker=710879&locale=en&powered_by=true&border_radius=5&plain=true&show_logo=true&color_background=%23ffca28&color_button=%2355a539&color_text=%23000000&color_input_text=%23000000&color_button_text=%23ffffff&promo_id=4480&campaign_id=10"

export default function CarWidgetInitializer() {
  useEffect(() => {
    // Inject Widget 1 script exactly once
    if (!document.getElementById('car-widget-script-1')) {
      const script1 = document.createElement('script');
      script1.id = 'car-widget-script-1';
      script1.async = true;
      script1.charset = 'utf-8';
      script1.src = WIDGET_URL_1;
      document.head.appendChild(script1);
    }

    // Inject Widget 2 script exactly once
    if (!document.getElementById('car-widget-script-2')) {
      const script2 = document.createElement('script');
      script2.id = 'car-widget-script-2';
      script2.async = true;
      script2.charset = 'utf-8';
      script2.src = WIDGET_URL_2;
      document.head.appendChild(script2);
    }

    // Add containment CSS once
    if (!document.getElementById('car-rentals-containment')) {
      const style = document.createElement('style');
      style.id = 'car-rentals-containment';
      style.textContent = `
        #car-widget-home-1,
        #car-widget-home-3 {
          contain: layout style paint !important;
          overflow: hidden !important;
          position: relative !important;
          isolation: isolate !important;
        }
        #car-widget-home-1 > *,
        #car-widget-home-3 > * {
          contain: layout style paint !important;
        }
        #car-widget-home-1 input,
        #car-widget-home-3 input {
          background: #1a1a1a !important;
          border: 1px solid rgba(200,169,110,0.3) !important;
          color: #F5EFE4 !important;
          padding: 10px !important;
          border-radius: 4px !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <>
      {/* Hidden containers that live at the bottom of the body */}
      <div id="car-widget-home-1" style={{ display: 'none', width: '100%' }}></div>
      <div id="car-widget-home-3" style={{ display: 'none', width: '100%' }}></div>
    </>
  );
}