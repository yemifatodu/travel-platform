import Link from 'next/link'

interface Props {
  destination?: string
  packageName?: string
  variant?: 'gold' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export function RequestTripButton({
  destination,
  packageName,
  variant = 'gold',
  size = 'md',
  label = 'REQUEST THIS TRIP',
}: Props) {
  const params = new URLSearchParams()
  if (destination) params.set('dest', destination)
  if (packageName) params.set('pkg', packageName)
  const href = `/request-trip${params.toString() ? '?' + params.toString() : ''}`

  const padding = size === 'sm' ? '10px 20px' : size === 'lg' ? '18px 40px' : '14px 28px'
  const fontSize = size === 'sm' ? '0.6rem' : size === 'lg' ? '0.8rem' : '0.7rem'

  const styles: Record<string, React.CSSProperties> = {
    gold: { background: '#C8A96E', color: '#080807', border: 'none' },
    outline: { background: 'transparent', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.4)' },
    ghost: { background: 'rgba(200,169,110,0.08)', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.2)' },
  }

  return (
    <Link href={href}
      style={{ ...styles[variant], padding, fontFamily: "'Bebas Neue',sans-serif", fontSize, letterSpacing: '0.18em', textDecoration: 'none', display: 'inline-block', cursor: 'pointer', transition: 'opacity 0.2s' }}>
      {label}
    </Link>
  )
}
