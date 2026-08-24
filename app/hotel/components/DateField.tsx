'use client'

import { useEffect, useRef, useState } from 'react'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function toISO(d: Date) {
  return d.toISOString().slice(0, 10)
}

function fromISO(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

function formatDisplay(iso: string) {
  if (!iso) return ''
  const d = fromISO(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Custom calendar dropdown. Renders a text-style trigger showing the
 * formatted date; clicking it opens a month grid. Includes a hidden input
 * so this still submits correctly inside a plain <form method="GET">.
 */
export default function DateField({
  label,
  name,
  value,
  onChange,
  min,
}: {
  label: string
  name?: string
  value: string
  onChange: (iso: string) => void
  min?: string
}) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => fromISO(value || min || toISO(new Date())))
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (value) setViewDate(fromISO(value))
  }, [value])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const totalDays = daysInMonth(year, month)
  const minDate = min ? fromISO(min) : null

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  function selectDay(day: number) {
    const picked = new Date(year, month, day)
    onChange(toISO(picked))
    setOpen(false)
  }

  function isDisabled(day: number) {
    if (!minDate) return false
    const cellDate = new Date(year, month, day)
    return cellDate < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
  }

  function isSelected(day: number) {
    if (!value) return false
    const sel = fromISO(value)
    return sel.getFullYear() === year && sel.getMonth() === month && sel.getDate() === day
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {name && <input type="hidden" name={name} value={value} />}
      <label style={{ fontSize: '0.7rem', color: muted, display: 'block' }}>
        {label}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 6,
            background: '#080807',
            border: `1px solid ${open ? gold : 'rgba(200,169,110,0.25)'}`,
            borderRadius: 6,
            color: value ? cream : dim,
            padding: '10px 12px',
            fontSize: '0.85rem',
            textAlign: 'left',
            cursor: 'pointer',
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {value ? formatDisplay(value) : 'Select date'}
        </button>
      </label>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 50,
            background: '#111110',
            border: '1px solid rgba(200,169,110,0.25)',
            borderRadius: 10,
            padding: 14,
            width: 260,
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              aria-label="Previous month"
              style={{ background: 'none', border: 'none', color: gold, cursor: 'pointer', fontSize: '1rem', padding: 4 }}
            >
              ‹
            </button>
            <span
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                color: cream,
              }}
            >
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              aria-label="Next month"
              style={{ background: 'none', border: 'none', color: gold, cursor: 'pointer', fontSize: '1rem', padding: 4 }}
            >
              ›
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
            {DAY_LABELS.map((d) => (
              <div key={d} style={{ textAlign: 'center', fontSize: '0.65rem', color: dim, padding: '4px 0' }}>
                {d}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />
              const disabled = isDisabled(day)
              const selected = isSelected(day)
              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 6,
                    border: 'none',
                    background: selected ? gold : 'transparent',
                    color: disabled ? 'rgba(245,239,228,0.2)' : selected ? '#080807' : cream,
                    fontSize: '0.8rem',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    fontWeight: selected ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!disabled && !selected) e.currentTarget.style.background = 'rgba(200,169,110,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    if (!disabled && !selected) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
