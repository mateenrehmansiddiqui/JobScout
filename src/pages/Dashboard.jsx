import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, LogOut, Settings, User, Play, Clock, 
  BarChart2, Flame, Star, Trophy, Mic, AlertCircle, TrendingUp, Camera, BookOpen, Award, Target
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

      {/* --- MAIN CONTENT (New Layout Based on Reference Image) --- */}
      <main className="dashboard-container">
        {/* Welcome Banner Section */}
        <section className="welcome-banner">
          <div className="welcome-content">
            <h1>Welcome back, {mockUser.name.split(' ')[0]}</h1>
            <p>Your path to {mockUser.role || 'Professional'} success starts with today's practice.</p>
          </div>
          
          {/* Metrics Cards */}
          <div className="metrics-cards">
            <div className="metric-card best-score">
              <div className="metric-icon">
                <Star size={20} />
              </div>
              <div className="metric-content">
                <span className="metric-value">{mockUser.stats.bestScore}%</span>
                <span className="metric-label">BEST SCORE</span>
              </div>
            </div>
            
            <div className="metric-card streak">
              <div className="metric-icon">
                <Flame size={20} />
              </div>
              <div className="metric-content">
                <span className="metric-value">{mockUser.stats.currentStreak}</span>
                <span className="metric-label">DAY STREAK</span>
              </div>
            </div>
            
            <div className="metric-card level">
              <div className="metric-icon">
                <Trophy size={20} />
              </div>
              <div className="metric-content">
                <span className="metric-value">Lvl {mockUser.stats.level || 12}</span>
                <span className="metric-label">LEVEL</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Grid Layout */}
        <div className="dashboard-grid">
          {/* Question of the Day Card */}
          <div className="card question-of-day">
            <div className="card-header">
              <Mic size={24} />
              <h3>Question of the Day</h3>
            </div>
            <div className="card-body">
              <p className="description">Sharpen your interview skills with AI-powered feedback</p>
              <div className="question-text">
                "How do you handle conflicts with team members?"
              </div>
              {!showFeedback ? (
                <button 
                  className={`record-btn ${isRecording ? 'recording' : ''}`} 
                  onClick={handleRecordClick}
                >
                  {isRecording ? (
                    <><div className="pulse-dot"></div> Recording...</>
                  ) : (
                    <>Start Recording</>
                  )}
                </button>
              ) : (
                <div className="ai-feedback">
                  <h4>✨ AI Quick Feedback</h4>
                  <p>Great confidence! You structured your answer using the STAR method well, but consider mentioning specific tools.</p>
                  <button className="reset-btn" onClick={() => setShowFeedback(false)}>Try Again</button>
                </div>
              )}
            </div>
          </div>

          {/* Learning Resources Card */}
          <div className="card learning-resources">
            <div className="card-header">
              <BookOpen size={24} />
              <h3>Learning Resources</h3>
            </div>
            <div className="card-body">
              <p className="message">No Previous Interviews Yet. Complete your first practice session to unlock personalized learning resources tailored to your performance.</p>
              <button className="primary-btn" onClick={() => navigate('/new-session')}>
                Start First Practice
              </button>
            </div>
          </div>

          {/* Your Ranking Card */}
          <div className="card your-ranking">
            <div className="card-header">
              <Award size={24} />
              <h3>Your Ranking</h3>
            </div>
            <div className="card-body">
              <div className="circular-progress">
                <div className="progress-circle">
                  <span className="percentile">72<span className="percent">%</span></span>
                  <span className="percentile-text">PERCENTILE</span>
                </div>
              </div>
              <p className="ranking-text">You're performing better than 72% of candidates in your field.</p>
              <div className="ranking-tags">
                <span className="tag top-quartile">TOP QUARTILE</span>
                <span className="tag rising-star">RISING STAR</span>
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="card next-steps">
            <div className="card-header">
              <Target size={24} />
              <h3>Next Steps</h3>
            </div>
            <div className="card-body">
              <ul className="steps-list">
                <li>Practice Technical Questions</li>
                <li>Improve Response Time</li>
                <li>Industry-Specific Training</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;