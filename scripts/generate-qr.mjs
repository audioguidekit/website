#!/usr/bin/env node
/**
 * Generates public/images/qr.svg — the QR code shown next to "Try the player".
 * Run: npm run generate:qr
 */
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'public', 'images', 'qr.svg');

const url = 'https://audioguidekit.org/demo/barcelona';

const svg = await QRCode.toString(url, {
  type: 'svg',
  margin: 1,
  color: { dark: '#000000', light: '#FFFFFF' },
});

fs.writeFileSync(outPath, svg);
console.log(`Wrote ${outPath} for ${url}`);
