import React, { useMemo, useState } from "react";
import "./SessionResults.css";

/**
 * JobScout — Session Feedback / Results Page
 * Path: /session/results
 * Professional Redesign with Modern UI/UX
 */

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function formatDate(d) {
  try {
    const dt = typeof d === "string" ? new Date(d) : d;
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return String(d);
  }
}

function scoreLabel(score) {
  if (score >= 85) return { label: "Excellent", tone: "excellent" };
  if (score >= 70) return { label: "Strong", tone: "strong" };
  if (score >= 55) return { label: "Developing", tone: "developing" };
  return { label: "Needs Work", tone: "needswork" };
}

function highlightKeywords(text = "", keywords = []) {
  if (!text || !keywords.length) return [text];
  const escaped = keywords
    .filter(Boolean)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!escaped.length) return [text];

  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);

  return parts.map((p, idx) => {
    const isHit = keywords.some((k) => k && p.toLowerCase() === k.toLowerCase());
    return isHit ? (
      <mark key={idx} className="hl">
        {p}
      </mark>
    ) : (
      <React.Fragment key={idx}>{p}</React.Fragment>
    );
  });
}

// ---------- UI Components ----------
function ProgressBar({ value = 0 }) {
  const v = clamp(value, 0, 100);
  return (
    <div className="barOuter" aria-label={`Progress ${v}%`}>
      <div className="barInner" style={{ width: `${v}%` }} />
    </div>
  );
}

function ScoreGauge({ value = 0 }) {
  const v = clamp(value, 0, 100);
  const r = 80;
  const c = 2 * Math.PI * r;
  const dash = (v / 100) * c;

  const meta = scoreLabel(v);

  return (
    <div className="gaugeWrap">
      <svg width="320" height="320" viewBox="0 0 320 320" className="gauge" role="img" aria-label="Overall score gauge">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="160" cy="160" r={r} className="gaugeTrack" />
        <circle
          cx="160"
          cy="160"
          r={r}
          className="gaugeProg"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90 160 160)"
        />
      </svg>

      <div className="gaugeCenter">
        <div className="gaugeValue">{v}</div>
        <div className="gaugeSub">/100</div>
        <div className={`gaugeTag ${meta.tone}`}>{meta.label}</div>
      </div>
    </div>
  );
}

// Simple line chart (progress comparison)
function MiniLineChart({ points = [], height = 100 }) {
  const w = 400;
  const h = height;
  const pad = 12;

  const safe = points.length ? points : [60, 62, 58, 66, 70, 74, 78];

  const minV = Math.min(...safe);
  const maxV = Math.max(...safe);
  const range = maxV - minV || 1;

  const xs = safe.map((_, i) => pad + (i * (w - pad * 2)) / (safe.length - 1));
  const ys = safe.map((v) => h - pad - ((v - minV) * (h - pad * 2)) / range);

  const d = xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`)
    .join(" ");

  return (
    <div className="miniChart">
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Progress comparison chart">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <path d={`M ${pad} ${pad} L ${pad} ${h - pad} L ${w - pad} ${h - pad}`} className="axis" />
        <path d={d} className="line" />
        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r="5" className="dot" />
        ))}
      </svg>
    </div>
  );
}

function MetricGauge({ label, value, suffix = "", hint }) {
  const v = clamp(value, 0, 100);
  return (
    <div className="metricGauge">
      <div className="metricTop">
        <div className="metricLabel">{label}</div>
        <div className="metricValue">
          {v}
          {suffix}
        </div>
      </div>
      <ProgressBar value={v} />
      {hint ? <div className="metricHint">{hint}</div> : null}
    </div>
  );
}

function ToneGraph({ values = [30, 42, 55, 48, 62, 45, 58, 70] }) {
  const w = 320;
  const h = 72;
  const pad = 10;
  const safe = values.length ? values : [35, 45, 40, 60, 55, 65, 50, 70];

  const minV = Math.min(...safe);
  const maxV = Math.max(...safe);
  const range = maxV - minV || 1;

  const xs = safe.map((_, i) => pad + (i * (w - pad * 2)) / (safe.length - 1));
  const ys = safe.map((v) => h - pad - ((v - minV) * (h - pad * 2)) / range);

  const d = xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`)
    .join(" ");

  return (
    <div className="toneGraphWrap">
      <div className="toneGraphTitle">Tone / Pitch Variation</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="toneGraph">
        <path d={`M ${pad} ${h - pad} L ${w - pad} ${h - pad}`} className="axis" />
        <path d={d} className="line" />
        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r="2.6" className="dot" />
        ))}
      </svg>
      <div className="smallNote">Higher variation usually sounds more engaging (avoid monotone).</div>
    </div>
  );
}

function QuestionItem({ q, idx }) {
  const [open, setOpen] = useState(false);
  const keywords = q.highlights || ["structured", "impact", "results", "metrics"];

  return (
    <div className="qItem">
      <button className="qHeader" onClick={() => setOpen((s) => !s)} aria-expanded={open}>
        <div className="qLeft">
          <div className="qIndex">Q{idx + 1}</div>
          <div className="qTitle">{q.question}</div>
        </div>

        <div className="qRight">
          <span className="qScoreBadge">{q.score}/100</span>
          <span className="chev">{open ? "▾" : "▸"}</span>
        </div>
      </button>

      {open && (
        <div className="qBody">
          <div className="qGrid">
            <div className="qCard">
              <div className="qCardTitle">Your Answer</div>
              <div className="qText">{highlightKeywords(q.answer, keywords)}</div>
            </div>

            <div className="qCard">
              <div className="qCardTitle">AI Feedback</div>
              <div className="qText">{q.feedback}</div>

              {q.improvements?.length ? (
                <>
                  <div className="qCardTitle" style={{ marginTop: 12 }}>
                    Suggested Improvements
                  </div>
                  <ul className="qList">
                    {q.improvements.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {q.modelAnswer ? (
                <>
                  <div className="qCardTitle" style={{ marginTop: 12 }}>
                    Model Answer (Reference)
                  </div>
                  <div className="qTextMuted">{q.modelAnswer}</div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Main Page ----------
export default function SessionResults() {
  const data = useMemo(() => {
    return {
      header: "Session Complete! Here's How You Did",
      role: "Software Engineer",
      date: new Date().toISOString(),
      duration: "23m 40s",
      questionsAnswered: 10,
      overallScore: 78,
      percentile: 25,

      dimensions: [
        { name: "Knowledge", score: 78, comment: "Strong fundamentals — keep refining depth with examples." },
        { name: "Communication", score: 65, comment: "Good clarity; reduce filler words and tighten structure." },
        { name: "Confidence", score: 72, comment: "Steady tone; add stronger openings and conclusions." },
        { name: "Technical Accuracy", score: 80, comment: "Correct approach; mention edge cases and trade-offs." },
      ],

      strengths: [
        "Strong technical knowledge in data structures",
        "Clear and structured answers",
        "Good problem decomposition and reasoning",
      ],
      weaknesses: [
        "Pace was too fast (180 WPM, aim for 140)",
        "Used ~15 filler words (try pauses instead)",
        "Could add more real examples and metrics",
      ],

      commsEnabled: true,
      comms: {
        verbal: {
          paceWpm: 180,
          paceScore: 58,
          fillerWords: 15,
          fillerScore: 62,
          grammarScore: 76,
          toneValues: [30, 42, 55, 48, 62, 45, 58, 70],
        },
        nonverbal: {
          eyeContact: 68,
          posture: 72,
          gestures: 55,
          confidenceMeter: 70,
        },
      },

      coachSummary:
        "Overall, you demonstrated solid role-fit and strong problem-solving. Your answers were mostly structured, but you can improve impact by opening with a short thesis statement, then using a clear framework (STAR for behavioral, trade-offs for technical), and ending with a measurable outcome. Focus next on communication control: slow down slightly, reduce filler words by pausing, and include at least one concrete metric or example per key claim.",

      questions: [
        {
          question: "Tell me about a time you handled conflict in a team.",
          score: 74,
          answer:
            "I faced conflict when two team members disagreed on implementation. I listened, summarized both views, and proposed a structured decision based on requirements and timelines. We agreed on a solution and shipped on time.",
          feedback:
            "Good structure and calm resolution. Add more context (team size, stakes), and quantify the outcome (delivery time saved, defect reduction).",
          improvements: ["Use STAR explicitly (Situation → Task → Action → Result).", "Add 1–2 measurable results."],
          modelAnswer:
            "In a sprint with a tight deadline, two engineers disagreed on architecture. I facilitated a decision meeting, aligned on criteria, compared options by complexity/risk, and proposed a phased approach. We delivered one day early and reduced rework by documenting the decision.",
          highlights: ["structured", "decision", "requirements", "outcome"],
        },
        {
          question: "Explain how you would design a URL shortener.",
          score: 82,
          answer:
            "I would use a service that generates a unique key for each URL, stores it in a database, and redirects requests. I'd add caching for hot links and consider rate limiting.",
          feedback:
            "Strong start. Mention collision handling, key generation strategy, database schema, and scalability (partitioning, replication).",
          improvements: ["Discuss key generation (base62, random vs sequential).", "Explain scaling and caching strategy."],
          highlights: ["database", "caching", "scalability", "rate limiting"],
        },
      ],

      progressComparison: [62, 64, 63, 66, 70, 74, 78],
    };
  }, []);

  const [showDetails, setShowDetails] = useState(true);

  const onDownload = () => alert("Connect PDF download to backend endpoint later.");
  const onRetake = () => alert("Route to /new-session with same template.");
  const onResources = () => alert("Show resources for weak areas.");
  const onBack = () => window.location.assign("/dashboard");

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div className="topHeader">
          <div>
            <div className="kicker">Session Feedback</div>
            <h1 className="title">{data.header}</h1>
            <p className="subTitle">A detailed breakdown of your performance, strengths, and next steps.</p>
          </div>

          <div className="headerActions">
            <button className="btnSecondary" onClick={onBack}>
              Back to Dashboard
            </button>
            <button className="btnPrimary" onClick={onDownload}>
              Download Report (PDF)
            </button>
          </div>
        </div>

        {/* Overall Performance */}
        <div className="grid2">
          <div className="card">
            <div className="cardTitleRow">
              <h2 className="cardTitle">Overall Performance</h2>
              <span className="pill">Percentile: Top {data.percentile}%</span>
            </div>

            <div className="overallRow">
              <ScoreGauge value={data.overallScore} />

              <div className="summaryBox">
                <div className="summaryRow">
                  <div className="summaryLabel">Role</div>
                  <div className="summaryValue">{data.role}</div>
                </div>
                <div className="summaryRow">
                  <div className="summaryLabel">Date</div>
                  <div className="summaryValue">{formatDate(data.date)}</div>
                </div>
                <div className="summaryRow">
                  <div className="summaryLabel">Duration</div>
                  <div className="summaryValue">{data.duration}</div>
                </div>
                <div className="summaryRow">
                  <div className="summaryLabel">Questions Answered</div>
                  <div className="summaryValue">{data.questionsAnswered}</div>
                </div>

                <div className="miniBlock">
                  <div className="miniTitle">Progress Comparison</div>
                  <MiniLineChart points={data.progressComparison} />
                  <div className="smallNote">Your score trend across recent sessions.</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Coach */}
          <div className="card">
            <div className="cardTitleRow">
              <h2 className="cardTitle">AI Coach Summary</h2>
              <span className="pillSoft">Personalized coaching</span>
            </div>
            <p className="coachText">{data.coachSummary}</p>

            <div className="tipBox">
              <div className="tipTitle">Next Best Action</div>
              <div className="tipText">
                Next session: slow your pace by ~10–15% and use structure:
                <strong> Thesis → Steps/Framework → Result/Metric.</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Dimension Breakdown */}
        <div className="section">
          <div className="sectionHeader">
            <h2 className="sectionTitle">4-Dimension Breakdown</h2>
            <div className="sectionRight">Scores are out of 100</div>
          </div>

          <div className="dimGrid">
            {data.dimensions.map((d) => (
              <div className="dimCard" key={d.name}>
                <div className="dimTop">
                  <div className="dimName">{d.name}</div>
                  <div className="dimScore">{d.score}/100</div>
                </div>
                <ProgressBar value={d.score} />
                <div className="dimComment">{d.comment}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid2">
          <div className="card">
            <div className="cardTitleRow">
              <h2 className="cardTitle">Strengths</h2>
              <span className="pillGood">Keep doing these</span>
            </div>
            <ul className="list">
              {data.strengths.map((s, i) => (
                <li key={i} className="liGood">
                  ✓ {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="cardTitleRow">
              <h2 className="cardTitle">Weaknesses</h2>
              <span className="pillWarn">Focus areas</span>
            </div>
            <ul className="list">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="liWarn">
                  ✗ {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Communication Analysis */}
        <div className="section">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Communication Analysis</h2>
          </div>

          {!data.commsEnabled ? (
            <div className="emptyState">
              Communication analysis was not enabled. Enable camera/mic next time to unlock verbal + non-verbal
              insights.
            </div>
          ) : (
            <div className="grid2">
              <div className="cardSoft">
                <h3 className="subSectionTitle">Verbal Metrics</h3>

                <div className="metricRow">
                  <MetricGauge
                    label="Speaking Pace (WPM)"
                    value={data.comms.verbal.paceScore}
                    suffix="%"
                    hint={`You spoke ~${data.comms.verbal.paceWpm} WPM. Target ~130–150 WPM.`}
                  />
                  <MetricGauge
                    label="Filler Words"
                    value={data.comms.verbal.fillerScore}
                    suffix="%"
                    hint={`Detected ~${data.comms.verbal.fillerWords} filler words. Try pauses instead.`}
                  />
                </div>

                <MetricGauge
                  label="Grammar Score"
                  value={data.comms.verbal.grammarScore}
                  suffix="%"
                  hint="Clear grammar improves credibility."
                />

                <ToneGraph values={data.comms.verbal.toneValues} />
              </div>

              <div className="cardSoft">
                <h3 className="subSectionTitle">Non-Verbal Metrics</h3>

                <div className="metricRow">
                  <MetricGauge label="Eye Contact" value={data.comms.nonverbal.eyeContact} suffix="%" hint="Maintain steady eye contact naturally." />
                  <MetricGauge label="Posture" value={data.comms.nonverbal.posture} suffix="%" hint="Open posture signals confidence." />
                </div>
                
                <div className="metricRow">
                  <MetricGauge label="Gesture Control" value={data.comms.nonverbal.gestures} suffix="%" hint="Avoid fidgeting; use purposeful gestures." />
                  <MetricGauge label="Confidence Meter" value={data.comms.nonverbal.confidenceMeter} suffix="%" hint="Slow pace + structure boosts confidence." />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Per Question Breakdown */}
        <div className="section">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Per-Question Breakdown</h2>

            <button className="toggleBtn" onClick={() => setShowDetails((s) => !s)} aria-pressed={showDetails}>
              {showDetails ? "Hide detailed question feedback" : "Show detailed question feedback"}
            </button>
          </div>

          {showDetails ? (
            <div className="qListWrap">
              {data.questions.map((q, idx) => (
                <QuestionItem key={idx} q={q} idx={idx} />
              ))}
            </div>
          ) : (
            <div className="emptyState">Detailed feedback is hidden. Toggle it on to review each question.</div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="actionsContainer">
          <div className="actionsGrid">
            <button className="btnGhost" onClick={onBack}>
              Back to Dashboard
            </button>
            <button className="btnSecondary" onClick={onResources}>
              Suggest Resources
            </button>
            <button className="btnSecondary" onClick={onRetake}>
              Retake Interview
            </button>
            <button className="btnPrimary" onClick={onDownload}>
              Download Report (PDF)
            </button>
          </div>
        </div>
        
        {/* Professional spacing at end */}
        <div className="pageEndSpacing"></div>
      </div>
    </div>
  );
}
