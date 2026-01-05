import React from 'react';
import './Dashboard.css';
import StatCard from '@components/StatCard';
import Button from '@components/Button';
import { mockUser, mockSessions } from '@data/mockData';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <header className="dashboard-header">
        <div>
          <h1>Hi {mockUser.name}, ready to practice?</h1>
          <p>Your performance is up 12% this week. Keep it up!</p>
        </div>
        <div className="header-actions">
           <Button variant="primary" size="large">
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
        {/* Left Column: Analytics */}
        <div className="content-left">
          <section className="chart-section">
            <div className="section-header">
              <h3>Skill Radar</h3>
              <span className="badge">AI Insights</span>
            </div>
            <div className="placeholder-chart">
               {/* Note: Use a library like Chart.js or Recharts here in Phase 2 */}
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
              <a href="/history" className="view-all">View All</a>
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
                {mockSessions.map(session => (
                  <tr key={session.id}>
                    <td>{session.role}</td>
                    <td>{session.date}</td>
                    <td><span className="score-tag">{session.score}%</span></td>
                    <td><button className="text-btn">Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* Right Column: Recommendations & Badges */}
        <div className="content-right">
          <section className="recommendations">
            <h3>Recommended for You</h3>
            <div className="rec-card">
              <span>Behavioral</span>
              <h4>Handle Conflict Questions</h4>
              <p>Based on your last session feedback.</p>
            </div>
            <div className="rec-card secondary">
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