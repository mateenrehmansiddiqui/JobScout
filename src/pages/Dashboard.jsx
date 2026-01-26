import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import { mockUser, mockSessions } from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ Go to Session History page
  const goToHistory = () => {
    navigate('/session/history');
  };

  // ✅ Go to Session Results page with session meta passed via state
  const goToSessionDetails = (session) => {
    const sessionMeta = {
      id: session.id,
      dateTime: session.date,          // if you have full ISO later, replace this
      role: session.role,
      type: session.type || "HR",      // fallback if mock data doesn't have it
      duration: session.duration || "—",
      score: session.score,
      percentile: session.percentile || null,
      questionsAnswered: session.questionsAnswered || null,
      totalQuestions: session.totalQuestions || null,
    };

    navigate('/session/results', {
      state: { sessionMeta }
    });
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <header className="dashboard-header">
        <div>
          <h1>Hi {mockUser.name}, ready to practice?</h1>
          <p>Your performance is up 12% this week. Keep it up!</p>
        </div>

        <div className="header-actions">
          {/* ✅ Optional but useful: quick History link in header */}
          <button
            onClick={goToHistory}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.12)',
              padding: '10px 14px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 600,
              marginRight: 10
            }}
          >
            History
          </button>

          <Button
            variant="primary"
            size="large"
            onClick={() => navigate('/new-session')}
          >
            Start New Interview
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard label="Interviews" value={mockUser.stats.totalInterviews} icon="🎯" />
        <StatCard label="Best Score" value={`${mockUser.stats.bestScore}%`} icon="⭐" />
        <StatCard label="Current Streak" value={`${mockUser.stats.currentStreak} Days`} icon="🔥" />
        <StatCard label="Percentile" value={`Top ${100 - mockUser.stats.percentileRank}%`} icon="📊" />
      </div>

      <div className="dashboard-main-content">
        <div className="content-left">
          <section className="chart-section">
            <div className="section-header">
              <h3>Skill Radar</h3>
              <span className="badge">AI Insights</span>
            </div>
            <div className="placeholder-chart">
              <div className="radar-placeholder">Skill Matrix Visualization</div>
            </div>
            <div className="alert-box">
              <strong>Focus on: Communication</strong>
              <p>Practice active listening and reducing filler words.</p>
            </div>
          </section>

          <section className="recent-sessions">
            <div className="section-header">
              <h3>Recent Sessions</h3>

              {/* ✅ FIXED: Now points to your real history page */}
              <button
                onClick={goToHistory}
                className="view-all"
                style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
              >
                View All
              </button>
            </div>

            <table className="sessions-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {mockSessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.role}</td>
                    <td>{session.date}</td>
                    <td><span className="score-tag">{session.score}%</span></td>

                    {/* ✅ FIXED: Details now navigates to Session Results */}
                    <td>
                      <button
                        className="text-btn"
                        onClick={() => goToSessionDetails(session)}
                        style={{ cursor: 'pointer' }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="content-right">
          <section className="recommendations">
            <h3>Recommended for You</h3>

            <div
              className="rec-card"
              onClick={() => navigate('/session/hr')}
              style={{ cursor: 'pointer' }}
            >
              <span>Behavioral</span>
              <h4>Handle Conflict Questions</h4>
              <p>Based on your last session feedback.</p>
            </div>

            <div
              className="rec-card secondary"
              onClick={() => navigate('/session/technical')}
              style={{ cursor: 'pointer' }}
            >
              <span>Technical</span>
              <h4>System Design Basics</h4>
              <p>Recommended for {mockUser.role} roles.</p>
            </div>
          </section>

          <section className="achievements">
            <h3>Achievements</h3>
            <div className="badge-grid">
              <div className="badge-item" title="7 Day Streak">🔥</div>
              <div className="badge-item" title="Quick Learner">⚡</div>
              <div className="badge-item locked">🔒</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
