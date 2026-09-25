// scripts/test-transfer-availability.ts — one-off HBX Transfers Availability test call
// Run with: npx tsx scripts/test-transfer-availability.ts
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.HBX_API_KEY;
const secret = process.env.HBX_SECRET;

if (!apiKey || !secret) {
  console.error('Missing HBX_API_KEY or HBX_SECRET in .env.local');
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

// Barcelona Airport -> a Barcelona ATLAS point, one-way, 2 adults.
// Safe generic test route straight from HBX's own docs example.
const url =
  'https://api.test.hotelbeds.com/transfer-api/1.0/availability/en/from/IATA/BCN/to/ATLAS/57/2026-05-08T10:00:00/2/0/0';

console.log('Calling:', url);

const res = await fetch(url, { headers });
const text = await res.text();

console.log('Status:', res.status);
try {
  console.log(JSON.stringify(JSON.parse(text), null, 2));
} catch {
  console.log(text);
}
