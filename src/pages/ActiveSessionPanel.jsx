import { useEffect, useMemo, useState } from 'react';
import {
  Users,
  Timer,
  Flag,
  Sparkles,
  Speaker,
  Wand2,
  FileText,
  Code2,
  LayoutPanelLeft,
  Play,
  Send,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  TerminalSquare,
} from 'lucide-react';
import './ActiveSessionPanel.css';

const PANEL = {
  role: 'Product-focused Software Engineer',
  totalQuestions: 9,
  members: [
    {
      id: 'hr',
      name: 'Ayesha (HR)',
      tag: 'HR',
      initials: 'AH',
      gradient: 'linear-gradient(135deg, #2563eb, #10b981)',
    },
    {
      id: 'tech',
      name: 'Hamza (Technical)',
      tag: 'TECH',
      initials: 'HS',
      gradient: 'linear-gradient(135deg, #1e40af, #60a5fa)',
    },
    {
      id: 'mgr',
      name: 'Sara (Manager)',
      tag: 'MANAGER',
      initials: 'SM',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
  ],
  questions: [
    {
      from: 'hr',
      type: 'text',
      title: 'Quick intro',
      text: 'Introduce yourself and explain why you’re a fit for this role (60–90 seconds).',
      hint: 'Present → Past → Future. End with a value statement.',
    },
    {
      from: 'mgr',
      type: 'text',
      title: 'Deadline trade-offs',
      text: 'Tell us about a time you managed a tight deadline. What trade-offs did you make?',
      hint: 'Prioritization + communication + impact.',
    },
    {
      from: 'tech',
      type: 'code',
      title: 'Coding: Palindrome',
      text: 'Implement isPalindrome(s) that returns true if s is a palindrome (ignore spaces and case).',
      hint: 'Normalize input, then two pointers.',
      starterCode: `// Ignore spaces + case
function isPalindrome(s) {
  // TODO
  return false;
}
`,
    },
    {
      from: 'mgr',
      type: 'whiteboard',
      title: 'System thinking',
      text: 'Whiteboard: Sketch a high-level design for a “Session History” page for JobScout.',
      hint: 'Filters, list, details, pagination, export.',
    },
    {
      from: 'hr',
      type: 'text',
      title: 'Conflict',
      text: 'Describe a conflict in a team. How did you resolve it?',
      hint: 'Neutral tone, show empathy + actions + result.',
    },
  ],
};

function countWords(text) {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

export default function ActiveSessionPanel() {
  const [qIndex, setQIndex] = useState(0);
  const [mode, setMode] = useState('text'); // text | code | whiteboard
  const [timeLeft, setTimeLeft] = useState(17 * 60 + 30);

  const [answers, setAnswers] = useState(() => ({}));
  const [doneMap, setDoneMap] = useState(() => ({}));

  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState('// Write your solution here\n');
  const [consoleText, setConsoleText] = useState('Console output will appear here...');

  const [showHelp, setShowHelp] = useState(true);

  const questions = useMemo(() => PANEL.questions, []);
  const q = questions[qIndex] || {
    from: 'hr',
    type: 'text',
    title: `Question ${qIndex + 1}`,
    text: 'Placeholder question text',
    hint: '—',
  };

  const activeMember = useMemo(() => {
    return PANEL.members.find((m) => m.id === q.from) || PANEL.members[0];
  }, [q.from]);

  // auto mode by question
  useEffect(() => {
    setMode(q.type);
    if (q.type === 'code' && q.starterCode) setCode(q.starterCode);
  }, [qIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // timer
  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  const answerText = answers[qIndex] || '';
  const words = countWords(answerText);
  const chars = answerText.length;

  const runCode = () => {
    const passed = Math.floor(Math.random() * 6);
    const total = 5;
    const t = `${(Math.random() * 0.12 + 0.02).toFixed(2)}s`;
    setConsoleText(
      passed === total
        ? `✅ All tests passed\nRuntime: ${t}\nMemory: (mock) 18.4 MB`
        : `❌ ${passed}/${total} tests passed\nRuntime: ${t}\nHint: Consider edge cases + normalization.`
    );
  };

  const submit = () => {
    setDoneMap((p) => ({ ...p, [qIndex]: true }));
    setConsoleText(`📤 Submitted: ${q.title}\nSaved locally (mock).`);
    if (qIndex < PANEL.totalQuestions - 1) setQIndex(qIndex + 1);
  };

  const speak = () => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      synth.speak(new SpeechSynthesisUtterance(q.text));
    } catch (e) {}
  };

  const followUp = () => {
    alert('Follow-up generated (mock). In Phase 2, AI generates based on your answer.');
  };

  const prev = () => setQIndex((i) => Math.max(0, i - 1));
  const next = () => setQIndex((i) => Math.min(PANEL.totalQuestions - 1, i + 1));

  const commonTips = [
    'Panel tip: answer directly first, then add one supporting example.',
    'If interrupted: pause, acknowledge, and continue calmly.',
    'For mixed: keep technical answers structured (approach → complexity → edge cases).',
  ];

  return (
    <div className="panel-session">
      {/* background */}
      <div className="bg-blob blob-a" />
      <div className="bg-blob blob-b" />
      <div className="bg-grid" />

      {/* topbar */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="pill pill-session">
            <Users size={16} />
            <span>Panel Interview (Mixed)</span>
            <span className="live-dot" />
          </div>

          <div className="session-meta">
            <div className="session-title">{PANEL.role}</div>
            <div className="session-sub">
              Question <b>{qIndex + 1}</b> / {PANEL.totalQuestions}
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

      <main className="layout">
        {/* Left: panel + question */}
        <section className="card panel-card">
          {/* panel members */}
          <div className="panel-row">
            {PANEL.members.map((m) => (
              <div key={m.id} className={`panel-member ${m.id === activeMember.id ? 'active' : ''}`}>
                <div className="member-avatar" style={{ background: m.gradient }}>
                  {m.initials}
                </div>
                <div>
                  <div className="member-name">{m.name}</div>
                  <div className="member-tag">{m.tag}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="qwrap">
            <div className="qtop">
              <div className="askedBy">
                <span className="ask-dot" />
                <span>Asked by</span>
                <b>{activeMember.name}</b>
              </div>

              <div className="qactions">
                <button className="btn-ghost mini" onClick={speak}>
                  <Speaker size={16} />
                  Read
                </button>
                <button className="btn-ghost mini" onClick={followUp}>
                  <Wand2 size={16} />
                  Follow-up
                </button>
              </div>
            </div>

            <div className="qtitle">
              {q.title}{' '}
              <span className="qtype">
                {q.type === 'text' ? 'TEXT' : q.type === 'code' ? 'CODE' : 'WHITEBOARD'}
              </span>
            </div>

            <div className="qtext">{q.text}</div>

            <div className="qhint">
              <Sparkles size={16} />
              <span>{q.hint}</span>
            </div>

            {/* tabs */}
            <div className="tabs">
              <button className={`tab ${mode === 'text' ? 'active' : ''}`} onClick={() => setMode('text')}>
                <FileText size={16} /> Text
              </button>
              <button className={`tab ${mode === 'code' ? 'active' : ''}`} onClick={() => setMode('code')}>
                <Code2 size={16} /> Code
              </button>
              <button
                className={`tab ${mode === 'whiteboard' ? 'active' : ''}`}
                onClick={() => setMode('whiteboard')}
              >
                <LayoutPanelLeft size={16} /> Whiteboard
              </button>
            </div>

            {/* content */}
            <div className="modeArea">
              {mode === 'text' && (
                <div>
                  <textarea
                    className="textarea"
                    placeholder="Type your answer… (STAR for behavioral, structured for technical)"
                    value={answerText}
                    onChange={(e) => setAnswers((p) => ({ ...p, [qIndex]: e.target.value }))}
                  />

                  <div className="textFooter">
                    <div className="counts">
                      <span>{words} words</span>
                      <span className="sep">•</span>
                      <span>{chars} chars</span>
                    </div>

                    <button
                      className={`doneBtn ${doneMap[qIndex] ? 'done' : ''}`}
                      onClick={() => setDoneMap((p) => ({ ...p, [qIndex]: !p[qIndex] }))}
                    >
                      {doneMap[qIndex] ? 'Done ✓' : "I'm done"}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'code' && (
                <div className="codeMode">
                  <div className="codeTop">
                    <div>
                      <div className="label">Language</div>
                      <select className="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option>JavaScript</option>
                        <option>Python</option>
                        <option>Java</option>
                        <option>C++</option>
                      </select>
                    </div>

                    <button className="btn-run" onClick={runCode}>
                      <Play size={16} /> Run
                    </button>
                  </div>

                  <textarea className="codebox" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} />

                  <div className="console">
                    <div className="console-head">
                      <TerminalSquare size={16} />
                      <span>Console</span>
                    </div>
                    <pre className="console-body">{consoleText}</pre>
                  </div>
                </div>
              )}

              {mode === 'whiteboard' && (
                <div className="wbMode">
                  <div className="wbTop">
                    <div>
                      <div className="wbTitle">Whiteboard (Prototype)</div>
                      <div className="wbSub">Phase 2: add drawing tools + export snapshot.</div>
                    </div>

                    <button className="btn-ghost mini" onClick={() => alert('Snapshot saved (mock)')}>
                      <Send size={16} />
                      Save
                    </button>
                  </div>

                  <div className="wbCanvas">
                    <div className="wbPlaceholder">Canvas goes here</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* bottom nav */}
          <div className="bottom-nav">
            <button className="btn-nav" onClick={prev} disabled={qIndex === 0}>
              <ChevronLeft size={16} />
              Prev
            </button>

            <div className="dots">
              {Array.from({ length: PANEL.totalQuestions }).map((_, i) => (
                <span key={i} className={`dot ${i === qIndex ? 'active' : ''} ${doneMap[i] ? 'done' : ''}`} />
              ))}
            </div>

            <button className="btn-submit" onClick={submit}>
              <Send size={16} />
              Submit
            </button>

            <button className="btn-nav" onClick={next} disabled={qIndex === PANEL.totalQuestions - 1}>
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Right: floating help */}
        {showHelp && (
          <aside className="help-widget">
            <div className="help-head">
              <div className="help-title">Panel tips</div>
              <button className="help-close" onClick={() => setShowHelp(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="help-body">
              {commonTips.map((t) => (
                <div key={t} className="help-item">
                  {t}
                </div>
              ))}
            </div>

            <div className="help-footer">
              <span className="help-badge">AI follow-ups (Phase 2)</span>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
