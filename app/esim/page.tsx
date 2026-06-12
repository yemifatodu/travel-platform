"use client";

import { useState, useEffect } from "react";

interface Plan {
  id: string;
  title: string;
  country_code: string;
  country_name: string;
  data_amount: string;
  validity_days: number;
  retail_price: number;
  currency: string;
  covered_countries?: string[];
}

interface CountryGroup {
  code: string;
  name: string;
  plans: Plan[];
  planCount: number;
  isExpanded: boolean;
}

const FlagImage = ({ code, name }: { code: string; name: string }) => {
  const [imgError, setImgError] = useState(false);

  if (code === 'RG' || imgError) {
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 18,
        background: 'rgba(200,169,110,0.2)',
        borderRadius: 2,
        fontSize: '0.45rem',
        color: '#C8A96E',
        fontWeight: 700,
        letterSpacing: '0.03em',
        flexShrink: 0,
      }}>
        {code.slice(0, 3)}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
      alt={name}
      width={24}
      height={18}
      onError={() => setImgError(true)}
      style={{
        borderRadius: 2,
        objectFit: 'cover',
        flexShrink: 0,
        display: 'block',
      }}
    />
  );
};

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why didn't I get my eSIM email?",
      answer: "Check your spam folder. Still missing? Hit us on WhatsApp.",
    },
    {
      question: "Why does my eSIM say 'Activating' or 'Unable to Register'?",
      answer: "You may be trying to activate before arriving in the coverage zone. Install before you fly, activate when you land.",
    },
    {
      question: "How is Huuboi so much cheaper than big names?",
      answer: "We buy enterprise-grade bandwidth wholesale directly from tier-one infrastructure providers. No retail markup. No influencer commissions baked into your price.",
    },
    {
      question: "Do you offer a referral program?",
      answer: "Yes. Affiliate details available on our partner page.",
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
      <h2 style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "clamp(2rem, 5vw, 3rem)",
        fontWeight: 300,
        textAlign: "center",
        marginBottom: 48,
        color: "#F5EFE4",
      }}>
        Frequently Asked Questions
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{
            border: "1px solid rgba(200,169,110,0.2)",
            background: "rgba(245,239,228,0.02)",
          }}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 20px",
                background: "transparent",
                border: "none",
                color: "#F5EFE4",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              <span>{faq.question}</span>
              <span style={{ fontSize: "1.5rem", color: "#C8A96E" }}>
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div style={{
                padding: "0 20px 20px 20px",
                color: "rgba(245,239,228,0.7)",
                fontSize: "0.9rem",
                lineHeight: 1.5,
                borderTop: "1px solid rgba(200,169,110,0.1)",
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function EsimPage() {
  const [countries, setCountries] = useState<CountryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [progress, setProgress] = useState(0);

  // Fetch ALL plans by paginating through all pages
  useEffect(() => {
    const fetchAllPlans = async () => {
      setLoading(true);
      setError("");
      
      const allPlans: Plan[] = [];
      let offset = 0;
      const LIMIT = 100;
      let hasMore = true;
      let page = 0;

      try {
        while (hasMore) {
          const response = await fetch(`/api/esim/plans?limit=${LIMIT}&offset=${offset}`);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);

          const result = await response.json();

          if (result.success && result.data) {
            allPlans.push(...result.data);
            
            // Update progress
            setProgress(allPlans.length);
            
            // Check if there are more results
            if (result.pagination) {
              hasMore = result.pagination.has_more;
              offset += LIMIT;
              page++;
            } else {
              // If no pagination info, assume we have all data
              hasMore = false;
            }
          } else {
            throw new Error(result.error || "No data received");
          }
        }

        // After fetching all plans, group them by country
        const countryMap = new Map<string, CountryGroup>();
        
        allPlans.forEach((plan: Plan) => {
          const code = plan.country_code;
          if (!countryMap.has(code)) {
            countryMap.set(code, {
              code,
              name: plan.country_name,
              plans: [plan],
              planCount: 1,
              isExpanded: false,
            });
          } else {
            const country = countryMap.get(code)!;
            if (!country.plans.find(p => p.id === plan.id)) {
              country.plans.push(plan);
              country.planCount++;
            }
          }
        });

        const sortedCountries = Array.from(countryMap.values()).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        
        setCountries(sortedCountries);
        console.log(`Loaded ${allPlans.length} plans across ${sortedCountries.length} countries`);
        
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load eSIM plans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlans();
  }, []);

  const toggleCountry = (countryCode: string) => {
    setCountries((prev) =>
      prev.map((country) =>
        country.code === countryCode
          ? { ...country, isExpanded: !country.isExpanded }
          : country
      )
    );
  };

  // Filter countries based on search
  const filteredCountries = searchQuery
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : countries;

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#080807",
        color: "#F5EFE4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40,
            height: 40,
            border: "2px solid rgba(200,169,110,0.2)",
            borderTopColor: "#C8A96E",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 16px",
          }} />
          <p>Loading eSIM plans...</p>
          {progress > 0 && (
            <p style={{ fontSize: "0.8rem", color: "rgba(245,239,228,0.6)", marginTop: 8 }}>
              Loaded {progress} plans so far...
            </p>
          )}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#080807",
        color: "#F5EFE4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
        <p style={{ color: "#e87070", marginBottom: 20 }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "12px 24px",
            background: "#C8A96E",
            border: "none",
            color: "#080807",
            cursor: "pointer",
          }}
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080807", color: "#F5EFE4" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@400;500&display=swap');

        .esim-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 640px) {
          .esim-grid {
            grid-template-columns: 1fr;
          }
        }

        .country-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .country-row:hover {
          background: rgba(200,169,110,0.06);
        }

        .country-row-expanded {
          background: rgba(200,169,110,0.08);
        }

        .get-btn {
          background: transparent;
          border: 1px solid #C8A96E;
          color: #C8A96E;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          cursor: pointer;
          font-size: 0.6rem;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .get-btn:hover {
          background: #C8A96E;
          color: #080807;
        }

        .search-input {
          width: 100%;
          background: rgba(245,239,228,0.04);
          border: 1px solid rgba(200,169,110,0.2);
          color: #F5EFE4;
          padding: 14px 20px;
          outline: none;
          font-family: DM Sans, sans-serif;
          font-size: 1rem;
        }

        .search-input::placeholder {
          color: rgba(245,239,228,0.3);
        }
      `}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
          fontWeight: 300,
          textAlign: "center",
          marginBottom: 16,
          color: "#F5EFE4",
        }}>
          Choose Your Destination
        </h2>

        <p style={{
          textAlign: "center",
          color: "rgba(245,239,228,0.6)",
          marginBottom: 32,
          fontFamily: "DM Sans, sans-serif",
        }}>
          Click any country to see available eSIM plans
        </p>

        <div style={{ marginBottom: 32 }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="esim-grid">
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              style={{
                border: "1px solid rgba(200,169,110,0.15)",
                background: "rgba(245,239,228,0.02)",
              }}
            >
              <div
                className={`country-row${country.isExpanded ? ' country-row-expanded' : ''}`}
                onClick={() => toggleCountry(country.code)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <FlagImage code={country.code} name={country.name} />
                  <span style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    lineHeight: 1.2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {country.name}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 8 }}>
                  <span style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    fontSize: "0.65rem",
                    color: "#C8A96E",
                    background: "rgba(200,169,110,0.15)",
                    padding: "3px 7px",
                    borderRadius: 2,
                    whiteSpace: "nowrap",
                  }}>
                    {country.planCount} {country.planCount === 1 ? "plan" : "plans"}
                  </span>
                  <span style={{
                    fontSize: "0.8rem",
                    color: "#C8A96E",
                    transform: country.isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    display: "inline-block",
                  }}>
                    v
                  </span>
                </div>
              </div>

              {country.isExpanded && (
                <div style={{
                  padding: "12px 16px",
                  borderTop: "1px solid rgba(200,169,110,0.1)",
                  background: "rgba(0,0,0,0.2)",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {country.plans
                      .sort((a, b) => a.retail_price - b.retail_price)
                      .slice(0, 8)
                      .map((plan) => (
                        <div
                          key={plan.id}
                          style={{
                            border: "1px solid rgba(200,169,110,0.2)",
                            background: "rgba(245,239,228,0.03)",
                            padding: "10px 12px",
                          }}
                        >
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 4,
                          }}>
                            <div style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontSize: "1rem",
                              color: "#E8C98E",
                            }}>
                              {plan.data_amount}
                            </div>
                            <div style={{
                              fontSize: "0.65rem",
                              color: "rgba(245,239,228,0.5)",
                            }}>
                              {plan.validity_days}d
                            </div>
                          </div>

                          {plan.covered_countries && plan.covered_countries.length > 0 && (
                            <div style={{
                              fontSize: "0.6rem",
                              color: "rgba(245,239,228,0.4)",
                              marginBottom: 6,
                            }}>
                              {plan.covered_countries.slice(0, 2).join(", ")}...
                            </div>
                          )}

                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 6,
                          }}>
                            <div style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontSize: "1rem",
                              color: "#C8A96E",
                            }}>
                              ${plan.retail_price}
                            </div>
                            <button
                              className="get-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/esim/checkout?plan_id=${plan.id}`;
                              }}
                            >
                              GET
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  {country.plans.length > 8 && (
                    <div style={{
                      textAlign: "center",
                      marginTop: 10,
                      fontSize: "0.7rem",
                      color: "rgba(245,239,228,0.4)",
                    }}>
                      +{country.plans.length - 8} more plans available
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: 60,
            color: "rgba(245,239,228,0.5)",
            fontFamily: "DM Sans, sans-serif",
          }}>
            No countries found matching "{searchQuery}"
          </div>
        )}

        <p style={{
          textAlign: "center",
          color: "rgba(245,239,228,0.4)",
          marginTop: 16,
          fontSize: "0.8rem",
          fontFamily: "DM Sans, sans-serif",
        }}>
          Showing {filteredCountries.length} countries with eSIM coverage
        </p>
      </div>

      {/* Testimonials */}
      <div style={{
        padding: "60px 24px",
        background: "rgba(245,239,228,0.02)",
        borderTop: "1px solid rgba(200,169,110,0.1)",
        borderBottom: "1px solid rgba(200,169,110,0.1)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontWeight: 300,
            textAlign: "center",
            marginBottom: 48,
            color: "#F5EFE4",
          }}>
            What Our Customers Say
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}>
            {[
              { text: "Cheapest rates I found for Turkey and Morocco. Connected instantly.", name: "S. L." },
              { text: "Proactively refunded due to a network issue. Amazing service.", name: "J. S." },
              { text: "Reliable everywhere — even in rural areas. No throttling.", name: "Claudia M." },
            ].map((review, idx) => (
              <div key={idx} style={{
                background: "rgba(245,239,228,0.03)",
                padding: 24,
                border: "1px solid rgba(200,169,110,0.15)",
              }}>
                <div style={{ color: "#C8A96E", fontSize: "1.2rem", marginBottom: 12 }}>
                  ★★★★★
                </div>
                <p style={{
                  color: "rgba(245,239,228,0.8)",
                  marginBottom: 16,
                  fontSize: "0.9rem",
                  fontFamily: "DM Sans, sans-serif",
                  lineHeight: 1.6,
                }}>
                  "{review.text}"
                </p>
                <p style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1rem",
                  color: "#C8A96E",
                }}>
                  — {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FaqAccordion />

      <footer style={{
        padding: "48px 24px",
        borderTop: "1px solid rgba(200,169,110,0.1)",
        fontSize: "0.7rem",
        color: "rgba(245,239,228,0.4)",
        textAlign: "center",
        fontFamily: "DM Sans, sans-serif",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            marginBottom: 32,
          }}>
            <div>
              <strong style={{ color: "rgba(245,239,228,0.6)" }}>Popular eSIMs</strong>
              <br />United States | Japan | China | Turkey | UK
            </div>
            <div>
              <strong style={{ color: "rgba(245,239,228,0.6)" }}>Tools</strong>
              <br />Data Calculator | Compatibility | Blog | Affiliate
            </div>
            <div>
              <strong style={{ color: "rgba(245,239,228,0.6)" }}>Legal</strong>
              <br />Privacy | Refund | Terms | Cookies
            </div>
          </div>
          <div>Copyright 2026 Huuboi | Global eSIM for Travelers | All rights reserved</div>
        </div>
      </footer>
    </div>
  );
}