'use client'
import { useEffect, useState } from 'react'

type Act = { code: string; name: string; image: string | null; summary: string | null; currency: string; total: number | null; modalityCount: number }
type Opt = { session: string | null; languages: number; total: number; freeCancellation: boolean; cancellation: { dateFrom: string; amount: number }[] }
type Mod = { code: string; name: string; questions: { code: string; text: string; required: boolean }[]; options: Opt[] }
type Detail = { code: string; name: string; currency: string; description: string; image: string | null; modalities: Mod[] }
type Pax = { name: string; surname: string; age: number }

const money = (n: number | null | undefined, c: string) =>
  n == null || Number.isNaN(n) ? '' : new Intl.NumberFormat('en', { style: 'currency', currency: c }).format(n)
const strip = (s: string | null) => (s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const box: React.CSSProperties = { border: '1px solid rgba(200,169,110,0.35)', borderRadius: 12, padding: 16, marginBottom: 16, background: 'rgba(200,169,110,0.05)' }
const input: React.CSSProperties = { padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(128,128,128,0.4)', background: 'transparent', color: 'inherit', fontSize: 14, width: '100%', boxSizing: 'border-box' }
const btn: React.CSSProperties = { padding: '12px 20px', borderRadius: 8, border: 'none', background: '#C8A96E', color: '#111', fontWeight: 600, cursor: 'pointer', fontSize: 14 }
const label: React.CSSProperties = { fontSize: 12, opacity: 0.75, marginBottom: 4, display: 'block' }

export default function ActivitiesPage() {
  const [destination, setDestination] = useState('BCN')
  const [date, setDate] = useState('')
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState('')
  const [results, setResults] = useState<Act[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [banner, setBanner] = useState('')
  const [voucherId, setVoucherId] = useState('')
  const [detail, setDetail] = useState<Detail | null>(null)
  const [modIdx, setModIdx] = useState(0)
  const [session, setSession] = useState('')
  const [holder, setHolder] = useState({ title: 'Mr', name: '', surname: '', email: '', phone: '', country: '' })
  const [paxes, setPaxes] = useState<Pax[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})

  async function watchBooking(id: string | null) {
    if (!id) return setBanner('Payment received.')
    setBanner('Payment received. Confirming your booking with the supplier...')
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch('/api/activity-bookings/status?id=' + encodeURIComponent(id))
        if (res.ok) {
          const s = await res.json()
          if (s.status === 'confirmed') { setVoucherId(id); return setBanner('Booking confirmed. Your reference is ' + s.reference + '.') }
          if (s.status === 'refunded') return setBanner('Sorry, the supplier could not confirm this booking, so your payment has been refunded in full.')
        }
      } catch {}
      await new Promise((r) => setTimeout(r, 2000))
    }
    setBanner('Your payment was received and we are still confirming. Please check back shortly.')
  }

  useEffect(() => {
    const b = new URLSearchParams(window.location.search).get('booking')
    if (b === 'success') watchBooking(new URLSearchParams(window.location.search).get('booking_id'))
    if (b === 'cancelled') setBanner('Payment was cancelled. You have not been charged.')
  }, [])

  const kidAges = kids.split(',').map((s) => s.trim()).filter(Boolean).map(Number)
  const ages = [...Array(adults).fill(30), ...kidAges] as number[]

  async function search() {
    setError('')
    setDetail(null)
    if (!/^[A-Za-z]{2,4}$/.test(destination)) return setError('Enter a destination code such as BCN')
    if (!date) return setError('Choose a date')
    if (kidAges.some((n) => !Number.isInteger(n) || n < 0 || n > 17)) return setError('Child ages must be whole numbers from 0 to 17, separated by commas')
    setBusy(true)
    try {
      const res = await fetch(`/api/activities/search?destination=${encodeURIComponent(destination)}&date=${date}&ages=${ages.join(',')}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Search failed')
      setResults(data.activities)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Search failed')
    } finally {
      setBusy(false)
    }
  }

  async function choose(a: Act) {
    setError('')
    setBusy(true)
    try {
      const res = await fetch(`/api/activities/details?code=${encodeURIComponent(a.code)}&date=${date}&ages=${ages.join(',')}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not load this activity')
      setDetail(data)
      setModIdx(0)
      setSession('')
      setAnswers({})
      setPaxes(ages.map((age) => ({ name: '', surname: '', age })))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load this activity')
    } finally {
      setBusy(false)
    }
  }

  const mod = detail?.modalities[modIdx]
  const options = (mod?.options || []).filter((o) => o.languages === 0)
  const needsSession = options.some((o) => o.session)
  const chosen = options.find((o) => (o.session || '') === session)

  async function pay() {
    if (!detail || !mod) return
    setError('')
    if (needsSession && !session) return setError('Choose a session time')
    setBusy(true)
    try {
      const res = await fetch('/api/activity-bookings/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: detail.code, date, modality: mod.code, session, holder, paxes, answers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(res.status === 401 ? 'Please sign in to book.' : data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed')
      setBusy(false)
    }
  }

  const setPax = (i: number, k: keyof Pax, v: string) =>
    setPaxes((prev) => prev.map((p, j) => (j === i ? { ...p, [k]: k === 'age' ? Number(v) : v } : p)))

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '110px 20px 60px' }}>
      <h1 style={{ fontSize: 32, marginBottom: 6 }}>Tours and activities</h1>
      <p style={{ opacity: 0.7, marginBottom: 20 }}>Live availability and prices from our supplier.</p>

      {banner && <div style={{ ...box, borderColor: '#C8A96E' }}>{banner}{voucherId && <div style={{ marginTop: 8 }}><a href={'/activities/voucher?id=' + voucherId} style={{ color: '#C8A96E', fontWeight: 600 }}>View your voucher</a></div>}</div>}
      {error && <div style={{ ...box, borderColor: '#c0392b', color: '#e74c3c' }}>{error}</div>}

      {!detail && (
        <div style={box}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            <div><span style={label}>Destination code</span><input style={input} value={destination} maxLength={4} onChange={(e) => setDestination(e.target.value.toUpperCase())} /></div>
            <div><span style={label}>Date</span><input style={input} type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} /></div>
            <div><span style={label}>Adults</span><input style={input} type="number" min={1} max={8} value={adults} onChange={(e) => setAdults(Math.max(1, Math.min(8, Number(e.target.value) || 1)))} /></div>
            <div><span style={label}>Child ages (comma separated)</span><input style={input} value={kids} placeholder="e.g. 7,10" onChange={(e) => setKids(e.target.value)} /></div>
          </div>
          <button style={{ ...btn, marginTop: 14 }} onClick={search} disabled={busy}>{busy ? 'Searching...' : 'Search activities'}</button>
        </div>
      )}

      {!detail && results && results.length === 0 && <p>No activities found for that search.</p>}
      {!detail && results && results.map((a) => (
        <div key={a.code} style={{ ...box, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          {a.image && <img src={a.image} alt="" style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 8 }} />}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 600 }}>{a.name}</div>
            {a.summary && <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>{strip(a.summary).slice(0, 160)}</div>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>from, for your group</div>
            <div style={{ fontWeight: 700 }}>{money(a.total, a.currency)}</div>
            <button style={{ ...btn, marginTop: 8 }} onClick={() => choose(a)} disabled={busy}>Select</button>
          </div>
        </div>
      ))}

      {detail && mod && (
        <div>
          <button style={{ ...btn, background: 'transparent', color: 'inherit', border: '1px solid rgba(128,128,128,0.5)', marginBottom: 16 }} onClick={() => setDetail(null)}>Back to results</button>
          <div style={box}>
            <h2 style={{ marginTop: 0 }}>{detail.name}</h2>
            {detail.image && <img src={detail.image} alt="" style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 8, marginBottom: 10 }} />}
            <p style={{ fontSize: 14, opacity: 0.85 }}>{detail.description}</p>
            <p style={{ fontSize: 13, opacity: 0.7 }}>{date} for {ages.length} traveller{ages.length !== 1 ? 's' : ''}</p>
          </div>

          {detail.modalities.length > 1 && (
            <div style={box}>
              <span style={label}>Option</span>
              <select style={input} value={modIdx} onChange={(e) => { setModIdx(Number(e.target.value)); setSession(''); setAnswers({}) }}>
                {detail.modalities.map((m, i) => <option key={m.code} value={i}>{m.name}</option>)}
              </select>
            </div>
          )}

          <div style={box}>
            <h3 style={{ marginTop: 0 }}>{needsSession ? 'Choose a session' : 'Availability'}</h3>
            {options.length === 0 && <p>No bookable options for this date.</p>}
            {options.map((o, i) => (
              <label key={i} style={{ display: 'block', padding: '10px 0', borderBottom: '1px solid rgba(128,128,128,0.2)', cursor: 'pointer' }}>
                <input type="radio" name="session" checked={(o.session || '') === session} onChange={() => setSession(o.session || '')} />{' '}
                <strong>{o.session || 'Any time'}</strong> {money(o.total, detail.currency)}
                <div style={{ fontSize: 12, opacity: 0.7, marginLeft: 22 }}>
                  {o.freeCancellation ? 'Free cancellation' : 'Not free to cancel'}
                  {o.cancellation.map((c, j) => (
                    <span key={j}>{' · '}{money(c.amount, detail.currency)} charged if cancelled from {c.dateFrom.slice(0, 10)}</span>
                  ))}
                </div>
              </label>
            ))}
          </div>

          <div style={box}>
            <h3 style={{ marginTop: 0 }}>Lead traveller</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              <div><span style={label}>Title</span><select style={input} value={holder.title} onChange={(e) => setHolder({ ...holder, title: e.target.value })}><option>Mr</option><option>Ms</option><option>Miss</option></select></div>
              <div><span style={label}>First name</span><input style={input} value={holder.name} onChange={(e) => setHolder({ ...holder, name: e.target.value })} /></div>
              <div><span style={label}>Last name</span><input style={input} value={holder.surname} onChange={(e) => setHolder({ ...holder, surname: e.target.value })} /></div>
              <div><span style={label}>Email</span><input style={input} type="email" value={holder.email} onChange={(e) => setHolder({ ...holder, email: e.target.value })} /></div>
              <div><span style={label}>Phone with country code</span><input style={input} value={holder.phone} placeholder="+34600000000" onChange={(e) => setHolder({ ...holder, phone: e.target.value })} /></div>
              <div><span style={label}>Country (2 letters)</span><input style={input} value={holder.country} maxLength={2} placeholder="e.g. GB" onChange={(e) => setHolder({ ...holder, country: e.target.value.toUpperCase() })} /></div>
            </div>
          </div>

          <div style={box}>
            <h3 style={{ marginTop: 0 }}>Travellers</h3>
            {paxes.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: 10, marginBottom: 10 }}>
                <input style={input} placeholder={`Traveller ${i + 1} first name`} value={p.name} onChange={(e) => setPax(i, 'name', e.target.value)} />
                <input style={input} placeholder="Last name" value={p.surname} onChange={(e) => setPax(i, 'surname', e.target.value)} />
                <input style={input} type="number" min={0} max={120} value={p.age} onChange={(e) => setPax(i, 'age', e.target.value)} />
              </div>
            ))}
            <div style={{ fontSize: 12, opacity: 0.7 }}>The last box is each traveller age. The final price is confirmed when you pay.</div>
          </div>

          {mod.questions.length > 0 && (
            <div style={box}>
              <h3 style={{ marginTop: 0 }}>Questions from the operator</h3>
              {mod.questions.map((q) => (
                <div key={q.code} style={{ marginBottom: 10 }}>
                  <span style={label}>{q.text}{q.required ? ' *' : ''}</span>
                  <input style={input} value={answers[q.code] || ''} onChange={(e) => setAnswers({ ...answers, [q.code]: e.target.value })} />
                </div>
              ))}
            </div>
          )}

          <button style={btn} onClick={pay} disabled={busy || options.length === 0}>
            {busy ? 'Please wait...' : chosen ? `Pay ${money(chosen.total, detail.currency)}` : 'Continue to payment'}
          </button>
        </div>
      )}
    </div>
  )
}
