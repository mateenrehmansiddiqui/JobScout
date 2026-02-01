import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionHistory.css";

/**
 * JobScout — Session History Page
 * Route: /session/history
 * Normal CSS (same folder)
 */

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function badgeTone(score) {
  if (score >= 85) return "badgeGood";
  if (score >= 70) return "badgeBlue";
  if (score >= 55) return "badgeWarn";
  return "badgeBad";
}

export default function SessionHistory() {
  const navigate = useNavigate();

  // Demo data (replace with API later)
  const sessions = useMemo(
    () => [
      {
        id: "S-1009",
        dateTime: "2026-01-26T10:20:00.000Z",
        role: "Software Engineer",
        type: "Technical",
        score: 78,
        duration: "23m 40s",
        percentile: 25,
      },
      {
        id: "S-1008",
        dateTime: "2026-01-24T16:05:00.000Z",
        role: "Data Analyst",
        type: "Behavioral",
        score: 69,
        duration: "18m 10s",
        percentile: 38,
      },
      {
        id: "S-1007",
        dateTime: "2026-01-22T09:12:00.000Z",
        role: "Product Manager",
        type: "Mixed",
        score: 82,
        duration: "27m 05s",
        percentile: 18,
      },
      {
        id: "S-1006",
        dateTime: "2026-01-18T20:35:00.000Z",
        role: "Software Engineer",
        type: "Panel",
        score: 61,
        duration: "25m 00s",
        percentile: 46,
      },
      {
        id: "S-1005",
        dateTime: "2026-01-15T11:48:00.000Z",
        role: "Data Scientist",
        type: "Technical",
        score: 88,
        duration: "31m 20s",
        percentile: 9,
      },
    ],
    []
  );

  // Filters
  const [q, setQ] = useState("");
  const [from, setFrom] = useState(""); // yyyy-mm-dd
  const [to, setTo] = useState(""); // yyyy-mm-dd
  const [role, setRole] = useState("All");
  const [type, setType] = useState("All");
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);
  const [sortBy, setSortBy] = useState("recent"); // recent | high | low

  const roleOptions = useMemo(() => {
    const unique = Array.from(new Set(sessions.map((s) => s.role))).sort();
    return ["All", ...unique];
  }, [sessions]);

  const typeOptions = ["All", "Technical", "Behavioral", "Mixed", "Panel"];

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = sessions.filter((s) => {
      // Text search
      const matchesQuery =
        !query ||
        s.role.toLowerCase().includes(query) ||
        s.type.toLowerCase().includes(query) ||
        s.id.toLowerCase().includes(query);

      // Role filter
      const matchesRole = role === "All" ? true : s.role === role;

      // Type filter
      const matchesType = type === "All" ? true : s.type === type;

      // Score range
      const matchesScore = s.score >= minScore && s.score <= maxScore;

      // Date range
      const d = new Date(s.dateTime);
      const matchesFrom = from ? d >= new Date(from + "T00:00:00") : true;
      const matchesTo = to ? d <= new Date(to + "T23:59:59") : true;

      return matchesQuery && matchesRole && matchesType && matchesScore && matchesFrom && matchesTo;
    });

    // Sort
    list.sort((a, b) => {
      if (sortBy === "recent") return new Date(b.dateTime) - new Date(a.dateTime);
      if (sortBy === "high") return b.score - a.score;
      if (sortBy === "low") return a.score - b.score;
      return 0;
    });

    return list;
  }, [sessions, q, role, type, minScore, maxScore, from, to, sortBy]);

  const resetFilters = () => {
    setQ("");
    setFrom("");
    setTo("");
    setRole("All");
    setType("All");
    setMinScore(0);
    setMaxScore(100);
    setSortBy("recent");
  };

  const viewDetails = (s) => {
    // Navigate to Results Page and pass a minimal payload via state
    // Later you can use session id to fetch full details from backend.
    navigate("/session/results", {
      state: {
        sessionId: s.id,
        sessionMeta: s,
      },
    });
  };

  // Small summary stats for usefulness
  const stats = useMemo(() => {
    const total = sessions.length;
    const best = Math.max(...sessions.map((s) => s.score));
    const avg = Math.round(sessions.reduce((acc, s) => acc + s.score, 0) / total);
    return { total, best, avg };
  }, [sessions]);

  return (
    <div className="histPage">
      <div className="histContainer">
        {/* Header */}
        <div className="histHeader">
          <div>
            <div className="histKicker">Sessions</div>
            <h1 className="histTitle">Your Interview History</h1>
            <p className="histSub">
              Search, filter, and reopen any session to review detailed feedback and download reports.
            </p>
          </div>

          <div className="histStats">
            <div className="statCard">
              <div className="statLabel">Total Sessions</div>
              <div className="statValue">{stats.total}</div>
            </div>
            <div className="statCard">
              <div className="statLabel">Best Score</div>
              <div className="statValue">{stats.best}</div>
            </div>
            <div className="statCard">
              <div className="statLabel">Avg Score</div>
              <div className="statValue">{stats.avg}</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filterCard">
          <div className="filterRow">
            <div className="filterGroup wide">
              <label className="filterLabel">Search</label>
              <input
                className="input"
                placeholder="Search by role, type, or session ID…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="filterGroup">
              <label className="filterLabel">From</label>
              <input className="input" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>

            <div className="filterGroup">
              <label className="filterLabel">To</label>
              <input className="input" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
          </div>

          <div className="filterRow">
            <div className="filterGroup">
              <label className="filterLabel">Role</label>
              <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
                {roleOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">Interview Type</label>
              <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="filterGroup scoreGroup">
              <label className="filterLabel">Score Range</label>
              <div className="scoreRow">
                <div className="scorePill">
                  Min <strong>{minScore}</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minScore}
                  onChange={(e) => setMinScore(clamp(parseInt(e.target.value, 10), 0, maxScore))}
                />
                <div className="scorePill">
                  Max <strong>{maxScore}</strong>
                </div>
              </div>
              <div className="scoreRow" style={{ marginTop: 6 }}>
                <div className="scorePill subtle">0</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={maxScore}
                  onChange={(e) => setMaxScore(clamp(parseInt(e.target.value, 10), minScore, 100))}
                />
                <div className="scorePill subtle">100</div>
              </div>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">Sort By</label>
              <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="high">Highest Score</option>
                <option value="low">Lowest Score</option>
              </select>
            </div>
          </div>

          <div className="filterActions">
            <div className="resultCount">{filtered.length} result(s)</div>
            <button className="btnGhost" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        {/* Table (desktop) */}
        <div className="tableCard">
          <div className="tableHeader">
            <div>Date & Time</div>
            <div>Role/Job Title</div>
            <div>Interview Type</div>
            <div>Score</div>
            <div>Duration</div>
            <div>Percentile</div>
            <div></div>
          </div>

          {filtered.length === 0 ? (
            <div className="emptyState">
              No sessions match your filters. Try resetting filters or widening the date/score range.
            </div>
          ) : (
            filtered.map((s) => (
              <div key={s.id} className="tableRow">
                <div className="cell">
                  <div className="mutedSmall">{s.id}</div>
                  <div className="strong">{formatDateTime(s.dateTime)}</div>
                </div>

                <div className="cell strong">{s.role}</div>
                <div className="cell">
                  <span className="typePill">{s.type}</span>
                </div>

                <div className="cell">
                  <span className={`scoreBadge ${badgeTone(s.score)}`}>{s.score}</span>
                </div>

                <div className="cell">{s.duration}</div>
                <div className="cell">{s.percentile ? `Top ${s.percentile}%` : "-"}</div>

                <div className="cell right">
                  <button className="btnPrimary" onClick={() => viewDetails(s)}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cards (mobile) */}
        <div className="cardGridMobile">
          {filtered.map((s) => (
            <div key={s.id} className="mobileCard">
              <div className="mobileTop">
                <div>
                  <div className="mutedSmall">{s.id}</div>
                  <div className="strong">{formatDateTime(s.dateTime)}</div>
                </div>
                <span className={`scoreBadge ${badgeTone(s.score)}`}>{s.score}</span>
              </div>

              <div className="mobileMid">
                <div className="rowLine">
                  <span className="mutedSmall">Role</span>
                  <span className="strong">{s.role}</span>
                </div>
                <div className="rowLine">
                  <span className="mutedSmall">Type</span>
                  <span className="typePill">{s.type}</span>
                </div>
                <div className="rowLine">
                  <span className="mutedSmall">Duration</span>
                  <span className="strong">{s.duration}</span>
                </div>
                <div className="rowLine">
                  <span className="mutedSmall">Percentile</span>
                  <span className="strong">{s.percentile ? `Top ${s.percentile}%` : "-"}</span>
                </div>
              </div>

              <button className="btnPrimary full" onClick={() => viewDetails(s)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

