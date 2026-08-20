/**
 * Verifies every foreground/background pair the design system actually uses
 * against WCAG AA. Run it after any palette change:
 *
 *   node scripts/check-contrast.mjs
 *
 * Colours are read from src/app/globals.css so this can never drift out of
 * sync with the tokens themselves.
 */
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [
    m[1],
    m[2],
  ]),
);

function luminance(hex) {
  const channels = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// [foreground, background, label, minimum]
// 3.0 is the AA threshold for large text (>=18.66px bold / 24px regular)
// and for non-text UI boundaries; everything else must clear 4.5.
const PAIRS = [
  ["ink", "paper", "body text on page", 4.5],
  ["ink", "surface", "body text on card", 4.5],
  ["ink-muted", "paper", "secondary text on page", 4.5],
  ["ink-muted", "surface", "secondary text on card", 4.5],
  ["brand-700", "surface", "link on card", 4.5],
  ["brand-700", "paper", "link on page", 4.5],
  ["brand-700", "brand-50", "badge neutral / nav hover", 4.5],
  ["brand-600", "surface", "focus ring", 3.0],
  ["positive", "positive-100", "badge high demand", 4.5],
  ["accent-700", "accent-100", "badge medium demand", 4.5],
  ["negative", "negative-100", "badge low demand", 4.5],
  ["ink", "accent-500", "accent button label", 4.5],
  // Input borders are the sole indicator of a control's boundary → 1.4.11 applies.
  ["line-input", "surface", "form control border on card", 3.0],
  ["line-input", "paper", "form control border on page", 3.0],
  // Note: the outline badge's ring is exempt — it is decorative, and the
  // badge's meaning is carried entirely by its (AA-passing) label text.
];

let failed = 0;

for (const [fg, bg, label, min] of PAIRS) {
  if (!tokens[fg] || !tokens[bg]) {
    console.log(`?  ${label}: missing token (${fg} / ${bg})`);
    failed++;
    continue;
  }
  const value = ratio(tokens[fg], tokens[bg]);
  const ok = value >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${value.toFixed(2)}:1  (min ${min})  ${label}` +
      `  [${fg} ${tokens[fg]} on ${bg} ${tokens[bg]}]`,
  );
}

// White-on-brand is checked separately: white is not a token.
for (const [token, label, min] of [
  ["brand-600", "white text on primary button", 4.5],
  ["brand-700", "white text on primary button (hover)", 4.5],
  ["positive", "white on positive", 4.5],
  ["negative", "white on negative", 4.5],
]) {
  const value = ratio("#ffffff", tokens[token]);
  const ok = value >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${value.toFixed(2)}:1  (min ${min})  ${label}` +
      `  [#ffffff on ${token} ${tokens[token]}]`,
  );
}

console.log(
  failed === 0
    ? "\nAll pairs meet WCAG AA."
    : `\n${failed} pair(s) below threshold.`,
);
process.exit(failed === 0 ? 0 : 1);
