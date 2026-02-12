import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Timer, Flag,
  ChevronLeft, ChevronRight, Video
} from 'lucide-react';
import './ActiveSessionHR.css';

const HR_DATA = {
  persona: { name: 'Emily Thompson (HR)', subtitle: 'Behavioral Specialist', initials: 'ET' },
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

  // Count up timer (elapsed time)
  const [elapsedTime, setElapsedTime] = useState(0);

  const [answers, setAnswers] = useState({});
  const [showHelp, setShowHelp] = useState(true);
  const [showTextBox, setShowTextBox] = useState(false);

  // Track session start time for duration calculation
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setElapsedTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
  const ss = String(elapsedTime % 60).padStart(2, '0');

  const q = HR_DATA.questions[qIndex];
  const progress = ((qIndex + 1) / HR_DATA.totalQuestions) * 100;

  // ✅ compute duration nicely
  const durationText = useMemo(() => {
    const m = Math.floor(elapsedTime / 60);
    const s = elapsedTime % 60;
    return `${m}m ${String(s).padStart(2, "0")}s`;
  }, [elapsedTime]);

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

  // End early (with confirm)
  const endSessionEarly = () => {
    const ok = window.confirm("End HR interview session now? Your progress will be saved in this session's results.");
    if (!ok) return;
    goToResults();
  };

  // Next / Finish logic
  const nextOrFinish = () => {
    if (qIndex === HR_DATA.totalQuestions - 1) {
      // last question -> results
      goToResults();
    } else {
      setQIndex((i) => Math.min(i + 1, HR_DATA.totalQuestions - 1));
    }
  };

  return (
    <div className="hr-page">
      <div className="hr-bg-blobs"><div className="blob-1" /><div className="blob-2" /></div>

      <header className="hr-topbar">
        <div className="hr-topbar-left">
          <div className="hr-logo">JobScout</div>
        </div>

        <div className="hr-topbar-center">
          <div className="hr-pill">HR Interview - {HR_DATA.role}</div>
        </div>

        <div className="hr-topbar-right">
          <div className="hr-timer"><Timer size={16}/> {mm}:{ss}</div>

          {/* ✅ changed: End now goes to results (not dashboard) */}
          <button className="hr-btn-danger" onClick={endSessionEarly}>
            <Flag size={16}/> End
          </button>
        </div>
      </header>

      <main className="hr-main-layout">
        <section className="hr-video-section">
          <div className="hr-video-grid">
            <div className="hr-video-item">
              <h3>Emily Thompson (HR)</h3>
              <div className="hr-camera-mock hr-interviewer-video">Camera Active</div>
            </div>
            <div className="hr-video-item">
              <h3>Self Preview</h3>
              <div className="hr-camera-mock">Camera Active</div>
            </div>
          </div>
        </section>

        <section className="hr-content-card">
          <div className="hr-question-box">
            <div className="hr-question-bubble">Question {qIndex + 1}</div>
            <p>{q.text}</p>
            
            {showTextBox ? (
              <div className="hr-text-box-container">
                <textarea
                  className="hr-textarea"
                  placeholder="Type your response here..."
                  value={answers[qIndex] || ''}
                  onChange={(e) => setAnswers({ ...answers, [qIndex]: e.target.value })}
                />
                <div className="hr-text-box-footer">
                  <span>{answers[qIndex]?.split(' ').filter(Boolean).length || 0} Words</span>
                  <button className="hr-nav-btn" onClick={() => setShowTextBox(false)}>
                    Close Text Box
                  </button>
                </div>
              </div>
            ) : (
              <div className="hr-mic-fallback">
                <button className="hr-mic-btn" onClick={() => setShowTextBox(true)}>
                  Mic not working? Click here to open a text box.
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="hr-bottom-nav">
        <button 
          className="hr-nav-btn" 
          disabled={qIndex === 0} 
          onClick={() => setQIndex(qIndex - 1)}
        >
          <ChevronLeft /> Prev
        </button>

        <div className="hr-progress-track">
          <div className="hr-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <button 
          className={`hr-nav-btn ${qIndex === HR_DATA.totalQuestions - 1 ? 'finish' : ''}`}
          onClick={nextOrFinish}
        >
          {qIndex === HR_DATA.totalQuestions - 1 ? 'Finish' : 'Next'} <ChevronRight />
        </button>
      </footer>
    </div>
  );
}