import { useState, useMemo, useEffect } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip as ReTooltip, ResponsiveContainer, ReferenceLine,
  LineChart, Line, BarChart, Bar, Cell,
} from "recharts";
import CONFIG from "./config";

// ─── TEAM META ──────────────────────────────────────────────────────────────

const TEAM_META = {
  ATL: { name: "Atlanta Hawks", conf: "East", color: "#E03A3E", espn: "atl" },
  BOS: { name: "Boston Celtics", conf: "East", color: "#007A33", espn: "bos" },
  BKN: { name: "Brooklyn Nets", conf: "East", color: "#333333", espn: "bkn" },
  CHA: { name: "Charlotte Hornets", conf: "East", color: "#1D1160", espn: "cha" },
  CHI: { name: "Chicago Bulls", conf: "East", color: "#CE1141", espn: "chi" },
  CLE: { name: "Cleveland Cavaliers", conf: "East", color: "#860038", espn: "cle" },
  DAL: { name: "Dallas Mavericks", conf: "West", color: "#00538C", espn: "dal" },
  DEN: { name: "Denver Nuggets", conf: "West", color: "#0E2240", espn: "den" },
  DET: { name: "Detroit Pistons", conf: "East", color: "#C8102E", espn: "det" },
  GSW: { name: "Golden State Warriors", conf: "West", color: "#1D428A", espn: "gs" },
  HOU: { name: "Houston Rockets", conf: "West", color: "#CE1141", espn: "hou" },
  IND: { name: "Indiana Pacers", conf: "East", color: "#002D62", espn: "ind" },
  LAC: { name: "LA Clippers", conf: "West", color: "#C8102E", espn: "lac" },
  LAL: { name: "Los Angeles Lakers", conf: "West", color: "#552583", espn: "lal" },
  MEM: { name: "Memphis Grizzlies", conf: "West", color: "#5D76A9", espn: "mem" },
  MIA: { name: "Miami Heat", conf: "East", color: "#98002E", espn: "mia" },
  MIL: { name: "Milwaukee Bucks", conf: "East", color: "#00471B", espn: "mil" },
  MIN: { name: "Minnesota Timberwolves", conf: "West", color: "#0C2340", espn: "min" },
  NOP: { name: "New Orleans Pelicans", conf: "West", color: "#B4975A", espn: "no" },
  NYK: { name: "New York Knicks", conf: "East", color: "#F58426", espn: "ny" },
  OKC: { name: "Oklahoma City Thunder", conf: "West", color: "#007AC1", espn: "okc" },
  ORL: { name: "Orlando Magic", conf: "East", color: "#0077C0", espn: "orl" },
  PHI: { name: "Philadelphia 76ers", conf: "East", color: "#006BB6", espn: "phi" },
  PHX: { name: "Phoenix Suns", conf: "West", color: "#E56020", espn: "phx" },
  POR: { name: "Portland Trail Blazers", conf: "West", color: "#E03A3E", espn: "por" },
  SAC: { name: "Sacramento Kings", conf: "West", color: "#5A2D81", espn: "sac" },
  SAS: { name: "San Antonio Spurs", conf: "West", color: "#8a8d90", espn: "sa" },
  TOR: { name: "Toronto Raptors", conf: "East", color: "#CE1141", espn: "tor" },
  UTA: { name: "Utah Jazz", conf: "West", color: "#002B5C", espn: "utah" },
  WAS: { name: "Washington Wizards", conf: "East", color: "#002B5C", espn: "wsh" },
};

function getLogoUrl(abbr) {
  const espn = TEAM_META[abbr]?.espn || abbr.toLowerCase();
  return `https://a.espncdn.com/i/teamlogos/nba/500/${espn}.png`;
}

// ─── HASH ROUTER ────────────────────────────────────────────────────────────

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const handler = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo(0, 0);
}

// ─── STYLES ─────────────────────────────────────────────────────────────────

const CSS = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0c",
    color: "#d4d4d8",
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  container: { maxWidth: 1140, margin: "0 auto", padding: "0 20px" },
  mono: { fontFamily: "'IBM Plex Mono', monospace" },
};

// ─── SHARED COMPONENTS ──────────────────────────────────────────────────────

function Header({ season, setSeason, availableSeasons }) {
  return (
    <header
      style={{
        borderBottom: "1px solid #1e1e24",
        background: "linear-gradient(180deg, #111116 0%, #0a0a0c 100%)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          ...CSS.container,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            ⚖
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#f4f4f5",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {CONFIG.siteName}
            </div>
            <div style={{ fontSize: 11, color: "#52525b", fontWeight: 500 }}>
              {CONFIG.siteTagline}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {availableSeasons.map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid",
                borderColor: season === s ? "#f97316" : "#27272a",
                background: season === s ? "rgba(249,115,22,0.12)" : "transparent",
                color: season === s ? "#fb923c" : "#71717a",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function SalaryBar({ pct, width = 60, height = 8 }) {
  const color =
    pct >= 0.88 ? "#22c55e" : pct >= 0.78 ? "#eab308" : pct >= 0.68 ? "#f97316" : "#ef4444";
  return (
    <div style={{ width, height, borderRadius: 4, background: "#1e1e24", overflow: "hidden" }}>
      <div
        style={{
          width: `${pct * 100}%`,
          height: "100%",
          borderRadius: 4,
          background: color,
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

function TeamColorDot({ abbr, size = 10 }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: TEAM_META[abbr]?.color || "#555",
        flexShrink: 0,
      }}
    />
  );
}

function SectionCard({ children, style = {} }) {
  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid #1e1e24",
        background: "#111116",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function DraftTag({ change }) {
  const threshold = CONFIG.draftMoveThreshold;
  if (Math.abs(change) < threshold) return null;
  // Positive change = moved up in draft (e.g. 10→4) = ethical
  // Negative change = moved down in draft (e.g. 4→10) = exposed (tanking)
  const isExposed = change < 0;
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 700,
        padding: "2px 5px",
        borderRadius: 3,
        background: isExposed ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)",
        color: isExposed ? "#f87171" : "#4ade80",
        letterSpacing: "0.05em",
        flexShrink: 0,
      }}
    >
      {isExposed ? CONFIG.exposedLabel : CONFIG.ethicalLabel}
    </span>
  );
}

function LoadingSpinner() {
  return (
    <div
      style={{
        ...CSS.container,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "3px solid #1e1e24",
          borderTopColor: "#f97316",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ color: "#52525b", fontSize: 14, fontWeight: 500 }}>Loading season data…</div>
    </div>
  );
}

// ─── SCATTER PLOT ───────────────────────────────────────────────────────────

function TankScatterPlot({ data }) {
  const [hovered, setHovered] = useState(null);
  const chartData = data.teams.map((t) => ({
    abbr: t.abbr,
    name: t.name,
    losses: t.losses,
    effective_losses: t.effective_losses,
    unearned: Math.round((t.losses - t.effective_losses) * 10) / 10,
    color: TEAM_META[t.abbr]?.color || "#555",
    logoUrl: getLogoUrl(t.abbr),
  }));
  const maxLoss = Math.max(...chartData.map((d) => d.losses)) + 3;

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    const isHov = hovered === payload.abbr;
    const size = isHov ? 36 : 28;
    return (
      <g
        onMouseEnter={() => setHovered(payload.abbr)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate(`/team/${payload.abbr}`)}
        style={{ cursor: "pointer" }}
      >
        {isHov && (
          <circle cx={cx} cy={cy} r={22} fill={payload.color} opacity={0.25} />
        )}
        <image
          href={payload.logoUrl}
          x={cx - size / 2}
          y={cy - size / 2}
          width={size}
          height={size}
          opacity={hovered && !isHov ? 0.3 : 1}
          style={{ transition: "opacity 0.15s" }}
        />
        {isHov && (
          <g>
            <rect x={cx + size / 2 + 4} y={cy - 12} width={38} height={20} rx={4} fill="#18181b" stroke="#27272a" strokeWidth={1} />
            <text x={cx + size / 2 + 23} y={cy + 2} fill="#f4f4f5" fontSize={11} fontWeight={700} fontFamily="'IBM Plex Mono', monospace" textAnchor="middle">{payload.abbr}</text>
          </g>
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload: pl }) => {
    if (!active || !pl?.length) return null;
    const d = pl[0].payload;
    return (
      <div
        style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 8,
          padding: "12px 16px",
          fontSize: 13,
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <img src={d.logoUrl} alt={d.abbr} style={{ width: 40, height: 40 }} />
        <div>
          <div style={{ fontWeight: 700, color: "#f4f4f5", marginBottom: 4 }}>{d.name}</div>
          <div style={{ color: "#a1a1aa" }}>
            Actual losses: <span style={{ ...CSS.mono, color: "#e4e4e7" }}>{d.losses}</span>
          </div>
          <div style={{ color: "#a1a1aa" }}>
            Effective losses:{" "}
            <span style={{ ...CSS.mono, color: "#fb923c" }}>{d.effective_losses}</span>
          </div>
          <div style={{ color: "#a1a1aa" }}>
            Unearned losses: <span style={{ ...CSS.mono, color: "#f87171" }}>{d.unearned}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SectionCard style={{ padding: "24px 20px 14px" }}>
      <div style={{ marginBottom: 20, padding: "0 4px" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#e4e4e7" }}>{CONFIG.scatterTitle}</div>
        <div style={{ fontSize: 13, color: "#71717a", marginTop: 4, lineHeight: 1.5 }}>
          {CONFIG.scatterDescription}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={520}>
        <ScatterChart margin={{ top: 10, right: 30, bottom: 24, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e24" />
          <XAxis
            type="number"
            dataKey="losses"
            name="Actual Losses"
            domain={[0, maxLoss]}
            tick={{ fill: "#52525b", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: "#27272a" }}
            tickLine={{ stroke: "#27272a" }}
            label={{
              value: "Actual Losses",
              position: "bottom",
              offset: 8,
              fill: "#71717a",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
          <YAxis
            type="number"
            dataKey="effective_losses"
            name="Effective Losses"
            domain={[0, maxLoss]}
            tick={{ fill: "#52525b", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: "#27272a" }}
            tickLine={{ stroke: "#27272a" }}
            label={{
              value: "Effective Losses",
              angle: -90,
              position: "insideLeft",
              offset: 4,
              fill: "#71717a",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
          <ReferenceLine
            segment={[{ x: 0, y: 0 }, { x: maxLoss, y: maxLoss }]}
            stroke="#27272a"
            strokeDasharray="6 4"
            strokeWidth={1.5}
          />
          <ReTooltip content={<CustomTooltip />} cursor={false} />
          <Scatter data={chartData} shape={<CustomDot />} />
        </ScatterChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}

// ─── UNEARNED LOSSES BAR CHART ──────────────────────────────────────────────

function UnearnedLossesChart({ data }) {
  const chartData = data.teams
    .map((t) => ({
      abbr: t.abbr,
      name: t.name,
      unearned: Math.round((t.losses - t.effective_losses) * 10) / 10,
      color: TEAM_META[t.abbr]?.color || "#555",
    }))
    .sort((a, b) => b.unearned - a.unearned)
    .slice(0, 15);

  const CustomTooltip = ({ active, payload: pl }) => {
    if (!active || !pl?.length) return null;
    const d = pl[0].payload;
    return (
      <div
        style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 13,
        }}
      >
        <div style={{ fontWeight: 700, color: "#f4f4f5" }}>{d.name}</div>
        <div style={{ color: "#a1a1aa", marginTop: 2 }}>
          Unearned losses:{" "}
          <span style={{ ...CSS.mono, color: "#f87171", fontWeight: 700 }}>{d.unearned}</span>
        </div>
      </div>
    );
  };

  return (
    <SectionCard style={{ padding: "20px 16px 10px" }}>
      <div style={{ marginBottom: 16, padding: "0 4px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#e4e4e7" }}>{CONFIG.barChartTitle}</div>
        <div style={{ fontSize: 13, color: "#71717a", marginTop: 4 }}>
          {CONFIG.barChartDescription}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData} margin={{ top: 5, right: 16, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e24" vertical={false} />
          <XAxis
            dataKey="abbr"
            tick={{
              fill: "#71717a",
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
            axisLine={{ stroke: "#27272a" }}
            tickLine={false}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={50}
          />
          <YAxis
            tick={{ fill: "#52525b", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: "#27272a" }}
            tickLine={{ stroke: "#27272a" }}
          />
          <ReTooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar dataKey="unearned" radius={[4, 4, 0, 0]}>
            {chartData.map((d, i) => (
              <Cell
                key={i}
                fill={d.color}
                opacity={0.85}
                cursor="pointer"
                onClick={() => navigate(`/team/${d.abbr}`)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}

// ─── SALARY TIMELINE (TEAM PAGE) ────────────────────────────────────────────

function SalaryTimeline({ team }) {
  const chartData = team.games.map((g, i) => ({
    game: i + 1,
    date: g.date,
    salary_pct: Math.round(g.salary_pct * 100 * 10) / 10,
    wl: g.wl,
    opponent: g.opponent,
    effective_loss: g.effective_loss,
  }));

  const windowSize = 10;
  const withRolling = chartData.map((d, i) => {
    const start = Math.max(0, i - windowSize + 1);
    const w = chartData.slice(start, i + 1);
    const avg = w.reduce((s, x) => s + x.salary_pct, 0) / w.length;
    return { ...d, rolling_avg: Math.round(avg * 10) / 10 };
  });

  const CustomTooltip = ({ active, payload: pl }) => {
    if (!active || !pl?.length) return null;
    const d = pl[0].payload;
    const color = d.wl === "W" ? "#4ade80" : "#f87171";
    return (
      <div
        style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 13,
        }}
      >
        <div style={{ fontWeight: 700, color: "#f4f4f5", marginBottom: 4 }}>
          Game {d.game} — {d.date}
        </div>
        <div style={{ color: "#a1a1aa" }}>
          vs <span style={{ fontWeight: 600, color: "#e4e4e7" }}>{d.opponent}</span> ·{" "}
          <span style={{ color, fontWeight: 700 }}>{d.wl}</span>
        </div>
        <div style={{ color: "#a1a1aa", marginTop: 2 }}>
          Salary active:{" "}
          <span style={{ ...CSS.mono, color: "#fb923c", fontWeight: 600 }}>{d.salary_pct}%</span>
        </div>
        <div style={{ color: "#a1a1aa" }}>
          10-game avg:{" "}
          <span style={{ ...CSS.mono, color: "#818cf8", fontWeight: 600 }}>{d.rolling_avg}%</span>
        </div>
        {d.wl === "L" && (
          <div style={{ color: "#a1a1aa" }}>
            Effective loss:{" "}
            <span style={{ ...CSS.mono, color: "#f97316", fontWeight: 600 }}>
              {d.effective_loss.toFixed(3)}
            </span>
          </div>
        )}
      </div>
    );
  };

  const CustomDot = (props) => {
    const { cx, cy, payload, dataKey } = props;
    if (!cx || !cy || dataKey !== "salary_pct") return null;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={2.5}
        fill={payload.wl === "W" ? "#22c55e" : "#ef4444"}
        opacity={0.6}
      />
    );
  };

  return (
    <SectionCard style={{ padding: "20px 16px 10px" }}>
      <div style={{ marginBottom: 16, padding: "0 4px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#e4e4e7" }}>
          {CONFIG.timelineTitle}
        </div>
        <div style={{ fontSize: 13, color: "#71717a", marginTop: 4, lineHeight: 1.5 }}>
          {CONFIG.timelineDescription}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={withRolling} margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e24" />
          <XAxis
            dataKey="game"
            tick={{ fill: "#52525b", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: "#27272a" }}
            tickLine={{ stroke: "#27272a" }}
            label={{
              value: "Game #",
              position: "bottom",
              offset: -2,
              fill: "#52525b",
              fontSize: 11,
            }}
          />
          <YAxis
            domain={[10, 100]}
            tick={{ fill: "#52525b", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}
            axisLine={{ stroke: "#27272a" }}
            tickLine={{ stroke: "#27272a" }}
            tickFormatter={(v) => `${v}%`}
          />
          <ReTooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={75}
            stroke="#f9731640"
            strokeDasharray="6 4"
            label={{
              value: "75% threshold",
              fill: "#f9731660",
              fontSize: 10,
              position: "right",
            }}
          />
          <Line
            type="monotone"
            dataKey="salary_pct"
            stroke="transparent"
            dot={<CustomDot />}
            activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="rolling_avg"
            stroke="#818cf8"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </SectionCard>
  );
}

// ─── STANDINGS PAGE ─────────────────────────────────────────────────────────

function StandingsPage({ data }) {
  const [sortBy, setSortBy] = useState("actual_worst");
  const [confFilter, setConfFilter] = useState("All");
  const [lotteryOnly, setLotteryOnly] = useState(false);

  // Compute lottery teams (bottom 14 by win pct = top 14 draft picks)
  const lotteryTeams = useMemo(() => {
    const sorted = [...data.teams]
      .map((t) => ({ abbr: t.abbr, win_pct: t.wins / (t.wins + t.losses) }))
      .sort((a, b) => a.win_pct - b.win_pct);
    return new Set(sorted.slice(0, 14).map((t) => t.abbr));
  }, [data]);

  // Filtered data for charts (respects lottery filter)
  const filteredData = useMemo(() => {
    if (!lotteryOnly) return data;
    return { ...data, teams: data.teams.filter((t) => lotteryTeams.has(t.abbr)) };
  }, [data, lotteryOnly, lotteryTeams]);

  const standings = useMemo(() => {
    let teams = [...data.teams];
    if (confFilter !== "All") teams = teams.filter((t) => t.conference === confFilter);
    if (lotteryOnly) teams = teams.filter((t) => lotteryTeams.has(t.abbr));
    teams = teams.map((t) => {
      const winSal = t.avg_win_salary_pct;
      const lossSal = t.avg_loss_salary_pct;
      const ratio = winSal > 0 ? Math.round((lossSal / winSal) * 1000) / 1000 : 0;
      return {
        ...t,
        win_pct: t.wins / (t.wins + t.losses),
        eff_win_pct: t.wins / (t.wins + t.effective_losses),
        unearned_losses: Math.round((t.losses - t.effective_losses) * 10) / 10,
        loss_win_ratio: ratio,
      };
    });

    // Draft positions are computed against ALL teams, not just filtered
    const allTeams = data.teams.map((t) => ({
      ...t,
      win_pct: t.wins / (t.wins + t.losses),
      eff_win_pct: t.wins / (t.wins + t.effective_losses),
    }));
    const byWorst = [...allTeams].sort((a, b) => a.win_pct - b.win_pct);
    const byEffWorst = [...allTeams].sort((a, b) => b.effective_losses - a.effective_losses);
    const actualDraft = {};
    const effDraft = {};
    byWorst.forEach((t, i) => (actualDraft[t.abbr] = i + 1));
    byEffWorst.forEach((t, i) => (effDraft[t.abbr] = i + 1));
    teams = teams.map((t) => ({
      ...t,
      actual_draft: actualDraft[t.abbr],
      eff_draft: effDraft[t.abbr],
      draft_change: actualDraft[t.abbr] - effDraft[t.abbr],
    }));

    if (sortBy === "actual_worst") teams.sort((a, b) => a.win_pct - b.win_pct);
    else if (sortBy === "eff_worst") teams.sort((a, b) => b.effective_losses - a.effective_losses);
    else if (sortBy === "most_unearned") teams.sort((a, b) => b.unearned_losses - a.unearned_losses);
    else if (sortBy === "actual_best") teams.sort((a, b) => b.win_pct - a.win_pct);
    return teams;
  }, [data, sortBy, confFilter, lotteryOnly, lotteryTeams]);

  const sortOptions = [
    { key: "actual_worst", label: "Draft Order" },
    { key: "eff_worst", label: "Eff. Draft Order" },
    { key: "most_unearned", label: "Most Unearned" },
    { key: "actual_best", label: "Best Record" },
  ];

  const gridCols = "48px 48px 48px 1fr 70px 66px 72px 82px 82px 72px";

  return (
    <div style={CSS.container}>
      {/* Hero */}
      <div style={{ padding: "48px 0 20px" }}>
        <h1
          style={{
            fontSize: "clamp(26px, 4.5vw, 40px)",
            fontWeight: 800,
            color: "#f4f4f5",
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          {CONFIG.heroTitle}
          <br />
          <span style={{ color: "#f97316" }}>{CONFIG.heroTitleAccent}</span>
        </h1>
        <p
          style={{
            color: "#71717a",
            fontSize: 15,
            maxWidth: 580,
            marginTop: 14,
            lineHeight: 1.65,
          }}
        >
          {CONFIG.heroDescription}
        </p>
      </div>

      {/* Charts */}
      <div style={{ marginBottom: 14 }}>
        <TankScatterPlot data={filteredData} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <UnearnedLossesChart data={filteredData} />
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {["All", "East", "West"].map((c) => (
            <button
              key={c}
              onClick={() => setConfFilter(c)}
              style={{
                padding: "5px 12px",
                borderRadius: 5,
                border: "1px solid",
                borderColor: confFilter === c ? "#3f3f46" : "#1e1e24",
                background: confFilter === c ? "#18181b" : "transparent",
                color: confFilter === c ? "#d4d4d8" : "#52525b",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              style={{
                padding: "5px 12px",
                borderRadius: 5,
                border: "1px solid",
                borderColor: sortBy === opt.key ? "#f9731640" : "#1e1e24",
                background: sortBy === opt.key ? "rgba(249,115,22,0.08)" : "transparent",
                color: sortBy === opt.key ? "#fb923c" : "#52525b",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {opt.label}
            </button>
          ))}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginLeft: 8,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: lotteryOnly ? "#fb923c" : "#52525b",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={lotteryOnly}
              onChange={(e) => setLotteryOnly(e.target.checked)}
              style={{ accentColor: "#f97316", cursor: "pointer" }}
            />
            Lottery teams only
          </label>
        </div>
      </div>

      {/* Table */}
      <SectionCard>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            padding: "12px 16px",
            background: "#0c0c10",
            borderBottom: "1px solid #1e1e24",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#52525b",
            textTransform: "uppercase",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>Act</div>
          <div style={{ textAlign: "center" }}>New</div>
          <div style={{ textAlign: "center" }}>±</div>
          <div>Team</div>
          <div style={{ textAlign: "center" }}>W-L</div>
          <div style={{ textAlign: "center" }}>Eff L</div>
          <div style={{ textAlign: "center" }}>Unernd</div>
          <div style={{ textAlign: "center" }}>Win Sal%</div>
          <div style={{ textAlign: "center" }}>Loss Sal%</div>
          <div style={{ textAlign: "center" }}>L/W Ratio</div>
        </div>

        {standings.map((t) => {
          const chg = t.draft_change;
          const isBigMover = Math.abs(chg) >= CONFIG.draftMoveThreshold;
          const ratioColor =
            t.loss_win_ratio < 0.85
              ? "#f87171"
              : t.loss_win_ratio < 0.93
                ? "#eab308"
                : "#52525b";
          return (
            <div
              key={t.abbr}
              onClick={() => navigate(`/team/${t.abbr}`)}
              style={{
                display: "grid",
                gridTemplateColumns: gridCols,
                padding: "11px 16px",
                borderBottom: "1px solid #141418",
                cursor: "pointer",
                transition: "background 0.1s",
                alignItems: "center",
                background: isBigMover ? "rgba(249,115,22,0.03)" : "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#18181b")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = isBigMover
                  ? "rgba(249,115,22,0.03)"
                  : "transparent")
              }
            >
              <div style={{ textAlign: "center", ...CSS.mono, fontSize: 12, color: "#52525b" }}>
                {t.actual_draft}
              </div>
              <div
                style={{
                  textAlign: "center",
                  ...CSS.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#d4d4d8",
                }}
              >
                {t.eff_draft}
              </div>
              <div
                style={{
                  textAlign: "center",
                  ...CSS.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  color: chg > 0 ? "#4ade80" : chg < 0 ? "#f87171" : "#3f3f46",
                }}
              >
                {chg > 0 ? `+${chg}` : chg < 0 ? `${chg}` : "—"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <img src={getLogoUrl(t.abbr)} alt={t.abbr} style={{ width: 24, height: 24, flexShrink: 0 }} />
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#e4e4e7",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.name}
                </span>
                <DraftTag change={chg} />
              </div>
              <div
                style={{ textAlign: "center", ...CSS.mono, fontSize: 13, fontWeight: 600, color: "#a1a1aa" }}
              >
                {t.wins}-{t.losses}
              </div>
              <div
                style={{ textAlign: "center", ...CSS.mono, fontSize: 13, fontWeight: 700, color: "#fb923c" }}
              >
                {t.effective_losses.toFixed(1)}
              </div>
              <div
                style={{
                  textAlign: "center",
                  ...CSS.mono,
                  fontSize: 13,
                  fontWeight: 600,
                  color:
                    t.unearned_losses > 5
                      ? "#f87171"
                      : t.unearned_losses > 2
                        ? "#eab308"
                        : "#52525b",
                }}
              >
                {t.unearned_losses.toFixed(1)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <SalaryBar pct={t.avg_win_salary_pct} width={52} height={5} />
                <span style={{ ...CSS.mono, fontSize: 10, color: "#71717a" }}>
                  {(t.avg_win_salary_pct * 100).toFixed(0)}%
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <SalaryBar pct={t.avg_loss_salary_pct} width={52} height={5} />
                <span style={{ ...CSS.mono, fontSize: 10, color: "#71717a" }}>
                  {(t.avg_loss_salary_pct * 100).toFixed(0)}%
                </span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  ...CSS.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  color: ratioColor,
                }}
              >
                {t.loss_win_ratio.toFixed(2)}
              </div>
            </div>
          );
        })}
      </SectionCard>

      {/* Legend */}
      <div
        style={{
          marginTop: 16,
          padding: "14px 16px",
          background: "#111116",
          borderRadius: 10,
          border: "1px solid #1e1e24",
          fontSize: 12,
          color: "#52525b",
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: "#71717a", fontWeight: 700 }}>Reading the table: </span>
        {CONFIG.legendText}
      </div>

      <div style={{ height: 60 }} />
    </div>
  );
}

// ─── TEAM PAGE ──────────────────────────────────────────────────────────────

function TeamPage({ data, abbr }) {
  const team = data.teams.find((t) => t.abbr === abbr);
  if (!team) {
    return (
      <div style={{ ...CSS.container, padding: "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 18, color: "#71717a" }}>Team not found</div>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 20,
            padding: "8px 20px",
            borderRadius: 6,
            border: "1px solid #27272a",
            background: "transparent",
            color: "#a1a1aa",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          ← Back
        </button>
      </div>
    );
  }

  const meta = TEAM_META[abbr] || { name: team.name, conf: team.conference, color: "#555" };
  const effLosses = team.effective_losses;
  const unearned = Math.round((team.losses - effLosses) * 10) / 10;
  const winSal = team.avg_win_salary_pct;
  const lossSal = team.avg_loss_salary_pct;
  const ratio = winSal > 0 ? lossSal / winSal : 0;

  let runW = 0;
  let runL = 0;
  let runEffL = 0;
  const gamesWithRunning = team.games.map((g) => {
    if (g.wl === "W") runW++;
    else runL++;
    runEffL += g.effective_loss;
    return { ...g, runW, runL, runEffL: Math.round(runEffL * 10) / 10 };
  });

  return (
    <div style={CSS.container}>
      <div style={{ paddingTop: 24 }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: "1px solid #27272a",
            background: "transparent",
            color: "#71717a",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          ← Standings
        </button>
      </div>

      {/* Team header */}
      <div style={{ padding: "32px 0 28px", display: "flex", alignItems: "flex-start", gap: 18 }}>
        <img
          src={getLogoUrl(abbr)}
          alt={abbr}
          style={{
            width: 56,
            height: 56,
            flexShrink: 0,
          }}
        />
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#f4f4f5",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {team.name}
          </h1>
          <div style={{ fontSize: 14, color: "#71717a", marginTop: 4, fontWeight: 500 }}>
            {data.season} · {team.conference}ern Conference
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Record", value: `${team.wins}-${team.losses}`, color: "#e4e4e7" },
          { label: "Effective Losses", value: effLosses.toFixed(1), color: "#fb923c" },
          {
            label: "Unearned Losses",
            value: unearned.toFixed(1),
            color: unearned > 5 ? "#f87171" : "#eab308",
          },
          { label: "Win Sal %", value: `${(winSal * 100).toFixed(1)}%`, color: "#a1a1aa" },
          {
            label: "Loss Sal %",
            value: `${(lossSal * 100).toFixed(1)}%`,
            color: lossSal < 0.75 ? "#f87171" : "#a1a1aa",
          },
          {
            label: "L/W Ratio",
            value: ratio.toFixed(3),
            color: ratio < 0.85 ? "#f87171" : ratio < 0.93 ? "#eab308" : "#a1a1aa",
          },
          {
            label: "Salary Cap",
            value: `$${Math.round(team.max_salary / 1e6)}M`,
            color: "#a1a1aa",
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              padding: "16px",
              borderRadius: 10,
              background: "#111116",
              border: "1px solid #1e1e24",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#52525b",
                marginBottom: 6,
              }}
            >
              {card.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: card.color, ...CSS.mono }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Salary Timeline */}
      <div style={{ marginBottom: 24 }}>
        <SalaryTimeline team={team} />
      </div>

      {/* Game log */}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#a1a1aa", marginBottom: 12 }}>
        Game Log
      </h2>
      <SectionCard>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "36px 88px 44px 52px 76px 70px 80px 80px 1fr",
            padding: "10px 14px",
            background: "#0c0c10",
            borderBottom: "1px solid #1e1e24",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#52525b",
            textTransform: "uppercase",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>#</div>
          <div>Date</div>
          <div style={{ textAlign: "center" }}>H/A</div>
          <div>Opp</div>
          <div style={{ textAlign: "center" }}>Score</div>
          <div style={{ textAlign: "center" }}>Sal %</div>
          <div style={{ textAlign: "center" }}>Eff Loss</div>
          <div style={{ textAlign: "center" }}>Record</div>
          <div style={{ textAlign: "center" }}>Run Eff L</div>
        </div>
        {gamesWithRunning.map((g, i) => {
          const isLoss = g.wl === "L";
          const salColor =
            g.salary_pct >= 0.88
              ? "#22c55e"
              : g.salary_pct >= 0.78
                ? "#eab308"
                : g.salary_pct >= 0.68
                  ? "#f97316"
                  : "#ef4444";
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "36px 88px 44px 52px 76px 70px 80px 80px 1fr",
                padding: "8px 14px",
                borderBottom: "1px solid #141418",
                fontSize: 13,
                alignItems: "center",
                background:
                  isLoss && g.salary_pct < 0.72 ? "rgba(239,68,68,0.04)" : "transparent",
              }}
            >
              <div style={{ textAlign: "center", ...CSS.mono, fontSize: 11, color: "#3f3f46" }}>
                {i + 1}
              </div>
              <div style={{ ...CSS.mono, fontSize: 12, color: "#71717a" }}>{g.date}</div>
              <div style={{ textAlign: "center", fontSize: 11, color: "#52525b", fontWeight: 600 }}>
                {g.home_away === "H" ? "vs" : "@"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <img src={getLogoUrl(g.opponent)} alt={g.opponent} style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span style={{ ...CSS.mono, fontSize: 12, color: "#a1a1aa", fontWeight: 600 }}>
                  {g.opponent}
                </span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  ...CSS.mono,
                  fontSize: 12,
                  fontWeight: 700,
                  color: isLoss ? "#f87171" : "#4ade80",
                }}
              >
                {isLoss ? "L" : "W"} {g.pts_for}-{g.pts_against}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <SalaryBar pct={g.salary_pct} width={44} height={4} />
                <span style={{ ...CSS.mono, fontSize: 10, color: salColor }}>
                  {(g.salary_pct * 100).toFixed(0)}%
                </span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  ...CSS.mono,
                  fontSize: 12,
                  fontWeight: isLoss ? 700 : 400,
                  color: isLoss ? (g.salary_pct < 0.75 ? "#f97316" : "#a1a1aa") : "#3f3f46",
                }}
              >
                {isLoss ? g.effective_loss.toFixed(3) : "—"}
              </div>
              <div style={{ textAlign: "center", ...CSS.mono, fontSize: 12, color: "#71717a" }}>
                {g.runW}-{g.runL}
              </div>
              <div
                style={{
                  textAlign: "center",
                  ...CSS.mono,
                  fontSize: 12,
                  color: "#fb923c",
                  fontWeight: 600,
                }}
              >
                {g.runEffL.toFixed(1)}
              </div>
            </div>
          );
        })}
      </SectionCard>

      <div style={{ height: 60 }} />
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  const hash = useHashRoute();
  const [season, setSeason] = useState(CONFIG.seasons[0]);
  const [seasonCache, setSeasonCache] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch season data on season change
  useEffect(() => {
    if (seasonCache[season]) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/data/${season}.json`)
      .then((r) => r.json())
      .then((json) => {
        setSeasonCache((prev) => ({ ...prev, [season]: json }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load season data:", err);
        setLoading(false);
      });
  }, [season]);

  const data = seasonCache[season];

  let page = "standings";
  let teamAbbr = null;
  if (hash.startsWith("#/team/")) {
    page = "team";
    teamAbbr = hash.replace("#/team/", "").toUpperCase();
  }

  return (
    <div style={CSS.page}>
      <Header season={season} setSeason={setSeason} availableSeasons={CONFIG.seasons} />
      {loading || !data ? (
        <LoadingSpinner />
      ) : (
        <>
          {page === "standings" && <StandingsPage data={data} />}
          {page === "team" && <TeamPage data={data} abbr={teamAbbr} />}
        </>
      )}
    </div>
  );
}
