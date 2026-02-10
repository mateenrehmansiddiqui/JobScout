import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Play, Send, ShieldCheck, TerminalSquare, Timer, BookOpen } from 'lucide-react';
import './ActiveSessionTechnical.css';

export default function ActiveSessionTechnical() {
  const navigate = useNavigate();
  const [startedAt] = useState(() => Date.now());
  const [code, setCode] = useState("// Write your solution here\nfunction solve(input) {\n  return null;\n}");
  const [qIndex, setQIndex] = useState(0);

  // For now, one question demo — expand later
  const totalQuestions = 1;

  const durationText = useMemo(() => {
    const elapsedSec = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    const m = Math.floor(elapsedSec / 60);
    const s = elapsedSec % 60;
    return `${m}m ${String(s).padStart(2, "0")}s`;
  }, [startedAt]);

  // Placeholder score — later you can compute based on tests passed
  const computedScore = useMemo(() => {
    const hasCode = (code || "").trim().length > 30;
    return hasCode ? 78 : 55;
  }, [code]);

  const computedPercentile = useMemo(() => {
    if (computedScore >= 85) return 12;
    if (computedScore >= 75) return 22;
    if (computedScore >= 65) return 35;
    return 50;
  }, [computedScore]);

  const goToResults = () => {
    const sessionMeta = {
      id: `TECH-${Date.now()}`,
      dateTime: new Date().toISOString(),
      role: "Software Engineer",
      type: "Technical",
      duration: durationText,
      score: computedScore,
      percentile: computedPercentile,
      questionsAnswered: 1,
      totalQuestions,
    };

    const sessionDetails = {
      questions: [
        {
          title: "Longest Substring Without Repeating Characters",
          question: "Given a string s, find the length of the longest substring without repeating characters.",
          answer: code,
        },
      ],
    };

    navigate("/session/results", { state: { sessionMeta, sessionDetails } });
  };

  const submitSession = () => {
    const ok = window.confirm("Submit your solution and view results?");
    if (!ok) return;
    goToResults();
  };

  return (
    <div className="ts-page">
      <header className="ts-header">
        <div className="ts-header-left">
          <div className="ts-logo-pill"><Code2 size={18}/> Technical Alpha</div>
          <div className="ts-timer-wrap">
            <Timer size={14}/> <span>{durationText}</span>
          </div>
        </div>

        <div className="ts-header-actions">
          <button className="ts-btn-run"><Play size={14}/> Run Tests</button>

          {/* ✅ Submit goes to Results */}
          <button className="ts-btn-submit" onClick={submitSession}>
            <Send size={14}/> Submit
          </button>
        </div>
      </header>

      <main className="ts-container">
        <div className="ts-workspace">
          {/* Left Panel: Question */}
          <section className="ts-panel ts-question-panel">
            <div className="ts-panel-head"><BookOpen size={16}/> Problem Description</div>
            <div className="ts-panel-body">
              <h1 className="ts-q-title">Longest Substring Without Repeating Characters</h1>
              <div className="ts-tags">
                <span className="ts-tag-easy">Medium</span>
                <span className="ts-tag">Hash Table</span>
                <span className="ts-tag">Sliding Window</span>
              </div>
              <p className="ts-q-desc">
                Given a string <code>s</code>, find the length of the longest substring without repeating characters.
              </p>
              <div className="ts-example">
                <strong>Example 1:</strong>
                <pre>Input: s = "abcabcbb" {"\n"}Output: 3</pre>
              </div>
              <p style={{ marginTop: 10, opacity: 0.85 }}>
                <strong>Session Score (est.):</strong> {computedScore}/100 · <strong>Percentile:</strong> Top {computedPercentile}%
              </p>
            </div>
          </section>

          {/* Right Panel: Editor */}
          <section className="ts-panel ts-editor-panel">
            <div className="ts-editor-header">
              <select className="ts-lang-select">
                <option>JavaScript (ES6)</option>
                <option>Python 3</option>
              </select>
              <div className="ts-editor-tools">
                <ShieldCheck size={14} color="#10b981" /> <span>Auto-save active</span>
              </div>
            </div>

            <textarea
              className="ts-code-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />

            <div className="ts-console">
              <div className="ts-console-head"><TerminalSquare size={14}/> Console</div>
              <div className="ts-console-body">
                <span className="ts-console-line">&gt; Ready for input...</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
