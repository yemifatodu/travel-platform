import { createServerClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const money = (n: number, c: string) => new Intl.NumberFormat('en', { style: 'currency', currency: c }).format(n)
const day = (s?: string | null) =>
  s ? new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : ''

const wrap: React.CSSProperties = { maxWidth: 760, margin: '0 auto', padding: '110px 20px 60px' }
const sheet: React.CSSProperties = { background: '#fff', color: '#111', borderRadius: 12, padding: 28, border: '1px solid #ddd' }
const h: React.CSSProperties = { fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', margin: '22px 0 6px' }

function Msg({ text }: { text: string }) {
  return <div style={wrap}><div style={sheet}>{text}</div></div>
}

export default async function VoucherPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams.id || ''
  if (!/^[0-9a-f-]{36}$/i.test(id)) return <Msg text="Voucher not found." />

  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <Msg text="Please sign in to view your voucher." />

  const { data: booking } = await (supabase.from('bookings') as any)
    .select('id, status, total_price, currency')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()
  if (!booking) return <Msg text="Voucher not found." />
  if (booking.status !== 'confirmed') return <Msg text="This booking is not confirmed, so there is no voucher." />

  const { data: item } = await (supabase.from('booking_items') as any)
    .select('item_name, check_in, details')
    .eq('booking_id', id)
    .limit(1)
    .single()
  const d: any = item?.details || {}
  const c: any = d.hbx_confirmation
  if (!c) return <Msg text="Your voucher is still being prepared. Please refresh in a moment." />

  const remarks: string[] = (c.comments || [])
    .filter((x: any) => x.type === 'CONTRACT_REMARKS')
    .flatMap((x: any) => String(x.text || '').split(' // '))
    .map((s: string) => s.trim())
    .filter(Boolean)
  const vouchers: any[] = c.vouchers || []
  const paxes: any[] = d.paxes || []
  const holder: any = d.holder || {}
  const policies: any[] = c.cancellationPolicies || []

  return (
    <div style={wrap}>
      <div style={sheet}>
        <div style={{ fontSize: 13, color: '#777' }}>Booking voucher</div>
        <h1 style={{ margin: '4px 0 2px', fontSize: 26 }}>{item?.item_name || c.name}</h1>
        {c.name && c.name !== item?.item_name && <div style={{ fontSize: 13, color: '#777' }}>Operator listing: {c.name}</div>}
        <div style={{ marginTop: 10, fontSize: 18 }}>Reference: <strong>{c.reference}</strong></div>
        <div style={{ fontSize: 13, color: '#777' }}>Booked on {day(c.creationDate)}</div>

        {vouchers.length > 0 && (
          <div style={{ marginTop: 18, padding: 14, border: '2px solid #C8A96E', borderRadius: 8 }}>
            <strong>Your entry ticket is issued by the operator.</strong> Use this ticket, not this page, to enter:
            {vouchers.map((v: any, i: number) => (
              <div key={i}><a href={v.url} target="_blank" rel="noreferrer">Open ticket {i + 1}</a></div>
            ))}
          </div>
        )}

        <div style={h}>Lead traveller</div>
        <div>{[holder.title, holder.name, holder.surname].filter(Boolean).join(' ')}</div>

        <div style={h}>Activity</div>
        <div>{day(c.dateFrom || item?.check_in)}{c.dateTo && c.dateTo !== c.dateFrom ? ' to ' + day(c.dateTo) : ''}{d.session ? ' at ' + d.session : ''}</div>
        {c.modality && <div>Option: {c.modality}</div>}
        {c.destination && <div>Destination: {c.destination}</div>}

        <div style={h}>Travellers</div>
        {paxes.map((p: any, i: number) => (
          <div key={i}>{p.name} {p.surname} ({String(p.type || '').toLowerCase()}{p.age < 18 ? ', age ' + p.age : ''})</div>
        ))}

        {remarks.length > 0 && (
          <>
            <div style={h}>Important information</div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {remarks.map((r, i) => <li key={i} style={{ marginBottom: 4 }}>{r}</li>)}
            </ul>
          </>
        )}

        {policies.length > 0 && (
          <>
            <div style={h}>Cancellation</div>
            {policies.map((p: any, i: number) => (
              <div key={i}>{money(Number(p.amount), booking.currency)} charged if cancelled from {day(p.dateFrom)}</div>
            ))}
          </>
        )}

        <div style={h}>Payment</div>
        <div>Total paid: {money(Number(booking.total_price), booking.currency)}</div>
        {c.supplier && (
          <div style={{ fontSize: 13, color: '#555', marginTop: 6 }}>
            Bookable and payable through {c.supplier.name}, acting as agent for the service operating company, with VAT {c.supplier.vatNumber}. Reference: {c.reference}.
          </div>
        )}
      </div>
    </div>
  )
}
