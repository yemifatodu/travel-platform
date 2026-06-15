'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PersistentFlightWidget() {
  const pathname = usePathname()
  // Show the widget only on the flights or search pages
  const isFlightsPage = pathname === '/flights' || pathname === '/search'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Inject the script only once, globally
    const scriptId = "tpwl-script-tag"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.async = true
      script.type = "module"
      script.src = "https://tpwidg.com/wl_web/main.js?wl_id=15518"
      
      script.setAttribute("data-noptimize", "1")
      script.setAttribute("data-cfasync", "false")
      script.setAttribute("data-wpfc-render", "false")
      script.setAttribute("seraph-accel-crit", "1")
      script.setAttribute("data-no-defer", "1")
      
      document.head.appendChild(script)
    }
  }, [])

  if (!mounted) return null

  return (
    // This container stays in the DOM forever. We just toggle its visibility.
    <div style={{ display: isFlightsPage ? 'block' : 'none', width: '100%' }}>
      <div id="tpwl-search" style={{ width: '100%', minHeight: '150px' }}></div>
      <div id="tpwl-tickets" style={{ width: '100%', minHeight: '100px', marginTop: '20px' }}></div>
    </div>
  )
}