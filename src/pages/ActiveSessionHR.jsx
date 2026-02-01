import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Timer, Flag, Speaker, Wand2,
  ChevronLeft, ChevronRight, MessageSquareText, Activity, Video
} from 'lucide-react';
import './ActiveSessionHR.css';

const HR_DATA = {
  persona: { name: 'Ayesha (HR)', subtitle: 'Behavioral Specialist', initials: 'AH' },
  role: 'Graduate Software Engineer',
  totalQuestions: 4,
  questions: [
    { title: 'Self Introduction', text: 'Tell me about yourself in 60–90 seconds.', hint: 'Present → Past → Future.' },
    { title: 'Team Conflict', text: 'Describe a time you faced a challenge in a team.', hint: 'Use the STAR method.' },
    { title: 'Strengths', text: 'What is your greatest professional strength?', hint: 'Provide a specific example.' },
    { title: 'Weaknesses', text: 'Tell us about a weakness you are improving.', hint: 'Focus on the "improvement" part.' }
  ],
};

export default function ActiveSessionHR() {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);

  // 15 min timer default
  const [timeLeft, setTimeLeft] = useState(900);

  const [answers, setAnswers] = useState({});
  const [showHelp, setShowHelp] = useState(true);

  // Track session start time for duration calculation
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const q = HR_DATA.questions[qIndex];
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  const progress = ((qIndex + 1) / HR_DATA.totalQuestions) * 100;

  // ✅ compute duration nicely
  const durationText = useMemo(() => {
    const elapsedSec = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    const m = Math.floor(elapsedSec / 60);
    const s = elapsedSec % 60;
    return `${m}m ${String(s).padStart(2, "0")}s`;
  }, [startedAt, qIndex, timeLeft]);

  // ✅ simple scoring placeholder (for now) based on answered questions
  const computedScore = useMemo(() => {
    const answeredCount = Object.values(answers).filter((a) => (a || "").trim().length > 0).length;
    // basic: 50 base + up to 50 based on completion
    return Math.min(100, 50 + Math.round((answeredCount / HR_DATA.totalQuestions) * 50));
  }, [answers]);

  const computedPercentile = useMemo(() => {
    // placeholder mapping from score → percentile band
    if (computedScore >= 85) return 15;
    if (computedScore >= 75) return 25;
    if (computedScore >= 65) return 35;
    return 50;
  }, [computedScore]);

  // ✅ Route to Results page (this is the LINK you need)
  const goToResults = () => {
    const sessionMeta = {
      id: `HR-${Date.now()}`,              // temporary ID (replace with backend id later)
      dateTime: new Date().toISOString(),
      role: HR_DATA.role,
      type: "HR",
      duration: durationText,
      score: computedScore,
      percentile: computedPercentile,
      questionsAnswered: Object.values(answers).filter((a) => (a || "").trim().length > 0).length,
      totalQuestions: HR_DATA.totalQuestions,
    };

    // Send both meta + detailed Q/A so Results page can show it later if you want
    const sessionDetails = {
      questions: HR_DATA.questions.map((qq, idx) => ({
        question: qq.text,
        title: qq.title,
        answer: answers[idx] || "",
      })),
    };

    navigate("/session/results", {
      state: { sessionMeta, sessionDetails }
    });
  };

  // ✅ End early (with confirm)
  const endSessionEarly = () => {
    const ok = window.confirm("End interview session now? Your progress will be saved in this session’s results.");
    if (!ok) return;
    goToResults();
  };

  // ✅ Next / Finish logic
  const nextOrFinish = () => {
    if (qIndex === HR_DATA.totalQuestions - 1) {
      // last question -> results
      goToResults();
    } else {
      setQIndex((i) => Math.min(i + 1, HR_DATA.totalQuestions - 1));
    }
  };

  return (
    <div className="as-page">
      <div className="as-bg-blobs"><div className="blob-1" /><div className="blob-2" /></div>

      <header className="as-topbar">
        <div className="as-topbar-left">
          <div className="as-pill"><MessageSquareText size={14}/> HR Interview</div>
          <div className="as-meta">
            <span className="as-meta-title">{HR_DATA.role}</span>
            <span className="as-meta-sub">Question {qIndex + 1} of {HR_DATA.totalQuestions}</span>
          </div>
        </div>

        <div className="as-topbar-right">
          <div className="as-timer"><Timer size={16}/> {mm}:{ss}</div>

          {/* ✅ changed: End now goes to results (not dashboard) */}
          <button className="as-btn-danger" onClick={endSessionEarly}>
            <Flag size={16}/> End
          </button>
        </div>
      </header>

      <main className="as-main-layout">
        <section className="as-content-card">
          <div className="as-q-header">
            <div className="as-interviewer">
              <div className="as-avatar">{HR_DATA.persona.initials}</div>
              <div>
                <div className="as-name">{HR_DATA.persona.name}</div>
                <div className="as-status"><span></span> Active Now</div>
              </div>
            </div>

            <div className="as-q-actions">
              <button className="as-btn-icon" title="Read aloud">
                <Speaker size={18}/>
              </button>
              <button className="as-btn-icon" title="Hint">
                <Wand2 size={18}/>
              </button>
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

              {/* Save Answer stays same */}
              <button
                className="as-btn-primary"
                onClick={() => setQIndex(i => Math.min(i + 1, HR_DATA.totalQuestions - 1))}
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
            <h3><Activity size={16}/> STAR Meter</h3>
            <div className="as-meter-track">
              <div className="as-meter-fill" style={{ width: '65%' }} />
            </div>
            <p className="as-small-text">Try adding more "Result" keywords.</p>

            {/* ✅ useful mini summary for session */}
            <div className="as-small-text" style={{ marginTop: 10 }}>
              <strong>Estimated Score:</strong> {computedScore}/100 · <strong>Duration:</strong> {durationText}
            </div>
          </div>
        </aside>
      </main>

      <footer className="as-bottom-nav">
        <button disabled={qIndex === 0} onClick={() => setQIndex(qIndex - 1)}>
          <ChevronLeft /> Prev
        </button>


        <div className="as-progress-track">
          <div className="as-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* ✅ changed: finish goes to results */}
        <button onClick={nextOrFinish}>
          {qIndex === HR_DATA.totalQuestions - 1 ? 'Finish' : 'Next'} <ChevronRight />
        </button>
      </footer>
    </div>
  );
}