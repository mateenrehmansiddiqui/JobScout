import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, LogOut, Settings, User, Play, Clock, 
  BarChart2, Flame, Star, Trophy, Mic, AlertCircle, TrendingUp, Camera,
  CheckCircle, Award, Target, Video, Users, BookOpen, FileText, Lightbulb
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
      {/* Particle System */}
      <div className="particle-container">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Abstract Geometric Shapes */}
      <div className="shape-1"></div>
      <div className="shape-2"></div>
      <div className="shape-3"></div>
      
      {/* Floating Elements */}
      <div className="floating-element float-1"></div>
      <div className="floating-element float-2"></div>
      <div className="floating-element float-3"></div>
      <div className="floating-element float-4"></div>
      
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

      {/* --- MODERN UNIFIED DASHBOARD --- */}
      <div className="modern-dashboard">
        {/* Hero Section with Stats */}
        <div className="dashboard-hero">
          <div className="hero-left">
            <h1>Welcome back, {mockUser.name.split(' ')[0]}</h1>
            <p>Ready to advance your career? Your personalized interview training journey continues.</p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-number">{mockUser.stats.bestScore}%</div>
              <div className="stat-text">Best Score</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">{mockUser.stats.currentStreak}</div>
              <div className="stat-text">Day Streak</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">Lvl {mockUser.stats.level || 12}</div>
              <div className="stat-text">Level</div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Left Column - Main Practice */}
          <div className="main-column">
            <div className="practice-section">
              <div className="section-header">
                <div className="header-icon">
                  <Mic size={24} />
                </div>
                <div className="header-text question-of-day">
                  <h2>Question of the Day</h2>
                  <p>Sharpen your interview skills with AI-powered feedback</p>
                </div>
              </div>
              
              <div className="practice-content">
                <div className="question-card">
                  <div className="question-text">"How do you handle conflicts with team members?"</div>
                </div>
                
                {!showFeedback ? (
                  <button 
                    className={`record-button ${isRecording ? 'recording' : ''}`} 
                    onClick={handleRecordClick}
                  >
                    {isRecording ? (
                      <>
                        <div className="pulse-dot"></div> Recording...
                      </>
                    ) : (
                      <>
                        <Camera size={18} /> Start Recording
                      </>
                    )}
                  </button>
                ) : (
                  <div className="feedback-card">
                    <div className="feedback-header">
                      <CheckCircle size={20} />
                      <span>AI Analysis Complete</span>
                    </div>
                    <div className="feedback-text">
                      <p>Excellent response! You demonstrated strong conflict resolution skills. Consider adding specific examples for even more impact.</p>
                      <div className="metrics-grid">
                        <div className="metric-item">
                          <span className="metric-label">Confidence</span>
                          <div className="metric-bar">
                            <div className="metric-fill" style={{width: '85%'}}></div>
                          </div>
                          <span className="metric-score">85%</span>
                        </div>
                        <div className="metric-item">
                          <span className="metric-label">Clarity</span>
                          <div className="metric-bar">
                            <div className="metric-fill" style={{width: '92%'}}></div>
                          </div>
                          <span className="metric-score">92%</span>
                        </div>
                      </div>
                    </div>
                    <button className="retry-button" onClick={() => setShowFeedback(false)}>
                      Try Another Question
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Learning Resources */}
            <div className="insight-block learning-resources">
              <div className="insight-title">
                <BookOpen size={20} />
                <h3>Learning Resources</h3>
              </div>
              <div className="learning-content">
                {mockUser.hasPreviousInterviews ? (
                  <div className="resources-list">
                    <div className="resource-item">
                      <div className="resource-icon">
                        <Video size={16} />
                      </div>
                      <div className="resource-content">
                        <h4>Mastering Behavioral Questions</h4>
                        <p>Based on your "conflict resolution" response</p>
                        <span className="resource-type">Video Tutorial</span>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="resource-icon">
                        <FileText size={16} />
                      </div>
                      <div className="resource-content">
                        <h4>STAR Method Guide</h4>
                        <p>Improve your structured responses</p>
                        <span className="resource-type">Article</span>
                      </div>
                    </div>
                    <div className="resource-item">
                      <div className="resource-icon">
                        <Lightbulb size={16} />
                      </div>
                      <div className="resource-content">
                        <h4>Technical Interview Tips</h4>
                        <p>Industry-specific preparation strategies</p>
                        <span className="resource-type">Tips</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="placeholder-content">
                    <div className="placeholder-icon">
                      <BookOpen size={32} />
                    </div>
                    <h4>No Previous Interviews Yet</h4>
                    <p>Complete your first practice session to unlock personalized learning resources tailored to your performance.</p>
                    <button className="start-practice-btn">
                      <Mic size={16} />
                      Start First Practice
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Ranking & Recommendations */}
          <div className="side-column">
            {/* Your Ranking */}
            <div className="insight-block ranking">
              <div className="insight-title">
                <Award size={20} />
                <h3>Your Ranking</h3>
              </div>
              <div className="ranking-content">
                <div className="ranking-circle">
                  <span className="ranking-number">72</span>
                  <span className="ranking-label">Percentile</span>
                </div>
                <p className="ranking-text">You're performing better than <strong>72% of candidates</strong> in your field.</p>
                <div className="ranking-badges">
                  <span className="badge">Top Quartile</span>
                  <span className="badge">Rising Star</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="insight-block recommendations">
              <div className="insight-title">
                <Target size={20} />
                <h3>Next Steps</h3>
              </div>
              <div className="recommendations-list">
                <div className="recommendation">
                  <Video size={16} />
                  <div className="rec-content">
                    <h4>Practice Technical Questions</h4>
                    <p>Focus on behavioral and situational questions</p>
                  </div>
                </div>
                <div className="recommendation">
                  <Clock size={16} />
                  <div className="rec-content">
                    <h4>Improve Response Time</h4>
                    <p>Work on delivering answers within 2 minutes</p>
                  </div>
                </div>
                <div className="recommendation">
                  <Users size={16} />
                  <div className="rec-content">
                    <h4>Industry-Specific Training</h4>
                    <p>Practice questions for your target role</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Spacer for Professional Look */}
        <div className="bottom-spacer"></div>
      </div>
    </div>
  );
};

export default Dashboard;