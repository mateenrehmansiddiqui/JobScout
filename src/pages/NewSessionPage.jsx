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
  const [interviewType, setInterviewType] = useState('HR (Behavioral)'); // Added state for routing
  const [fileName, setFileName] = useState(null); 
  const [numQuestions, setNumQuestions] = useState(10); 
  const [isLaunching, setIsLaunching] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  // FIXED: Logic to navigate to the specific chosen session type
  const handleLaunch = () => {
    setIsLaunching(true);
    
    // Determine the path based on interviewType selection
    let targetPath = '/session/hr';
    if (interviewType.includes('Technical')) targetPath = '/session/technical';
    if (interviewType.includes('Panel')) targetPath = '/session/panel';

    setTimeout(() => {
      navigate(targetPath);
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
      {isLaunching && (
        <div className="launch-overlay anim-fade">
          <div className="success-card">
            <div className="check-circle" style={{background: '#10b981', borderRadius: '50%', padding: '10px'}}>
              <Check size={48} color="white" strokeWidth={3} />
            </div>
            <h2>Preparing Interview...</h2>
            <p>Setting up your AI environment</p>
          </div>
        </div>
      )}

      <div className={`dashboard-container ${isLaunching ? 'blur-content' : ''}`}>
        <header className="dashboard-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1>Start New Session</h1>
          <button onClick={() => navigate('/dashboard')} className="text-btn" style={{display:'flex', alignItems:'center', gap:'5px', cursor:'pointer', background:'none', border:'none'}}>
              <ChevronLeft size={18} /> Back to Dashboard
          </button>
        </header>

        <div className="stepper-bar" style={{display:'flex', gap:'20px', marginBottom:'30px'}}>
          <div className={`step-pill ${step >= 1 ? 'active' : ''}`}>1. Job Details</div>
          <div className={`step-pill ${step >= 2 ? 'active' : ''}`}>2. Preferences</div>
          <div className={`step-pill ${step >= 3 ? 'active' : ''}`}>3. Review</div>
        </div>

        <section className="config-card">
          {step === 1 && (
            <div className="step-ui anim-fade">
              <h3><FileText size={20} /> Job Details</h3>
              <div className="mode-toggle">
                <button className={jobType === 'paste' ? 'active' : ''} onClick={() => setJobType('paste')}>Paste Job Details</button>
                <button className={jobType === 'select' ? 'active' : ''} onClick={() => setJobType('select')}>Select Role</button>
              </div>
              {jobType === 'paste' ? (
                <textarea className="modern-textarea" placeholder="Paste the job description here..." rows="10" style={{width:'100%', marginTop:'15px'}} />
              ) : (
                <select className="modern-select" style={{width:'100%', marginTop:'15px', padding:'10px'}}>
                  <option>Software Engineer</option>
                  <option>Data Scientist</option>
                  <option>Product Manager</option>
                </select>
              )}
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf,.doc,.docx" />
              <div className={`cv-upload-zone ${fileName ? 'has-file' : ''}`} style={{border:'2px dashed #ccc', padding:'20px', textAlign:'center', marginTop:'20px', borderRadius:'10px'}}>
                {fileName ? (
                  <div className="file-info">
                    <strong>{fileName}</strong>
                    <button onClick={() => setFileName(null)} style={{marginLeft:'10px'}}><X size={14}/></button>
                  </div>
                ) : (
                  <button type="button" onClick={handleBrowseClick}>Upload Resume</button>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-ui anim-fade">
              <h3><Settings size={20} /> Interview Preferences</h3>
              <div className="input-group">
                <label>Interview Type</label>
                <select 
                  className="modern-select" 
                  value={interviewType} 
                  onChange={(e) => setInterviewType(e.target.value)}
                  style={{width:'100%', padding:'10px'}}
                >
                  <option>HR (Behavioral)</option>
                  <option>Technical (Skills & Logic)</option>
                  <option>Panel (Skills | Behavioral)</option>
                </select>
              </div>
              <div className="input-group" style={{marginTop:'20px'}}>
                <label>Difficulty</label>
                <div className="pill-selector">
                  {['Easy', 'Medium', 'Hard'].map((lvl) => (
                    <button key={lvl} className={difficulty === lvl ? 'active' : ''} onClick={() => setDifficulty(lvl)} style={{marginRight:'10px'}}>{lvl}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-ui anim-fade">
              <h3><Target size={20} /> Review & Launch</h3>
              <div className="summary-box" style={{background:'#f8fafc', padding:'20px', borderRadius:'10px'}}>
                <p>Type: <strong>{interviewType}</strong></p>
                <p>Difficulty: <strong>{difficulty}</strong></p>
                <p>Questions: <strong>{numQuestions}</strong></p>
              </div>
            </div>
          )}

          <div className="config-footer" style={{marginTop:'30px', display:'flex', justifyContent:'space-between'}}>
            {step > 1 && <button className="secondary-btn" onClick={prevStep}>Previous</button>}
            <button 
              className="primary-btn-new" 
              onClick={step === 3 ? handleLaunch : nextStep}
              disabled={isLaunching}
              style={{marginLeft:'auto', padding:'10px 20px', background:'#2563eb', color:'white', border:'none', borderRadius:'8px', cursor:'pointer'}}
            >
              {isLaunching ? 'Launching...' : step === 3 ? 'Launch Interview' : 'Continue'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewSessionPage;