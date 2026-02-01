import React, { useState } from "react";
import {
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  PanelLeftClose,
  PanelLeft,
  User,
  MessageSquare,
  StickyNote,
  Pen,
  Square,
  Type,
  Eraser,
  Play,
  Save,
} from "lucide-react";
import "./ActiveInterviewSession.css";

// -----------------------------------------------------------------------------
// Active Interview Session – Frontend-only prototype. No backend/API.
// Mock data and UI state only. FAANG-style focused interview environment.
// -----------------------------------------------------------------------------

const MOCK_TIMER_MINUTES = 45;
const MOCK_QUESTION_INDEX = 2;
const MOCK_TOTAL_QUESTIONS = 10;
const MOCK_QUESTION =
  "Describe a situation where you had to resolve a conflict within your team. What was your approach, and what was the outcome?";

const MOCK_CODE = `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`;

const ANSWER_MODES = { TEXT: "text", CODE: "code", WHITEBOARD: "whiteboard" };

const ActiveInterviewSession = () => {
  // Top bar & navigation
  const [timerMinutes] = useState(MOCK_TIMER_MINUTES);
  const [currentQuestion] = useState(MOCK_QUESTION_INDEX);
  const [showEndModal, setShowEndModal] = useState(false);

  // Answer input
  const [answerMode, setAnswerMode] = useState(ANSWER_MODES.TEXT);
  const [textAnswer, setTextAnswer] = useState("");
  const [codeContent, setCodeContent] = useState(MOCK_CODE);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  // Side panel
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [notes, setNotes] = useState("");

  // Word/character count for text mode
  const wordCount = textAnswer.trim() ? textAnswer.trim().split(/\s+/).length : 0;
  const charCount = textAnswer.length;

  const handleEndInterviewConfirm = () => {
    setShowEndModal(false);
    // In real app: navigate away or call API
  };

  return (
    <div className="active-session">
      {/* ----- TOP BAR (fixed) ----- */}
      <header className="active-session__top-bar">
        <div className="top-bar__timer">
          <Clock size={18} aria-hidden />
          <span>{String(timerMinutes).padStart(2, "0")}:00</span>
        </div>
        <div className="top-bar__progress-label">
          Question {currentQuestion + 1} / {MOCK_TOTAL_QUESTIONS}
        </div>
        <button
          type="button"
          className="top-bar__end-btn"
          onClick={() => setShowEndModal(true)}
          aria-label="End interview early"
        >
          <AlertCircle size={16} aria-hidden />
          End Interview Early
        </button>
      </header>

      {/* ----- SIDE PANEL TOGGLE (when collapsed, show tab) ----- */}
      <button
        type="button"
        className={`active-session__panel-toggle ${sidePanelOpen ? "open" : ""}`}
        onClick={() => setSidePanelOpen((o) => !o)}
        aria-label={sidePanelOpen ? "Close side panel" : "Open side panel"}
      >
        {sidePanelOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
      </button>

      {/* ----- OPTIONAL SIDE PANEL (collapsible) ----- */}
      <aside className={`active-session__side-panel ${sidePanelOpen ? "open" : ""}`}>
        <div className="side-panel__section">
          <h3 className="side-panel__heading">
            <MessageSquare size={16} aria-hidden />
            Hints
          </h3>
          <p className="side-panel__hint-text">
            Consider using the STAR method: Situation, Task, Action, Result.
          </p>
        </div>
        <div className="side-panel__section">
          <h3 className="side-panel__heading">
            <StickyNote size={16} aria-hidden />
            Notes
          </h3>
          <textarea
            className="side-panel__notes"
            placeholder="Your private notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
        <div className="side-panel__section side-panel__video">
          <div className="side-panel__video-preview">
            <div className="recording-dot" aria-hidden />
            <span className="side-panel__video-label">You</span>
          </div>
          <div className="side-panel__controls">
            <button
              type="button"
              className={`side-panel__control-btn ${!cameraOn ? "off" : ""}`}
              onClick={() => setCameraOn((c) => !c)}
              aria-label={cameraOn ? "Turn camera off" : "Turn camera on"}
            >
              {cameraOn ? <Video size={18} /> : <VideoOff size={18} />}
            </button>
            <button
              type="button"
              className={`side-panel__control-btn ${isMuted ? "off" : ""}`}
              onClick={() => setIsMuted((m) => !m)}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </div>
        </div>
      </aside>

      {/* ----- MAIN CONTENT (center-focused) ----- */}
      <main className="active-session__main">
        {/* Interviewer section: avatar + question card */}
        <section className="active-session__interviewer">
          <div className="interviewer__avatar-wrap">
            <div className="interviewer__avatar">
              <User size={40} strokeWidth={1.5} aria-hidden />
            </div>
          </div>
          <div className="interviewer__question-card">
            <p className="interviewer__question-text">{MOCK_QUESTION}</p>
            <button
              type="button"
              className="interviewer__read-aloud"
              aria-label="Read question aloud"
            >
              <Volume2 size={20} aria-hidden />
              Read Aloud
            </button>
          </div>
        </section>

        {/* Answer input: mode tabs + content */}
        <section className="active-session__answer">
          <div className="answer__tabs">
            <button
              type="button"
              className={`answer__tab ${answerMode === ANSWER_MODES.TEXT ? "active" : ""}`}
              onClick={() => setAnswerMode(ANSWER_MODES.TEXT)}
            >
              <Type size={18} aria-hidden />
              Text Answer
            </button>
            <button
              type="button"
              className={`answer__tab ${answerMode === ANSWER_MODES.CODE ? "active" : ""}`}
              onClick={() => setAnswerMode(ANSWER_MODES.CODE)}
            >
              <Square size={18} aria-hidden />
              Code Editor
            </button>
            <button
              type="button"
              className={`answer__tab ${answerMode === ANSWER_MODES.WHITEBOARD ? "active" : ""}`}
              onClick={() => setAnswerMode(ANSWER_MODES.WHITEBOARD)}
            >
              <Pen size={18} aria-hidden />
              Whiteboard
            </button>
          </div>

          {/* Text mode */}
          {answerMode === ANSWER_MODES.TEXT && (
            <div className="answer__content answer__content--text">
              <textarea
                className="answer__textarea"
                placeholder="Type your answer here..."
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                rows={8}
              />
              <div className="answer__text-meta">
                <span className="answer__counter">
                  {wordCount} words · {charCount} characters
                </span>
                <button type="button" className="answer__done-btn">
                  I'm Done
                </button>
              </div>
            </div>
          )}

          {/* Code mode */}
          {answerMode === ANSWER_MODES.CODE && (
            <div className="answer__content answer__content--code">
              <div className="answer__code-header">
                <select
                  className="answer__lang-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  aria-label="Code language"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <button type="button" className="answer__run-btn">
                  <Play size={16} aria-hidden />
                  Run Code
                </button>
              </div>
              <pre className="answer__code-editor">
                <code>
                  <textarea
                    className="answer__code-textarea"
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    spellCheck={false}
                    aria-label="Code input"
                  />
                </code>
              </pre>
              <div className="answer__console">
                <span className="answer__console-label">Console output</span>
                <pre className="answer__console-output">(No output — run code to see results)</pre>
              </div>
            </div>
          )}

          {/* Whiteboard mode */}
          {answerMode === ANSWER_MODES.WHITEBOARD && (
            <div className="answer__content answer__content--whiteboard">
              <div className="answer__whiteboard-tools">
                <button type="button" className="whiteboard-tool active" aria-label="Pen">
                  <Pen size={18} />
                </button>
                <button type="button" className="whiteboard-tool" aria-label="Shape">
                  <Square size={18} />
                </button>
                <button type="button" className="whiteboard-tool" aria-label="Text">
                  <Type size={18} />
                </button>
                <button type="button" className="whiteboard-tool" aria-label="Eraser">
                  <Eraser size={18} />
                </button>
              </div>
              <div className="answer__canvas-placeholder">
                <span>Drawing canvas placeholder</span>
                <p className="answer__canvas-hint">Use tools above to draw (simulated)</p>
              </div>
              <button type="button" className="answer__snapshot-btn">
                <Save size={16} aria-hidden />
                Save Snapshot
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ----- BOTTOM BAR (fixed) ----- */}
      <footer className="active-session__bottom-bar">
        <button type="button" className="bottom-bar__nav-btn" aria-label="Previous question">
          <ChevronLeft size={20} aria-hidden />
          Previous
        </button>
        <div className="bottom-bar__dots">
          {Array.from({ length: MOCK_TOTAL_QUESTIONS }, (_, i) => (
            <span
              key={i}
              className={`bottom-bar__dot ${i === currentQuestion ? "current" : ""} ${i < currentQuestion ? "done" : ""}`}
              aria-label={`Question ${i + 1}`}
            />
          ))}
        </div>
        <button type="button" className="bottom-bar__submit-btn">
          <Send size={18} aria-hidden />
          Submit Answer
        </button>
        <button type="button" className="bottom-bar__nav-btn" aria-label="Next question">
          Next
          <ChevronRight size={20} aria-hidden />
        </button>
      </footer>

      {/* ----- END INTERVIEW CONFIRMATION MODAL ----- */}
      {showEndModal && (
        <div className="active-session__modal-overlay" role="dialog" aria-modal="true" aria-labelledby="end-modal-title">
          <div className="active-session__modal">
            <h2 id="end-modal-title" className="active-session__modal-title">
              End interview early?
            </h2>
            <p className="active-session__modal-text">
              Your progress will be saved, but you won't receive feedback for unanswered questions.
            </p>
            <div className="active-session__modal-actions">
              <button type="button" className="active-session__modal-btn secondary" onClick={() => setShowEndModal(false)}>
                Cancel
              </button>
              <button type="button" className="active-session__modal-btn danger" onClick={handleEndInterviewConfirm}>
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveInterviewSession;
