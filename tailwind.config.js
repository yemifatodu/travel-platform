/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold:       { DEFAULT: '#C8A96E', light: '#E2C98A', dark: '#8A6D3B' },
        ink:        { DEFAULT: '#080807', soft: '#111110', mid: '#1C1B18' },
        cream:      { DEFAULT: '#F5EFE4', dim: '#E0D6C4' },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        ui:      ['var(--font-bebas)', 'sans-serif'],
        body:    ['var(--font-dm)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
