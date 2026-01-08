import { useEffect, useMemo, useState } from 'react';
import {
  Sparkles,
  Timer,
  Flag,
  Info,
  X,
  Speaker,
  Wand2,
  Send,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageSquareText,
} from 'lucide-react';
import './ActiveSessionHR.css';

const HR = {
  persona: {
    name: 'Ayesha (HR Interviewer)',
    subtitle: 'Behavioral • Adaptive follow-ups • Coaching',
    initials: 'AH',
    gradient: 'linear-gradient(135deg, #2563eb, #10b981)',
  },
  role: 'Graduate / Entry-Level Role',
  totalQuestions: 10,
  questions: [
    {
      title: 'Tell me about yourself',
      text: 'Tell me about yourself in 60–90 seconds.',
      hint: 'Present → Past → Future, end with a value statement.',
    },
    {
      title: 'Team challenge',
      text: 'Describe a time you faced a challenge in a team and how you handled it.',
      hint: 'Use STAR. Quantify impact if possible.',
    },
    {
      title: 'Strengths & weaknesses',
      text: 'What are your strengths and one weakness you’re working on?',
      hint: 'Choose a real weakness + show improvement plan.',
    },
    {
      title: 'Conflict resolution',
      text: 'Tell me about a time you had a conflict with someone and how you resolved it.',
      hint: 'Stay neutral. Show empathy + actions + result.',
    },
  ],
};

function countWords(text) {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

function qualityScore(text) {
  // Simple prototype heuristic: length + STAR keywords
  const w = countWords(text);
  let score = 0;

  if (w >= 40) score += 25;
  if (w >= 80) score += 25;

  const lowered = text.toLowerCase();
  const hits =
    (lowered.includes('situation') ? 1 : 0) +
    (lowered.includes('task') ? 1 : 0) +
    (lowered.includes('action') ? 1 : 0) +
    (lowered.includes('result') ? 1 : 0);

  score += hits * 12; // up to 48
  score = Math.min(100, score);

  return score;
}

export default function ActiveSessionHR() {
  const questions = useMemo(() => HR.questions, []);
  const [qIndex, setQIndex] = useState(0);

  const [timeLeft, setTimeLeft] = useState(15 * 60 + 40);
  const [showHelp, setShowHelp] = useState(true);

  const [answers, setAnswers] = useState(() => ({}));
  const [doneMap, setDoneMap] = useState(() => ({}));
  const [coachNote, setCoachNote] = useState('Write your answer using STAR for best feedback.');

  const q = questions[qIndex] || {
    title: `Question ${qIndex + 1}`,
    text: 'Placeholder question text',
    hint: '—',
  };

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
  const score = qualityScore(answerText);

  const prev = () => setQIndex((i) => Math.max(0, i - 1));
  const next = () => setQIndex((i) => Math.min(HR.totalQuestions - 1, i + 1));

  const submit = () => {
    setDoneMap((p) => ({ ...p, [qIndex]: true }));
    setCoachNote('Saved (mock). In Phase 2, AI will generate detailed feedback here.');
    if (qIndex < HR.totalQuestions - 1) setQIndex(qIndex + 1);
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

  const tips = [
    'Use STAR: Situation → Task → Action → Result.',
    'Keep it crisp: 60–90 seconds per behavioral answer.',
    'Quantify: time saved, impact, scale, outcome.',
    'End strong: what you learned + next time improvement.',
  ];

  return (
    <div className="hr-session">
      {/* background */}
      <div className="bg-blob blob-a" />
      <div className="bg-blob blob-b" />
      <div className="bg-grid" />

      {/* topbar */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="pill pill-session">
            <MessageSquareText size={16} />
            <span>HR / Behavioral Session</span>
            <span className="live-dot" />
          </div>

          <div className="session-meta">
            <div className="session-title">{HR.role}</div>
            <div className="session-sub">
              Question <b>{qIndex + 1}</b> / {HR.totalQuestions}
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
        <section className="card hr-card">
          {/* interviewer header */}
          <div className="hr-head">
            <div className="hr-persona">
              <div className="hr-avatar" style={{ background: HR.persona.gradient }}>
                {HR.persona.initials}
              </div>
              <div>
                <div className="hr-name">{HR.persona.name}</div>
                <div className="hr-sub">{HR.persona.subtitle}</div>
              </div>
            </div>

            <div className="hr-actions">
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

          <div className="divider" />

          {/* question */}
          <div className="qwrap">
            <div className="qtitle">
              {q.title} <span className="qtag">BEHAVIORAL</span>
            </div>

            <div className="qtext">{q.text}</div>

            <div className="qhint">
              <Sparkles size={16} />
              <span>{q.hint}</span>
            </div>

            {/* Answer box */}
            <div className="answerWrap">
              <textarea
                className="textarea"
                placeholder="Write your answer here… (Try STAR structure)"
                value={answerText}
                onChange={(e) => setAnswers((p) => ({ ...p, [qIndex]: e.target.value }))}
              />

              <div className="answerFooter">
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

              {/* Quality meter (prototype widget) */}
              <div className="meter">
                <div className="meterTop">
                  <div className="meterTitle">Answer quality (prototype)</div>
                  <div className="meterValue">{score}/100</div>
                </div>

                <div className="meterBar">
                  <div className="meterFill" style={{ width: `${score}%` }} />
                </div>

                <div className="coachNote">
                  <CheckCircle2 size={16} />
                  <span>{coachNote}</span>
                </div>
              </div>
            </div>
          </div>

          {/* bottom nav */}
          <div className="bottom-nav">
            <button className="btn-nav" onClick={prev} disabled={qIndex === 0}>
              <ChevronLeft size={16} />
              Prev
            </button>

            <div className="dots">
              {Array.from({ length: HR.totalQuestions }).map((_, i) => (
                <span key={i} className={`dot ${i === qIndex ? 'active' : ''} ${doneMap[i] ? 'done' : ''}`} />
              ))}
            </div>

            <button className="btn-submit" onClick={submit}>
              <Send size={16} />
              Submit
            </button>

            <button className="btn-nav" onClick={next} disabled={qIndex === HR.totalQuestions - 1}>
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Help widget */}
        {showHelp && (
          <aside className="help-widget">
            <div className="help-head">
              <div className="help-title">STAR helper</div>
              <button className="help-close" onClick={() => setShowHelp(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="help-body">
              {tips.map((t) => (
                <div key={t} className="help-item">
                  {t}
                </div>
              ))}
            </div>

            <div className="help-footer">
              <span className="help-badge">AI feedback (Phase 2)</span>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
