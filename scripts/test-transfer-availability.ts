// scripts/test-transfer-availability.ts — one-off HBX Transfers Availability test call
// Run with: npx tsx scripts/test-transfer-availability.ts
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  const apiKey = process.env.HBX_TRANSFER_API_KEY;
  const secret = process.env.HBX_TRANSFER_SECRET;

  if (!apiKey || !secret) {
    console.error('Missing HBX_TRANSFER_API_KEY or HBX_TRANSFER_SECRET in .env.local');
    process.exit(1);
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto.createHash('sha256').update(apiKey + secret + timestamp).digest('hex');

  const headers = {
    'Api-key': apiKey,
    'X-Signature': signature,
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json',
  };

  // Test Case: Barcelona Airport (BCN) -> a hotel (ATLAS 57)
  // Format: /availability/{language}/from/{fromType}/{fromCode}/to/{toType}/{toCode}/{outbound}/{inbound}/{adults}/{children}/{infants}
  const language = 'en';
  const fromType = 'IATA';
  const fromCode = 'BCN';
  const toType = 'ATLAS';
  const toCode = '57';
  const outbound = '2027-05-08T10:00:00';
  const inbound = ''; // One-way
  const adults = '2';
  const children = '0';
  const infants = '0';

  const url = `https://api.test.hotelbeds.com/transfer-api/1.0/availability/${language}/from/${fromType}/${fromCode}/to/${toType}/${toCode}/${outbound}/${inbound}/${adults}/${children}/${infants}`;

  console.log('Calling Availability API:', url);

  const res = await fetch(url, { headers });
  const text = await res.text();

  console.log('Status:', res.status);
  try {
    console.log(JSON.stringify(JSON.parse(text), null, 2));
  } catch {
    console.log(text);
  }
}

main();
