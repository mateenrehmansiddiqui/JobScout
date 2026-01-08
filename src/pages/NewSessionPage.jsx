import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Play, Upload, Check, Target, Settings, FileText, X, Loader2 } from 'lucide-react';
import './NewSessionPage.css';

const NewSessionPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); 
  
  const [step, setStep] = useState(1);
  const [jobType, setJobType] = useState('paste');
  const [difficulty, setDifficulty] = useState('Medium');
  const [fileName, setFileName] = useState(null); 
  const [numQuestions, setNumQuestions] = useState(10); 
  const [isLaunching, setIsLaunching] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => {
      navigate('/interview');
    }, 2000);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="new-session-page-wrapper">
      {/* Success Overlay Animation */}
      {isLaunching && (
        <div className="launch-overlay anim-fade">
          <div className="success-card">
            <div className="check-circle">
              <Check size={48} color="white" strokeWidth={3} />
            </div>
            <h2>Preparing Interview...</h2>
            <p>Setting up your AI environment</p>
          </div>
        </div>
      )}

      <div className={`dashboard-container ${isLaunching ? 'blur-content' : ''}`}>
        <header className="dashboard-header">
          <div>
            <h1>Start New Session</h1>
          </div>
          <button onClick={() => navigate('/dashboard')} className="text-btn">
              <ChevronLeft size={18} /> Back to Dashboard
          </button>
        </header>

        <div className="stepper-bar">
          <div className={`step-pill ${step >= 1 ? 'active' : ''}`}>1. Job Details</div>
          <div className={`step-pill ${step >= 2 ? 'active' : ''}`}>2. Preferences</div>
          <div className={`step-pill ${step >= 3 ? 'active' : ''}`}>3. Review</div>
        </div>

        <section className="config-card">
          {step === 1 && (
            <div className="step-ui anim-fade">
              <div className="section-header">
                <h3><FileText size={20} /> Job Details</h3>
              </div>
              
              <div className="mode-toggle">
                <button className={jobType === 'paste' ? 'active' : ''} onClick={() => setJobType('paste')}>Paste Job Details</button>
                <button className={jobType === 'select' ? 'active' : ''} onClick={() => setJobType('select')}>Select Role</button>
              </div>

              {jobType === 'paste' ? (
                <textarea className="modern-textarea" placeholder="Paste the job description here..." rows="10" />
              ) : (
                <select className="modern-select">
                  <option>Software Engineer</option>
                  <option>Data Scientist</option>
                  <option>Product Manager</option>
                </select>
              )}

              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />

              <div className={`cv-upload-zone ${fileName ? 'has-file' : ''}`}>
                {fileName ? (
                  <div className="file-info anim-fade">
                    <div className="file-icon"><FileText size={24} /></div>
                    <div className="file-details">
                      <strong>{fileName}</strong>
                      <span>Ready for AI analysis</span>
                    </div>
                    <button className="remove-file" onClick={() => setFileName(null)}>
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} />
                    <div className="upload-text">
                      <strong>Upload your Resume</strong>
                      <p>PDF or Word (Optional)</p>
                    </div>
                    <button type="button" className="upload-action-btn" onClick={handleBrowseClick}>
                      Browse Files
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-ui anim-fade">
              <div className="section-header">
                <h3><Settings size={20} /> Interview Preferences</h3>
              </div>
              
              <div className="grid-2">
                <div className="input-group">
                  <label>Interview Type</label>
                  <select className="modern-select">
                    <option>Technical (Skills & Logic)</option>
                    <option>HR (Behavioral)</option>
                    <option>Panel (Mixed)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Difficulty</label>
                  <div className="pill-selector">
                    {['Easy', 'Medium', 'Hard'].map((lvl) => (
                      <button 
                        key={lvl}
                        className={difficulty === lvl ? 'active' : ''} 
                        onClick={() => setDifficulty(lvl)}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="input-group" style={{marginTop: '25px'}}>
                {/* Minimalistic text display without the blue background */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontWeight: '700', color: '#1e293b' }}>Number of Questions</label>
                  <span className="question-count-badge">{numQuestions} Questions</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="20" 
                  value={numQuestions} 
                  onChange={(e) => setNumQuestions(e.target.value)}
                  className="modern-range" 
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-ui anim-fade">
              <div className="section-header">
                <h3><Target size={20} /> Review & Launch</h3>
              </div>
              <div className="summary-box">
                <div className="summary-row"><span>Role:</span> <strong>Software Engineer</strong></div>
                <div className="summary-row"><span>Type:</span> <strong>Technical</strong></div>
                <div className="summary-row"><span>Resume:</span> <strong>{fileName || 'Not Provided'}</strong></div>
                <div className="summary-row"><span>Difficulty:</span> <strong>{difficulty}</strong></div>
                <div className="summary-row"><span>Questions:</span> <strong>{numQuestions}</strong></div>
              </div>
              <div className="ready-notice">
                <Check size={18} />
                <p>Camera and Microphone check complete. Ready when you are!</p>
              </div>
            </div>
          )}

          <div className="config-footer">
            {step > 1 && !isLaunching && (
              <button className="secondary-btn" onClick={prevStep}>
                <ChevronLeft size={18} /> Previous
              </button>
            )}
            
            <button 
              className={`primary-btn-new ${isLaunching ? 'loading' : ''}`} 
              onClick={step === 3 ? handleLaunch : nextStep}
              disabled={isLaunching}
            >
              {isLaunching ? (
                <>Launching <Loader2 className="spinner" size={18} /></>
              ) : step === 3 ? (
                <>Launch Interview <Play size={18} fill="currentColor" /></>
              ) : (
                <>Continue <ChevronRight size={18} /></>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewSessionPage;