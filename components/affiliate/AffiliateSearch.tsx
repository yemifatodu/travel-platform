'use client'
import { useState } from 'react'
import { AFFILIATES, buildTrackedUrl, type AffiliateParams } from '@/lib/affiliates'

interface Props {
  defaultDestination?: string
}

export function AffiliateSearch({ defaultDestination = '' }: Props) {
  const [params, setParams] = useState<AffiliateParams>({
    destination: defaultDestination,
    origin: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  })
  const [activeTab, setActiveTab] = useState('Hotels')
  const gold = '#C8A96E', ink = '#080807', cream = '#F5EFE4'

  const tabs = ['Flights', 'Hotels', 'Packages', 'Tours & Activities', 'Car Rentals', 'Stays']
  const categoryMap: Record<string, string[]> = {
    'Flights':           ['Flights'],
    'Hotels':            ['Hotels', 'Reviews & Hotels'],
    'Packages':          ['Packages'],
    'Tours & Activities':['Tours & Activities', 'Experiences'],
    'Car Rentals':       ['Car Rentals'],
    'Stays':             ['Stays'],
  }

  const activeAffiliates = AFFILIATES.filter(a =>
    (categoryMap[activeTab] || []).includes(a.category)
  )

  const inputStyle = {
    background: '#1C1B18',
    border: '1px solid rgba(200,169,110,0.2)',
    color: cream,
    padding: '13px 16px',
    fontSize: '0.875rem',
    outline: 'none',
    width: '100%',
  }
  const labelStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    color: gold,
    marginBottom: 6,
    display: 'block' as const,
  }

  return (
    <div style={{ background: '#0d0c0a', border: '1px solid rgba(200,169,110,0.15)', padding: '36px 40px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 28, borderBottom: '1px solid rgba(200,169,110,0.1)', overflowX: 'auto' as const }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            padding: '11px 20px',
            background: 'none',
            border: 'none',
            color: activeTab === tab ? gold : 'rgba(245,239,228,0.35)',
            borderBottom: activeTab === tab ? `2px solid ${gold}` : '2px solid transparent',
            cursor: 'pointer',
            whiteSpace: 'nowrap' as const,
            transition: 'all 0.2s',
          }}>{tab}</button>
        ))}
      </div>

      {/* Search Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: activeTab === 'Flights' ? '1fr 1fr 1fr 1fr auto' : '2fr 1fr 1fr auto', gap: 10, marginBottom: 24 }}>
        {activeTab === 'Flights' && (
          <div>
            <label style={labelStyle}>FLYING FROM</label>
            <input placeholder="e.g. DXB, LOS, LHR" value={params.origin || ''} onChange={e => setParams(p => ({ ...p, origin: e.target.value }))} style={inputStyle} />
          </div>
        )}
        <div>
          <label style={labelStyle}>{activeTab === 'Flights' ? 'FLYING TO' : activeTab === 'Car Rentals' ? 'PICK-UP LOCATION' : 'DESTINATION'}</label>
          <input placeholder={activeTab === 'Hotels' ? 'City or destination' : activeTab === 'Tours & Activities' ? 'City or attraction' : 'Where to?'} value={params.destination || ''} onChange={e => setParams(p => ({ ...p, destination: e.target.value }))} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{activeTab === 'Flights' ? 'DEPARTURE DATE' : 'CHECK-IN / FROM'}</label>
          <input type="date" value={params.checkIn || ''} onChange={e => setParams(p => ({ ...p, checkIn: e.target.value }))} style={inputStyle} />
        </div>
        {activeTab !== 'Flights' && activeTab !== 'Tours & Activities' && (
          <div>
            <label style={labelStyle}>CHECK-OUT / TO</label>
            <input type="date" value={params.checkOut || ''} onChange={e => setParams(p => ({ ...p, checkOut: e.target.value }))} style={inputStyle} />
          </div>
        )}
        {activeTab !== 'Flights' && activeTab !== 'Car Rentals' && (
          <div>
            <label style={labelStyle}>GUESTS</label>
            <select value={params.guests || 2} onChange={e => setParams(p => ({ ...p, guests: +e.target.value }))} style={{ ...inputStyle, appearance: 'none' as const }}>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Partner Buttons */}
      <div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.35)', marginBottom: 12 }}>
          SEARCH WITH OUR PARTNERS
        </div>
        {activeAffiliates.length > 0 ? (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
            {activeAffiliates.map(affiliate => {
              const url = buildTrackedUrl(affiliate, params)
              return (
                <a key={affiliate.id} href={url} target="_blank" rel="noopener noreferrer sponsored" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: `#${affiliate.color}15`,
                  border: `1px solid #${affiliate.color}40`,
                  padding: '12px 20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  flex: 1,
                  minWidth: 160,
                  justifyContent: 'center',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `#${affiliate.color}25` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `#${affiliate.color}15` }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{affiliate.logo}</span>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.72rem', letterSpacing: '0.12em', color: cream }}>{affiliate.name}</div>
                    <div style={{ fontSize: '0.65rem', color: 'rgba(245,239,228,0.4)' }}>Search {activeTab.toLowerCase()} →</div>
                  </div>
                </a>
              )
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
            {AFFILIATES.map(affiliate => {
              const url = buildTrackedUrl(affiliate, params)
              return (
                <a key={affiliate.id} href={url} target="_blank" rel="noopener noreferrer sponsored" style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#1C1B18', border: '1px solid rgba(200,169,110,0.15)',
                  padding: '10px 16px', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = gold }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.15)' }}
                >
                  <span>{affiliate.logo}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.65rem', letterSpacing: '0.1em', color: cream }}>{affiliate.name}</span>
                </a>
              )
            })}
          </div>
        )}
        <p style={{ fontSize: '0.7rem', color: 'rgba(245,239,228,0.2)', marginTop: 10, fontStyle: 'italic' }}>
          We earn a small commission when you book through our partners — at no extra cost to you.
        </p>
      </div>
    </div>
  )
}
