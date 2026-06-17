'use client'
import { useEffect } from 'react'

export default function FlightWidgetInitializer() {
  useEffect(() => {
    if (!document.getElementById('tpwl-script-tag')) {
      const script = document.createElement('script');
      script.id = 'tpwl-script-tag';
      script.async = true;
      script.type = 'module';
      script.src = 'https://tpwidg.com/wl_web/main.js?wl_id=15518';
      script.setAttribute('data-noptimize', '1');
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-wpfc-render', 'false');
      script.setAttribute('seraph-accel-crit', '1');
      script.setAttribute('data-no-defer', '1');
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div id="flight-widget-home" style={{ display: 'none', width: '100%' }}>
      <div id="tpwl-search" style={{ width: '100%' }}></div>
      <div id="tpwl-tickets" style={{ width: '100%', marginTop: '20px' }}></div>
    </div>
  );
}