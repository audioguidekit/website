#!/usr/bin/env node
/**
 * Generates public/og-image.png from public/og-image.svg (1200×630 for Open Graph).
 * Run: npm run generate:og
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const svgPath = path.join(root, 'public', 'og-image.svg');
const pngPath = path.join(root, 'public', 'og-image.png');

const svg = fs.readFileSync(svgPath);

sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile(pngPath)
  .then(() => console.log('Generated public/og-image.png'))
  .catch((err) => {
    console.error('Failed to generate og-image.png:', err.message);
    process.exit(1);
  });
