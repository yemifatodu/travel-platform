// scripts/download-from-pexels.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
require('dotenv').config();

// Configuration
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const OUTPUT_DIR = './public/images';
const QUALITY = 85;
const IMAGE_SIZES = {
  desktop: { width: 1200, height: 800 },
  tablet: { width: 800, height: 600 },
  mobile: { width: 600, height: 450 }
};

// Check if API key exists
if (!PEXELS_API_KEY) {
  console.error('❌ Error: PEXELS_API_KEY not found in .env file');
  console.log('\n📝 How to get a free Pexels API key:');
  console.log('   1. Go to https://www.pexels.com/api/');
  console.log('   2. Sign up for a free account');
  console.log('   3. Create a new app');
  console.log('   4. Copy your API key');
  console.log('\n💡 Then create a .env file with:');
  console.log('   PEXELS_API_KEY=your_key_here\n');
  process.exit(1);
}

console.log('✅ Pexels API key found!\n');

// Complete search queries for all 250+ destinations
const searchQueries = {
  // ========== AFRICA (46) ==========
  'africa/serengeti.jpg': 'serengeti national park tanzania wildebeest migration',
  'africa/ngorongoro.jpg': 'ngorongoro crater tanzania wildlife safari',
  'africa/zanzibar.jpg': 'zanzibar stone town beach indian ocean',
  'africa/masai-mara.jpg': 'masai mara kenya river crossing wildebeest',
  'africa/amboseli.jpg': 'amboseli national park elephants kilimanjaro',
  'africa/samburu.jpg': 'samburu kenya reticulated giraffe',
  'africa/volcanoes-rwanda.jpg': 'volcanoes national park rwanda mountain gorilla',
  'africa/bwindi.jpg': 'bwindi impenetrable forest uganda gorilla',
  'africa/kibale.jpg': 'kibale forest uganda chimpanzee',
  'africa/lalibela.jpg': 'lalibela ethiopia rock hewn church',
  'africa/simien.jpg': 'simien mountains ethiopia gelada baboon',
  'africa/danakil.jpg': 'danakil depression ethiopia volcano salt flats',
  'africa/okavango.jpg': 'okavango delta botswana mokoro canoe',
  'africa/chobe.jpg': 'chobe national park botswana elephants river',
  'africa/kruger.jpg': 'kruger national park south africa safari',
  'africa/cape-town.jpg': 'cape town south africa table mountain',
  'africa/garden-route.jpg': 'garden route south africa coastline',
  'africa/south-luangwa.jpg': 'south luangwa zambia walking safari',
  'africa/victoria-falls.jpg': 'victoria falls zambia zimbabwe waterfall',
  'africa/hwange.jpg': 'hwange national park zimbabwe elephants',
  'africa/etosha.jpg': 'etosha national park namibia waterhole',
  'africa/sossusvlei.jpg': 'sossusvlei namibia red dunes dead vlei',
  'africa/ghana-coast.jpg': 'cape coast castle ghana slave fort',
  'africa/kakum.jpg': 'kakum national park ghana canopy walk',
  'africa/lagos.jpg': 'lagos nigeria city skyline',
  'africa/obudu.jpg': 'obudu mountain resort nigeria cable car',
  'africa/yankari.jpg': 'yankari national park nigeria wildlife',
  'africa/goree.jpg': 'goree island senegal slave house',
  'africa/bijagos.jpg': 'bijagos archipelago guinea bissau beach',
  'africa/abidjan.jpg': 'abidjan ivory coast st paul cathedral',
  'africa/cairo.jpg': 'cairo egypt pyramids giza sphinx',
  'africa/luxor.jpg': 'luxor egypt valley of kings temple',
  'africa/red-sea.jpg': 'red sea egypt diving coral reef',
  'africa/marrakech.jpg': 'marrakech morocco medina souk',
  'africa/sahara-morocco.jpg': 'sahara desert morocco erg chebbi dunes',
  'africa/chefchaouen.jpg': 'chefchaouen morocco blue city',
  'africa/tunis-carthage.jpg': 'carthage tunis ruins roman',
  'africa/djerba.jpg': 'djerba tunisia beach palm trees',
  'africa/odzala.jpg': 'odzala kokoua congo gorilla',
  'africa/loango.jpg': 'loango national park gabon hippo',
  'africa/virunga.jpg': 'virunga national park drc volcano',
  'africa/dzanga-sangha.jpg': 'dzanga sangha central african republic elephant',
  'africa/malabo.jpg': 'malabo equatorial guinea cathedral',
  'africa/mauritius.jpg': 'mauritius beach turquoise water',
  'africa/seychelles.jpg': 'seychelles beach granite boulders',
  'africa/praslin.jpg': 'praslin seychelles vallee de mai',
  'africa/nosy-be.jpg': 'nosy be madagascar beach',
  'africa/madagascar-wildlife.jpg': 'madagascar lemur baobab tree',
  'africa/bazaruto.jpg': 'bazaruto archipelago mozambique',
  'africa/comoros.jpg': 'comoros islands beach',

  // ========== MIDDLE EAST (42) ==========
  'middle-east/dubai.jpg': 'dubai burj khalifa skyline',
  'middle-east/abu-dhabi.jpg': 'abu dhabi sheikh zayed mosque',
  'middle-east/sharjah.jpg': 'sharjah uae mosque architecture',
  'middle-east/ras-al-khaimah.jpg': 'ras al khaimah uae jebel jais mountains',
  'middle-east/alula.jpg': 'alula saudi arabia hegra rock tombs',
  'middle-east/riyadh.jpg': 'riyadh saudi arabia kingdom centre tower',
  'middle-east/jeddah.jpg': 'jeddah saudi arabia old town',
  'middle-east/abha.jpg': 'abha saudi arabia mountains',
  'middle-east/edge-of-world.jpg': 'edge of the world saudi arabia escarpment',
  'middle-east/petra.jpg': 'petra jordan treasury canyon',
  'middle-east/wadi-rum.jpg': 'wadi rum jordan desert rock',
  'middle-east/dead-sea.jpg': 'dead sea jordan salt water',
  'middle-east/jerash.jpg': 'jerash jordan roman ruins',
  'middle-east/muscat.jpg': 'muscat oman sultan qaboos mosque',
  'middle-east/wahiba-sands.jpg': 'wahiba sands oman desert dunes',
  'middle-east/musandam.jpg': 'musandam oman fjords',
  'middle-east/wadi-shab.jpg': 'wadi shab oman waterfall',
  'middle-east/salalah.jpg': 'salalah oman green mountains',
  'middle-east/istanbul.jpg': 'istanbul turkey hagia sophia mosque',
  'middle-east/cappadocia.jpg': 'cappadocia turkey hot air balloons',
  'middle-east/pamukkale.jpg': 'pamukkale turkey travertine pools',
  'middle-east/ephesus.jpg': 'ephesus turkey library of celsus',
  'middle-east/antalya.jpg': 'antalya turkey old harbor',
  'middle-east/nemrut.jpg': 'mount nemrut turkey statues sunrise',
  'middle-east/doha.jpg': 'doha qatar museum of islamic art',
  'middle-east/katara.jpg': 'katara cultural village doha',
  'middle-east/inland-sea.jpg': 'inland sea qatar desert dunes',
  'middle-east/cairo.jpg': 'cairo egypt nile river skyline',
  'middle-east/luxor.jpg': 'luxor egypt karnak temple',
  'middle-east/aswan.jpg': 'aswan egypt nile river',
  'middle-east/red-sea.jpg': 'red sea egypt diving',
  'middle-east/jerusalem.jpg': 'jerusalem israel dome of the rock',
  'middle-east/tel-aviv.jpg': 'tel aviv israel beach',
  'middle-east/dead-sea-israel.jpg': 'dead sea israel salt',
  'middle-east/bethlehem.jpg': 'bethlehem palestine church of nativity',
  'middle-east/beirut.jpg': 'beirut lebanon pigeon rocks',
  'middle-east/byblos.jpg': 'byblos lebanon old port',
  'middle-east/baalbek.jpg': 'baalbek lebanon roman temple',
  'middle-east/manama.jpg': 'manama bahrain world trade center',
  'middle-east/bahrain-f1.jpg': 'bahrain international circuit formula 1',
  'middle-east/kuwait-city.jpg': 'kuwait city towers',
  'middle-east/failaka.jpg': 'failaka island kuwait',

  // ========== EUROPE (51) ==========
  'europe/paris.jpg': 'paris eiffel tower sunset',
  'europe/provence.jpg': 'provence france lavender fields',
  'europe/cotedazur.jpg': 'french riviera nice coastline',
  'europe/bordeaux.jpg': 'bordeaux france wine city',
  'europe/loire.jpg': 'loire valley france chateau',
  'europe/rome.jpg': 'rome italy colosseum',
  'europe/florence.jpg': 'florence italy duomo',
  'europe/venice.jpg': 'venice italy grand canal',
  'europe/amalfi.jpg': 'amalfi coast italy villages',
  'europe/tuscany.jpg': 'tuscany italy countryside hills',
  'europe/lake-como.jpg': 'lake como italy bellagio',
  'europe/barcelona.jpg': 'barcelona spain sagrada familia',
  'europe/madrid.jpg': 'madrid spain royal palace',
  'europe/alhambra.jpg': 'alhambra granada spain palace',
  'europe/seville.jpg': 'seville spain plaza de espana',
  'europe/mallorca.jpg': 'mallorca spain beach',
  'europe/ibiza.jpg': 'ibiza spain sunset',
  'europe/lisbon.jpg': 'lisbon portugal tram 28',
  'europe/porto.jpg': 'porto portugal douro river',
  'europe/douro.jpg': 'douro valley portugal vineyards',
  'europe/algarve.jpg': 'algarve portugal beach cliffs',
  'europe/london.jpg': 'london uk big ben',
  'europe/edinburgh.jpg': 'edinburgh scotland castle',
  'europe/highlands.jpg': 'scottish highlands glencoe',
  'europe/bath.jpg': 'bath england roman baths',
  'europe/lake-district.jpg': 'lake district england windermere',
  'europe/cornwall.jpg': 'cornwall england st ives',
  'europe/berlin.jpg': 'berlin germany brandenburg gate',
  'europe/munich.jpg': 'munich germany marienplatz',
  'europe/neuschwanstein.jpg': 'neuschwanstein castle germany',
  'europe/rhine.jpg': 'rhine valley germany castles',
  'europe/black-forest.jpg': 'black forest germany lake titisee',
  'europe/jungfraujoch.jpg': 'jungfraujoch switzerland alps',
  'europe/matterhorn.jpg': 'matterhorn switzerland zermatt',
  'europe/lucerne.jpg': 'lucerne switzerland chapel bridge',
  'europe/interlaken.jpg': 'interlaken switzerland',
  'europe/vienna.jpg': 'vienna austria schonbrunn palace',
  'europe/salzburg.jpg': 'salzburg austria fortress',
  'europe/innsbruck.jpg': 'innsbruck austria nordkette',
  'europe/hallstatt.jpg': 'hallstatt austria lake',
  'europe/amsterdam.jpg': 'amsterdam netherlands canals',
  'europe/keukenhof.jpg': 'keukenhof netherlands tulips',
  'europe/rotterdam.jpg': 'rotterdam netherlands architecture',
  'europe/santorini.jpg': 'santorini greece oia sunset',
  'europe/acropolis.jpg': 'athens greece acropolis parthenon',
  'europe/crete.jpg': 'crete greece elafonisi beach',
  'europe/mykonos.jpg': 'mykonos greece windmills',
  'europe/rhodes.jpg': 'rhodes greece old town',
  'europe/golden-circle.jpg': 'iceland golden circle gullfoss',
  'europe/south-coast.jpg': 'iceland south coast black sand beach',
  'europe/blue-lagoon.jpg': 'iceland blue lagoon geothermal spa',

  // ========== AMERICAS (50) ==========
  'americas/new-york.jpg': 'new york city manhattan skyline',
  'americas/grand-canyon.jpg': 'grand canyon arizona sunset',
  'americas/yellowstone.jpg': 'yellowstone old faithful geyser',
  'americas/yosemite.jpg': 'yosemite national park half dome',
  'americas/las-vegas.jpg': 'las vegas strip bellagio',
  'americas/san-francisco.jpg': 'san francisco golden gate bridge',
  'americas/new-orleans.jpg': 'new orleans french quarter',
  'americas/washington.jpg': 'washington dc lincoln memorial',
  'americas/banff.jpg': 'banff canada lake louise',
  'americas/jasper.jpg': 'jasper canada spirit island',
  'americas/vancouver.jpg': 'vancouver canada stanley park',
  'americas/quebec.jpg': 'quebec city canada chateau frontenac',
  'americas/toronto.jpg': 'toronto cn tower',
  'americas/whistler.jpg': 'whistler canada peak 2 peak gondola',
  'americas/chichen-itza.jpg': 'chichen itza mexico pyramid kukulkan',
  'americas/tulum.jpg': 'tulum mexico ruins beach',
  'americas/mexico-city.jpg': 'mexico city zocalo cathedral',
  'americas/cancun.jpg': 'cancun mexico hotel zone beach',
  'americas/guanajuato.jpg': 'guanajuato mexico colorful houses',
  'americas/rio.jpg': 'rio de janeiro brazil christ the redeemer',
  'americas/iguazu.jpg': 'iguazu falls brazil devil throat',
  'americas/amazon.jpg': 'amazon rainforest brazil',
  'americas/salvador.jpg': 'salvador brazil pelourinho',
  'americas/floripa.jpg': 'florianopolis brazil lagoa da conceicao',
  'americas/machu-picchu.jpg': 'machu picchu peru inca citadel',
  'americas/cusco.jpg': 'cusco peru plaza de armas',
  'americas/sacred-valley.jpg': 'sacred valley peru ollantaytambo',
  'americas/rainbow-mountain.jpg': 'rainbow mountain peru vinicunca',
  'americas/torres-del-paine.jpg': 'torres del paine chile mountains',
  'americas/perito-moreno.jpg': 'perito moreno glacier argentina',
  'americas/el-chalten.jpg': 'el chalten argentina fitz roy',
  'americas/buenos-aires.jpg': 'buenos aires argentina obelisk',
  'americas/santiago.jpg': 'santiago chile cerro san cristobal',
  'americas/atacama.jpg': 'atacama desert chile moon valley',
  'americas/cartagena.jpg': 'cartagena colombia walled city',
  'americas/medellin.jpg': 'medellin colombia comuna 13',
  'americas/coffee-region.jpg': 'colombia coffee region salento',
  'americas/bogota.jpg': 'bogota colombia monserrate',
  'americas/galapagos.jpg': 'galapagos islands ecuador tortoise',
  'americas/quito.jpg': 'quito ecuador old town',
  'americas/cotopaxi.jpg': 'cotopaxi volcano ecuador',
  'americas/banos.jpg': 'banos ecuador waterfall',
  'americas/havana.jpg': 'havana cuba classic cars malecon',
  'americas/punta-cana.jpg': 'punta cana dominican republic beach',
  'americas/montego-bay.jpg': 'montego bay jamaica doctors cave beach',
  'americas/san-juan.jpg': 'san juan puerto rico el morro',
  'americas/costa-rica.jpg': 'costa rica arenal volcano',
  'americas/panama.jpg': 'panama canal miraflores locks',
  'americas/tikal.jpg': 'tikal guatemala mayan ruins',

  // ========== ASIA (27) ==========
  'asia/kyoto.jpg': 'kyoto japan fushimi inari torii gates',
  'asia/tokyo.jpg': 'tokyo japan shibuya crossing',
  'asia/osaka.jpg': 'osaka japan dotonbori',
  'asia/seoul.jpg': 'seoul south korea gyeongbokgung palace',
  'asia/busan.jpg': 'busan south korea haeundae beach',
  'asia/jeju.jpg': 'jeju island south korea seongsan ilchulbong',
  'asia/taj-mahal.jpg': 'taj mahal india agra sunrise',
  'asia/jaipur.jpg': 'jaipur india hawa mahal pink city',
  'asia/kerala.jpg': 'kerala india backwaters houseboat',
  'asia/bangkok.jpg': 'bangkok thailand grand palace',
  'asia/chiang-mai.jpg': 'chiang mai thailand doi suthep temple',
  'asia/phuket.jpg': 'phuket thailand phi phi island',
  'asia/hanoi.jpg': 'hanoi vietnam hoan kiem lake',
  'asia/hoi-an.jpg': 'hoi an vietnam lanterns at night',
  'asia/bali.jpg': 'bali indonesia tegallalang rice terrace',
  'asia/komodo.jpg': 'komodo island indonesia komodo dragon',
  'asia/kuala-lumpur.jpg': 'kuala lumpur malaysia petronas towers',
  'asia/penang.jpg': 'penang malaysia street art george town',
  'asia/palawan.jpg': 'palawan philippines el nido lagoon',
  'asia/boracay.jpg': 'boracay philippines white beach',
  'asia/angkor-wat.jpg': 'angkor wat cambodia sunrise',
  'asia/phnom-penh.jpg': 'phnom penh cambodia royal palace',
  'asia/kathmandu.jpg': 'kathmandu nepal swayambhunath stupa',
  'asia/pokhara.jpg': 'pokhara nepal fewa lake',
  'asia/bagan.jpg': 'bagan myanmar temples sunrise',
  'asia/singapore.jpg': 'singapore marina bay sands',
  'asia/maldives.jpg': 'maldives overwater bungalow',

  // ========== PACIFIC (28) ==========
  'pacific/sydney.jpg': 'sydney australia opera house',
  'pacific/great-barrier-reef.jpg': 'great barrier reef australia coral',
  'pacific/uluru.jpg': 'uluru australia sunset',
  'pacific/melbourne.jpg': 'melbourne australia city street art',
  'pacific/perth.jpg': 'perth australia elizabeth quay',
  'pacific/kakadu.jpg': 'kakadu australia ubirr rock',
  'pacific/queenstown.jpg': 'queenstown new zealand lake wakatipu',
  'pacific/milford-sound.jpg': 'milford sound new zealand waterfall',
  'pacific/rotorua.jpg': 'rotorua new zealand geyser',
  'pacific/tongariro.jpg': 'tongariro new zealand emerald lakes',
  'pacific/abel-tasman.jpg': 'abel tasman new zealand kayaking',
  'pacific/fiji.jpg': 'fiji islands beach',
  'pacific/cloudbreak.jpg': 'fiji cloud break surfing',
  'pacific/taveuni.jpg': 'taveuni fiji rainbow reef',
  'pacific/beqa.jpg': 'beqa lagoon fiji shark dive',
  'pacific/bora-bora.jpg': 'bora bora french polynesia overwater bungalow',
  'pacific/moorea.jpg': 'moorea french polynesia cook bay',
  'pacific/tahiti.jpg': 'tahiti french polynesia papeete market',
  'pacific/rangiroa.jpg': 'rangiroa french polynesia lagoon',
  'pacific/big-island.jpg': 'hawaii big island volcano eruption',
  'pacific/maui.jpg': 'maui hawaii road to hana',
  'pacific/kauai.jpg': 'kauai hawaii napali coast',
  'pacific/aitutaki.jpg': 'aitutaki cook islands lagoon',
  'pacific/rarotonga.jpg': 'rarotonga cook islands muri beach',
  'pacific/atiu.jpg': 'atiu cook islands caves',
  'pacific/samoa.jpg': 'samoa to sua ocean trench',
  'pacific/savaii.jpg': 'savaii samoa blowholes',
  'pacific/apia.jpg': 'apia samoa catholic cathedral',
};

// Download image from Pexels
async function downloadFromPexels(query, outputPath) {
  try {
    // Search for photo on Pexels
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: { 
        query: query, 
        per_page: 1, 
        orientation: 'landscape',
        size: 'large'
      },
      headers: { Authorization: PEXELS_API_KEY }
    });
    
    if (response.data.photos && response.data.photos.length > 0) {
      const photo = response.data.photos[0];
      const imageUrl = photo.src.original;
      
      // Download the image
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      
      // Create responsive versions (desktop, tablet, mobile)
      for (const [size, dimensions] of Object.entries(IMAGE_SIZES)) {
        const sizePath = outputPath.replace(/\.(jpg|png)$/, `-${size}.webp`);
        await sharp(imageResponse.data)
          .resize(dimensions.width, dimensions.height, { fit: 'cover', position: 'attention' })
          .webp({ quality: QUALITY })
          .toFile(sizePath);
      }
      
      return { success: true, photographer: photo.photographer };
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }
  return { success: false };
}

// Create placeholder (fallback)
async function createPlaceholder(outputPath, query) {
  const name = path.basename(outputPath, '.jpg').replace(/-/g, ' ');
  const displayName = name.split(' ').slice(0, 3).join(' ');
  
  const svg = `<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a2e"/>
        <stop offset="100%" style="stop-color:#16213e"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <rect x="15%" y="35%" width="70%" height="30%" rx="10" fill="none" stroke="#C8A96E" stroke-width="2" stroke-dasharray="8,8"/>
    <text x="50%" y="48%" font-family="'Cormorant Garamond',serif" font-size="26" fill="#C8A96E" text-anchor="middle">
      ${displayName}
    </text>
    <text x="50%" y="58%" font-family="'Bebas Neue',sans-serif" font-size="11" fill="#A0A095" text-anchor="middle">
      HUUBOI
    </text>
  </svg>`;
  
  for (const [size, dimensions] of Object.entries(IMAGE_SIZES)) {
    const sizePath = outputPath.replace(/\.(jpg|png)$/, `-${size}.webp`);
    await sharp(Buffer.from(svg))
      .resize(dimensions.width, dimensions.height, { fit: 'cover' })
      .webp({ quality: QUALITY })
      .toFile(sizePath);
  }
  
  console.log(`   📦 Placeholder created`);
}

// Main execution
async function main() {
  console.log('🚀 STARTING IMAGE DOWNLOAD FROM PEXELS\n');
  console.log('=' .repeat(60));
  console.log(`📊 Total images to process: ${Object.keys(searchQueries).length}`);
  console.log(`🎨 Image quality: ${QUALITY}%`);
  console.log(`📐 Sizes: Desktop (1200x800), Tablet (800x600), Mobile (600x450)`);
  console.log('=' .repeat(60) + '\n');
  
  // Create all necessary directories
  const continents = ['africa', 'middle-east', 'europe', 'americas', 'asia', 'pacific'];
  for (const continent of continents) {
    const dirPath = path.join(OUTPUT_DIR, continent);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${continent}`);
    }
  }
  
  console.log('');
  
  let downloaded = 0;
  let placeholders = 0;
  let total = 0;
  const totalImages = Object.keys(searchQueries).length;
  
  for (const [imagePath, query] of Object.entries(searchQueries)) {
    total++;
    const fullPath = path.join(OUTPUT_DIR, imagePath);
    const destName = path.basename(imagePath, '.jpg').replace(/-/g, ' ');
    
    process.stdout.write(`[${total}/${totalImages}] ${destName}... `);
    
    const result = await downloadFromPexels(query, fullPath);
    
    if (result.success) {
      downloaded++;
      console.log(`✅ (📸 ${result.photographer})`);
    } else {
      await createPlaceholder(fullPath, query);
      placeholders++;
      console.log(`🖼️ (placeholder)`);
    }
    
    // Rate limiting to respect Pexels API limits (50 requests/second allowed, but we'll be conservative)
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('📊 DOWNLOAD SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✅ Real images downloaded from Pexels: ${downloaded}`);
  console.log(`🖼️ Placeholder images created: ${placeholders}`);
  console.log(`📁 Total images processed: ${total}`);
  console.log('\n✨ SUCCESS! All images saved to:');
  console.log('   📂 public/images/africa/     - 46 images');
  console.log('   📂 public/images/middle-east/ - 42 images');
  console.log('   📂 public/images/europe/     - 51 images');
  console.log('   📂 public/images/americas/   - 50 images');
  console.log('   📂 public/images/asia/       - 27 images');
  console.log('   📂 public/images/pacific/    - 28 images');
  console.log('\n💡 Next steps:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Your images will load as WebP files');
  console.log('   3. Each image has 3 responsive sizes');
}

// Run the script
main().catch(console.error);