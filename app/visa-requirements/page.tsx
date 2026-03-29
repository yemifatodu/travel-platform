'use client'
import { useState } from 'react'
import Link from 'next/link'

const gold = '#C8A96E'
const cream = '#F5EFE4'
const muted = 'rgba(245,239,228,0.60)'
const dim = 'rgba(245,239,228,0.35)'

const regions = ['All', 'Africa', 'Middle East', 'Asia', 'Europe', 'Americas', 'Pacific']

const countries = [
  // ── AFRICA ──────────────────────────────────────────────────────────────
  { country:'Kenya', region:'Africa', flag:'🇰🇪', capital:'Nairobi', currency:'KES', language:'English, Swahili',
    visaTypes:[{type:'e-Visa',cost:'$51',duration:'90 days',processing:'3–5 days'},{type:'Visa on Arrival',cost:'$51',duration:'90 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds ($50/day)','Yellow fever certificate (if from endemic country)'],
    vaccinations:['Yellow Fever (required from endemic countries)','Malaria prophylaxis (strongly recommended)','Hepatitis A & B','Typhoid'],
    tips:'Kenya eVisa is quick at evisa.go.ke. The East Africa Tourist Visa ($100) also covers Uganda and Rwanda — excellent value for multi-country trips.',
    bestTime:'Jul–Oct · Jan–Mar', flightTime:'~8h from London · ~4h from Lagos' },

  { country:'Tanzania', region:'Africa', flag:'🇹🇿', capital:'Dar es Salaam', currency:'TZS', language:'Swahili, English',
    visaTypes:[{type:'e-Visa',cost:'$50',duration:'90 days',processing:'5–7 days'},{type:'Visa on Arrival',cost:'$50',duration:'90 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (MANDATORY)','Sufficient funds'],
    vaccinations:['Yellow Fever (MANDATORY)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Rabies (if trekking)'],
    tips:'Yellow fever certificate is strictly required — you will be turned away without it. Apply for eVisa at immigration.go.tz. Zanzibar uses the same visa as mainland Tanzania.',
    bestTime:'Jul–Oct · Dec–Mar', flightTime:'~9h from London · ~5h from Dubai' },

  { country:'South Africa', region:'Africa', flag:'🇿🇦', capital:'Cape Town / Pretoria', currency:'ZAR', language:'English + 10 official languages',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'Varies',duration:'90 days',processing:'10–15 days'}],
    requirements:['Valid passport (30 days beyond stay)','Return ticket','Proof of accommodation','Sufficient funds','2 blank visa pages in passport'],
    vaccinations:['Yellow Fever (if arriving from endemic country)','Hepatitis A & B','Typhoid','Malaria prophylaxis (Kruger/Limpopo only)'],
    tips:'Most Western passport holders enter visa-free for up to 90 days. Nigerian and many African passport holders require a visa — apply at least 6 weeks ahead. Passport must have 2 blank pages.',
    bestTime:'May–Sep (Safari) · Oct–Apr (Cape Town)', flightTime:'~11h from London · ~8h from Dubai' },

  { country:'Morocco', region:'Africa', flag:'🇲🇦', capital:'Rabat', currency:'MAD', language:'Arabic, French, Amazigh',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$45',duration:'90 days',processing:'5–10 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (if rural travel)'],
    tips:'EU, US, UK and many other passport holders enter Morocco visa-free. Morocco has excellent tourist infrastructure and is very accessible.',
    bestTime:'Mar–May · Sep–Nov', flightTime:'~3h from London · ~6h from Lagos' },

  { country:'Nigeria', region:'Africa', flag:'🇳🇬', capital:'Abuja', currency:'NGN', language:'English + 500+ local languages',
    visaTypes:[{type:'e-Visa',cost:'$42–160',duration:'30–90 days',processing:'48h–5 days'},{type:'Visa on Arrival',cost:'$82',duration:'30 days',processing:'On arrival (select nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Hotel booking confirmation','Bank statement','Yellow fever certificate (MANDATORY)','Invitation letter (business)'],
    vaccinations:['Yellow Fever (MANDATORY — no exceptions)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Meningitis'],
    tips:'Yellow fever certificate is absolutely mandatory — carry the physical yellow card. Apply for eVisa at portal.immigration.gov.ng. Apply at least 3 weeks ahead. Visa on Arrival available for select nationalities at Lagos and Abuja.',
    bestTime:'Nov–Feb', flightTime:'~6h from London · ~7h from Dubai' },

  { country:'Rwanda', region:'Africa', flag:'🇷🇼', capital:'Kigali', currency:'RWF', language:'Kinyarwanda, English, French',
    visaTypes:[{type:'Visa on Arrival',cost:'$30',duration:'30 days',processing:'On arrival'},{type:'e-Visa',cost:'$30',duration:'30 days',processing:'3–5 days'},{type:'Visa-Free',cost:'Free',duration:'30 days',processing:'Select African passports'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (recommended)','Gorilla trekking permit if applicable'],
    vaccinations:['Yellow Fever (recommended)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Rabies (gorilla trekking)'],
    tips:'One of Africa\'s easiest countries to visit. Gorilla trekking permit ($1,500) must be booked separately through Rwanda Development Board months in advance.',
    bestTime:'Jun–Sep · Dec–Feb', flightTime:'~8h from London · ~5h from Dubai' },

  { country:'Ghana', region:'Africa', flag:'🇬🇭', capital:'Accra', currency:'GHS', language:'English',
    visaTypes:[{type:'e-Visa',cost:'$60–150',duration:'30–60 days',processing:'5 days'},{type:'Visa Required',cost:'Varies',duration:'30–60 days',processing:'5–10 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (MANDATORY)','Bank statement'],
    vaccinations:['Yellow Fever (MANDATORY)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Meningitis'],
    tips:'Apply through Ghana Immigration Service portal. Yellow fever certificate mandatory. Accra is one of West Africa\'s most visitor-friendly capitals.',
    bestTime:'Nov–Mar', flightTime:'~6h from London · ~8h from Dubai' },

  { country:'Egypt', region:'Africa', flag:'🇪🇬', capital:'Cairo', currency:'EGP', language:'Arabic',
    visaTypes:[{type:'e-Visa',cost:'$25',duration:'30 days',processing:'Instant–72h'},{type:'Visa on Arrival',cost:'$25',duration:'30 days',processing:'On arrival'},{type:'Visa-Free',cost:'Free',duration:'30 days',processing:'Select nationalities'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','No mandatory vaccinations'],
    tips:'Egypt eVisa at visa2egypt.gov.eg is fast and simple. Most nationalities get visa on arrival at Cairo airport. Egypt is one of the most visited destinations in Africa — infrastructure is well-developed.',
    bestTime:'Oct–Apr', flightTime:'~5h from London · ~3h from Dubai' },

  { country:'Ethiopia', region:'Africa', flag:'🇪🇹', capital:'Addis Ababa', currency:'ETB', language:'Amharic, English',
    visaTypes:[{type:'e-Visa',cost:'$52',duration:'30 days',processing:'3 days'},{type:'Visa on Arrival',cost:'$52',duration:'30 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (if from endemic country)','Sufficient funds'],
    vaccinations:['Yellow Fever (required from endemic countries)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Rabies (if trekking)'],
    tips:'Ethiopia eVisa available at evisa.gov.et. Addis Ababa is a major African hub — many use it as a stopover. Ethiopian Airlines is one of Africa\'s finest carriers.',
    bestTime:'Oct–Feb', flightTime:'~8h from London · ~4h from Dubai' },

  { country:'Senegal', region:'Africa', flag:'🇸🇳', capital:'Dakar', currency:'XOF', language:'French, Wolof',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$50',duration:'90 days',processing:'5–7 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (MANDATORY)','Sufficient funds'],
    vaccinations:['Yellow Fever (MANDATORY)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Meningitis'],
    tips:'Senegal is one of West Africa\'s most welcoming and stable destinations. Dakar has a vibrant arts scene and excellent food. Yellow fever strictly required.',
    bestTime:'Nov–May', flightTime:'~6h from London · ~8h from Dubai' },

  { country:'Ivory Coast', region:'Africa', flag:'🇨🇮', capital:'Abidjan', currency:'XOF', language:'French',
    visaTypes:[{type:'e-Visa',cost:'$73',duration:'90 days',processing:'72h'},{type:'Visa Required',cost:'$73',duration:'90 days',processing:'5–7 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (MANDATORY)','Bank statement'],
    vaccinations:['Yellow Fever (MANDATORY)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Meningitis'],
    tips:'Apply for eVisa at snedai.net. Yellow fever mandatory. Abidjan is West Africa\'s most cosmopolitan city with excellent French-influenced cuisine and nightlife.',
    bestTime:'Nov–Apr', flightTime:'~6h from London' },

  { country:'Uganda', region:'Africa', flag:'🇺🇬', capital:'Kampala', currency:'UGX', language:'English, Swahili',
    visaTypes:[{type:'e-Visa',cost:'$50',duration:'90 days',processing:'3–5 days'},{type:'East Africa Tourist Visa',cost:'$100',duration:'90 days',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (MANDATORY)','Sufficient funds'],
    vaccinations:['Yellow Fever (MANDATORY)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Rabies (gorilla trekking)'],
    tips:'The East Africa Tourist Visa covers Uganda, Kenya and Rwanda — superb value. Gorilla trekking permits ($700) available through Uganda Wildlife Authority. Apply well in advance.',
    bestTime:'Jun–Sep · Dec–Feb', flightTime:'~9h from London · ~5h from Dubai' },

  { country:'Botswana', region:'Africa', flag:'🇧🇼', capital:'Gaborone', currency:'BWP', language:'English, Setswana',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Malaria prophylaxis (Okavango/Chobe — essential)','Hepatitis A & B','Typhoid'],
    tips:'Botswana is visa-free for most nationalities including UK, US, EU and many African countries. One of Africa\'s most politically stable and well-governed destinations. Fly-in safaris are the primary way to access the Okavango.',
    bestTime:'May–Oct', flightTime:'~11h from London · ~8h from Dubai' },

  { country:'Namibia', region:'Africa', flag:'🇳🇦', capital:'Windhoek', currency:'NAD', language:'English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$40',duration:'90 days',processing:'5–10 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Malaria prophylaxis (north only)','Hepatitis A & B','Typhoid'],
    tips:'Namibia is visa-free for UK, US, EU, South African and most visitors. Self-drive safari is popular and well-supported. The Namib Desert and Sossusvlei dunes are world-class.',
    bestTime:'May–Oct', flightTime:'~11h from London' },

  { country:'Zimbabwe', region:'Africa', flag:'🇿🇼', capital:'Harare', currency:'USD', language:'English + 16 official languages',
    visaTypes:[{type:'Visa on Arrival',cost:'$30–75',duration:'30–90 days',processing:'On arrival'},{type:'KAZA UniVisa',cost:'$50',duration:'30 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds ($50/day)'],
    vaccinations:['Yellow Fever (if from endemic country)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid'],
    tips:'The KAZA UniVisa covers Zimbabwe and Zambia — ideal for Victoria Falls visits from both sides. Available on arrival at Victoria Falls and Kazungula border posts.',
    bestTime:'Apr–Oct', flightTime:'~10h from London' },

  { country:'Zambia', region:'Africa', flag:'🇿🇲', capital:'Lusaka', currency:'ZMW', language:'English',
    visaTypes:[{type:'Visa on Arrival',cost:'$50',duration:'90 days',processing:'On arrival'},{type:'KAZA UniVisa',cost:'$50',duration:'30 days',processing:'On arrival'},{type:'e-Visa',cost:'$50',duration:'90 days',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (recommended)','Sufficient funds'],
    vaccinations:['Yellow Fever (recommended)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid'],
    tips:'Zambia offers the most dramatic views of Victoria Falls on the Zambian side. The KAZA UniVisa also covers Zimbabwe. South Luangwa National Park is one of Africa\'s finest wildlife destinations.',
    bestTime:'May–Oct', flightTime:'~10h from London' },

  { country:'Mozambique', region:'Africa', flag:'🇲🇿', capital:'Maputo', currency:'MZN', language:'Portuguese, English',
    visaTypes:[{type:'Visa on Arrival',cost:'$50–100',duration:'30 days',processing:'On arrival'},{type:'e-Visa',cost:'$50',duration:'30 days',processing:'5–7 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (if from endemic country)','Sufficient funds'],
    vaccinations:['Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Yellow Fever (if from endemic country)'],
    tips:'Mozambique has stunning Indian Ocean beaches and is far less visited than neighbouring South Africa. The Bazaruto Archipelago is world-class for diving. Apply for eVisa at evisa.gov.mz.',
    bestTime:'Apr–Oct', flightTime:'~11h from London' },

  { country:'Mauritius', region:'Africa', flag:'🇲🇺', capital:'Port Louis', currency:'MUR', language:'English, French, Creole',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'60–180 days',processing:'On arrival (most nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Mauritius is visa-free for virtually all nationalities for 60–180 days depending on passport. One of the most accessible island destinations — sophisticated infrastructure and world-class resorts.',
    bestTime:'May–Dec', flightTime:'~11h from London · ~6h from Dubai' },

  { country:'Seychelles', region:'Africa', flag:'🇸🇨', capital:'Victoria', currency:'SCR', language:'English, French, Creole',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30 days (extendable)',processing:'All nationalities on arrival'}],
    requirements:['Valid passport','Return ticket','Confirmed accommodation','Proof of funds ($150/day)'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Seychelles grants free visa on arrival to ALL nationalities — one of very few countries in the world to do so. Simply show your return ticket and accommodation booking.',
    bestTime:'Apr–May · Oct–Nov', flightTime:'~10h from London · ~5h from Dubai' },

  { country:'Madagascar', region:'Africa', flag:'🇲🇬', capital:'Antananarivo', currency:'MGA', language:'Malagasy, French',
    visaTypes:[{type:'Visa on Arrival',cost:'$35–80',duration:'30–90 days',processing:'On arrival'},{type:'e-Visa',cost:'$35–80',duration:'30–90 days',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (if from endemic country)','Sufficient funds'],
    vaccinations:['Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Rabies (if visiting rural areas)'],
    tips:'Madagascar is visa on arrival for most nationalities. An extraordinary destination — 90% of wildlife found nowhere else on earth. Tourism infrastructure is developing but improving rapidly.',
    bestTime:'Apr–Oct', flightTime:'~11h from London' },

  { country:'Tunisia', region:'Africa', flag:'🇹🇳', capital:'Tunis', currency:'TND', language:'Arabic, French',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$30',duration:'90 days',processing:'5–7 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid'],
    tips:'Tunisia is visa-free for EU, UK, US and most nationalities. An underrated Mediterranean gem combining Roman ruins, Sahara desert and beach resorts. Excellent value for money.',
    bestTime:'Mar–May · Sep–Oct', flightTime:'~2.5h from London' },

  { country:'Cameroon', region:'Africa', flag:'🇨🇲', capital:'Yaoundé', currency:'XAF', language:'French, English',
    visaTypes:[{type:'e-Visa',cost:'$92',duration:'90 days',processing:'72h'},{type:'Visa Required',cost:'$92',duration:'90 days',processing:'5–10 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (MANDATORY)','Bank statement'],
    vaccinations:['Yellow Fever (MANDATORY)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Meningitis'],
    tips:'Apply for Cameroon eVisa at evisacameroon.com. Yellow fever certificate is strictly mandatory. Cameroon is known as "Africa in miniature" — beaches, rainforest, savannah and Mount Cameroon all in one country.',
    bestTime:'Nov–Feb', flightTime:'~6.5h from London' },

  { country:'Angola', region:'Africa', flag:'🇦🇴', capital:'Luanda', currency:'AOA', language:'Portuguese',
    visaTypes:[{type:'e-Visa',cost:'$80',duration:'30 days',processing:'5–7 days'},{type:'Visa Required',cost:'$80',duration:'30 days',processing:'10–15 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Yellow fever certificate (MANDATORY)','Bank statement','Travel insurance'],
    vaccinations:['Yellow Fever (MANDATORY)','Malaria prophylaxis (essential)','Hepatitis A & B','Typhoid','Meningitis'],
    tips:'Apply for Angola eVisa at smevisa.gov.ao. Yellow fever mandatory. Luanda is one of Africa\'s most expensive cities — budget accordingly. Primarily a business and oil industry destination.',
    bestTime:'May–Oct', flightTime:'~7h from London' },

  { country:'Malawi', region:'Africa', flag:'🇲🇼', capital:'Lilongwe', currency:'MWK', language:'English, Chichewa',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–90 days',processing:'On arrival (most nationalities)'},{type:'Visa on Arrival',cost:'$75',duration:'30 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Malaria prophylaxis (essential)','Yellow Fever (if from endemic country)','Hepatitis A & B','Typhoid'],
    tips:'Malawi is known as the "Warm Heart of Africa" — genuinely one of the friendliest countries on the continent. Lake Malawi is a world-class freshwater diving destination. Very budget-friendly.',
    bestTime:'May–Oct', flightTime:'~10h from London' },

  // ── MIDDLE EAST ──────────────────────────────────────────────────────────
  { country:'UAE (Dubai)', region:'Middle East', flag:'🇦🇪', capital:'Abu Dhabi', currency:'AED', language:'Arabic, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$75–90',duration:'30–90 days',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Most Western, Asian and many African passport holders enter UAE visa-free. Nigerian nationals can obtain visa on arrival or apply in advance. UAE is one of the world\'s easiest destinations to enter.',
    bestTime:'Nov–Mar', flightTime:'~7h from London · ~5h from Lagos' },

  { country:'Saudi Arabia', region:'Middle East', flag:'🇸🇦', capital:'Riyadh', currency:'SAR', language:'Arabic',
    visaTypes:[{type:'e-Visa (Saudi eVisa)',cost:'$130',duration:'1 year multiple entry',processing:'Instant–24h'},{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'Select nationalities'}],
    requirements:['Valid passport (6+ months)','Return ticket','Travel insurance (mandatory)','Proof of accommodation','Sufficient funds'],
    vaccinations:['Meningitis (MANDATORY for Hajj/Umrah)','Hepatitis A & B','Typhoid'],
    tips:'Saudi Arabia opened to tourism in 2019 and the eVisa covers 49+ nationalities instantly at visa.visitsaudi.com. Alcohol is prohibited. Dress modestly. An extraordinary emerging destination with world-class ancient sites including AlUla and Hegra.',
    bestTime:'Nov–Mar', flightTime:'~6h from London · ~2h from Dubai' },

  { country:'Jordan', region:'Middle East', flag:'🇯🇴', capital:'Amman', currency:'JOD', language:'Arabic, English',
    visaTypes:[{type:'Jordan Pass',cost:'$70–109',duration:'30 days',processing:'Online pre-purchase'},{type:'Visa on Arrival',cost:'$56',duration:'30 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid'],
    tips:'The Jordan Pass ($70–109) includes the visa AND Petra entry (normally $75) plus 40+ attractions. Buy at jordanpass.jo before you travel. Outstanding value.',
    bestTime:'Mar–May · Sep–Nov', flightTime:'~5h from London · ~3h from Dubai' },

  { country:'Turkey', region:'Middle East', flag:'🇹🇷', capital:'Ankara', currency:'TRY', language:'Turkish',
    visaTypes:[{type:'e-Visa',cost:'$50',duration:'90 days',processing:'Instant–24h'},{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'Select nationalities'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid'],
    tips:'Turkey eVisa at evisa.gov.tr is fast for most nationalities. Excellent value destination with world-class history in Istanbul and Cappadocia. Turkish Lira makes it very affordable for most international visitors.',
    bestTime:'Apr–Jun · Sep–Oct', flightTime:'~4h from London · ~3h from Dubai' },

  { country:'Qatar', region:'Middle East', flag:'🇶🇦', capital:'Doha', currency:'QAR', language:'Arabic, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–180 days',processing:'On arrival (100+ nationalities)'},{type:'Hayya Card',cost:'Free',duration:'Event-based',processing:'Online'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Qatar offers free visa on arrival for 100+ nationalities. A surprisingly sophisticated destination — world-class museums, desert safaris and fine dining. The National Museum of Qatar is unmissable.',
    bestTime:'Nov–Mar', flightTime:'~6.5h from London · ~5h from Lagos' },

  { country:'Kuwait', region:'Middle East', flag:'🇰🇼', capital:'Kuwait City', currency:'KWD', language:'Arabic, English',
    visaTypes:[{type:'e-Visa',cost:'$5–10',duration:'90 days',processing:'1–5 days'},{type:'Visa on Arrival',cost:'$10',duration:'90 days',processing:'On arrival (select nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Kuwait eVisa available at evisa.moi.gov.kw. A wealthy, modern Gulf state less visited than neighbours. Excellent shopping, traditional souks and a fascinating oil industry heritage.',
    bestTime:'Nov–Mar', flightTime:'~6h from London' },

  { country:'Bahrain', region:'Middle East', flag:'🇧🇭', capital:'Manama', currency:'BHD', language:'Arabic, English',
    visaTypes:[{type:'Visa on Arrival',cost:'$27',duration:'14 days',processing:'On arrival'},{type:'e-Visa',cost:'$27',duration:'14 days',processing:'Instant'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Bahrain eVisa at evisa.gov.bh is one of the fastest in the Gulf. Connected to Saudi Arabia by the King Fahd Causeway — can be combined in one trip. More liberal than other Gulf states.',
    bestTime:'Nov–Apr', flightTime:'~6h from London' },

  { country:'Israel', region:'Middle East', flag:'🇮🇱', capital:'Jerusalem / Tel Aviv', currency:'ILS', language:'Hebrew, Arabic, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'Varies',duration:'90 days',processing:'10–15 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds','Security interview at airport (standard)'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Israel entry can include extensive security questioning at the airport — allow extra time. Some nationalities face difficulties. Having an Israeli stamp can complicate entry to some Arab countries — consider requesting stamp on a separate paper.',
    bestTime:'Mar–May · Sep–Nov', flightTime:'~5h from London · ~3h from Dubai' },

  { country:'Oman', region:'Middle East', flag:'🇴🇲', capital:'Muscat', currency:'OMR', language:'Arabic, English',
    visaTypes:[{type:'e-Visa',cost:'$20',duration:'30 days',processing:'Instant–24h'},{type:'Visa on Arrival',cost:'$20',duration:'30 days',processing:'On arrival (select nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Oman eVisa available at evisa.rop.gov.om. Oman is Arabia\'s hidden gem — dramatic mountain landscapes, pristine beaches, ancient forts and genuine Arabian hospitality without the glitz of Dubai.',
    bestTime:'Oct–Apr', flightTime:'~7h from London · ~1.5h from Dubai' },

  // ── ASIA ──────────────────────────────────────────────────────────────────
  { country:'Japan', region:'Asia', flag:'🇯🇵', capital:'Tokyo', currency:'JPY', language:'Japanese',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'Varies',duration:'15–90 days',processing:'5–10 days'}],
    requirements:['Valid passport','Return ticket','Proof of accommodation','Sufficient funds','Completed arrival card'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)','Japanese Encephalitis (rural areas)'],
    tips:'Most Western passport holders enter visa-free for 90 days. Nigerian and many African nationals require a visa — apply with bank statements and itinerary. Japan is strict but fair.',
    bestTime:'Mar–May · Oct–Nov', flightTime:'~12h from London · ~9h from Dubai' },

  { country:'Bali (Indonesia)', region:'Asia', flag:'🇮🇩', capital:'Denpasar', currency:'IDR', language:'Bahasa Indonesia, Balinese',
    visaTypes:[{type:'Visa on Arrival',cost:'$35',duration:'30 days',processing:'On arrival'},{type:'e-Visa',cost:'$35',duration:'30 days',processing:'3–5 days'},{type:'Visa-Free',cost:'Free',duration:'30 days',processing:'Select nationalities'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds ($1,500 minimum)'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (long-term stay)'],
    tips:'Bali visa on arrival is quick and easy. Can be extended once for another 30 days at an immigration office. One of the world\'s most welcoming destinations.',
    bestTime:'Apr–Oct', flightTime:'~15h from London · ~8h from Dubai' },

  { country:'Thailand', region:'Asia', flag:'🇹🇭', capital:'Bangkok', currency:'THB', language:'Thai',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'60 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$35',duration:'60 days (extendable)',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of funds (20,000 THB)','Proof of accommodation'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (long stay)','Japanese Encephalitis (rural)','Malaria prophylaxis (border regions only)'],
    tips:'Thailand recently extended visa-free to 60 days for most nationalities. The Tourist Visa gives 60 days with one 30-day extension possible. A great first Southeast Asia destination.',
    bestTime:'Nov–Feb', flightTime:'~11h from London · ~6h from Dubai' },

  { country:'Maldives', region:'Asia', flag:'🇲🇻', capital:'Malé', currency:'USD widely accepted', language:'Dhivehi, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30 days (extendable to 90)',processing:'All nationalities on arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Confirmed resort booking','Sufficient funds ($100/day)'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'The Maldives grants free visa on arrival to ALL nationalities. Just show your resort booking and return ticket. Alcohol only available at resort islands — not local islands.',
    bestTime:'Nov–Apr', flightTime:'~10h from London · ~4h from Dubai' },

  { country:'Vietnam', region:'Asia', flag:'🇻🇳', capital:'Hanoi', currency:'VND', language:'Vietnamese',
    visaTypes:[{type:'e-Visa',cost:'$25',duration:'90 days',processing:'3 days'},{type:'Visa-Free',cost:'Free',duration:'30–45 days',processing:'Select nationalities'},{type:'Visa on Arrival',cost:'$25+service',duration:'30 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (rural)','Malaria prophylaxis (rural regions)','Japanese Encephalitis (rural)'],
    tips:'Vietnam eVisa at evisa.xuatnhapcanh.gov.vn covers all entry points for 90 days. Outstanding value destination — Ha Long Bay, Hoi An and Hanoi are world-class. Street food is extraordinary.',
    bestTime:'Feb–Apr · Aug–Oct', flightTime:'~11h from London · ~7h from Dubai' },

  { country:'Cambodia', region:'Asia', flag:'🇰🇭', capital:'Phnom Penh', currency:'USD widely used', language:'Khmer, English',
    visaTypes:[{type:'e-Visa',cost:'$36',duration:'30 days',processing:'3 days'},{type:'Visa on Arrival',cost:'$30',duration:'30 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','One passport photo','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (rural)','Malaria prophylaxis (jungle regions)'],
    tips:'Cambodia eVisa at evisa.gov.kh is simple and cheap. USD is widely accepted. Angkor Wat is the world\'s largest religious monument — allow at least 3 days to do it justice.',
    bestTime:'Nov–Mar', flightTime:'~12h from London · ~8h from Dubai' },

  { country:'Singapore', region:'Asia', flag:'🇸🇬', capital:'Singapore City', currency:'SGD', language:'English, Mandarin, Malay, Tamil',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$30',duration:'30 days',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds ($100/day)'],
    vaccinations:['No mandatory vaccinations','Hepatitis A (recommended)'],
    tips:'Singapore is visa-free for most nationalities. One of the world\'s safest, cleanest and most efficient cities. Changi Airport is the world\'s best — build in extra time just to explore it.',
    bestTime:'Feb–Apr', flightTime:'~13h from London · ~7h from Dubai' },

  { country:'Malaysia', region:'Asia', flag:'🇲🇾', capital:'Kuala Lumpur', currency:'MYR', language:'Bahasa Malaysia, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–90 days',processing:'On arrival (most nationalities)'},{type:'eNTRI',cost:'$20',duration:'15 days',processing:'Instant (India/China only)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','Malaria prophylaxis (Borneo interior)','Rabies (Borneo)'],
    tips:'Malaysia is visa-free for most nationalities including many African countries for 30–90 days. Kuala Lumpur is a world-class food city. Penang is Southeast Asia\'s food capital.',
    bestTime:'Mar–Oct (Peninsula) · Mar–Sep (Borneo)', flightTime:'~13h from London · ~7h from Dubai' },

  { country:'Philippines', region:'Asia', flag:'🇵🇭', capital:'Manila', currency:'PHP', language:'Filipino, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$30',duration:'59 days',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (rural)','Malaria prophylaxis (Palawan/Mindanao)'],
    tips:'Philippines is visa-free on arrival for most nationalities for 30 days, extendable at any Bureau of Immigration office. Palawan is consistently rated one of the world\'s most beautiful islands.',
    bestTime:'Nov–May', flightTime:'~13h from London · ~8h from Dubai' },

  { country:'Sri Lanka', region:'Asia', flag:'🇱🇰', capital:'Colombo', currency:'LKR', language:'Sinhala, Tamil, English',
    visaTypes:[{type:'ETA (Electronic Travel Auth)',cost:'$20–35',duration:'30 days',processing:'24–72h'},{type:'Visa on Arrival',cost:'$35',duration:'30 days',processing:'On arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds','ETA approval (recommended)'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (rural)','Malaria prophylaxis (north/east)'],
    tips:'Apply for Sri Lanka ETA at eta.gov.lk before travelling to avoid queues. Tea estates, ancient temples, beaches and wildlife in a compact island. Prices have become very competitive.',
    bestTime:'Dec–Mar (south/west) · May–Sep (north/east)', flightTime:'~10h from London · ~4h from Dubai' },

  { country:'Nepal', region:'Asia', flag:'🇳🇵', capital:'Kathmandu', currency:'NPR', language:'Nepali, English',
    visaTypes:[{type:'Visa on Arrival',cost:'$30–100',duration:'15–90 days',processing:'On arrival'},{type:'e-Visa',cost:'$30–100',duration:'15–90 days',processing:'3–5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Passport photo','Sufficient funds','Trekking permits (if applicable)'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies','Japanese Encephalitis','Altitude sickness medication (Everest region)'],
    tips:'Nepal visa on arrival is quick and easy at Tribhuvan Airport. Trekking permits (TIMS card + national park fee) required separately for Everest and Annapurna. One of the world\'s great adventure destinations.',
    bestTime:'Oct–Nov · Mar–Apr', flightTime:'~9h from London · ~5h from Dubai' },

  { country:'India', region:'Asia', flag:'🇮🇳', capital:'New Delhi', currency:'INR', language:'Hindi, English + 22 official languages',
    visaTypes:[{type:'e-Visa (eTV)',cost:'$25–80',duration:'30–365 days',processing:'72h–4 days'},{type:'Tourist Visa',cost:'$80',duration:'180 days',processing:'5–10 days'}],
    requirements:['Valid passport (6+ months from arrival)','Return ticket','Proof of accommodation','Sufficient funds','Passport photo'],
    vaccinations:['Hepatitis A & B','Typhoid','Malaria prophylaxis (rural areas)','Rabies (rural)','Japanese Encephalitis (rural)'],
    tips:'India eVisa (evisa.gov.in) is available for 168+ nationalities and covers tourism, business and medical visits. India is vast — plan one region at a time. Rajasthan and Kerala are the most rewarding first-time regions.',
    bestTime:'Oct–Mar', flightTime:'~8h from London · ~3h from Dubai' },

  { country:'China', region:'Asia', flag:'🇨🇳', capital:'Beijing', currency:'CNY', language:'Mandarin',
    visaTypes:[{type:'Tourist Visa (L Visa)',cost:'$140',duration:'30–90 days',processing:'4–7 days'},{type:'Transit Visa-Free',cost:'Free',duration:'72–144h',processing:'On arrival (select nationalities at select airports)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Bank statement','Detailed itinerary','Photo'],
    vaccinations:['Hepatitis A & B','Typhoid','Rabies (rural)','Japanese Encephalitis (rural)'],
    tips:'China requires a visa for most nationalities — apply through the Chinese Embassy in your country. The 144-hour transit visa-free allows a genuine city visit if transiting through Beijing, Shanghai or Guangzhou. A VPN is essential — many Western apps are blocked.',
    bestTime:'Apr–May · Sep–Oct', flightTime:'~10h from London · ~7h from Dubai' },

  { country:'South Korea', region:'Asia', flag:'🇰🇷', capital:'Seoul', currency:'KRW', language:'Korean, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30–90 days',processing:'On arrival (most nationalities)'},{type:'K-ETA',cost:'$10',duration:'2 years multiple entry',processing:'72h online'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'South Korea is visa-free for most nationalities. The K-ETA electronic travel authorisation ($10) is required for some nationalities before departure. Seoul is one of Asia\'s most dynamic cities — K-culture, food and technology.',
    bestTime:'Apr–Jun · Sep–Nov', flightTime:'~11h from London · ~8h from Dubai' },

  { country:'Hong Kong', region:'Asia', flag:'🇭🇰', capital:'Hong Kong', currency:'HKD', language:'Cantonese, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'14–90 days',processing:'On arrival (most nationalities)'}],
    requirements:['Valid passport (1 month beyond stay)','Return ticket','Sufficient funds'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Hong Kong is visa-free for most nationalities for 14–90 days depending on passport. Despite political changes, it remains one of Asia\'s great cities — extraordinary food scene, Victoria Peak views and harbour ferry crossings.',
    bestTime:'Oct–Mar', flightTime:'~12h from London · ~8h from Dubai' },

  { country:'Georgia', region:'Asia', flag:'🇬🇪', capital:'Tbilisi', currency:'GEL', language:'Georgian, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'365 days',processing:'On arrival (95+ nationalities)'},{type:'e-Visa',cost:'$20',duration:'30 days',processing:'5 days'}],
    requirements:['Valid passport (6+ months)','Return ticket or onward travel','Sufficient funds'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Georgia offers one of the world\'s most generous visa-free policies — 1 year for 95+ nationalities. An extraordinary value destination with stunning mountain scenery, ancient churches, famous wine and one of the world\'s great food cultures.',
    bestTime:'May–Oct', flightTime:'~5h from London · ~3h from Dubai' },

  { country:'Uzbekistan', region:'Asia', flag:'🇺🇿', capital:'Tashkent', currency:'UZS', language:'Uzbek, Russian',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30 days',processing:'On arrival (90+ nationalities)'},{type:'e-Visa',cost:'$20',duration:'30 days',processing:'3 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid'],
    tips:'Uzbekistan opened dramatically to tourism and now offers visa-free for 90+ nationalities. The Silk Road cities of Samarkand, Bukhara and Khiva are among the most spectacular ancient cities in the world.',
    bestTime:'Apr–Jun · Sep–Oct', flightTime:'~6h from London · ~3h from Dubai' },

  // ── EUROPE ──────────────────────────────────────────────────────────────
  { country:'France', region:'Europe', flag:'🇫🇷', capital:'Paris', currency:'EUR', language:'French',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements (3 months)','Sufficient funds (€65/day)'],
    vaccinations:['No mandatory vaccinations'],
    tips:'France is part of the Schengen Area — one visa covers 26 European countries. Nigerian and most African passports require a Schengen visa. Apply at least 3–4 weeks ahead. The Schengen visa allows 90 days in any 180-day period.',
    bestTime:'Apr–Jun · Sep–Oct', flightTime:'~2h from London · ~7h from Lagos' },

  { country:'Italy', region:'Europe', flag:'🇮🇹', capital:'Rome', currency:'EUR', language:'Italian',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements','Sufficient funds'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Same Schengen visa as France, Spain, Germany and 23 other countries. Italy has the world\'s most UNESCO World Heritage Sites. Apply for Schengen visa at the Italian Embassy or consulate in your country.',
    bestTime:'Apr–Jun · Sep–Oct', flightTime:'~2.5h from London · ~6h from Lagos' },

  { country:'Spain', region:'Europe', flag:'🇪🇸', capital:'Madrid', currency:'EUR', language:'Spanish',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements','Sufficient funds'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Schengen visa required for most African nationalities. Spain is the second most visited country in the world — book accommodation and popular attractions in advance especially for summer.',
    bestTime:'Apr–Jun · Sep–Oct', flightTime:'~2h from London · ~7h from Lagos' },

  { country:'Greece', region:'Europe', flag:'🇬🇷', capital:'Athens', currency:'EUR', language:'Greek',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements','Sufficient funds'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Apply for Schengen visa at the embassy of your main destination or first entry point. Greece is highly recommended — island hopping by ferry is one of the world\'s great travel experiences.',
    bestTime:'May–Jun · Sep–Oct', flightTime:'~3.5h from London · ~4h from Dubai' },

  { country:'United Kingdom', region:'Europe', flag:'🇬🇧', capital:'London', currency:'GBP', language:'English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'6 months',processing:'On arrival (many nationalities)'},{type:'Standard Visitor Visa',cost:'£115',duration:'6 months',processing:'3 weeks'},{type:'Electronic Travel Auth (ETA)',cost:'£10',duration:'Per trip',processing:'72h'}],
    requirements:['Valid passport','Return ticket','Proof of funds','Proof of accommodation','Strong ties to home country','Bank statements (3–6 months)'],
    vaccinations:['No mandatory vaccinations'],
    tips:'UK visa applications can be challenging for Nigerian and many African passport holders — strong evidence of home ties is essential. Apply 6–8 weeks ahead. The UK is no longer part of Schengen — it requires a separate visa.',
    bestTime:'May–Sep', flightTime:'~6.5h from Lagos · ~7h from Dubai' },

  { country:'Germany', region:'Europe', flag:'🇩🇪', capital:'Berlin', currency:'EUR', language:'German',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements','Sufficient funds (€45/day)'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Germany is Schengen — apply through the German Embassy. Germany is a great base for exploring Europe with excellent train connections. Munich, Berlin and Hamburg are all world-class cities.',
    bestTime:'May–Sep', flightTime:'~2h from London · ~6h from Lagos' },

  { country:'Portugal', region:'Europe', flag:'🇵🇹', capital:'Lisbon', currency:'EUR', language:'Portuguese',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements','Sufficient funds'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Portugal is one of Europe\'s best value destinations and consistently top-rated for quality of life. Lisbon and Porto are two of Europe\'s most beautiful cities. The Algarve has world-class beaches.',
    bestTime:'May–Oct', flightTime:'~2.5h from London · ~6h from Lagos' },

  { country:'Netherlands', region:'Europe', flag:'🇳🇱', capital:'Amsterdam', currency:'EUR', language:'Dutch, English',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements','Sufficient funds (€34/day)'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Netherlands is Schengen. Amsterdam is one of Europe\'s most cycle-friendly and beautiful cities. The Dutch are among the world\'s most English-speaking nations — communication is easy.',
    bestTime:'Apr–May · Sep–Oct', flightTime:'~1.5h from London' },

  { country:'Switzerland', region:'Europe', flag:'🇨🇭', capital:'Bern', currency:'CHF', language:'German, French, Italian',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance (€30,000 minimum)','Proof of accommodation','Bank statements','Sufficient funds (CHF 100/day minimum)'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Switzerland is Schengen despite not being in the EU. One of the world\'s most expensive destinations — budget carefully. The Swiss Alps are extraordinary year-round: skiing in winter, hiking in summer.',
    bestTime:'Jun–Sep · Dec–Mar', flightTime:'~2h from London' },

  { country:'Croatia', region:'Europe', flag:'🇭🇷', capital:'Zagreb', currency:'EUR', language:'Croatian',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Croatia joined Schengen in 2023. Dubrovnik is one of Europe\'s most beautiful walled cities. The Dalmatian Coast islands are spectacular in summer. Apply for Schengen at Croatian Embassy.',
    bestTime:'May–Jun · Sep–Oct', flightTime:'~2.5h from London' },

  { country:'Iceland', region:'Europe', flag:'🇮🇸', capital:'Reykjavik', currency:'ISK', language:'Icelandic, English',
    visaTypes:[{type:'Visa-Free (Schengen)',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance','Proof of accommodation','Sufficient funds (ISK 5,000/day minimum)'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Iceland is part of Schengen despite not being in the EU. One of the world\'s most expensive destinations — accommodation must be booked months ahead in peak season. Northern Lights best Sep–Mar.',
    bestTime:'Jun–Aug (Midnight Sun) · Sep–Mar (Northern Lights)', flightTime:'~3h from London' },

  { country:'Czech Republic', region:'Europe', flag:'🇨🇿', capital:'Prague', currency:'CZK', language:'Czech, English',
    visaTypes:[{type:'Visa-Free (EU/EEA/UK)',cost:'Free',duration:'90 days',processing:'On arrival'},{type:'Schengen Visa',cost:'€80',duration:'90 days in 180',processing:'15 business days'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Travel insurance','Proof of accommodation','Sufficient funds'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Czech Republic is Schengen. Prague is one of Europe\'s most beautiful and affordable capital cities. Well-connected by train to Vienna, Krakow and Berlin. Excellent beer culture.',
    bestTime:'Apr–Jun · Sep–Oct', flightTime:'~2h from London' },

  // ── AMERICAS ──────────────────────────────────────────────────────────────
  { country:'USA', region:'Americas', flag:'🇺🇸', capital:'Washington D.C.', currency:'USD', language:'English',
    visaTypes:[{type:'ESTA (Visa Waiver)',cost:'$21',duration:'90 days',processing:'72h online'},{type:'B1/B2 Tourist Visa',cost:'$185',duration:'10 years (multiple entry)',processing:'2–8 weeks + interview'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Bank statements','Strong ties to home country','DS-160 form (visa applicants)','In-person interview at US Embassy'],
    vaccinations:['No mandatory vaccinations'],
    tips:'ESTA for UK, EU, Japan, Australia and select nationalities. Most African nationals require B1/B2 tourist visa — apply at least 3 months ahead. US Embassy interview wait times can be long. Present strong financial and employment evidence.',
    bestTime:'Year-round (varies by city)', flightTime:'~9h from London · ~13h from Lagos' },

  { country:'Mexico', region:'Americas', flag:'🇲🇽', capital:'Mexico City', currency:'MXN', language:'Spanish',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'180 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'Varies',duration:'180 days',processing:'5–10 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','Malaria prophylaxis (jungle regions)'],
    tips:'Mexico is visa-free for US, UK, EU, Canadian and many other passport holders for up to 180 days. Fill in the FMM form on arrival and keep your stub — you must hand it in on departure.',
    bestTime:'Dec–Apr', flightTime:'~11h from London · ~5h from New York' },

  { country:'Brazil', region:'Americas', flag:'🇧🇷', capital:'Brasília', currency:'BRL', language:'Portuguese',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (many nationalities)'},{type:'e-Visa',cost:'$80',duration:'90 days',processing:'3–5 days'},{type:'Tourist Visa',cost:'$80',duration:'90 days',processing:'5–10 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds','Yellow fever certificate (Amazon regions)'],
    vaccinations:['Yellow Fever (required Amazon/some states)','Hepatitis A & B','Typhoid','Malaria prophylaxis (Amazon)'],
    tips:'Brazil expanded visa-free to US, UK, EU and Australian passport holders. Nigerian and most African nationals require an e-Visa at visto.mre.gov.br. Yellow fever mandatory if visiting the Amazon.',
    bestTime:'Dec–Mar (Carnival) · Jun–Sep (Dry)', flightTime:'~11h from London · ~9h from Lagos' },

  { country:'Argentina', region:'Americas', flag:'🇦🇷', capital:'Buenos Aires', currency:'ARS', language:'Spanish',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid','Yellow Fever (Iguazu/northeast regions)','Malaria prophylaxis (northeast border areas)'],
    tips:'Argentina is visa-free for most nationalities including UK, US, EU and many African countries. Buenos Aires is one of South America\'s great cities. Patagonia is unmissable for adventure travellers.',
    bestTime:'Nov–Mar (Patagonia) · Year-round (Buenos Aires)', flightTime:'~14h from London · ~12h from Lagos' },

  { country:'Colombia', region:'Americas', flag:'🇨🇴', capital:'Bogotá', currency:'COP', language:'Spanish',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'},{type:'Tourist Visa',cost:'$55',duration:'90 days',processing:'5–7 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds ($32/day)'],
    vaccinations:['Yellow Fever (required for Amazon/Chocó regions)','Hepatitis A & B','Typhoid','Malaria prophylaxis (coastal/jungle regions)'],
    tips:'Colombia is visa-free for most nationalities. One of South America\'s most transformed destinations — Cartagena, Medellín and the coffee region are all extraordinary. Medellín is now a top digital nomad hub.',
    bestTime:'Dec–Mar · Jul–Aug', flightTime:'~11h from London · ~10h from Lagos' },

  { country:'Peru', region:'Americas', flag:'🇵🇪', capital:'Lima', currency:'PEN', language:'Spanish, Quechua',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90–183 days',processing:'On arrival (most nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds ($50/day)'],
    vaccinations:['Yellow Fever (Amazon regions)','Hepatitis A & B','Typhoid','Malaria prophylaxis (Amazon)','Altitude sickness medication (Cusco/Machu Picchu)'],
    tips:'Peru is visa-free for most nationalities. Book Machu Picchu tickets at machupicchutickets.com months ahead — daily visitor limits mean they sell out. Acclimatise for 2 days in Cusco before any high-altitude hiking.',
    bestTime:'May–Sep', flightTime:'~12h from London' },

  { country:'Costa Rica', region:'Americas', flag:'🇨🇷', capital:'San José', currency:'CRC', language:'Spanish',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Sufficient funds ($100/day)','Proof of accommodation'],
    vaccinations:['Hepatitis A & B','Typhoid','Malaria prophylaxis (coastal regions)','Rabies (rural areas)'],
    tips:'Costa Rica is visa-free for most nationalities. The world leader in eco-tourism — 25% of the country is protected national park. Pura Vida lifestyle, world-class surf and extraordinary biodiversity.',
    bestTime:'Dec–Apr', flightTime:'~10h from London' },

  { country:'Cuba', region:'Americas', flag:'🇨🇺', capital:'Havana', currency:'CUP/USD', language:'Spanish',
    visaTypes:[{type:'Tourist Card (Pink Card)',cost:'$25–50',duration:'30 days (extendable)',processing:'Available from airlines/embassies'},{type:'Cuban Visa',cost:'$50',duration:'30 days',processing:'5–7 days'}],
    requirements:['Valid passport (6+ months)','Return ticket','Travel insurance (MANDATORY)','Proof of accommodation','Tourist card'],
    vaccinations:['Hepatitis A & B','Typhoid'],
    tips:'Cuba requires travel insurance — you may be asked to show proof at the airport. The Tourist Card (pink card) is often sold by airlines or travel agents. US citizens face separate and complex restrictions. Cash is essential — US bank cards do not work.',
    bestTime:'Nov–Apr', flightTime:'~9h from London' },

  { country:'Jamaica', region:'Americas', flag:'🇯🇲', capital:'Kingston', currency:'JMD', language:'English, Patois',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'90 days',processing:'On arrival (most nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds'],
    vaccinations:['Hepatitis A & B','Typhoid'],
    tips:'Jamaica is visa-free for most nationalities. Montego Bay and Negril are the main tourist hubs. Beyond the resorts, Jamaica has extraordinary music, food and natural beauty — Blue Mountains coffee is world-famous.',
    bestTime:'Dec–Apr', flightTime:'~9h from London' },

  // ── PACIFIC ──────────────────────────────────────────────────────────────
  { country:'Australia', region:'Pacific', flag:'🇦🇺', capital:'Canberra', currency:'AUD', language:'English',
    visaTypes:[{type:'ETA (Electronic Travel Auth)',cost:'AUD $20',duration:'12 months / 90 days per visit',processing:'Instant (most applications)'},{type:'eVisitor',cost:'Free',duration:'12 months / 90 days per visit',processing:'Instant (EU nationalities)'},{type:'Tourist Visa',cost:'AUD $150',duration:'12 months',processing:'2–8 weeks'}],
    requirements:['Valid passport (6+ months)','Return ticket','Sufficient funds','Health requirement (long stays)','Character requirement'],
    vaccinations:['No mandatory vaccinations','Hepatitis A & B (recommended)'],
    tips:'Australian ETA (app available) is instant for eligible passport holders. Nigerian and many African nationals require a Tourist Visa — apply at immi.homeaffairs.gov.au with bank statements and strong ties evidence. Australia is strict on visa applications.',
    bestTime:'Sep–Nov · Mar–May', flightTime:'~21h from London · ~13h from Dubai' },

  { country:'New Zealand', region:'Pacific', flag:'🇳🇿', capital:'Wellington', currency:'NZD', language:'English, Māori',
    visaTypes:[{type:'NZeTA',cost:'NZD $17–23',duration:'Multiple visits up to 3 years',processing:'72h online'},{type:'Visitor Visa',cost:'NZD $211',duration:'9 months',processing:'3–6 weeks'}],
    requirements:['Valid passport (3 months beyond stay)','Return ticket','Sufficient funds (NZD $1,000/month)','Onward travel','IVL (International Visitor Conservation Levy) NZD $35'],
    vaccinations:['No mandatory vaccinations'],
    tips:'NZeTA required for visa-waiver countries before boarding. Most nationalities need a Visitor Visa — apply online at immigration.govt.nz. New Zealand is one of the world\'s most beautiful countries — Queenstown and Milford Sound are unmissable.',
    bestTime:'Dec–Mar (Summer) · Jun–Aug (Skiing)', flightTime:'~24h from London · ~16h from Dubai' },

  { country:'Fiji', region:'Pacific', flag:'🇫🇯', capital:'Suva', currency:'FJD', language:'English, Fijian, Hindi',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'4 months',processing:'On arrival (most nationalities)'}],
    requirements:['Valid passport (6+ months)','Return ticket','Proof of accommodation','Sufficient funds (FJD $200/week)'],
    vaccinations:['Hepatitis A & B','Typhoid'],
    tips:'Fiji is visa-free for most nationalities for 4 months — one of the most generous policies in the Pacific. The outer islands (Yasawa Group) are reached by seaplane or ferry from Nadi. Exceptional diving and a famously warm local welcome.',
    bestTime:'May–Oct', flightTime:'~24h from London · ~10h from Sydney' },

  { country:'Maldives', region:'Pacific', flag:'🇲🇻', capital:'Malé', currency:'USD widely accepted', language:'Dhivehi, English',
    visaTypes:[{type:'Visa-Free',cost:'Free',duration:'30 days (extendable to 90)',processing:'All nationalities on arrival'}],
    requirements:['Valid passport (6+ months)','Return ticket','Confirmed resort booking','Sufficient funds ($100/day)'],
    vaccinations:['No mandatory vaccinations'],
    tips:'Maldives grants free visa on arrival to ALL nationalities. Most overwater bungalow resorts are accessed by seaplane (book with your resort). Plan seaplane connections carefully — they only operate in daylight.',
    bestTime:'Nov–Apr', flightTime:'~10h from London · ~4h from Dubai' },
]

const statusColors: Record<string,string> = {
  'Visa-Free':'#4ade80','e-Visa':'#60a5fa','Visa on Arrival':'#fbbf24',
  'Visa Required':'#f87171','ESTA (Visa Waiver)':'#60a5fa','Schengen Visa':'#60a5fa',
  'Standard Visitor Visa':'#f87171','Jordan Pass':'#fbbf24','Tourist Visa':'#f87171',
  'B1/B2 Tourist Visa':'#f87171','ETA (Electronic Travel Auth)':'#60a5fa',
  'NZeTA':'#60a5fa','East Africa Tourist Visa':'#fbbf24','eVisitor':'#60a5fa',
  'Saudi eVisa':'#60a5fa','Hayya Card':'#4ade80','KAZA UniVisa':'#fbbf24',
  'Tourist Card (Pink Card)':'#fbbf24','K-ETA':'#60a5fa',
}

const getMainStatus = (c: typeof countries[0]) => {
  const types = c.visaTypes.map(v=>v.type)
  if (types.some(t=>t==='Visa-Free'||t==='Visa-Free (EU/EEA/UK)'||t==='Visa-Free (Schengen)')) return { label:'Visa-Free Available', color:'#4ade80' }
  if (types.some(t=>t.includes('on Arrival')||t.includes('ESTA')||t.includes('Jordan Pass')||t.includes('KAZA')||t.includes('Tourist Card'))) return { label:'Visa on Arrival', color:'#fbbf24' }
  if (types.some(t=>t.includes('e-Visa')||t.includes('Schengen')||t.includes('ETA')||t.includes('eTA')||t.includes('eVisitor')||t.includes('K-ETA')||t.includes('eTV'))) return { label:'e-Visa Available', color:'#60a5fa' }
  return { label:'Visa Required', color:'#f87171' }
}

export default function VisaRequirements() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof countries[0]|null>(null)

  const filtered = countries.filter(c => {
    const matchRegion = activeRegion==='All'||c.region===activeRegion
    const matchSearch = search===''||c.country.toLowerCase().includes(search.toLowerCase())||c.region.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchSearch
  })

  return (
    <div style={{ minHeight:'100vh', background:'#080807', paddingTop:90 }}>

      {/* Hero */}
      <div style={{ background:'#0d0c0a', borderBottom:'1px solid rgba(200,169,110,0.1)', padding:'clamp(60px,10vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.7rem', letterSpacing:'0.3em', color:gold, marginBottom:16, display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:32, height:1, background:gold, display:'inline-block' }}/>
            VISA & ENTRY
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20, marginBottom:32 }}>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,7vw,6rem)', fontWeight:300, color:cream, lineHeight:1, margin:0 }}>
              Visa <em style={{ color:gold }}>Requirements</em>
            </h1>
            <p style={{ color:muted, fontSize:'0.95rem', maxWidth:400, lineHeight:1.8, margin:0 }}>
              Entry requirements, visa types, costs and vaccination rules for {countries.length} destinations worldwide.
            </p>
          </div>
          <div style={{ background:'rgba(200,169,110,0.06)', border:'1px solid rgba(200,169,110,0.2)', padding:'16px 24px', display:'flex', gap:14, alignItems:'flex-start' }}>
            <span style={{ color:gold, fontSize:'1rem', flexShrink:0, marginTop:2 }}>⚠</span>
            <p style={{ color:muted, fontSize:'0.85rem', lineHeight:1.7, margin:0 }}>
              Visa requirements change frequently. Always verify current requirements with the official embassy or consulate of your destination before travelling. Requirements vary significantly by passport nationality. Last updated: 2025.
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ borderBottom:'1px solid rgba(200,169,110,0.08)', padding:'14px clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:20, flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.15em', color:dim }}>LEGEND:</span>
          {[{label:'Visa-Free Available',color:'#4ade80'},{label:'Visa on Arrival / e-Visa',color:'#fbbf24'},{label:'Visa Required',color:'#f87171'}].map(l=>(
            <div key={l.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:l.color }}/>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.1em', color:dim }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ borderBottom:'1px solid rgba(200,169,110,0.1)', padding:'20px clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:16, alignItems:'center', flexWrap:'wrap', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {regions.map(r=>(
              <button key={r} onClick={()=>{ setActiveRegion(r); setSelected(null) }}
                style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.63rem', letterSpacing:'0.12em', padding:'7px 14px', background:activeRegion===r?gold:'transparent', border:`1px solid ${activeRegion===r?gold:'rgba(200,169,110,0.2)'}`, color:activeRegion===r?'#080807':muted, cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap' }}>
                {r}
              </button>
            ))}
          </div>
          <input placeholder="Search country..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.2)', color:cream, padding:'7px 16px', fontSize:'0.85rem', outline:'none', fontFamily:"'DM Sans',sans-serif", width:200 }}/>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(32px,5vw,60px) clamp(20px,5vw,60px)' }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.6rem', letterSpacing:'0.2em', color:dim, marginBottom:20 }}>
          {filtered.length} COUNTR{filtered.length!==1?'IES':'Y'} {activeRegion!=='All'?`IN ${activeRegion.toUpperCase()}`:'WORLDWIDE'}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:selected?'1fr 380px':'1fr', gap:12, alignItems:'start' }}>

          {/* Grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:2 }}>
            {filtered.map(country=>{
              const status = getMainStatus(country)
              const isSel = selected?.country===country.country
              return (
                <button key={country.country} onClick={()=>setSelected(isSel?null:country)}
                  style={{ background:isSel?'#1C1B18':'#111110', border:`1px solid ${isSel?gold:'rgba(200,169,110,0.1)'}`, padding:'18px 20px', cursor:'pointer', textAlign:'left', transition:'all 0.2s', display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:'1.8rem', flexShrink:0 }}>{country.flag}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.05rem', color:cream, fontWeight:600, marginBottom:2 }}>{country.country}</div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.1em', color:dim, marginBottom:6 }}>{country.region} · {country.capital}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:status.color, flexShrink:0 }}/>
                      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.08em', color:status.color }}>{status.label}</span>
                    </div>
                  </div>
                  <span style={{ color:isSel?gold:dim, fontSize:'0.8rem', flexShrink:0 }}>{isSel?'✕':'→'}</span>
                </button>
              )
            })}
            {filtered.length===0&&(
              <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'60px', color:muted, fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', fontStyle:'italic' }}>
                No countries found — try adjusting your search
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected&&(
            <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.2)', position:'sticky', top:90 }}>
              <div style={{ background:'#1C1B18', padding:'22px 22px 18px', borderBottom:'1px solid rgba(200,169,110,0.1)', display:'flex', gap:14, alignItems:'flex-start' }}>
                <span style={{ fontSize:'2.2rem' }}>{selected.flag}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.55rem', letterSpacing:'0.15em', color:gold, marginBottom:3 }}>{selected.region}</div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1.7rem', fontWeight:300, color:cream, lineHeight:1, marginBottom:4 }}>{selected.country}</h2>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.52rem', letterSpacing:'0.1em', color:dim }}>{selected.capital} · {selected.currency} · {selected.language}</div>
                </div>
                <button onClick={()=>setSelected(null)} style={{ background:'none', border:'none', color:dim, cursor:'pointer', fontSize:'1rem', padding:4, flexShrink:0 }}>✕</button>
              </div>

              <div style={{ padding:'18px 22px', display:'flex', flexDirection:'column', gap:18, maxHeight:'72vh', overflowY:'auto' }}>

                {/* Visa types */}
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', color:gold, marginBottom:10 }}>VISA OPTIONS</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {selected.visaTypes.map((v,i)=>(
                      <div key={i} style={{ background:'#1C1B18', padding:'12px 14px', border:`1px solid ${statusColors[v.type]?statusColors[v.type]+'25':'rgba(200,169,110,0.08)'}` }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.62rem', letterSpacing:'0.1em', color:statusColors[v.type]||gold }}>{v.type}</span>
                          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'1rem', color:cream, fontWeight:600 }}>{v.cost}</span>
                        </div>
                        <div style={{ display:'flex', gap:16 }}>
                          <div>
                            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.48rem', letterSpacing:'0.12em', color:dim, marginBottom:2 }}>DURATION</div>
                            <div style={{ color:muted, fontSize:'0.78rem' }}>{v.duration}</div>
                          </div>
                          <div>
                            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.48rem', letterSpacing:'0.12em', color:dim, marginBottom:2 }}>PROCESSING</div>
                            <div style={{ color:muted, fontSize:'0.78rem' }}>{v.processing}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', color:gold, marginBottom:10 }}>ENTRY REQUIREMENTS</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    {selected.requirements.map((req,i)=>(
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                        <span style={{ color:gold, fontSize:'0.58rem', marginTop:3, flexShrink:0 }}>✓</span>
                        <span style={{ color:muted, fontSize:'0.83rem', lineHeight:1.5 }}>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vaccinations */}
                <div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.58rem', letterSpacing:'0.18em', color:gold, marginBottom:10 }}>VACCINATIONS</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    {selected.vaccinations.map((vac,i)=>(
                      <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                        <span style={{ color:vac.includes('MANDATORY')?'#f87171':'#fbbf24', fontSize:'0.6rem', marginTop:3, flexShrink:0 }}>💉</span>
                        <span style={{ color:vac.includes('MANDATORY')?'#f87171':muted, fontSize:'0.83rem', lineHeight:1.5, fontWeight:vac.includes('MANDATORY')?600:400 }}>{vac}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tip */}
                <div style={{ background:'rgba(200,169,110,0.06)', border:'1px solid rgba(200,169,110,0.15)', padding:'14px 16px' }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.55rem', letterSpacing:'0.18em', color:gold, marginBottom:6 }}>✦ HUUBOI TIP</div>
                  <p style={{ color:muted, fontSize:'0.83rem', lineHeight:1.75, margin:0 }}>{selected.tips}</p>
                </div>

                {/* Practical */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
                  {[{label:'BEST TIME',value:selected.bestTime},{label:'FLIGHT TIME',value:selected.flightTime}].map(s=>(
                    <div key={s.label} style={{ background:'#1C1B18', padding:'10px 12px' }}>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.48rem', letterSpacing:'0.12em', color:dim, marginBottom:3 }}>{s.label}</div>
                      <div style={{ color:cream, fontSize:'0.78rem', lineHeight:1.4 }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  <a href="https://www.aviasales.com/?marker=710879&locale=en" target="_blank" rel="noopener noreferrer"
                    style={{ background:gold, color:'#080807', padding:'12px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.68rem', letterSpacing:'0.15em', textDecoration:'none', textAlign:'center', display:'block' }}>
                    ✈ SEARCH FLIGHTS TO {selected.country.toUpperCase().split(' ')[0]}
                  </a>
                  <Link href="/esim"
                    style={{ background:'transparent', border:'1px solid rgba(200,169,110,0.3)', color:gold, padding:'11px', fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.68rem', letterSpacing:'0.15em', textDecoration:'none', textAlign:'center', display:'block' }}>
                    📱 GET ESIM FOR {selected.country.toUpperCase().split(' ')[0]}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* General tips */}
        <div style={{ marginTop:48, background:'#111110', border:'1px solid rgba(200,169,110,0.15)', padding:'clamp(24px,3vw,36px)' }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', color:gold, marginBottom:16 }}>GENERAL VISA TIPS</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16 }}>
            {[
              {icon:'📅',tip:'Apply at least 6–8 weeks before travel for visa applications that require embassy appointments.'},
              {icon:'📄',tip:'Always carry printed copies of your visa, insurance and hotel bookings — digital is not always accepted.'},
              {icon:'💉',tip:'Carry your yellow fever certificate in your travel wallet — it is required for entry to many countries.'},
              {icon:'🛂',tip:'Never overstay a visa — even by one day. Overstaying can result in fines, deportation and future visa bans.'},
              {icon:'🔍',tip:'Check requirements for every country on your route — transit visas may be required even without leaving the airport.'},
              {icon:'📱',tip:'Get a travel eSIM so you have instant connectivity to look up requirements and contact embassies from anywhere.'},
            ].map((item,i)=>(
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{item.icon}</span>
                <p style={{ color:muted, fontSize:'0.87rem', lineHeight:1.7, margin:0 }}>{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related links */}
        <div style={{ marginTop:16, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:2 }}>
          {[
            {label:'Travel Tips',sub:'Health, safety and packing',href:'/travel-tips'},
            {label:'Africa & Safari',sub:'Africa visa strategy',href:'/africa-safari'},
            {label:'Budget Calculator',sub:'Plan your trip budget',href:'/budget-calculator'},
            {label:'Get a Travel eSIM',sub:'Data in 150+ countries',href:'/esim'},
          ].map(link=>(
            <Link key={link.href} href={link.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'#111110', border:'1px solid rgba(200,169,110,0.1)', padding:'18px 20px', transition:'border-color 0.2s' }}
                onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(200,169,110,0.35)')}
                onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(200,169,110,0.1)')}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'0.65rem', letterSpacing:'0.15em', color:gold, marginBottom:3 }}>{link.label} →</div>
                <div style={{ color:dim, fontSize:'0.75rem' }}>{link.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}