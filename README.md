# NBA Salary-Weighted Losses

An interactive tool that re-calculates NBA standings by weighting each loss by the percentage of team salary that actually played. Designed to expose tanking.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Deploy to Vercel (free)

```bash
npm install -g vercel    # one-time setup
vercel                   # first deploy — follow prompts
vercel --prod            # subsequent deploys
```

Vercel will give you a public URL like `nba-tank-tracker.vercel.app`.

## Project Structure

```
nba-tank-tracker/
├── public/
│   └── data/
│       └── 2024-25.json        ← season data (add more files for more seasons)
├── src/
│   ├── App.jsx                 ← all UI components and pages
│   ├── config.js               ← editable text, labels, thresholds
│   └── main.jsx                ← React entry point
├── index.html                  ← HTML shell with fonts
├── package.json
└── vite.config.js
```

## Adding a New Season

1. Run your Python data pipeline to generate a new JSON file (e.g. `2023-24.json`)
2. Drop it into `public/data/`
3. Add the season to the `seasons` array in `src/config.js`:
   ```js
   seasons: ["2024-25", "2023-24"],
   ```
4. Redeploy: `vercel --prod`

## Editing Text & Thresholds

All user-facing text is in `src/config.js`:

- **Site name & tagline** — header bar
- **Hero title & description** — main page headline
- **Chart titles** — scatter plot, bar chart, timeline
- **Legend text** — explanation below the standings table
- **`draftMoveThreshold`** — how many draft spots a team must move to get tagged (default: 3)
- **`exposedLabel` / `ethicalLabel`** — the tag text shown on flagged teams

## JSON Schema

Each season file follows this structure:

```json
{
  "season": "2024-25",
  "generated_at": "2025-02-11T15:30:00Z",
  "teams": [
    {
      "abbr": "DET",
      "name": "Detroit Pistons",
      "conference": "East",
      "wins": 44,
      "losses": 38,
      "effective_losses": 28.6,
      "avg_salary_pct": 0.756,
      "avg_win_salary_pct": 0.759,
      "avg_loss_salary_pct": 0.753,
      "max_salary": 165432100,
      "games": [
        {
          "game_id": "0022400123",
          "date": "2024-10-22",
          "opponent": "MIL",
          "home_away": "H",
          "wl": "L",
          "pts_for": 98,
          "pts_against": 112,
          "active_salary": 95230000,
          "max_salary": 165432100,
          "salary_pct": 0.576,
          "effective_loss": 0.576
        }
      ]
    }
  ]
}
```

Key rules:
- `effective_loss` = `salary_pct` if loss, `0` if win
- `effective_losses` (team level) = sum of all `effective_loss` values
- `max_salary` = sum of salaries of every player who appeared for the team during the season
- `salary_pct` = `active_salary / max_salary`
- Team abbreviations must match: ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS
