import { useState } from 'react';
import { Play, ArrowRight, CheckCircle, Brain, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <CheckCircle size={16} />
            <span>AI-Powered Interview Coach</span>
          </div>
          
          <h1 className="hero-title">
            Master Your Interviews with
            <span className="hero-title-highlight"> AI-Driven Practice</span>
          </h1>
          
          <p className="hero-description">
            Transform your interview skills with realistic simulations, personalized feedback, 
            and adaptive questioning. Get ready to land your dream job with confidence.
          </p>

          <div className="hero-features">
            <div className="hero-feature">
              <Target className="feature-icon" size={20} />
              <span>Practice Sessions</span>
            </div>
            <div className="hero-feature">
              <Users className="feature-icon" size={20} />
              <span>Interview Performance</span>
            </div>
            <div className="hero-feature">
              <Brain className="feature-icon" size={20} />
              <span>User Rating</span>
            </div>
            <div className="hero-feature">
              <Target className="feature-icon" size={20} />
              <span>Performance Tracking</span>
            </div>
          </div>

          <div className="hero-actions">
            <button 
              onClick={() => navigate('/signup')} 
              className="btn-hero-primary"
            >
              Get Started Free
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="btn-hero-secondary"
            >
              Watch Demo
            </button>
          </div>

          <p className="hero-subtext">
            ✨ No credit card required • Join 10,000+ job seekers
          </p>
        </div>

        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" 
            alt="Job interview setting with professional environment"
            className="hero-img"
          />
          <div className="hero-image-overlay">
            <div className="floating-card card-1">
              <div className="card-icon">📊</div>
              <div>
                <div className="card-title">85% Success Rate</div>
                <div className="card-subtitle">Interview Performance</div>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🎯</div>
              <div>
                <div className="card-title">10,000+</div>
                <div className="card-subtitle">Practice Sessions</div>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">⭐</div>
              <div>
                <div className="card-title">4.9/5</div>
                <div className="card-subtitle">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;