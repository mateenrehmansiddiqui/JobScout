import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Timer, Flag,
  ChevronLeft, ChevronRight, Video
} from 'lucide-react';
import './ActiveSessionTechnical.css';

const TECH_DATA = {
  persona: { name: 'Hamid Ali (Tech Lead)', subtitle: 'Senior Engineer', initials: 'SC' },
  role: 'Software Engineer',
  totalQuestions: 4,
  questions: [
    { title: 'Array Manipulation', text: 'Implement a function to find the maximum subarray sum.', hint: 'Consider Kadane\'s algorithm.' },
    { title: 'String Processing', text: 'Write a function to check if a string is a valid palindrome.', hint: 'Ignore non-alphanumeric characters.' },
    { title: 'Binary Tree', text: 'Find the maximum depth of a binary tree.', hint: 'Use recursive DFS traversal.' },
    { title: 'System Design', text: 'Design a URL shortening service like TinyURL.', hint: 'Consider scalability and caching.' }
  ],
};

export default function ActiveSessionTechnical() {
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

  const q = TECH_DATA.questions[qIndex];
  const progress = ((qIndex + 1) / TECH_DATA.totalQuestions) * 100;

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
    return Math.min(100, 50 + Math.round((answeredCount / TECH_DATA.totalQuestions) * 50));
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
      id: `TECH-${Date.now()}`,              // temporary ID (replace with backend id later)
      dateTime: new Date().toISOString(),
      role: TECH_DATA.role,
      type: "Technical",
      duration: durationText,
      score: computedScore,
      percentile: computedPercentile,
      questionsAnswered: Object.values(answers).filter((a) => (a || "").trim().length > 0).length,
      totalQuestions: TECH_DATA.totalQuestions,
    };

    // Send both meta + detailed Q/A so Results page can show it later if you want
    const sessionDetails = {
      questions: TECH_DATA.questions.map((qq, idx) => ({
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
    const ok = window.confirm("End technical interview session now? Your progress will be saved in this session's results.");
    if (!ok) return;
    goToResults();
  };

  const nextOrFinish = () => {
    if (qIndex < TECH_DATA.totalQuestions - 1) {
      setQIndex(qIndex + 1);
    } else {
      endSessionEarly();
    }
  };

  return (
    <div className="tech-page">
      <div className="tech-bg-blobs"><div className="tech-blob-1" /><div className="tech-blob-2" /></div>

      <header className="tech-topbar">
        <div className="tech-topbar-left">
          <div className="tech-logo">JobScout</div>
        </div>

        <div className="tech-topbar-center">
          <div className="tech-pill">Technical Interview - {TECH_DATA.role}</div>
        </div>

        <div className="tech-topbar-right">
          <div className="tech-timer"><Timer size={16}/> {mm}:{ss}</div>

          {/* ✅ changed: End now goes to results (not dashboard) */}
          <button className="tech-btn-danger" onClick={endSessionEarly}>
            <Flag size={16}/> End
          </button>
        </div>
      </header>

      <main className="tech-main-layout">
        <section className="tech-video-section">
          <div className="tech-video-grid">
            <div className="tech-video-item">
              <h3>{TECH_DATA.persona.name}</h3>
              <div className="tech-camera-mock tech-interviewer-video">Camera Active</div>
            </div>
            <div className="tech-video-item">
              <h3>Self Preview</h3>
              <div className="tech-camera-mock">Camera Active</div>
            </div>
          </div>
        </section>

        <section className="tech-content-card">
          <div className="tech-question-header">
            <div className="tech-question-bubble">Question {qIndex + 1}</div>
            <h3>{q.title}</h3>
            <p>{q.text}</p>
          </div>
          <div className="tech-code-section">
            <div className="tech-code-header">
              <div className="tech-code-title">Solution Editor</div>
              <div className="tech-code-actions">
                <button className="tech-code-btn">Run</button>
              </div>
            </div>
            <div className="tech-code-editor-container">
              <textarea
                className="tech-code-editor-main"
                placeholder="// Write your solution here..."
                spellCheck={false}
              />
            </div>
            <div className="tech-output-section">
              <div className="tech-output-header">Output</div>
              <div className="tech-output-content">
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="tech-bottom-nav">
        <button 
          className="tech-nav-btn" 
          disabled={qIndex === 0} 
          onClick={() => setQIndex(qIndex - 1)}
        >
          <ChevronLeft /> Prev
        </button>

        <div className="tech-progress-track">
          <div className="tech-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <button 
          className={`tech-nav-btn ${qIndex === TECH_DATA.totalQuestions - 1 ? 'finish' : ''}`}
          onClick={nextOrFinish}
        >
          {qIndex === TECH_DATA.totalQuestions - 1 ? 'Finish' : 'Next'} <ChevronRight />
        </button>
      </footer>
    </div>
  );
}