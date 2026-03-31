'use client';

import { useState, useEffect, useRef } from 'react';

const YESIM_API = 'https://api.yesim.app/api_v0.1/api/prices?partner=3031';
const PARTNER_ID = 3031;

const COUNTRY_MAP: Record<string, { name: string; flag: string }> = {
  AD: { name: 'Andorra', flag: '🇦🇩' }, AE: { name: 'UAE', flag: '🇦🇪' },
  AG: { name: 'Antigua & Barbuda', flag: '🇦🇬' }, AI: { name: 'Anguilla', flag: '🇦🇮' },
  AL: { name: 'Albania', flag: '🇦🇱' }, AM: { name: 'Armenia', flag: '🇦🇲' },
  AN: { name: 'Netherlands Antilles', flag: '🇧🇶' }, AR: { name: 'Argentina', flag: '🇦🇷' },
  AT: { name: 'Austria', flag: '🇦🇹' }, AU: { name: 'Australia', flag: '🇦🇺' },
  AZ: { name: 'Azerbaijan', flag: '🇦🇿' }, BA: { name: 'Bosnia', flag: '🇧🇦' },
  BB: { name: 'Barbados', flag: '🇧🇧' }, BD: { name: 'Bangladesh', flag: '🇧🇩' },
  BE: { name: 'Belgium', flag: '🇧🇪' }, BG: { name: 'Bulgaria', flag: '🇧🇬' },
  BH: { name: 'Bahrain', flag: '🇧🇭' }, BO: { name: 'Bolivia', flag: '🇧🇴' },
  BR: { name: 'Brazil', flag: '🇧🇷' }, BS: { name: 'Bahamas', flag: '🇧🇸' },
  BY: { name: 'Belarus', flag: '🇧🇾' }, BZ: { name: 'Belize', flag: '🇧🇿' },
  CA: { name: 'Canada', flag: '🇨🇦' }, CG: { name: 'Congo', flag: '🇨🇬' },
  CH: { name: 'Switzerland', flag: '🇨🇭' }, CL: { name: 'Chile', flag: '🇨🇱' },
  CN: { name: 'China', flag: '🇨🇳' }, CO: { name: 'Colombia', flag: '🇨🇴' },
  CR: { name: 'Costa Rica', flag: '🇨🇷' }, CW: { name: 'Curaçao', flag: '🇨🇼' },
  CY: { name: 'Cyprus', flag: '🇨🇾' }, CZ: { name: 'Czech Republic', flag: '🇨🇿' },
  DE: { name: 'Germany', flag: '🇩🇪' }, DK: { name: 'Denmark', flag: '🇩🇰' },
  DM: { name: 'Dominica', flag: '🇩🇲' }, DO: { name: 'Dominican Republic', flag: '🇩🇴' },
  DZ: { name: 'Algeria', flag: '🇩🇿' }, EC: { name: 'Ecuador', flag: '🇪🇨' },
  EE: { name: 'Estonia', flag: '🇪🇪' }, EG: { name: 'Egypt', flag: '🇪🇬' },
  ES: { name: 'Spain', flag: '🇪🇸' }, FI: { name: 'Finland', flag: '🇫🇮' },
  FO: { name: 'Faroe Islands', flag: '🇫🇴' }, FR: { name: 'France', flag: '🇫🇷' },
  GA: { name: 'Gabon', flag: '🇬🇦' }, GB: { name: 'United Kingdom', flag: '🇬🇧' },
  GD: { name: 'Grenada', flag: '🇬🇩' }, GE: { name: 'Georgia', flag: '🇬🇪' },
  GF: { name: 'French Guiana', flag: '🇬🇫' }, GH: { name: 'Ghana', flag: '🇬🇭' },
  GI: { name: 'Gibraltar', flag: '🇬🇮' }, GP: { name: 'Guadeloupe', flag: '🇬🇵' },
  GR: { name: 'Greece', flag: '🇬🇷' }, GT: { name: 'Guatemala', flag: '🇬🇹' },
  GY: { name: 'Guyana', flag: '🇬🇾' }, HK: { name: 'Hong Kong', flag: '🇭🇰' },
  HN: { name: 'Honduras', flag: '🇭🇳' }, HR: { name: 'Croatia', flag: '🇭🇷' },
  HU: { name: 'Hungary', flag: '🇭🇺' }, ID: { name: 'Indonesia', flag: '🇮🇩' },
  IE: { name: 'Ireland', flag: '🇮🇪' }, IL: { name: 'Israel', flag: '🇮🇱' },
  IN: { name: 'India', flag: '🇮🇳' }, IQ: { name: 'Iraq', flag: '🇮🇶' },
  IR: { name: 'Iran', flag: '🇮🇷' }, IS: { name: 'Iceland', flag: '🇮🇸' },
  IT: { name: 'Italy', flag: '🇮🇹' }, JM: { name: 'Jamaica', flag: '🇯🇲' },
  JO: { name: 'Jordan', flag: '🇯🇴' }, JP: { name: 'Japan', flag: '🇯🇵' },
  KE: { name: 'Kenya', flag: '🇰🇪' }, KG: { name: 'Kyrgyzstan', flag: '🇰🇬' },
  KH: { name: 'Cambodia', flag: '🇰🇭' }, KN: { name: 'St. Kitts & Nevis', flag: '🇰🇳' },
  KR: { name: 'South Korea', flag: '🇰🇷' }, KW: { name: 'Kuwait', flag: '🇰🇼' },
  KY: { name: 'Cayman Islands', flag: '🇰🇾' }, KZ: { name: 'Kazakhstan', flag: '🇰🇿' },
  LC: { name: 'St. Lucia', flag: '🇱🇨' }, LI: { name: 'Liechtenstein', flag: '🇱🇮' },
  LK: { name: 'Sri Lanka', flag: '🇱🇰' }, LT: { name: 'Lithuania', flag: '🇱🇹' },
  LU: { name: 'Luxembourg', flag: '🇱🇺' }, LV: { name: 'Latvia', flag: '🇱🇻' },
  MA: { name: 'Morocco', flag: '🇲🇦' }, MC: { name: 'Monaco', flag: '🇲🇨' },
  MD: { name: 'Moldova', flag: '🇲🇩' }, ME: { name: 'Montenegro', flag: '🇲🇪' },
  MG: { name: 'Madagascar', flag: '🇲🇬' }, MK: { name: 'North Macedonia', flag: '🇲🇰' },
  MO: { name: 'Macau', flag: '🇲🇴' }, MS: { name: 'Montserrat', flag: '🇲🇸' },
  MT: { name: 'Malta', flag: '🇲🇹' }, MU: { name: 'Mauritius', flag: '🇲🇺' },
  MV: { name: 'Maldives', flag: '🇲🇻' }, MW: { name: 'Malawi', flag: '🇲🇼' },
  MX: { name: 'Mexico', flag: '🇲🇽' }, MY: { name: 'Malaysia', flag: '🇲🇾' },
  MZ: { name: 'Mozambique', flag: '🇲🇿' }, NE: { name: 'Niger', flag: '🇳🇪' },
  NG: { name: 'Nigeria', flag: '🇳🇬' }, NI: { name: 'Nicaragua', flag: '🇳🇮' },
  NL: { name: 'Netherlands', flag: '🇳🇱' }, NO: { name: 'Norway', flag: '🇳🇴' },
  NP: { name: 'Nepal', flag: '🇳🇵' }, NZ: { name: 'New Zealand', flag: '🇳🇿' },
  OM: { name: 'Oman', flag: '🇴🇲' }, PA: { name: 'Panama', flag: '🇵🇦' },
  PE: { name: 'Peru', flag: '🇵🇪' }, PH: { name: 'Philippines', flag: '🇵🇭' },
  PK: { name: 'Pakistan', flag: '🇵🇰' }, PL: { name: 'Poland', flag: '🇵🇱' },
  PR: { name: 'Puerto Rico', flag: '🇵🇷' }, PS: { name: 'Palestine', flag: '🇵🇸' },
  PT: { name: 'Portugal', flag: '🇵🇹' }, PY: { name: 'Paraguay', flag: '🇵🇾' },
  QA: { name: 'Qatar', flag: '🇶🇦' }, RE: { name: 'Réunion', flag: '🇷🇪' },
  RO: { name: 'Romania', flag: '🇷🇴' }, RS: { name: 'Serbia', flag: '🇷🇸' },
  RU: { name: 'Russia', flag: '🇷🇺' }, SA: { name: 'Saudi Arabia', flag: '🇸🇦' },
  SD: { name: 'Sudan', flag: '🇸🇩' }, SE: { name: 'Sweden', flag: '🇸🇪' },
  SG: { name: 'Singapore', flag: '🇸🇬' }, SI: { name: 'Slovenia', flag: '🇸🇮' },
  SK: { name: 'Slovakia', flag: '🇸🇰' }, SN: { name: 'Senegal', flag: '🇸🇳' },
  SR: { name: 'Suriname', flag: '🇸🇷' }, SV: { name: 'El Salvador', flag: '🇸🇻' },
  TC: { name: 'Turks & Caicos', flag: '🇹🇨' }, TH: { name: 'Thailand', flag: '🇹🇭' },
  TN: { name: 'Tunisia', flag: '🇹🇳' }, TR: { name: 'Turkey', flag: '🇹🇷' },
  TT: { name: 'Trinidad & Tobago', flag: '🇹🇹' }, TW: { name: 'Taiwan', flag: '🇹🇼' },
  TZ: { name: 'Tanzania', flag: '🇹🇿' }, UA: { name: 'Ukraine', flag: '🇺🇦' },
  UG: { name: 'Uganda', flag: '🇺🇬' }, US: { name: 'United States', flag: '🇺🇸' },
  UY: { name: 'Uruguay', flag: '🇺🇾' }, UZ: { name: 'Uzbekistan', flag: '🇺🇿' },
  VC: { name: 'St. Vincent', flag: '🇻🇨' }, VE: { name: 'Venezuela', flag: '🇻🇪' },
  VG: { name: 'British Virgin Islands', flag: '🇻🇬' }, VN: { name: 'Vietnam', flag: '🇻🇳' },
  ZA: { name: 'South Africa', flag: '🇿🇦' },
};

interface Plan {
  period: string;
  capacity: string;
  dataUnit: string;
  capacityInfo: string | null;
  price: string;
  currency: string;
  planName: string;
  country: string;
  country_code: string | null;
  coverages: { code: string }[];
  directLink: string;
  planType: string;
}

interface CountryGroup {
  code: string;
  name: string;
  flag: string;
  plans: Plan[];
  isRegional: boolean;
}

function formatData(capacity: string, unit: string, info: string | null): string {
  if (capacity === '-1') return info ? 'Unlimited*' : 'Unlimited';
  const mb = parseInt(capacity);
  if (mb >= 1024) return `${(mb / 1024).toFixed(0)} GB`;
  return `${mb} MB`;
}

function formatPeriod(period: string): string {
  const p = parseInt(period);
  if (p === 1) return '1 Day';
  if (p === 7) return '7 Days';
  if (p === 15) return '15 Days';
  if (p === 30) return '30 Days';
  if (p === 90) return '90 Days';
  if (p === 180) return '6 Months';
  if (p === 365) return '1 Year';
  return `${p} Days`;
}

const esimStyles = `
  :root {
    --gold: #C8A96E;
    --gold-light: #E8C98E;
    --ink: #080807;
    --ink-2: #111110;
    --cream: #F5EFE4;
    --cream-dim: #E8E0D0;
    --muted: rgba(200,169,110,0.15);
    --border: rgba(200,169,110,0.2);
  }
  .esim-page {
    background: var(--ink);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }
  
  /* UPDATED HERO: Flex container for split screen */
  .esim-hero {
    padding: 80px 24px 60px;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,169,110,0.12) 0%, transparent 70%);
    border-bottom: 1px solid var(--border);
  }
  
  .esim-hero-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    text-align: left;
  }

  .esim-hero-left {
    flex: 1;
    max-width: 600px;
  }

  .esim-hero .label {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.3em;
    font-size: 0.8rem;
    color: var(--gold);
    margin-bottom: 16px;
  }
  
  .esim-hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    color: var(--cream);
    margin-bottom: 20px;
  }
  
  .esim-hero h1 span { color: var(--gold); font-style: italic; }
  
  .esim-hero p {
    font-size: 1rem;
    color: rgba(245,239,228,0.6);
    line-height: 1.7;
    font-weight: 300;
    margin: 0;
  }
  
  /* UPDATED BADGES: Stacking them vertically on the right */
  .esim-hero-right {
    flex-shrink: 0;
    width: 280px;
  }

  .esim-badges {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .esim-badge {
    background: var(--muted);
    border: 1px solid var(--border);
    color: var(--gold);
    padding: 12px 16px;
    font-size: 0.8rem;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.15em;
    border-radius: 2px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .esim-body {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px 24px;
  }
  .esim-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--border);
  }
  .esim-tab {
    background: none;
    border: none;
    color: rgba(245,239,228,0.4);
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.15em;
    font-size: 0.9rem;
    padding: 12px 24px;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
  }
  .esim-tab.active { color: var(--gold); }
  .esim-tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gold);
  }
  .esim-tab:hover { color: var(--cream); }
  .esim-search-wrap {
    margin-bottom: 32px;
    position: relative;
  }
  .esim-search {
    width: 100%;
    background: rgba(245,239,228,0.04);
    border: 1px solid var(--border);
    color: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    padding: 14px 20px 14px 48px;
    outline: none;
    transition: border-color 0.2s;
  }
  .esim-search:focus { border-color: var(--gold); }
  .esim-search::placeholder { color: rgba(245,239,228,0.3); }
  .esim-search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(200,169,110,0.5);
    font-size: 1.1rem;
    pointer-events: none;
  }
    .esim-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 6px;
    margin-bottom: 48px;
  }
  .esim-country-card {
    background: rgba(245,239,228,0.03);
    border: 1px solid var(--border);
    padding: 10px 14px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
  }
  .esim-country-card:hover {
    border-color: rgba(200,169,110,0.5);
    background: rgba(200,169,110,0.06);
  }
  .esim-country-card.active {
    border-color: var(--gold);
    background: rgba(200,169,110,0.1);
  }
  .esim-country-flag { flex-shrink: 0; width: 32px; height: 24px; display: flex; align-items: center; justify-content: center; }

  .esim-country-name {
    font-size: 0.78rem;
    color: var(--cream-dim);
    font-weight: 400;
    line-height: 1.2;
    flex: 1;
  }
  .esim-country-count {
    font-size: 0.62rem;
    color: var(--gold);
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }
  .esim-detail {
    border: 1px solid var(--border);
    background: rgba(245,239,228,0.02);
    padding: 40px;
    margin-bottom: 48px;
    scroll-margin-top: 20px;
  }
  .esim-detail-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .esim-detail-flag { font-size: 3rem; }
  .esim-detail-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: var(--cream);
  }
  .esim-detail-subtitle {
    font-size: 0.8rem;
    color: rgba(245,239,228,0.4);
    margin-top: 4px;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.15em;
  }
  .esim-plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }
  .esim-plan-card {
    border: 1px solid var(--border);
    background: rgba(245,239,228,0.03);
    padding: 24px;
    transition: border-color 0.2s;
    position: relative;
    overflow: hidden;
  }
  .esim-plan-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .esim-plan-card:hover { border-color: rgba(200,169,110,0.4); }
  .esim-plan-card:hover::before { opacity: 1; }
  .esim-plan-period {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.2em;
    font-size: 0.75rem;
    color: var(--gold);
    margin-bottom: 12px;
  }
  .esim-plan-data {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 300;
    color: var(--cream);
    line-height: 1;
    margin-bottom: 4px;
  }
  .esim-plan-throttle {
    font-size: 0.7rem;
    color: rgba(245,239,228,0.35);
    margin-bottom: 16px;
  }
  .esim-plan-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 16px 0;
  }
  .esim-plan-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--gold-light);
    margin-bottom: 16px;
  }
  .esim-plan-price span {
    font-size: 1rem;
    color: rgba(200,169,110,0.6);
    font-weight: 300;
  }
  .esim-buy-btn {
    display: block;
    width: 100%;
    background: transparent;
    border: 1px solid var(--gold);
    color: var(--gold);
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.2em;
    font-size: 0.85rem;
    padding: 12px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s;
  }
  .esim-buy-btn:hover {
    background: var(--gold);
    color: var(--ink);
  }
  .esim-loading {
    text-align: center;
    padding: 80px 24px;
    color: rgba(245,239,228,0.4);
  }
  .esim-loading-spinner {
    width: 40px;
    height: 40px;
    border: 2px solid var(--border);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .esim-empty {
    text-align: center;
    padding: 48px;
    color: rgba(245,239,228,0.3);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-style: italic;
  }
  .esim-coverage {
    margin-top: 16px;
    font-size: 0.75rem;
    color: rgba(245,239,228,0.35);
    line-height: 1.5;
  }
  .esim-coverage strong {
    color: rgba(245,239,228,0.5);
    font-weight: 400;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 0.1em;
    font-size: 0.7rem;
  }

  /* MEDIA QUERIES: Collapse back to stack on mobile */
  @media (max-width: 768px) {
    .esim-hero-inner {
      flex-direction: column;
      text-align: center;
      gap: 32px;
    }
    .esim-hero-left {
      max-width: 100%;
    }
    .esim-hero-right {
      width: 100%;
      max-width: 320px;
    }
    .esim-badge {
      justify-content: center;
    }
  }

  @media (max-width: 640px) {
    .esim-detail { padding: 24px 16px; }
    .esim-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
    .esim-plans-grid { grid-template-columns: 1fr; }
  }
`;

export default function EsimPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CountryGroup | null>(null);
  const [activeTab, setActiveTab] = useState<'country' | 'regional' | 'global'>('country');
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(YESIM_API)
      .then(r => r.json())
      .then(data => {
        setPlans(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load plans. Please try again.');
        setLoading(false);
      });
  }, []);

  const countryGroups: CountryGroup[] = (() => {
    const map = new Map<string, CountryGroup>();
    plans.forEach(plan => {
      const isGlobal = plan.planName.toLowerCase().includes('global') || plan.planName.toLowerCase().includes('day pass');
      const isRegional = !plan.country_code && !isGlobal;
      const isSingleCountry = !!plan.country_code;
      if (isSingleCountry) {
        const code = plan.country_code!.toUpperCase();
        const info = COUNTRY_MAP[code];
        const key = `country_${code}`;
        if (!map.has(key)) {
          map.set(key, { code, name: info?.name || plan.country, flag: info?.flag || '🌍', plans: [], isRegional: false });
        }
        map.get(key)!.plans.push(plan);
      } else if (isRegional) {
        const key = `regional_${plan.planName}`;
        if (!map.has(key)) {
          map.set(key, { code: plan.planName, name: plan.country, flag: '🌍', plans: [], isRegional: true });
        }
        map.get(key)!.plans.push(plan);
      } else {
        const key = `global_${plan.planName}`;
        if (!map.has(key)) {
          map.set(key, { code: plan.planName, name: plan.planName, flag: '🌐', plans: [], isRegional: true });
        }
        map.get(key)!.plans.push(plan);
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  })();

  const countriesOnly = countryGroups.filter(g => !g.isRegional);
  const regionalOnly = countryGroups.filter(g => g.isRegional && !g.name.toLowerCase().includes('global') && !g.name.toLowerCase().includes('day'));
  const globalOnly = countryGroups.filter(g => g.isRegional && (g.name.toLowerCase().includes('global') || g.name.toLowerCase().includes('day')));
  const currentList = activeTab === 'country' ? countriesOnly : activeTab === 'regional' ? regionalOnly : globalOnly;
  const filtered = search.trim() ? currentList.filter(g => g.name.toLowerCase().includes(search.toLowerCase())) : currentList;

  const handleSelect = (group: CountryGroup) => {
    setSelected(group);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const buildBuyLink = (plan: Plan) => `${plan.directLink}?partner=${PARTNER_ID}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: esimStyles }} />
      <div className="esim-page">
        <div className="esim-hero">
          
          {/* New Flex container wraps content */}
          <div className="esim-hero-inner">
            
            {/* Left side: Heading and copy */}
            <div className="esim-hero-left">
              <p className="label">✦ HUUBOI eSIM STORE ✦</p>
              <h1>Stay Connected<br /><span>Anywhere on Earth</span></h1>
              <p>Instant eSIMs for 150+ destinations. No roaming fees. No physical SIM. Activate in minutes.</p>
            </div>

            {/* Right side: Stacked Badges */}
            <div className="esim-hero-right">
              <div className="esim-badges">
                <span className="esim-badge">📶 150+ Countries</span>
                <span className="esim-badge">⚡ Instant Activation</span>
                <span className="esim-badge">🔒 No Roaming Fees</span>
                <span className="esim-badge">📱 eSIM Compatible Phones</span>
              </div>
            </div>

          </div>
        </div>

        <div className="esim-body">
          {loading && (
            <div className="esim-loading">
              <div className="esim-loading-spinner"></div>
              <p>Loading live plans...</p>
            </div>
          )}
          {error && <div className="esim-empty">{error}</div>}

          {!loading && !error && (
            <>
              <div className="esim-tabs">
                <button className={`esim-tab ${activeTab === 'country' ? 'active' : ''}`} onClick={() => { setActiveTab('country'); setSelected(null); setSearch(''); }}>
                  Countries ({countriesOnly.length})
                </button>
                <button className={`esim-tab ${activeTab === 'regional' ? 'active' : ''}`} onClick={() => { setActiveTab('regional'); setSelected(null); setSearch(''); }}>
                  Regional
                </button>
                <button className={`esim-tab ${activeTab === 'global' ? 'active' : ''}`} onClick={() => { setActiveTab('global'); setSelected(null); setSearch(''); }}>
                  Global
                </button>
              </div>

              {activeTab === 'country' && (
                <div className="esim-search-wrap">
                  <span className="esim-search-icon">🔍</span>
                  <input
                    className="esim-search"
                    type="text"
                    placeholder="Search country..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              )}

              {filtered.length === 0 && (
                <div className="esim-empty">No destinations found for &quot;{search}&quot;</div>
              )}

              <div className="esim-grid">
                {filtered.map(group => (
                  <div
                    key={group.code}
                    className={`esim-country-card ${selected?.code === group.code ? 'active' : ''}`}
                    onClick={() => handleSelect(group)}
                  >
                    <div className="esim-country-flag">
  {group.code.length === 2 ? (
    <img
      src={`https://flagcdn.com/32x24/${group.code.toLowerCase()}.png`}
      alt={group.name}
      width={32}
      height={24}
      style={{ display: 'inline-block', borderRadius: 2, objectFit: 'cover' }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
    />
  ) : (
    <span style={{ fontSize: '1.4rem' }}>{group.flag}</span>
  )}
</div>
                    <div className="esim-country-name">{group.name}</div>
                    <div className="esim-country-count">{group.plans.length} plan{group.plans.length !== 1 ? 's' : ''}</div>
                  </div>
                ))}
              </div>

              {selected && (
                <div className="esim-detail" ref={detailRef}>
                  <div className="esim-detail-header">
                    <div className="esim-detail-flag">{selected.flag}</div>
                    <div>
                      <div className="esim-detail-title">{selected.name}</div>
                      <div className="esim-detail-subtitle">
                        {selected.plans.length} available plan{selected.plans.length !== 1 ? 's' : ''} · Data only · Powered by Yesim
                      </div>
                    </div>
                  </div>
                  <div className="esim-plans-grid">
                    {selected.plans
                      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                      .map((plan, i) => (
                        <div key={i} className="esim-plan-card">
                          <div className="esim-plan-period">{formatPeriod(plan.period)}</div>
                          <div className="esim-plan-data">
                            {formatData(plan.capacity, plan.dataUnit, plan.capacityInfo)}
                          </div>
                          {plan.capacityInfo && (
                            <div className="esim-plan-throttle">*After fair use, speeds may be reduced</div>
                          )}
                          <hr className="esim-plan-divider" />
                          <div className="esim-plan-price">
                            €{parseFloat(plan.price).toFixed(2)} <span>EUR</span>
                          </div>
                          <a href={buildBuyLink(plan)} target="_blank" rel="noopener noreferrer" className="esim-buy-btn">
                            Get This eSIM →
                          </a>
                          {selected.isRegional && plan.coverages.length > 1 && (
                            <div className="esim-coverage">
                              <strong>Covers:</strong>{' '}
                              {plan.coverages.slice(0, 8).map(c => COUNTRY_MAP[c.code]?.name || c.code).join(', ')}
                              {plan.coverages.length > 8 && ` +${plan.coverages.length - 8} more`}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}