import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Play, Upload, Check, Target, Settings, FileText, X, Loader2 } from 'lucide-react';
import './NewSessionPage.css';

const NewSessionPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); 
  
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
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
        <header className="dashboard-header">
          <h1>Start New Session</h1>
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
              <h3><FileText size={20} /> Job Details</h3>
              <div className="input-group">
                <label>Role *</label>
                <select 
                  className="modern-select" 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  style={{width:'100%', padding:'10px'}}
                >
                  <option value="">Select a role...</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="UX Designer">UX Designer</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Sales Representative">Sales Representative</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {selectedRole === 'Other' && (
                <div className="input-group" style={{marginTop:'20px'}}>
                  <label>Custom Role *</label>
                  <input 
                    type="text"
                    className="modern-textarea"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="Enter your custom role..."
                    style={{width:'100%', padding:'10px', minHeight:'50px'}}
                  />
                </div>
              )}

              <div className="input-group" style={{marginTop:'20px'}}>
                <label>Job Description {selectedRole === 'Other' ? '*' : '(Optional)'}</label>
                <textarea 
                  className="modern-textarea"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder={selectedRole === 'Other' ? "Please provide a detailed job description..." : "Paste the job description here (optional)..."}
                  rows="8"
                  style={{width:'100%', marginTop:'10px'}}
                />
              </div>

              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf,.doc,.docx" />
              <div className={`cv-upload-zone ${fileName ? 'has-file' : ''}`} onClick={handleBrowseClick}>
                {fileName ? (
                  <div className="file-info">
                    <strong>{fileName}</strong>
                    <button onClick={(e) => { e.stopPropagation(); setFileName(null); }}><X size={14}/></button>
                  </div>
                ) : (
                  <div className="upload-text">
                    <Upload size={32} />
                    <p>Upload Resume</p>
                    <span>Click to browse or drag and drop</span>
                  </div>
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
              <div className="input-group" style={{marginTop:'20px'}}>
                <label>Number of Questions: <span className="question-count-badge">{numQuestions}</span></label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={numQuestions} 
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                  className="modern-range"
                  style={{width:'100%', marginTop:'10px'}}
                />
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#64748b', marginTop:'5px'}}>
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-ui anim-fade">
              <h3><Target size={20} /> Review & Launch</h3>
              <div className="summary-box">
                <p style={{marginBottom:'20px', fontSize:'15px'}}>
                  Role: <strong>{selectedRole === 'Other' ? customRole : selectedRole}</strong>
                </p>
                <p style={{marginBottom:'20px', fontSize:'15px'}}>
                  Type: <strong>{interviewType}</strong>
                </p>
                <p style={{marginBottom:'20px', fontSize:'15px'}}>
                  Difficulty: <strong>{difficulty}</strong>
                </p>
                <p style={{marginBottom:'0', fontSize:'15px'}}>
                  Questions: <strong>{numQuestions}</strong>
                </p>
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