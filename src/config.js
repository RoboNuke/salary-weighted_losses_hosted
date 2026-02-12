// ─── SITE CONFIGURATION ─────────────────────────────────────────────────────
// Edit this file to change text, labels, and thresholds without touching app code.

const CONFIG = {
  // ── Available Seasons ──
  // List every season JSON filename (without .json) you've placed in public/data/
  // Most recent first. The first entry is the default.
  seasons: ["2023-24", "2024-25", "2025-26"],

  // ── Site Identity ──
  siteName: "Salary-Weighted Losses",
  siteTagline: "Stop tanking while making players play",

  // ── Homepage Hero ──
  heroTitle: "What if losses were weighted",
  heroTitleAccent: "by who actually played?",
  heroDescription:
    "Each loss is multiplied by the percentage of the salary cap that was active. Bench your stars and lose? That loss counts less — making it harder to tank.",

  // ── Scatter Plot ──
  scatterTitle: "The Tank Detector",
  scatterDescription:
    "Teams on the diagonal played full salary in losses. Below the line = benching stars. Click a badge to explore.",

  // ── Unearned Losses Bar Chart ──
  barChartTitle: "Top 15: Unearned Losses",
  barChartDescription:
    "Games lost while benching significant salary. Higher = more suspect.",

  // ── Team Page: Salary Timeline ──
  timelineTitle: "Salary % Over the Season",
  timelineDescription:
    "Each dot is a game — green for wins, red for losses. The purple line is the 10-game rolling average. Look for dips where the team started sitting players.",

  // ── Table Legend ──
  legendText:
    "Act = actual draft position (by win %). New = salary-weighted draft position (by total effective losses — most = best pick). ± = change (+ = better pick, − = worse pick). Eff L = effective losses (each loss × salary % active). Unernd = unearned losses (actual − effective). Win Sal% = avg salary % in wins. Loss Sal% = avg salary % in losses. L/W Ratio = Loss Sal% ÷ Win Sal% (below 1.0 = tanking signal). Click any team for their full game-by-game breakdown.",

  // ── Draft Position Tags ──
  // Teams that move this many spots or more get flagged
  draftMoveThreshold: 3,

  // Label for teams that lose draft position (tanking exposed)
  exposedLabel: "EXPOSED",
  // Label for teams that gain draft position (played full salary ethically)
  ethicalLabel: "ETHICAL",
};

export default CONFIG;
