import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, LogOut, Settings, User, Play, Clock, 
  BarChart2, Flame, Star, Trophy, Mic, AlertCircle, TrendingUp, Camera 
} from 'lucide-react';
import './Dashboard.css';
import { mockUser } from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Simulate AI feedback after recording
  const handleRecordClick = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setShowFeedback(true);
    }, 3000);
  };

  return (
    <div className="dashboard-wrapper">
      {/* --- TOP HEADER (Restored to earlier style) --- */}
      <nav className="top-header">
        <div className="header-left">
          <span className="logo" onClick={() => navigate('/')}>JobScout</span>
        </div>

        <div className="header-center">
          <button className="nav-btn primary" onClick={() => navigate('/new-session')}>
            <Play size={16} fill="currentColor" /> Start New Interview
          </button>
          <button className="nav-btn" onClick={() => navigate('/session/history')}>
            <Clock size={16} /> Interview History
          </button>
          <button className="nav-btn" onClick={() => navigate('/progress')}>
            <BarChart2 size={16} /> Progress Dashboard
          </button>
        </div>

        <div className="header-right">
          <div className="profile-menu-container">
            <button className="profile-trigger" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <div className="avatar">
                {mockUser.avatar ? <img src={mockUser.avatar} alt="User" /> : <User size={20} />}
              </div>
              <span>{mockUser.name.split(' ')[0]}</span>
              <ChevronDown size={14} />
            </button>

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={() => navigate('/profile')}>
                  <Settings size={16} /> Settings
                </div>
                <div className="dropdown-item logout" onClick={() => console.log("Logout logic")}>
                  <LogOut size={16} /> Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT (New Actionable Layout) --- */}
      <main className="dashboard-container">
        <header className="hero-greeting">
          <h1>Welcome back, {mockUser.name.split(' ')[0]}! 👋</h1>
          <p>Your path to {mockUser.role || 'Professional'} success starts with today's practice.</p>
        </header>

        {/* 2. The Stats Row */}
        <div className="stats-widgets-container">
          <div className="stat-widget best-score">
            <div className="widget-icon"><Star size={24} /></div>
            <div className="widget-data">
              <span className="widget-label">Best Score</span>
              <span className="widget-value">{mockUser.stats.bestScore}%</span>
            </div>
          </div>

          <div className="stat-widget streak">
            <div className="widget-icon"><Flame size={24} /></div>
            <div className="widget-data">
              <span className="widget-label">Daily Streak</span>
              <span className="widget-value">{mockUser.stats.currentStreak} Days</span>
            </div>
          </div>

          <div className="stat-widget level">
            <div className="widget-icon"><Trophy size={24} /></div>
            <div className="widget-data">
              <span className="widget-label">User Level</span>
              <span className="widget-value">Lvl {mockUser.stats.level || 12}</span>
            </div>
          </div>
        </div>

        {/* 3, 4, & 5. Actionable Insights Grid */}
        <div className="action-grid">
          <section className="warmup-card">
            <div className="section-title">
              <Mic size={20} />
              <h3>Question of the Day</h3>
            </div>
            <div className="card-body">
              <p className="prompt-text">"How do you prioritize your tasks when faced with multiple tight deadlines?"</p>
              
              {!showFeedback ? (
                <button 
                  className={`record-action-btn ${isRecording ? 'recording' : ''}`} 
                  onClick={handleRecordClick}
                >
                  {isRecording ? <><div className="pulse-dot"></div> Recording...</> : <><Camera size={18} /> Record 30s Clip</>}
                </button>
              ) : (
                <div className="ai-quick-feedback">
                  <h4>✨ AI Quick Feedback</h4>
                  <p>Great confidence! You structured your answer using the STAR method well, but consider mentioning specific tools.</p>
                  <button className="reset-btn" onClick={() => setShowFeedback(false)}>Try Again</button>
                </div>
              )}
            </div>
          </section>

          <section className="alert-card">
            <div className="section-title">
              <AlertCircle size={20} color="#f59e0b" />
              <h3>Watch Out!</h3>
            </div>
            <div className="card-body">
              <div className="alert-box">
                <p>AI detected that your <strong>eye contact</strong> dropped by 15% during technical explanations last session.</p>
                <div className="alert-footer">Proactive Alert • High Priority</div>
              </div>
            </div>
          </section>

          <section className="market-card">
            <div className="section-title">
              <TrendingUp size={20} />
              <h3>Market Readiness</h3>
            </div>
            <div className="card-body">
              <div className="benchmark-viz">
                <div className="viz-circle">
                  <span className="percentile">72%</span>
                </div>
                <p>You are outperforming <strong>72% of candidates</strong> in your role.</p>
              </div>
              <div className="benchmark-bar-container">
                <div className="benchmark-bar-fill" style={{width: '72%'}}></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;