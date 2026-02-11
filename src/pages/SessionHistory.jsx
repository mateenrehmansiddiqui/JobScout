import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SessionHistory.css";

/**
 * JobScout — Session History Page
 * Route: /session/history
 * Normal CSS (same folder)
 */

const clamp = (n, min, max) => Math.max(min, Math.min(n, n));

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

function getProgressColor(score) {
  if (score >= 85) return "#10b981";
  if (score >= 70) return "#3b82f6";
  if (score >= 55) return "#f59e0b";
  return "#ef4444";
}

function getTypeColor(type) {
  const colors = {
    "Technical": "#3b82f6",
    "Behavioral": "#8b5cf6",
    "Mixed": "#06b6d4",
    "Panel": "#f59e0b"
  };
  return colors[type] || "#64748b";
}

export default function SessionHistory() {
  const navigate = useNavigate();

  // Demo data (replace with API later)
  const sessions = useMemo(
    () => [
      {
        id: "S-1015",
        dateTime: "2026-02-10T14:30:00.000Z",
        role: "Senior Frontend Developer",
        type: "Technical",
        score: 92,
        duration: "35m 15s",
        percentile: 5,
      },
      {
        id: "S-1014",
        dateTime: "2026-02-08T09:45:00.000Z",
        role: "UX Designer",
        type: "Behavioral",
        score: 85,
        duration: "28m 30s",
        percentile: 12,
      },
      {
        id: "S-1013",
        dateTime: "2026-02-05T16:20:00.000Z",
        role: "Backend Engineer",
        type: "Technical",
        score: 79,
        duration: "42m 10s",
        percentile: 22,
      },
      {
        id: "S-1012",
        dateTime: "2026-02-03T11:15:00.000Z",
        role: "Product Manager",
        type: "Panel",
        score: 88,
        duration: "38m 25s",
        percentile: 8,
      },
      {
        id: "S-1011",
        dateTime: "2026-02-01T13:50:00.000Z",
        role: "Data Scientist",
        type: "Mixed",
        score: 76,
        duration: "33m 45s",
        percentile: 28,
      },
      {
        id: "S-1010",
        dateTime: "2026-01-30T10:25:00.000Z",
        role: "DevOps Engineer",
        type: "Technical",
        score: 83,
        duration: "29m 20s",
        percentile: 15,
      },
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
        role: "Cloud Architect",
        type: "Panel",
        score: 86,
        duration: "40m 30s",
        percentile: 11,
      },
      {
        id: "S-1006",
        dateTime: "2026-01-18T20:35:00.000Z",
        role: "Mobile Developer",
        type: "Mixed",
        score: 77,
        duration: "30m 45s",
        percentile: 24,
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
  const [viewMode, setViewMode] = useState("table"); // table | card

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
        {/* Enhanced Header Section */}
        <div className="histHeader">
          <div className="headerLeft">
            <div className="histKicker">Performance Analytics</div>
            <h1 className="histTitle">Your Interview History</h1>
            <p className="histSub">
              Track your progress, analyze patterns, and improve your interview performance with detailed insights.
            </p>
          </div>
          
          <div className="headerActions">
            <button className="btnExport">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Data
            </button>
          </div>
        </div>

        {/* Enhanced Stats Dashboard */}
        <div className="statsDashboard">
          <div className="statCard primary">
            <div className="statIcon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <div className="statContent">
              <div className="statLabel">Total Sessions</div>
              <div className="statValue">{stats.total}</div>
              <div className="statTrend">+12% from last month</div>
            </div>
          </div>
          
          <div className="statCard success">
            <div className="statIcon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <div className="statContent">
              <div className="statLabel">Best Score</div>
              <div className="statValue">{stats.best}%</div>
              <div className="statTrend">Excellent performance</div>
            </div>
          </div>
          
          <div className="statCard info">
            <div className="statIcon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div className="statContent">
              <div className="statLabel">Average Score</div>
              <div className="statValue">{stats.avg}%</div>
              <div className="statTrend">+5% improvement</div>
            </div>
          </div>
          
          <div className="performanceChart">
            <div className="chartHeader">
              <div className="chartTitle">Performance Trend</div>
              <div className="chartLegend">
                <span className="legendItem">Last 5 sessions</span>
              </div>
            </div>
            <div className="chartBars">
              {sessions.slice(-5).map((session, index) => (
                <div key={session.id} className="barContainer">
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${session.score}%`,
                      backgroundColor: getProgressColor(session.score)
                    }}
                  />
                  <div className="barLabel">{session.score}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <div className="filterSection">
          <div className="filterHeader">
            <div className="filterTitle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filters & Search
            </div>
            <div className="filterActions">
              <span className="resultCount">{filtered.length} results found</span>
              <button className="btnReset" onClick={resetFilters}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                Reset All
              </button>
            </div>
          </div>
          
          {/* Primary Filters Row */}
          <div className="filtersPrimary">
            <div className="filterGroup searchGroup">
              <label className="filterLabel">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                Quick Search
              </label>
              <div className="searchInputWrapper">
                <input
                  className="searchInput"
                  placeholder="Search by role, type, or session ID…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
                <div className="searchIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Date Range
              </label>
              <div className="dateRangeWrapper">
                <div className="dateInputGroup">
                  <input className="dateInput" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                  <div className="dateInputIcon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                </div>
                <div className="dateSeparator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"/>
                  </svg>
                </div>
                <div className="dateInputGroup">
                  <input className="dateInput" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
                  <div className="dateInputIcon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Secondary Filters Row */}
          <div className="filtersSecondary">
            <div className="filterGroup">
              <label className="filterLabel">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Role
              </label>
              <div className="selectWrapper">
                <select className="selectInput" value={role} onChange={(e) => setRole(e.target.value)}>
                  {roleOptions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <div className="selectIcon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11H3v10h6V11z"/>
                  <path d="M21 11h-6v10h6V11z"/>
                  <path d="M15 3H9v6h6V3z"/>
                </svg>
                Interview Type
              </label>
              <div className="selectWrapper">
                <select className="selectInput" value={type} onChange={(e) => setType(e.target.value)}>
                  {typeOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="selectIcon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18"/>
                  <path d="M7 12h10"/>
                  <path d="M11 18h2"/>
                </svg>
                Sort By
              </label>
              <div className="selectWrapper">
                <select className="selectInput" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="recent">Most Recent</option>
                  <option value="high">Highest Score</option>
                  <option value="low">Lowest Score</option>
                </select>
                <div className="selectIcon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Score Range Section */}
          <div className="scoreRangeSection">
            <div className="scoreRangeHeader">
              <label className="filterLabel">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                Score Range
              </label>
              <div className="scoreRangeValues">
                <span className="scoreValue min">{minScore}%</span>
                <span className="scoreValue max">{maxScore}%</span>
              </div>
            </div>
            <div className="scoreRangeContainer">
              <div className="scoreRangeTrack">
                <div 
                  className="scoreRangeFill"
                  style={{ 
                    left: `${minScore}%`, 
                    right: `${100 - maxScore}%` 
                  }}
                />
                <div className="scoreRangeMarkers">
                  <div className="marker" style={{ left: '0%' }}></div>
                  <div className="marker" style={{ left: '25%' }}></div>
                  <div className="marker" style={{ left: '50%' }}></div>
                  <div className="marker" style={{ left: '75%' }}></div>
                  <div className="marker" style={{ left: '100%' }}></div>
                </div>
              </div>
              <div className="scoreRangeInputs">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minScore}
                  onChange={(e) => setMinScore(clamp(parseInt(e.target.value, 10), 0, maxScore))}
                  className="rangeSlider min"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={maxScore}
                  onChange={(e) => setMaxScore(clamp(parseInt(e.target.value, 10), minScore, 100))}
                  className="rangeSlider max"
                />
              </div>
              <div className="scoreRangeLabels">
                <span className="rangeLabel">Poor</span>
                <span className="rangeLabel">Average</span>
                <span className="rangeLabel">Good</span>
                <span className="rangeLabel">Excellent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Results Section */}
        <div className="resultsSection">
          <div className="resultsHeader">
            <div className="resultsTitleSection">
              <h2 className="resultsTitle">Session Results</h2>
              <p className="resultsSubtitle">Review your interview performance and track progress over time</p>
            </div>
            <div className="resultsActions">
              <div className="viewToggle">
                <button 
                  className={`toggleBtn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="9" x2="15" y2="9"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  Table View
                </button>
                <button 
                  className={`toggleBtn ${viewMode === 'card' ? 'active' : ''}`}
                  onClick={() => setViewMode('card')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  Card View
                </button>
              </div>
              <div className="resultsStats">
                <span className="statBadge">{filtered.length} Sessions</span>
                <span className="statBadge">Avg: {stats.avg}%</span>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="tableContainer">
            <div className="tableHeader">
              <div className="headerCell sessionHeader">
                <div className="headerContent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Session Info
                </div>
              </div>
              <div className="headerCell">
                <div className="headerContent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Role
                </div>
              </div>
              <div className="headerCell">
                <div className="headerContent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11H3v10h6V11z"/>
                    <path d="M21 11h-6v10h6V11z"/>
                    <path d="M15 3H9v6h6V3z"/>
                  </svg>
                  Type
                </div>
              </div>
              <div className="headerCell">
                <div className="headerContent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  Performance
                </div>
              </div>
              <div className="headerCell">
                <div className="headerContent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Duration
                </div>
              </div>
              <div className="headerCell">
                <div className="headerContent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18"/>
                    <path d="M18 17V9"/>
                    <path d="M13 17V5"/>
                    <path d="M8 17v-3"/>
                  </svg>
                  Percentile
                </div>
              </div>
              <div className="headerCell">
                <div className="headerContent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  Actions
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="emptyState">
                <div className="emptyIcon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <path d="M8 11h6"/>
                  </svg>
                </div>
                <h3>No sessions found</h3>
                <p>Try adjusting your filters or search criteria to find what you're looking for.</p>
                <button className="btnPrimary" onClick={resetFilters}>Clear All Filters</button>
              </div>
            ) : (
              <>
                {/* Table View */}
                {viewMode === 'table' && (
                  <div className="tableBody">
                    {filtered.map((s, index) => (
                      <div key={s.id} className="tableRow" style={{ animationDelay: `${index * 50}ms` }}>
                        <div className="bodyCell sessionCell">
                          <div className="sessionInfo">
                            <div className="sessionId">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                                <polyline points="13 2 13 9 20 9"/>
                              </svg>
                              {s.id}
                            </div>
                            <div className="sessionDate">{formatDateTime(s.dateTime)}</div>
                          </div>
                        </div>

                        <div className="bodyCell">
                          <div className="roleTag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                            {s.role}
                          </div>
                        </div>
                        
                        <div className="bodyCell">
                          <span 
                            className="typeBadge" 
                            style={{ backgroundColor: `${getTypeColor(s.type)}15`, color: getTypeColor(s.type) }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 11H3v10h6V11z"/>
                              <path d="M21 11h-6v10h6V11z"/>
                              <path d="M15 3H9v6h6V3z"/>
                            </svg>
                            {s.type}
                          </span>
                        </div>

                        <div className="bodyCell">
                          <div className="performanceCell">
                            <div className="scoreRing">
                              <svg className="ringSvg" width="48" height="48">
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  fill="none"
                                  stroke="#e5e7eb"
                                  strokeWidth="4"
                                />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="20"
                                  fill="none"
                                  stroke={getProgressColor(s.score)}
                                  strokeWidth="4"
                                  strokeDasharray={`${2 * Math.PI * 20}`}
                                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - s.score / 100)}`}
                                  transform="rotate(-90 24 24)"
                                />
                              </svg>
                              <div className="scoreText">
                                <span className="scoreNumber">{s.score}</span>
                                <span className="scorePercent">%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bodyCell">
                          <div className="durationTag">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span>{s.duration}</span>
                          </div>
                        </div>
                        
                        <div className="bodyCell">
                          <div className="percentileBadge">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 3v18h18"/>
                              <path d="M18 17V9"/>
                              <path d="M13 17V5"/>
                              <path d="M8 17v-3"/>
                            </svg>
                            {s.percentile ? `Top ${s.percentile}%` : "-"}
                          </div>
                        </div>

                        <div className="bodyCell actionsCell">
                          <button className="actionBtn" onClick={() => viewDetails(s)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Card View */}
                {viewMode === 'card' && (
                  <div className="cardGrid">
                    {filtered.map((s, index) => (
                      <div key={s.id} className="sessionCard" style={{ animationDelay: `${index * 50}ms` }}>
                        {/* Card Header with Score */}
                        <div className="cardTopSection">
                          <div className="cardScoreSection">
                            <div className="cardScoreRing">
                              <svg width="80" height="80">
                                <defs>
                                  <linearGradient id={`gradient-${s.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={getProgressColor(s.score)} stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor={getProgressColor(s.score)} stopOpacity="1"/>
                                  </linearGradient>
                                </defs>
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="32"
                                  fill="none"
                                  stroke="#e5e7eb"
                                  strokeWidth="6"
                                />
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="32"
                                  fill="none"
                                  stroke={`url(#gradient-${s.id})`}
                                  strokeWidth="6"
                                  strokeDasharray={`${2 * Math.PI * 32}`}
                                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - s.score / 100)}`}
                                  transform="rotate(-90 40 40)"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="cardScoreText">
                                <span className="cardScoreNumber">{s.score}</span>
                                <span className="cardScorePercent">%</span>
                              </div>
                            </div>
                            <div className="cardScoreLabel">
                                <span className="scoreCategory">
                                  {s.score >= 90 ? 'Excellent' : s.score >= 80 ? 'Good' : s.score >= 70 ? 'Average' : 'Needs Work'}
                                </span>
                                <span className="scorePercentile">Top {s.percentile}%</span>
                              </div>
                          </div>
                          
                          <div className="cardSessionInfo">
                            <div className="cardSessionId">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                                <polyline points="13 2 13 9 20 9"/>
                              </svg>
                              {s.id}
                            </div>
                            <div className="cardSessionDate">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                              </svg>
                              {formatDateTime(s.dateTime)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Card Body */}
                        <div className="cardBody">
                          <div className="cardMainInfo">
                            <div className="cardRoleSection">
                              <div className="cardInfoHeader">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                  <circle cx="12" cy="7" r="4"/>
                                </svg>
                                <span>Position</span>
                              </div>
                              <div className="cardRoleTag">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                  <circle cx="12" cy="7" r="4"/>
                                </svg>
                                {s.role}
                              </div>
                            </div>
                            
                            <div className="cardTypeSection">
                              <div className="cardInfoHeader">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M9 11H3v10h6V11z"/>
                                  <path d="M21 11h-6v10h6V11z"/>
                                  <path d="M15 3H9v6h6V3z"/>
                                </svg>
                                <span>Interview Type</span>
                              </div>
                              <div 
                                className="cardTypeBadge" 
                                style={{ backgroundColor: `${getTypeColor(s.type)}15`, color: getTypeColor(s.type) }}
                              >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M9 11H3v10h6V11z"/>
                                  <path d="M21 11h-6v10h6V11z"/>
                                  <path d="M15 3H9v6h6V3z"/>
                                </svg>
                                {s.type}
                              </div>
                            </div>
                          </div>
                          
                          <div className="cardMetrics">
                            <div className="cardMetric">
                              <div className="metricIcon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10"/>
                                  <polyline points="12 6 12 12 16 14"/>
                                </svg>
                              </div>
                              <div className="metricContent">
                                <div className="metricLabel">Duration</div>
                                <div className="metricValue">{s.duration}</div>
                              </div>
                            </div>
                            
                            <div className="cardMetric">
                              <div className="metricIcon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 3v18h18"/>
                                  <path d="M18 17V9"/>
                                  <path d="M13 17V5"/>
                                  <path d="M8 17v-3"/>
                                </svg>
                              </div>
                              <div className="metricContent">
                                <div className="metricLabel">Performance</div>
                                <div className="metricValue">{s.percentile ? `Top ${s.percentile}%` : "N/A"}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Card Footer */}
                        <div className="cardFooter">
                          <div className="cardStatus">
                            <div className="statusIndicator" style={{ backgroundColor: getProgressColor(s.score) }}></div>
                            <span className="statusText">
                              {s.score >= 85 ? 'High Performance' : s.score >= 70 ? 'Good Performance' : 'Needs Improvement'}
                            </span>
                          </div>
                          <button className="cardActionBtn" onClick={() => viewDetails(s)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                            View Full Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Cards */}
        <div className="mobileGrid">
          {filtered.map((s, index) => (
            <div key={s.id} className="mobileSessionCard" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="mobileCardHeader">
                <div className="mobileSessionInfo">
                  <div className="mobileSessionId">{s.id}</div>
                  <div className="mobileSessionDate">{formatDateTime(s.dateTime)}</div>
                </div>
                <div className="mobileScoreRing">
                  <svg width="50" height="50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="4"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke={getProgressColor(s.score)}
                      strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - s.score / 100)}`}
                      transform="rotate(-90 25 25)"
                    />
                  </svg>
                  <span className="mobileScoreText">{s.score}%</span>
                </div>
              </div>
              
              <div className="mobileCardBody">
                <div className="mobileInfoRow">
                  <div className="mobileInfoItem">
                    <span className="mobileInfoLabel">Role</span>
                    <span className="mobileInfoValue">{s.role}</span>
                  </div>
                  <div className="mobileInfoItem">
                    <span className="mobileInfoLabel">Type</span>
                    <span 
                      className="mobileTypeBadge" 
                      style={{ backgroundColor: `${getTypeColor(s.type)}15`, color: getTypeColor(s.type) }}
                    >
                      {s.type}
                    </span>
                  </div>
                </div>
                
                <div className="mobileInfoRow">
                  <div className="mobileInfoItem">
                    <span className="mobileInfoLabel">Duration</span>
                    <span className="mobileInfoValue">{s.duration}</span>
                  </div>
                  <div className="mobileInfoItem">
                    <span className="mobileInfoLabel">Percentile</span>
                    <span className="mobileInfoValue">{s.percentile ? `Top ${s.percentile}%` : "-"}</span>
                  </div>
                </div>
              </div>
              
              <button className="mobileActionBtn" onClick={() => viewDetails(s)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                View Full Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

