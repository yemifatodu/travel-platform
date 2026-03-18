'use client'
import { useState } from 'react'
import Link from 'next/link'

const destinations = [
  // ── AFRICA ──
  { name: 'Serengeti', country: 'Tanzania', region: 'Africa', slug: 'serengeti', gradient: 'linear-gradient(160deg,#1a1200,#2d2000,#3d2c00)' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', slug: 'cape-town', gradient: 'linear-gradient(160deg,#001018,#001c2d,#002840)' },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa', slug: 'marrakech', gradient: 'linear-gradient(160deg,#200800,#381200,#501c00)' },
  { name: 'Zanzibar', country: 'Tanzania', region: 'Africa', slug: 'zanzibar', gradient: 'linear-gradient(160deg,#001a12,#002d1e,#00402a)' },
  { name: 'Victoria Falls', country: 'Zimbabwe', region: 'Africa', slug: 'victoria-falls', gradient: 'linear-gradient(160deg,#001a10,#002818,#003820)' },
  { name: 'Masai Mara', country: 'Kenya', region: 'Africa', slug: 'masai-mara', gradient: 'linear-gradient(160deg,#1a1000,#2a1c00,#3a2800)' },
  { name: 'Nairobi', country: 'Kenya', region: 'Africa', slug: 'nairobi', gradient: 'linear-gradient(160deg,#001a08,#002a10,#003818)' },
  { name: 'Okavango Delta', country: 'Botswana', region: 'Africa', slug: 'okavango', gradient: 'linear-gradient(160deg,#001c10,#002c1a,#003c22)' },
  { name: 'Kruger Park', country: 'South Africa', region: 'Africa', slug: 'kruger', gradient: 'linear-gradient(160deg,#180e00,#2a1800,#3c2200)' },
  { name: 'Fes', country: 'Morocco', region: 'Africa', slug: 'fes', gradient: 'linear-gradient(160deg,#240a00,#3a1000,#501600)' },
  { name: 'Sahara Desert', country: 'Morocco', region: 'Africa', slug: 'sahara', gradient: 'linear-gradient(160deg,#2a1400,#402000,#582c00)' },
  { name: 'Rwanda Gorillas', country: 'Rwanda', region: 'Africa', slug: 'rwanda', gradient: 'linear-gradient(160deg,#001800,#002800,#003800)' },
  { name: 'Ngorongoro', country: 'Tanzania', region: 'Africa', slug: 'ngorongoro', gradient: 'linear-gradient(160deg,#0e1400,#182000,#222c00)' },
  { name: 'Kalahari', country: 'Botswana', region: 'Africa', slug: 'kalahari', gradient: 'linear-gradient(160deg,#201200,#341e00,#482800)' },
  { name: 'Lagos', country: 'Nigeria', region: 'Africa', slug: 'lagos', gradient: 'linear-gradient(160deg,#001a10,#002c1a,#003e22)' },
  { name: 'Dakar', country: 'Senegal', region: 'Africa', slug: 'dakar', gradient: 'linear-gradient(160deg,#001424,#001e38,#002848)' },
  { name: 'Accra', country: 'Ghana', region: 'Africa', slug: 'accra', gradient: 'linear-gradient(160deg,#1a0800,#2c1200,#3e1c00)' },
  { name: 'Addis Ababa', country: 'Ethiopia', region: 'Africa', slug: 'addis-ababa', gradient: 'linear-gradient(160deg,#0e0018,#180028,#220038)' },
  { name: 'Luanda', country: 'Angola', region: 'Africa', slug: 'luanda', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Mauritius', country: 'Mauritius', region: 'Africa', slug: 'mauritius', gradient: 'linear-gradient(160deg,#001c18,#002c24,#003c30)' },
  { name: 'Seychelles', country: 'Seychelles', region: 'Africa', slug: 'seychelles', gradient: 'linear-gradient(160deg,#001820,#002430,#003040)' },
  { name: 'Madagascar', country: 'Madagascar', region: 'Africa', slug: 'madagascar', gradient: 'linear-gradient(160deg,#001c00,#002c00,#003c00)' },
  { name: 'Kilimanjaro', country: 'Tanzania', region: 'Africa', slug: 'kilimanjaro', gradient: 'linear-gradient(160deg,#0a1000,#121c00,#1a2800)' },
  { name: 'Diani Beach', country: 'Kenya', region: 'Africa', slug: 'diani-beach', gradient: 'linear-gradient(160deg,#001a14,#002822,#003830)' },
  { name: 'Namibia Dunes', country: 'Namibia', region: 'Africa', slug: 'namibia', gradient: 'linear-gradient(160deg,#281000,#401a00,#582400)' },
  { name: 'Lamu Island', country: 'Kenya', region: 'Africa', slug: 'lamu', gradient: 'linear-gradient(160deg,#001e16,#002e20,#003e2c)' },
  { name: 'Abuja', country: 'Nigeria', region: 'Africa', slug: 'abuja', gradient: 'linear-gradient(160deg,#001008,#001c10,#002818)' },
  { name: 'Mombasa', country: 'Kenya', region: 'Africa', slug: 'mombasa', gradient: 'linear-gradient(160deg,#001020,#001830,#002040)' },
  { name: 'Luxor', country: 'Egypt', region: 'Africa', slug: 'luxor', gradient: 'linear-gradient(160deg,#221000,#381c00,#4e2800)' },
  { name: 'Alexandria', country: 'Egypt', region: 'Africa', slug: 'alexandria', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Dar es Salaam', country: 'Tanzania', region: 'Africa', slug: 'dar-es-salaam', gradient: 'linear-gradient(160deg,#001c0e,#002c18,#003c22)' },
  { name: 'Harare', country: 'Zimbabwe', region: 'Africa', slug: 'harare', gradient: 'linear-gradient(160deg,#0a1400,#141e00,#1e2c00)' },
  { name: 'Cairo', country: 'Egypt', region: 'Africa', slug: 'cairo', gradient: 'linear-gradient(160deg,#221000,#381c00,#4e2800)' },
  { name: 'Pyramids of Giza', country: 'Egypt', region: 'Africa', slug: 'pyramids-giza', gradient: 'linear-gradient(160deg,#261200,#3c1e00,#522a00)' },
  { name: 'Aswan', country: 'Egypt', region: 'Africa', slug: 'aswan', gradient: 'linear-gradient(160deg,#201000,#341c00,#482800)' },
  { name: 'Casablanca', country: 'Morocco', region: 'Africa', slug: 'casablanca', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },

  // ── MIDDLE EAST ──
  { name: 'Dubai', country: 'UAE', region: 'Middle East', slug: 'dubai', gradient: 'linear-gradient(160deg,#200e00,#3d2200,#582e00)' },
  { name: 'Petra', country: 'Jordan', region: 'Middle East', slug: 'petra', gradient: 'linear-gradient(160deg,#200800,#381200,#4a1800)' },
  { name: 'Muscat', country: 'Oman', region: 'Middle East', slug: 'muscat', gradient: 'linear-gradient(160deg,#141000,#221c00,#302600)' },
  { name: 'Wadi Rum', country: 'Jordan', region: 'Middle East', slug: 'wadi-rum', gradient: 'linear-gradient(160deg,#200500,#380a00,#4a1000)' },
  { name: 'Dead Sea', country: 'Jordan', region: 'Middle East', slug: 'dead-sea', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Abu Dhabi', country: 'UAE', region: 'Middle East', slug: 'abu-dhabi', gradient: 'linear-gradient(160deg,#180c00,#2c1800,#402400)' },
  { name: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', slug: 'riyadh', gradient: 'linear-gradient(160deg,#1c0e00,#2e1800,#422200)' },
  { name: 'Istanbul', country: 'Turkey', region: 'Middle East', slug: 'istanbul', gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#400030)' },
  { name: 'Cappadocia', country: 'Turkey', region: 'Middle East', slug: 'cappadocia', gradient: 'linear-gradient(160deg,#1e0800,#301400,#422000)' },
  { name: 'Doha', country: 'Qatar', region: 'Middle East', slug: 'doha', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Kuwait City', country: 'Kuwait', region: 'Middle East', slug: 'kuwait-city', gradient: 'linear-gradient(160deg,#1a1000,#2c1c00,#3e2800)' },
  { name: 'Bahrain', country: 'Bahrain', region: 'Middle East', slug: 'bahrain', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Tel Aviv', country: 'Israel', region: 'Middle East', slug: 'tel-aviv', gradient: 'linear-gradient(160deg,#001428,#001e3c,#002850)' },
  { name: 'Amman', country: 'Jordan', region: 'Middle East', slug: 'amman', gradient: 'linear-gradient(160deg,#180e00,#281800,#382200)' },
  { name: 'Beirut', country: 'Lebanon', region: 'Middle East', slug: 'beirut', gradient: 'linear-gradient(160deg,#200010,#340020,#480030)' },
  { name: 'Aqaba', country: 'Jordan', region: 'Middle East', slug: 'aqaba', gradient: 'linear-gradient(160deg,#001420,#001e30,#002840)' },

  // ── ASIA ──
  { name: 'Kyoto', country: 'Japan', region: 'Asia', slug: 'kyoto', gradient: 'linear-gradient(160deg,#200015,#380025,#4a0033)' },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', slug: 'bali', gradient: 'linear-gradient(160deg,#001a08,#002d10,#00401a)' },
  { name: 'Maldives', country: 'Maldives', region: 'Asia', slug: 'maldives', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Luang Prabang', country: 'Laos', region: 'Asia', slug: 'luang-prabang', gradient: 'linear-gradient(160deg,#200a00,#381600,#4a2008)' },
  { name: 'Ha Long Bay', country: 'Vietnam', region: 'Asia', slug: 'ha-long-bay', gradient: 'linear-gradient(160deg,#001018,#001a28,#002438)' },
  { name: 'Bhutan', country: 'Bhutan', region: 'Asia', slug: 'bhutan', gradient: 'linear-gradient(160deg,#0e1200,#182000,#202c00)' },
  { name: 'Tokyo', country: 'Japan', region: 'Asia', slug: 'tokyo', gradient: 'linear-gradient(160deg,#10001a,#1c0030,#280042)' },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia', slug: 'bangkok', gradient: 'linear-gradient(160deg,#1a0800,#2c1200,#401c00)' },
  { name: 'Singapore', country: 'Singapore', region: 'Asia', slug: 'singapore', gradient: 'linear-gradient(160deg,#001428,#001e40,#002858)' },
  { name: 'Phuket', country: 'Thailand', region: 'Asia', slug: 'phuket', gradient: 'linear-gradient(160deg,#001820,#002430,#003040)' },
  { name: 'Angkor Wat', country: 'Cambodia', region: 'Asia', slug: 'angkor-wat', gradient: 'linear-gradient(160deg,#1a0a00,#2c1600,#402000)' },
  { name: 'Kathmandu', country: 'Nepal', region: 'Asia', slug: 'kathmandu', gradient: 'linear-gradient(160deg,#0c1000,#141c00,#1e2800)' },
  { name: 'Sri Lanka', country: 'Sri Lanka', region: 'Asia', slug: 'sri-lanka', gradient: 'linear-gradient(160deg,#001c0a,#002c14,#003c1e)' },
  { name: 'Hoi An', country: 'Vietnam', region: 'Asia', slug: 'hoi-an', gradient: 'linear-gradient(160deg,#1c0a00,#2e1600,#422000)' },
  { name: 'Chiang Mai', country: 'Thailand', region: 'Asia', slug: 'chiang-mai', gradient: 'linear-gradient(160deg,#0e1600,#182400,#223000)' },
  { name: 'Osaka', country: 'Japan', region: 'Asia', slug: 'osaka', gradient: 'linear-gradient(160deg,#200015,#340025,#480035)' },
  { name: 'Hong Kong', country: 'Hong Kong', region: 'Asia', slug: 'hong-kong', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Seoul', country: 'South Korea', region: 'Asia', slug: 'seoul', gradient: 'linear-gradient(160deg,#001428,#001c3c,#002450)' },
  { name: 'Taipei', country: 'Taiwan', region: 'Asia', slug: 'taipei', gradient: 'linear-gradient(160deg,#0a0018,#140028,#1e003a)' },
  { name: 'Penang', country: 'Malaysia', region: 'Asia', slug: 'penang', gradient: 'linear-gradient(160deg,#1a0800,#2c1200,#401c00)' },
  { name: 'Langkawi', country: 'Malaysia', region: 'Asia', slug: 'langkawi', gradient: 'linear-gradient(160deg,#001a10,#002820,#003830)' },
  { name: 'Komodo', country: 'Indonesia', region: 'Asia', slug: 'komodo', gradient: 'linear-gradient(160deg,#0e1800,#182800,#223800)' },
  { name: 'Boracay', country: 'Philippines', region: 'Asia', slug: 'boracay', gradient: 'linear-gradient(160deg,#001c20,#002c30,#003c40)' },
  { name: 'Palawan', country: 'Philippines', region: 'Asia', slug: 'palawan', gradient: 'linear-gradient(160deg,#001820,#002430,#003040)' },
  { name: 'Delhi', country: 'India', region: 'Asia', slug: 'delhi', gradient: 'linear-gradient(160deg,#1c0800,#2e1200,#401c00)' },
  { name: 'Rajasthan', country: 'India', region: 'Asia', slug: 'rajasthan', gradient: 'linear-gradient(160deg,#240800,#3a1000,#501800)' },
  { name: 'Kerala', country: 'India', region: 'Asia', slug: 'kerala', gradient: 'linear-gradient(160deg,#001a08,#002a10,#003a1a)' },
  { name: 'Goa', country: 'India', region: 'Asia', slug: 'goa', gradient: 'linear-gradient(160deg,#001c14,#002c20,#003c2c)' },
  { name: 'Colombo', country: 'Sri Lanka', region: 'Asia', slug: 'colombo', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Hanoi', country: 'Vietnam', region: 'Asia', slug: 'hanoi', gradient: 'linear-gradient(160deg,#0a1000,#141c00,#1e2800)' },
  { name: 'Kuala Lumpur', country: 'Malaysia', region: 'Asia', slug: 'kuala-lumpur', gradient: 'linear-gradient(160deg,#001428,#001c40,#002458)' },
  { name: 'Bagan', country: 'Myanmar', region: 'Asia', slug: 'bagan', gradient: 'linear-gradient(160deg,#200c00,#341800,#482400)' },
  { name: 'Agra', country: 'India', region: 'Asia', slug: 'agra', gradient: 'linear-gradient(160deg,#1e1000,#301c00,#422800)' },
  { name: 'Mumbai', country: 'India', region: 'Asia', slug: 'mumbai', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Ubud', country: 'Indonesia', region: 'Asia', slug: 'ubud', gradient: 'linear-gradient(160deg,#001a08,#002a10,#003a1a)' },
  { name: 'Jeju Island', country: 'South Korea', region: 'Asia', slug: 'jeju', gradient: 'linear-gradient(160deg,#001428,#001c3c,#002450)' },

  // ── EUROPE ──
  { name: 'Amalfi Coast', country: 'Italy', region: 'Europe', slug: 'amalfi-coast', gradient: 'linear-gradient(160deg,#001428,#002040,#002c58)' },
  { name: 'Santorini', country: 'Greece', region: 'Europe', slug: 'santorini', gradient: 'linear-gradient(160deg,#00101e,#001830,#002040)' },
  { name: 'Dubrovnik', country: 'Croatia', region: 'Europe', slug: 'dubrovnik', gradient: 'linear-gradient(160deg,#000e18,#001828,#002238)' },
  { name: 'Cinque Terre', country: 'Italy', region: 'Europe', slug: 'cinque-terre', gradient: 'linear-gradient(160deg,#0d0018,#180028,#22003a)' },
  { name: 'Porto', country: 'Portugal', region: 'Europe', slug: 'porto', gradient: 'linear-gradient(160deg,#160800,#241400,#342000)' },
  { name: 'Paris', country: 'France', region: 'Europe', slug: 'paris', gradient: 'linear-gradient(160deg,#100014,#1c0022,#280030)' },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', slug: 'barcelona', gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#3e0030)' },
  { name: 'Rome', country: 'Italy', region: 'Europe', slug: 'rome', gradient: 'linear-gradient(160deg,#1a0800,#2c1200,#401c00)' },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe', slug: 'amsterdam', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Venice', country: 'Italy', region: 'Europe', slug: 'venice', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Prague', country: 'Czech Republic', region: 'Europe', slug: 'prague', gradient: 'linear-gradient(160deg,#0e0018,#180028,#220038)' },
  { name: 'Vienna', country: 'Austria', region: 'Europe', slug: 'vienna', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Lisbon', country: 'Portugal', region: 'Europe', slug: 'lisbon', gradient: 'linear-gradient(160deg,#1c0e00,#2e1800,#402200)' },
  { name: 'Edinburgh', country: 'Scotland', region: 'Europe', slug: 'edinburgh', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Reykjavik', country: 'Iceland', region: 'Europe', slug: 'reykjavik', gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)' },
  { name: 'Swiss Alps', country: 'Switzerland', region: 'Europe', slug: 'swiss-alps', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Mykonos', country: 'Greece', region: 'Europe', slug: 'mykonos', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Corfu', country: 'Greece', region: 'Europe', slug: 'corfu', gradient: 'linear-gradient(160deg,#001828,#002440,#003058)' },
  { name: 'Mallorca', country: 'Spain', region: 'Europe', slug: 'mallorca', gradient: 'linear-gradient(160deg,#001c20,#002c32,#003c44)' },
  { name: 'Florence', country: 'Italy', region: 'Europe', slug: 'florence', gradient: 'linear-gradient(160deg,#1a0800,#2c1200,#401c00)' },
  { name: 'Seville', country: 'Spain', region: 'Europe', slug: 'seville', gradient: 'linear-gradient(160deg,#1e0800,#321200,#461c00)' },
  { name: 'Budapest', country: 'Hungary', region: 'Europe', slug: 'budapest', gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#3e0030)' },
  { name: 'Krakow', country: 'Poland', region: 'Europe', slug: 'krakow', gradient: 'linear-gradient(160deg,#0e0018,#180028,#220038)' },
  { name: 'Kotor', country: 'Montenegro', region: 'Europe', slug: 'kotor', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Tbilisi', country: 'Georgia', region: 'Europe', slug: 'tbilisi', gradient: 'linear-gradient(160deg,#1a0800,#2c1400,#3e2000)' },
  { name: 'Tuscany', country: 'Italy', region: 'Europe', slug: 'tuscany', gradient: 'linear-gradient(160deg,#1a0a00,#2c1600,#402200)' },
  { name: 'Madrid', country: 'Spain', region: 'Europe', slug: 'madrid', gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#400030)' },
  { name: 'Athens', country: 'Greece', region: 'Europe', slug: 'athens', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'London', country: 'United Kingdom', region: 'Europe', slug: 'london', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Berlin', country: 'Germany', region: 'Europe', slug: 'berlin', gradient: 'linear-gradient(160deg,#0e0018,#180028,#220038)' },
  { name: 'Copenhagen', country: 'Denmark', region: 'Europe', slug: 'copenhagen', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Tallinn', country: 'Estonia', region: 'Europe', slug: 'tallinn', gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)' },

  // ── AMERICAS ──
  { name: 'Patagonia', country: 'Argentina', region: 'Americas', slug: 'patagonia', gradient: 'linear-gradient(160deg,#001824,#002a3d,#003852)' },
  { name: 'Machu Picchu', country: 'Peru', region: 'Americas', slug: 'machu-picchu', gradient: 'linear-gradient(160deg,#060e00,#0c1c00,#122600)' },
  { name: 'Galapagos', country: 'Ecuador', region: 'Americas', slug: 'galapagos', gradient: 'linear-gradient(160deg,#001a14,#002822,#003430)' },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'Americas', slug: 'rio-de-janeiro', gradient: 'linear-gradient(160deg,#001e14,#003020,#00402a)' },
  { name: 'Banff', country: 'Canada', region: 'Americas', slug: 'banff', gradient: 'linear-gradient(160deg,#001828,#002240,#002c52)' },
  { name: 'New York', country: 'USA', region: 'Americas', slug: 'new-york', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Miami', country: 'USA', region: 'Americas', slug: 'miami', gradient: 'linear-gradient(160deg,#001c20,#002c32,#003c44)' },
  { name: 'Cancun', country: 'Mexico', region: 'Americas', slug: 'cancun', gradient: 'linear-gradient(160deg,#001c20,#002c32,#003c44)' },
  { name: 'Buenos Aires', country: 'Argentina', region: 'Americas', slug: 'buenos-aires', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Cartagena', country: 'Colombia', region: 'Americas', slug: 'cartagena', gradient: 'linear-gradient(160deg,#200a00,#341600,#482000)' },
  { name: 'Havana', country: 'Cuba', region: 'Americas', slug: 'havana', gradient: 'linear-gradient(160deg,#1e0800,#301200,#421c00)' },
  { name: 'Cusco', country: 'Peru', region: 'Americas', slug: 'cusco', gradient: 'linear-gradient(160deg,#0c1400,#162000,#202c00)' },
  { name: 'Mexico City', country: 'Mexico', region: 'Americas', slug: 'mexico-city', gradient: 'linear-gradient(160deg,#1a0010,#2c0020,#3e0030)' },
  { name: 'Vancouver', country: 'Canada', region: 'Americas', slug: 'vancouver', gradient: 'linear-gradient(160deg,#001c28,#002c3d,#003c52)' },
  { name: 'San Francisco', country: 'USA', region: 'Americas', slug: 'san-francisco', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Amazon', country: 'Brazil', region: 'Americas', slug: 'amazon', gradient: 'linear-gradient(160deg,#001a00,#002c00,#003c00)' },
  { name: 'Iguazu Falls', country: 'Argentina/Brazil', region: 'Americas', slug: 'iguazu', gradient: 'linear-gradient(160deg,#001c0e,#002c18,#003c22)' },
  { name: 'Torres del Paine', country: 'Chile', region: 'Americas', slug: 'torres-del-paine', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Salvador', country: 'Brazil', region: 'Americas', slug: 'salvador', gradient: 'linear-gradient(160deg,#1a0800,#2c1200,#401c00)' },
  { name: 'Tulum', country: 'Mexico', region: 'Americas', slug: 'tulum', gradient: 'linear-gradient(160deg,#001c14,#002c20,#003c2c)' },
  { name: 'Belize', country: 'Belize', region: 'Americas', slug: 'belize', gradient: 'linear-gradient(160deg,#001c10,#002c1a,#003c24)' },
  { name: 'Costa Rica', country: 'Costa Rica', region: 'Americas', slug: 'costa-rica', gradient: 'linear-gradient(160deg,#001c00,#002c00,#003c00)' },
  { name: 'Jamaica', country: 'Jamaica', region: 'Americas', slug: 'jamaica', gradient: 'linear-gradient(160deg,#001a00,#002a00,#003a00)' },
  { name: 'Barbados', country: 'Barbados', region: 'Americas', slug: 'barbados', gradient: 'linear-gradient(160deg,#001a14,#002820,#00382c)' },

  // ── ARCTIC & POLAR ──
  { name: 'Svalbard', country: 'Norway', region: 'Arctic', slug: 'svalbard', gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)' },
  { name: 'Faroe Islands', country: 'Denmark', region: 'Arctic', slug: 'faroe-islands', gradient: 'linear-gradient(160deg,#001220,#001c32,#002644)' },
  { name: 'Lofoten Islands', country: 'Norway', region: 'Arctic', slug: 'lofoten', gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)' },
  { name: 'Tromsø', country: 'Norway', region: 'Arctic', slug: 'tromso', gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)' },
  { name: 'Greenland', country: 'Greenland', region: 'Arctic', slug: 'greenland', gradient: 'linear-gradient(160deg,#001428,#001e40,#002858)' },
  { name: 'Antarctica', country: 'Antarctica', region: 'Arctic', slug: 'antarctica', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Alaska', country: 'USA', region: 'Arctic', slug: 'alaska', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Lapland', country: 'Finland', region: 'Arctic', slug: 'lapland', gradient: 'linear-gradient(160deg,#00082a,#001040,#001858)' },

  // ── PACIFIC ──
  { name: 'Queenstown', country: 'New Zealand', region: 'Pacific', slug: 'queenstown', gradient: 'linear-gradient(160deg,#001418,#001e28,#002838)' },
  { name: 'Fiji Islands', country: 'Fiji', region: 'Pacific', slug: 'fiji', gradient: 'linear-gradient(160deg,#001a10,#00281a,#003424)' },
  { name: 'Milford Sound', country: 'New Zealand', region: 'Pacific', slug: 'milford-sound', gradient: 'linear-gradient(160deg,#001c20,#002c30,#003c40)' },
  { name: 'Great Barrier Reef', country: 'Australia', region: 'Pacific', slug: 'great-barrier-reef', gradient: 'linear-gradient(160deg,#001c20,#002c30,#003c40)' },
  { name: 'Sydney', country: 'Australia', region: 'Pacific', slug: 'sydney', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Bora Bora', country: 'French Polynesia', region: 'Pacific', slug: 'bora-bora', gradient: 'linear-gradient(160deg,#001c20,#002c30,#003c40)' },
  { name: 'Tahiti', country: 'French Polynesia', region: 'Pacific', slug: 'tahiti', gradient: 'linear-gradient(160deg,#001c18,#002c24,#003c30)' },
  { name: 'Hawaii', country: 'USA', region: 'Pacific', slug: 'hawaii', gradient: 'linear-gradient(160deg,#001a10,#002a1a,#003a24)' },
  { name: 'Melbourne', country: 'Australia', region: 'Pacific', slug: 'melbourne', gradient: 'linear-gradient(160deg,#001428,#001e3d,#002852)' },
  { name: 'Vanuatu', country: 'Vanuatu', region: 'Pacific', slug: 'vanuatu', gradient: 'linear-gradient(160deg,#001c0e,#002c18,#003c22)' },
  { name: 'Cook Islands', country: 'Cook Islands', region: 'Pacific', slug: 'cook-islands', gradient: 'linear-gradient(160deg,#001c18,#002c24,#003c30)' },
  { name: 'Easter Island', country: 'Chile', region: 'Pacific', slug: 'easter-island', gradient: 'linear-gradient(160deg,#1a1200,#2a1e00,#3a2a00)' },
]

const packages = [
  { name: 'Desert & Dunes', dest: 'Dubai, UAE', duration: '7 nights', price: '$3,200', type: 'Luxury', region: 'Middle East' },
  { name: 'Great Migration', dest: 'Serengeti, Tanzania', duration: '10 nights', price: '$5,800', type: 'Safari', region: 'Africa' },
  { name: 'Northern Lights', dest: 'Svalbard, Norway', duration: '5 nights', price: '$5,500', type: 'Expedition', region: 'Arctic' },
  { name: 'Temple & Blossom', dest: 'Kyoto, Japan', duration: '8 nights', price: '$3,900', type: 'Cultural', region: 'Asia' },
  { name: 'End of the World', dest: 'Patagonia, Argentina', duration: '10 nights', price: '$4,800', type: 'Adventure', region: 'Americas' },
  { name: 'Spice Route', dest: 'Marrakech, Morocco', duration: '6 nights', price: '$2,400', type: 'Cultural', region: 'Africa' },
  { name: 'Ocean Horizon', dest: 'Maldives', duration: '7 nights', price: '$6,200', type: 'Luxury', region: 'Asia' },
  { name: 'Lost City Trek', dest: 'Machu Picchu, Peru', duration: '9 nights', price: '$3,600', type: 'Adventure', region: 'Americas' },
  { name: 'Island Escape', dest: 'Bali, Indonesia', duration: '10 nights', price: '$2,900', type: 'Retreat', region: 'Asia' },
  { name: 'Adriatic Dream', dest: 'Dubrovnik, Croatia', duration: '7 nights', price: '$3,100', type: 'Leisure', region: 'Europe' },
  { name: 'Rose-Red City', dest: 'Petra, Jordan', duration: '5 nights', price: '$2,700', type: 'Cultural', region: 'Middle East' },
  { name: 'Mediterranean Coast', dest: 'Amalfi, Italy', duration: '8 nights', price: '$4,100', type: 'Luxury', region: 'Europe' },
  { name: 'Gorilla Trek', dest: 'Rwanda', duration: '6 nights', price: '$4,600', type: 'Wildlife', region: 'Africa' },
  { name: 'Lights of Iceland', dest: 'Reykjavik, Iceland', duration: '6 nights', price: '$3,800', type: 'Expedition', region: 'Arctic' },
  { name: 'Tokyo Explorer', dest: 'Tokyo, Japan', duration: '9 nights', price: '$3,400', type: 'Cultural', region: 'Asia' },
  { name: 'Pyramids & Nile', dest: 'Cairo, Egypt', duration: '8 nights', price: '$2,800', type: 'Cultural', region: 'Africa' },
  { name: 'Thai Escape', dest: 'Phuket, Thailand', duration: '7 nights', price: '$2,100', type: 'Retreat', region: 'Asia' },
  { name: 'Safari & Beach', dest: 'Kenya & Zanzibar', duration: '12 nights', price: '$6,800', type: 'Combo', region: 'Africa' },
  { name: 'Greek Islands', dest: 'Santorini & Mykonos', duration: '9 nights', price: '$3,700', type: 'Leisure', region: 'Europe' },
  { name: 'Singapore Luxe', dest: 'Singapore', duration: '5 nights', price: '$2,500', type: 'Luxury', region: 'Asia' },
  { name: 'Andean Odyssey', dest: 'Cusco & Lima, Peru', duration: '10 nights', price: '$3,300', type: 'Adventure', region: 'Americas' },
  { name: 'Okavango Fly-In', dest: 'Botswana', duration: '7 nights', price: '$7,200', type: 'Safari', region: 'Africa' },
  { name: 'Romantic Paris', dest: 'Paris, France', duration: '5 nights', price: '$2,900', type: 'Romantic', region: 'Europe' },
  { name: 'Caribbean Cruise', dest: 'Barbados & Jamaica', duration: '10 nights', price: '$3,500', type: 'Cruise', region: 'Americas' },
  { name: 'Himalayan Base Camp', dest: 'Nepal', duration: '14 nights', price: '$4,200', type: 'Adventure', region: 'Asia' },
  { name: 'Angkor & Mekong', dest: 'Cambodia & Laos', duration: '11 nights', price: '$2,700', type: 'Cultural', region: 'Asia' },
  { name: 'Namibian Wilderness', dest: 'Namibia', duration: '9 nights', price: '$5,100', type: 'Safari', region: 'Africa' },
  { name: 'Rio Carnival', dest: 'Rio de Janeiro, Brazil', duration: '7 nights', price: '$3,000', type: 'Festival', region: 'Americas' },
]

const testimonials = [
  { name: 'Sarah M.', location: 'London, UK', text: 'The Patagonia expedition was flawlessly organised. Every detail was handled — from the remote trekking lodges to the private glacier tours.', rating: 5 },
  { name: 'Ahmed K.', location: 'Dubai, UAE', text: 'A truly luxurious experience. The team understood exactly what I needed — discretion, quality, and unforgettable moments.', rating: 5 },
  { name: 'Yuki T.', location: 'Tokyo, Japan', text: "Booked the Serengeti package and I'm still in awe. The great migration was beyond anything I imagined.", rating: 5 },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [showAllDest, setShowAllDest] = useState(false)
  const [showAllPkg, setShowAllPkg] = useState(false)

  const tabs = [
    { label: 'Flights', icon: '✈', fields: [{placeholder:'Flying from? e.g. Lagos, London',label:'FROM'},{placeholder:'Flying to? e.g. Dubai, Tokyo',label:'TO'},{placeholder:'Departure date',label:'DATE'},{placeholder:'No. of travellers',label:'GUESTS'}], cta: 'SEARCH FLIGHTS', isEsim: false },
    { label: 'Hotels', icon: '🏨', fields: [{placeholder:'City or destination',label:'DESTINATION'},{placeholder:'Check-in date',label:'CHECK IN'},{placeholder:'Check-out date',label:'CHECK OUT'},{placeholder:'No. of guests',label:'GUESTS'}], cta: 'SEARCH HOTELS', isEsim: false },
    { label: 'Packages', icon: '📦', fields: [{placeholder:'Flying from?',label:'FROM'},{placeholder:'Destination',label:'TO'},{placeholder:'Travel dates',label:'DATES'},{placeholder:'No. of travellers',label:'GUESTS'}], cta: 'SEARCH PACKAGES', isEsim: false },
    { label: 'Activities', icon: '🎯', fields: [{placeholder:'City or attraction',label:'DESTINATION'},{placeholder:'Date of activity',label:'DATE'},{placeholder:'No. of travellers',label:'GUESTS'},{placeholder:'e.g. tours, diving, hiking',label:'CATEGORY'}], cta: 'FIND ACTIVITIES', isEsim: false },
    { label: 'Car Rentals', icon: '🚗', fields: [{placeholder:'Pick-up location',label:'PICK UP'},{placeholder:'Drop-off location',label:'DROP OFF'},{placeholder:'Pick-up date',label:'DATE FROM'},{placeholder:'Return date',label:'DATE TO'}], cta: 'SEARCH CARS', isEsim: false },
    { label: 'Transfers', icon: '🚌', fields: [{placeholder:'From (airport / hotel)',label:'FROM'},{placeholder:'To (airport / hotel)',label:'TO'},{placeholder:'Date & time',label:'DATE'},{placeholder:'No. of passengers',label:'PASSENGERS'}], cta: 'FIND TRANSFERS', isEsim: false },
    { label: 'eSIM', icon: '📱', fields: [{placeholder:'Country you are visiting',label:'DESTINATION'},{placeholder:'Days needed',label:'DURATION'},{placeholder:'e.g. 5GB, 10GB, Unlimited',label:'DATA PLAN'},{placeholder:'No. of SIMs',label:'QUANTITY'}], cta: 'GET YOUR eSIM', isEsim: true },
  ]

  const visibleDest = showAllDest ? destinations : destinations.slice(0, 18)
  const visiblePkg = showAllPkg ? packages : packages.slice(0, 12)
  const currentTab = tabs[activeTab]

  const scrollToWidget = () => {
    const widget = document.getElementById('tpwl-search')
    if (widget) widget.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#0a0a08 0%,#12100a 25%,#0d1520 50%,#080c14 75%,#0a0a08 100%)' }} />
        <div className="orb" style={{ position: 'absolute', width: '50vw', maxWidth: 700, height: '50vw', maxHeight: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.08) 0%,transparent 70%)', top: -200, right: '5%', filter: 'blur(60px)', animation: 'float1 14s ease-in-out infinite' }} />
        <div className="orb" style={{ position: 'absolute', width: '40vw', maxWidth: 500, height: '40vw', maxHeight: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,60,120,0.12) 0%,transparent 70%)', bottom: '10%', left: '0%', filter: 'blur(60px)', animation: 'float2 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,1) 0%,rgba(8,8,7,0.4) 50%,transparent 100%)' }} />
        <div className="page-pad" style={{ position: 'relative', zIndex: 10, paddingBottom: 'clamp(80px,12vw,120px)', maxWidth: 900 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.35em', color: '#C8A96E', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 40, height: 1, background: '#C8A96E', display: 'inline-block' }} />
            LUXURY GLOBAL TRAVEL
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,10vw,9rem)', fontWeight: 300, lineHeight: 0.9, color: '#F5EFE4', marginBottom: 32, letterSpacing: '-0.01em' }}>
            The World<br/>
            <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Awaits</em><br/>
            You
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem,2vw,1.15rem)', color: 'rgba(245,239,228,0.80)', maxWidth: 480, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
            Bespoke journeys crafted for the discerning traveller. Six continents. Infinite stories. One platform.
          </p>
          <div className="hero-buttons">
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', background: '#C8A96E', color: '#080807', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>EXPLORE DESTINATIONS</Link>
            <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.8rem', letterSpacing: '0.25em', border: '1px solid rgba(200,169,110,0.5)', color: '#C8A96E', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>AI TRIP PLANNER</Link>
          </div>
        </div>
        <div className="stats-bar" style={{ borderTop: '1px solid rgba(200,169,110,0.1)', background: 'rgba(8,8,7,0.85)', backdropFilter: 'blur(8px)' }}>
          {[['194+','Countries'],['50K+','Travellers'],['2,400+','Packages'],['24/7','Support']].map(([num, label]) => (
            <div key={num} style={{ padding: 'clamp(16px,3vw,24px) clamp(16px,3vw,40px)', borderRight: '1px solid rgba(200,169,110,0.1)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 600, color: '#C8A96E' }}>{num}</div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.65)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH TABS */}
      <section style={{ background: '#0d0c0a', borderBottom: '1px solid rgba(200,169,110,0.12)' }} className="page-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 0' }}>
          <div style={{ display: 'flex', gap: 0, marginBottom: 28, borderBottom: '1px solid rgba(200,169,110,0.15)', overflowX: 'auto' }}>
            {tabs.map((tab, i) => (
              <button key={tab.label} onClick={() => setActiveTab(i)} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.14em', padding: '14px 16px', background: 'none', border: 'none', color: activeTab === i ? '#C8A96E' : 'rgba(245,239,228,0.60)', borderBottom: activeTab === i ? '2px solid #C8A96E' : '2px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>
                <span style={{ marginRight: 5 }}>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
          <div className="search-grid">
            {currentTab.fields.map(field => (
              <div key={field.label} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.22)', padding: '14px 18px' }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.62rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 6 }}>{field.label}</div>
                <input placeholder={field.placeholder} style={{ background: 'none', border: 'none', color: '#F5EFE4', fontSize: '0.9rem', width: '100%', outline: 'none' }} />
              </div>
            ))}
            {currentTab.isEsim ? (
              <Link href="/esim" style={{ background: '#C8A96E', color: '#080807', border: 'none', padding: '0 20px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.16em', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 56, whiteSpace: 'nowrap', fontWeight: 700 }}>
                {currentTab.cta}
              </Link>
            ) : (
              <button onClick={scrollToWidget} style={{ background: '#C8A96E', color: '#080807', border: 'none', padding: '0 20px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.78rem', letterSpacing: '0.16em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 56, whiteSpace: 'nowrap', fontWeight: 700 }}>
                {currentTab.cta}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="section-pad page-pad" style={{ background: '#080807' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="dest-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>194 DESTINATIONS WORLDWIDE</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 300, color: '#F5EFE4', lineHeight: 1 }}>
                Iconic <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Destinations</em>
              </h2>
            </div>
            <Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(245,239,228,0.70)', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 4, whiteSpace: 'nowrap' }}>VIEW ALL 194 →</Link>
          </div>
          <div className="dest-grid">
            {visibleDest.map((dest, i) => (
              <Link key={dest.slug} href={`/destinations/${dest.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', aspectRatio: i < 2 ? '4/3' : '4/5', overflow: 'hidden', background: dest.gradient, minHeight: 160 }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(8,8,7,0.92) 0%,rgba(8,8,7,0.2) 65%,transparent 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(14px,2.5vw,28px)' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', color: '#C8A96E', marginBottom: 6 }}>{dest.region}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: i === 0 ? 'clamp(1.8rem,4vw,3rem)' : 'clamp(1.15rem,2.5vw,1.65rem)', fontWeight: 600, color: '#F5EFE4', lineHeight: 1.1 }}>{dest.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(245,239,228,0.70)', marginTop: 5 }}>{dest.country}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={() => setShowAllDest(v => !v)} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', color: '#C8A96E', background: 'none', border: '1px solid rgba(200,169,110,0.4)', padding: '14px 40px', cursor: 'pointer', marginBottom: 16 }}>
              {showAllDest ? 'SHOW LESS ↑' : `SHOW ALL ${destinations.length} DESTINATIONS ↓`}
            </button>
            <div><Link href="/destinations" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.55)', textDecoration: 'none' }}>Browse all 194 destinations →</Link></div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section-pad page-pad" style={{ background: '#0d0c0a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>HANDPICKED FOR YOU</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 300, color: '#F5EFE4' }}>
              Featured <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Packages</em>
            </h2>
          </div>
          <div className="pkg-grid">
            {visiblePkg.map(pkg => (
              <div key={pkg.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.12)', padding: 'clamp(20px,2.5vw,28px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em', color: '#C8A96E', border: '1px solid rgba(200,169,110,0.35)', display: 'inline-block', padding: '4px 10px' }}>{pkg.type}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.45)' }}>{pkg.region}</div>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.15rem,2vw,1.45rem)', fontWeight: 600, color: '#F5EFE4', marginBottom: 8, lineHeight: 1.2 }}>{pkg.name}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(245,239,228,0.70)', marginBottom: 4 }}>{pkg.dest}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.45)', marginBottom: 22 }}>{pkg.duration}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(200,169,110,0.1)', paddingTop: 16 }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(245,239,228,0.45)', fontFamily: "'Bebas Neue',sans-serif", letterSpacing: '0.1em' }}>FROM</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 600, color: '#C8A96E' }}>{pkg.price}</div>
                  </div>
                  <Link href="/packages" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C8A96E', textDecoration: 'none', borderBottom: '1px solid rgba(200,169,110,0.4)', paddingBottom: 2 }}>VIEW →</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={() => setShowAllPkg(v => !v)} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', color: '#C8A96E', background: 'none', border: '1px solid rgba(200,169,110,0.4)', padding: '14px 40px', cursor: 'pointer', marginBottom: 16 }}>
              {showAllPkg ? 'SHOW LESS ↑' : `SEE ALL ${packages.length} PACKAGES ↓`}
            </button>
            <div><Link href="/packages" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(245,239,228,0.55)', textDecoration: 'none' }}>Browse all packages →</Link></div>
          </div>
        </div>
      </section>

      {/* AI PROMO */}
      <section className="section-pad page-pad" style={{ background: '#080807', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ position: 'absolute', width: '50vw', maxWidth: 600, height: '50vw', maxHeight: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 16 }}>POWERED BY AI</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,5rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 24, lineHeight: 1.1 }}>
            Your Perfect Itinerary,<br/><em style={{ color: '#C8A96E' }}>Generated in Seconds</em>
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.75)', lineHeight: 1.8, marginBottom: 48, fontSize: 'clamp(0.9rem,2vw,1rem)' }}>
            Tell us where you dream of going, your budget, and how you like to travel. Our AI builds a fully personalised day-by-day itinerary — flights, hotels, activities, and hidden gems included.
          </p>
          <Link href="/ai-planner" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.85rem', letterSpacing: '0.25em', background: '#C8A96E', color: '#080807', padding: '18px 48px', textDecoration: 'none', display: 'inline-block' }}>
            TRY THE AI PLANNER FREE
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad page-pad" style={{ background: '#0d0c0a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>TRAVELLER STORIES</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 300, color: '#F5EFE4' }}>
              Words from the <em style={{ fontStyle: 'italic', color: '#C8A96E' }}>Road</em>
            </h2>
          </div>
          <div className="test-grid">
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#1C1B18', border: '1px solid rgba(200,169,110,0.1)', padding: 'clamp(24px,3vw,40px)' }}>
                <div style={{ color: '#C8A96E', fontSize: '1.2rem', marginBottom: 24 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'rgba(245,239,228,0.92)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 32 }}>"{t.text}"</p>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#F5EFE4' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245,239,228,0.55)', marginTop: 4 }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAVELPAYOUTS WIDGET */}
      <section className="section-pad page-pad" style={{ background: '#111110', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 12 }}>SEARCH & BOOK LIVE</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 8 }}>Flights, Hotels & More</h2>
            <p style={{ color: 'rgba(245,239,228,0.65)', fontSize: '0.9rem' }}>Live prices — book without leaving huuboi.com</p>
          </div>
          <div id="tpwl-search"></div>
          <div id="tpwl-tickets"></div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="contact" className="section-pad page-pad" style={{ background: '#080807', borderTop: '1px solid rgba(200,169,110,0.1)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#C8A96E', marginBottom: 16 }}>STAY INSPIRED</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3.5rem)', fontWeight: 300, color: '#F5EFE4', marginBottom: 16 }}>
            Travel <em style={{ color: '#C8A96E' }}>Intelligence</em> — Delivered
          </h2>
          <p style={{ color: 'rgba(245,239,228,0.70)', marginBottom: 40, fontSize: '0.9rem', lineHeight: 1.7 }}>Exclusive deals, destination guides, and curated travel insights. No spam — only wanderlust.</p>
          <div className="newsletter-row">
            <input type="email" placeholder="Your email address" style={{ flex: 1, background: '#1C1B18', border: '1px solid rgba(200,169,110,0.25)', borderRight: 'none', color: '#F5EFE4', padding: '16px 24px', fontSize: '0.9rem', outline: 'none', minWidth: 0 }} />
            <button style={{ background: '#C8A96E', color: '#080807', border: 'none', padding: '0 28px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.75rem', letterSpacing: '0.2em', cursor: 'pointer', whiteSpace: 'nowrap' }}>SUBSCRIBE</button>
          </div>
        </div>
      </section>
    </>
  )
}

