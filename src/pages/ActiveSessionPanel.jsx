import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Timer, Flag, Speaker, Wand2, ChevronLeft, ChevronRight, MessageSquareText, Activity, Video } from 'lucide-react';
import './ActiveSessionPanel.css'; // ✅ use panel CSS if you have it

const PANEL_DATA = {
  persona: { name: 'Ayesha (Panel)', subtitle: 'Panel Interview', initials: 'AP' },
  role: 'Graduate Software Engineer',
  totalQuestions: 4,
  questions: [
    { title: 'Self Introduction', text: 'Tell me about yourself in 60–90 seconds.', hint: 'Present → Past → Future.' },
    { title: 'Team Conflict', text: 'Describe a time you faced a challenge in a team.', hint: 'Use the STAR method.' },
    { title: 'Strengths', text: 'What is your greatest professional strength?', hint: 'Provide a specific example.' },
    { title: 'Weaknesses', text: 'Tell us about a weakness you are improving.', hint: 'Focus on the "improvement" part.' }
  ],
};

export default function ActiveSessionPanel() {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900);
  const [answers, setAnswers] = useState({});
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const q = PANEL_DATA.questions[qIndex];
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  const progress = ((qIndex + 1) / PANEL_DATA.totalQuestions) * 100;

  const durationText = useMemo(() => {
    const elapsedSec = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    const m = Math.floor(elapsedSec / 60);
    const s = elapsedSec % 60;
    return `${m}m ${String(s).padStart(2, "0")}s`;
  }, [startedAt, qIndex, timeLeft]);

  const computedScore = useMemo(() => {
    const answeredCount = Object.values(answers).filter((a) => (a || "").trim().length > 0).length;
    return Math.min(100, 50 + Math.round((answeredCount / PANEL_DATA.totalQuestions) * 50));
  }, [answers]);

  const computedPercentile = useMemo(() => {
    if (computedScore >= 85) return 15;
    if (computedScore >= 75) return 25;
    if (computedScore >= 65) return 35;
    return 50;
  }, [computedScore]);

  const goToResults = () => {
    const sessionMeta = {
      id: `PANEL-${Date.now()}`,
      dateTime: new Date().toISOString(),
      role: PANEL_DATA.role,
      type: "Panel",
      duration: durationText,
      score: computedScore,
      percentile: computedPercentile,
      questionsAnswered: Object.values(answers).filter((a) => (a || "").trim().length > 0).length,
      totalQuestions: PANEL_DATA.totalQuestions,
    };

    const sessionDetails = {
      questions: PANEL_DATA.questions.map((qq, idx) => ({
        title: qq.title,
        question: qq.text,
        answer: answers[idx] || "",
      })),
    };

    navigate("/session/results", { state: { sessionMeta, sessionDetails } });
  };

  const endSessionEarly = () => {
    const ok = window.confirm("End the panel interview now? Your answers will be shown in Results.");
    if (!ok) return;
    goToResults();
  };

  const nextOrFinish = () => {
    if (qIndex === PANEL_DATA.totalQuestions - 1) goToResults();
    else setQIndex((i) => Math.min(i + 1, PANEL_DATA.totalQuestions - 1));
  };

  return (
    <div className="as-page">
      <div className="as-bg-blobs"><div className="blob-1" /><div className="blob-2" /></div>

      <header className="as-topbar">
        <div className="as-topbar-left">
          <div className="as-pill"><MessageSquareText size={14}/> Panel Interview</div>
          <div className="as-meta">
            <span className="as-meta-title">{PANEL_DATA.role}</span>
            <span className="as-meta-sub">Question {qIndex + 1} of {PANEL_DATA.totalQuestions}</span>
          </div>
        </div>

        <div className="as-topbar-right">
          <div className="as-timer"><Timer size={16}/> {mm}:{ss}</div>
          {/* ✅ End now goes to results */}
          <button className="as-btn-danger" onClick={endSessionEarly}>
            <Flag size={16}/> End
          </button>
        </div>
      </header>

      <main className="as-main-layout">
        <section className="as-content-card">
          <div className="as-q-header">
            <div className="as-interviewer">
              <div className="as-avatar">{PANEL_DATA.persona.initials}</div>
              <div>
                <div className="as-name">{PANEL_DATA.persona.name}</div>
                <div className="as-status"><span></span> Active Now</div>
              </div>
            </div>
            <div className="as-q-actions">
              <button className="as-btn-icon"><Speaker size={18}/></button>
              <button className="as-btn-icon"><Wand2 size={18}/></button>
            </div>
          </div>

          <div className="as-question-box">
            <h2>{q.title}</h2>
            <p>{q.text}</p>
            <div className="as-hint-pill"><Sparkles size={14}/> {q.hint}</div>
          </div>

          <div className="as-editor-wrap">
            <textarea
              className="as-textarea"
              placeholder="Structure your answer using Situation, Task, Action, Result..."
              value={answers[qIndex] || ''}
              onChange={(e) => setAnswers({ ...answers, [qIndex]: e.target.value })}
            />
            <div className="as-editor-footer">
              <span>{answers[qIndex]?.split(' ').filter(Boolean).length || 0} Words</span>
              <button
                className="as-btn-primary"
                onClick={() => setQIndex((i) => Math.min(i + 1, PANEL_DATA.totalQuestions - 1))}
              >
                Save Answer
              </button>
            </div>
          </div>
        </section>

        <aside className="as-sidebar">
          <div className="as-widget">
            <h3><Video size={16}/> Self Preview</h3>
            <div className="as-camera-mock">Camera Active</div>
          </div>
          <div className="as-widget">
            <h3><Activity size={16}/> Panel Meter</h3>
            <div className="as-meter-track"><div className="as-meter-fill" style={{ width: '65%' }}></div></div>
            <p className="as-small-text">Try giving clearer "Result" outcomes.</p>
            <p className="as-small-text" style={{ marginTop: 8 }}>
              <strong>Score:</strong> {computedScore}/100 · <strong>Duration:</strong> {durationText}
            </p>
          </div>
        </aside>
      </main>

      <footer className="as-bottom-nav">
        <button disabled={qIndex === 0} onClick={() => setQIndex(qIndex - 1)}><ChevronLeft/> Prev</button>
        <div className="as-progress-track"><div className="as-progress-fill" style={{ width: `${progress}%` }} /></div>
        <button onClick={nextOrFinish}>
          {qIndex === PANEL_DATA.totalQuestions - 1 ? 'Finish' : 'Next'} <ChevronRight/>
        </button>
      </footer>
    </div>
  );
}
