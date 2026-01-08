import { useEffect, useMemo, useState } from 'react';
import {
  Code2,
  Timer,
  Flag,
  Play,
  Send,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  TerminalSquare,
  ShieldCheck,
} from 'lucide-react';
import './ActiveSessionTechnical.css';

const ActiveSessionTechnical = () => {
  // --- mock question data (replace later from backend) ---
  const questions = useMemo(
    () => [
      {
        title: 'Two Sum',
        difficulty: 'Easy',
        tags: ['Arrays', 'HashMap'],
        prompt:
          'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        constraints: [
          'You may assume exactly one solution.',
          'You may not use the same element twice.',
        ],
        examples: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
          { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
        ],
      },
      {
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        tags: ['Stack'],
        prompt:
          'Given a string s containing just brackets, determine if the input string is valid.',
        constraints: ['An input is valid if open brackets are closed in the correct order.'],
        examples: [{ input: 's = "()[]{}"', output: 'true' }],
      },
    ],
    []
  );

  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1 * 60 + 51);
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState(
    `// Write your solution here\nfunction twoSum(nums, target) {\n  // TODO\n  return [];\n}\n`
  );
  const [consoleText, setConsoleText] = useState('Console output will appear here...');
  const [showHelp, setShowHelp] = useState(true);

  const q = questions[qIndex];

  // Timer
  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  const handleRun = () => {
    setConsoleText(
      `▶ Running (${language})...\n\n✅ Mock run complete.\nTip: integrate test cases later from backend.`
    );
  };

  const handleSubmit = () => {
    setConsoleText(
      `📤 Submitted answer for: ${q.title}\n\n✅ Saved locally (mock).\nNext: connect backend scoring.`
    );
  };

  const goPrev = () => setQIndex((i) => Math.max(0, i - 1));
  const goNext = () => setQIndex((i) => Math.min(questions.length - 1, i + 1));

  return (
    <div className="tech-session">
      {/* animated background */}
      <div className="bg-blob blob-a" />
      <div className="bg-blob blob-b" />
      <div className="bg-grid" />

      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="pill pill-session">
            <Code2 size={16} />
            <span>Technical Session</span>
            <span className="live-dot" />
          </div>

          <div className="session-meta">
            <div className="session-title">Software Engineer (Frontend)</div>
            <div className="session-sub">
              Question <b>{qIndex + 1}</b> / {questions.length}
            </div>
          </div>
        </div>

        <div className="topbar-right">
          <div className="timer-pill">
            <Timer size={16} />
            <span>{mm}:{ss}</span>
          </div>

          <button className="btn-ghost" onClick={() => setShowHelp((s) => !s)}>
            <Info size={16} />
            Help
          </button>

          <button className="btn-end">
            <Flag size={16} />
            End
          </button>
        </div>
      </header>

      {/* Main layout */}
      <main className="layout">
        {/* Left: question */}
        <section className="card question-card">
          <div className="card-head">
            <div className="q-head-left">
              <div className="q-title">{q.title}</div>
              <div className="q-badges">
                <span className={`badge badge-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                {q.tags.map((t) => (
                  <span key={t} className="badge badge-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* Decorative image */}
            <div className="q-visual">
              <img
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
                alt="Coding"
              />
              <div className="q-visual-overlay">
                <Sparkles size={16} />
                <span>AI-ready practice</span>
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="q-body">
            <div className="q-section">
              <h4>Prompt</h4>
              <p>{q.prompt}</p>
            </div>

            <div className="q-section">
              <h4>Constraints</h4>
              <ul>
                {q.constraints.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="q-section">
              <h4>Examples</h4>
              <div className="examples">
                {q.examples.map((ex, idx) => (
                  <div key={idx} className="example">
                    <div><b>Input:</b> {ex.input}</div>
                    <div><b>Output:</b> {ex.output}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bottom-nav">
            <button className="btn-nav" onClick={goPrev} disabled={qIndex === 0}>
              <ChevronLeft size={16} />
              Prev
            </button>

            <div className="dots">
              {questions.map((_, i) => (
                <span key={i} className={`dot ${i === qIndex ? 'active' : ''}`} />
              ))}
            </div>

            <button className="btn-nav" onClick={goNext} disabled={qIndex === questions.length - 1}>
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Right: editor */}
        <section className="card editor-card">
          <div className="editor-top">
            <div className="editor-controls">
              <label className="label">Language</label>
              <select
                className="select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>JavaScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
              </select>

              <div className="mini-pill">
                <ShieldCheck size={14} />
                <span>Safe Mode</span>
              </div>
            </div>

            <div className="editor-actions">
              <button className="btn-run" onClick={handleRun}>
                <Play size={16} />
                Run
              </button>
              <button className="btn-submit" onClick={handleSubmit}>
                <Send size={16} />
                Submit
              </button>
            </div>
          </div>

          <div className="editor-area">
            <textarea
              className="codebox"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="console">
            <div className="console-head">
              <TerminalSquare size={16} />
              <span>Console</span>
            </div>
            <pre className="console-body">{consoleText}</pre>
          </div>
        </section>

        {/* Floating help widget */}
        {showHelp && (
          <aside className="help-widget">
            <div className="help-head">
              <div className="help-title">Quick tips</div>
              <button className="help-close" onClick={() => setShowHelp(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="help-body">
              <div className="help-item">
                <b>Structure:</b> Explain approach → complexity → edge cases.
              </div>
              <div className="help-item">
                <b>Time:</b> Don’t over-optimize first; get working solution.
              </div>
              <div className="help-item">
                <b>Submit:</b> Add comments for clarity (interviewers love it).
              </div>
            </div>

            <div className="help-footer">
              <span className="help-badge">AI Coach (Phase 2)</span>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default ActiveSessionTechnical;
