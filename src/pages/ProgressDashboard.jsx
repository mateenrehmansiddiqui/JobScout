import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Award, TrendingUp, Target, 
  Calendar, BarChart, Zap, ChevronRight 
} from 'lucide-react';
import './ProgressDashboard.css';
import { mockUser } from '../data/mockData';

const ProgressDashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30d');

  const practiceData = [
    { label: 'Technical', value: 85, color: '#2563eb' },
    { label: 'Behavioral', value: 60, color: '#7c3aed' },
    { label: 'System Design', value: 40, color: '#10b981' },
    { label: 'HR/Soft Skills', value: 30, color: '#f59e0b' },
  ];

  return (
    <div className="progress-wrapper">
      {/* --- TOP NAV --- */}
      <nav className="progress-nav">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={20} /> Back
          </button>
        </div>
        
        <div className="nav-center">
          <span className="logo" onClick={() => navigate('/dashboard')}>JobScout</span>
        </div>

        <div className="nav-right">
          {/* NEW TRENDY SLIDING TOGGLE */}
          <div className="segmented-control">
            <div 
              className="selection-slider" 
              style={{ 
                transform: `translateX(${timeRange === '7d' ? '0%' : timeRange === '30d' ? '100%' : '200%'})` 
              }}
            ></div>
            <button 
              className={`segment-btn ${timeRange === '7d' ? 'active' : ''}`}
              onClick={() => setTimeRange('7d')}
            >
              7D
            </button>
            <button 
              className={`segment-btn ${timeRange === '30d' ? 'active' : ''}`}
              onClick={() => setTimeRange('30d')}
            >
              30D
            </button>
            <button 
              className={`segment-btn ${timeRange === 'All' ? 'active' : ''}`}
              onClick={() => setTimeRange('All')}
            >
              ALL
            </button>
          </div>
        </div>
      </nav>

      <main className="progress-container">
        <header className="progress-header">
          <h1>Your Progress Analytics</h1>
          <p>Deep dive into your interview performance and consistency!</p>
        </header>

        {/* --- ROW 1: GAMIFICATION --- */}
        <div className="analytics-grid top-row">
          <section className="stats-card xp-card">
            <div className="card-header">
              <Zap size={20} fill="#f59e0b" color="#f59e0b" />
              <span>Career XP</span>
            </div>
            <div className="xp-content">
              <div className="xp-value">12,450</div>
              <div className="xp-bar-bg"><div className="xp-bar-fill" style={{width: '75%'}}></div></div>
              <p className="xp-footer">750 XP to <strong>Level 13</strong></p>
            </div>
          </section>

          <section className="stats-card badges-preview">
            <div className="card-header">
              <Award size={20} color="#7c3aed" />
              <span>Latest Badges</span>
            </div>
            <div className="badge-row">
              <div className="badge-circle" title="50 Interviews Completed">🏆</div>
              <div className="badge-circle" title="Top 10% Regional">🌍</div>
              <div className="badge-circle locked">🔒</div>
              <div className="view-all-badges"><ChevronRight size={16} /></div>
            </div>
          </section>
        </div>

        {/* --- ROW 2: CORE ANALYTICS --- */}
        <div className="analytics-grid main-row">
          <section className="chart-card large">
            <div className="chart-header">
              <h3>Skill-Wise Trends</h3>
              <div className="chart-legend">
                <span className="dot comm"></span> Communication
                <span className="dot tech"></span> Technical
              </div>
            </div>
            <div className="viz-placeholder">
              <div className="radar-mock-container">
                <div className="radar-ring"></div>
                <div className="radar-ring small"></div>
                <div className="radar-shape"></div>
              </div>
            </div>
          </section>

          <section className="chart-card heatmap-section">
            <div className="chart-header">
              <h3>Practice Consistency</h3>
              <Calendar size={18} color="#64748b" />
            </div>
            <div className="heatmap-container">
               <div className="heatmap-grid">
                  {[...Array(84)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`heat-square level-${Math.floor(Math.random() * 4)}`}
                    ></div>
                  ))}
               </div>
               <div className="heatmap-labels">
                  <span>Less</span>
                  <div className="heat-square level-0"></div>
                  <div className="heat-square level-1"></div>
                  <div className="heat-square level-2"></div>
                  <div className="heat-square level-3"></div>
                  <span>More</span>
               </div>
            </div>
          </section>
        </div>

        {/* --- ROW 3: COMPETITIVE EDGE --- */}
        <div className="analytics-grid bottom-row">
          <section className="chart-card">
            <div className="chart-header">
              <h3>Percentile Rank</h3>
              <TrendingUp size={18} color="#10b981" />
            </div>
            <div className="percentile-viz">
              <div className="percentile-number">Top 32%</div>
              <p>Improved from <strong>45th</strong> to <strong>68th</strong> percentile.</p>
              <div className="mini-line-chart-viz">
                 <svg viewBox="0 0 100 40" className="sparkline">
                    <path d="M0 35 L20 30 L40 38 L60 20 L80 15 L100 5" fill="none" stroke="#2563eb" strokeWidth="3" />
                 </svg>
              </div>
            </div>
          </section>

          <section className="chart-card">
            <div className="chart-header">
              <h3>Practice Breakdown</h3>
              <BarChart size={18} color="#2563eb" />
            </div>
            <div className="bar-chart-container">
              {practiceData.map((item) => (
                <div className="bar-row" key={item.label}>
                  <div className="bar-label">{item.label}</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                  </div>
                  <div className="bar-percent">{item.value}%</div>
                </div>
              ))}
            </div>
          </section>

          <section className="chart-card ai-insights">
            <h3>AI Recommendations</h3>
            <div className="insight-item">
              <div className="insight-icon info">💡</div>
              <p>Focus on <strong>System Design</strong> to reach the top 10%.</p>
            </div>
            <div className="insight-item">
              <div className="insight-icon success">🔥</div>
              <p>Great consistency! 7-day streak active.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProgressDashboard;