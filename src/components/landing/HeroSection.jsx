import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles, Zap, Target, TrendingUp, Award, Shield, Clock } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      {/* Animated Background Elements */}
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Master Your Interviews with&nbsp;
            <span className="hero-title-highlight">AI-Driven Practice</span>
          </h1>
          
          <p className="hero-description">
            Transform your interview skills with realistic simulations, personalized feedback, 
            and adaptive questioning. Get ready to land your dream job with confidence.
          </p>

          <div className="hero-features">
            <div className="hero-feature">
              <div className="feature-icon-wrapper">
                <Target size={20} className="feature-icon" />
                <div className="icon-ripple"></div>
              </div>
              <span>Adaptive AI Interviewer</span>
            </div>
            <div className="hero-feature">
              <div className="feature-icon-wrapper">
                <Zap size={20} className="feature-icon" />
                <div className="icon-ripple"></div>
              </div>
              <span>Real-time Feedback</span>
            </div>
            <div className="hero-feature">
              <div className="feature-icon-wrapper">
                <TrendingUp size={20} className="feature-icon" />
                <div className="icon-ripple"></div>
              </div>
              <span>Progress Tracking</span>
            </div>
          </div>

          <div className="hero-actions">
            <button 
              onClick={() => navigate('/signup')} 
              className="btn-hero-primary"
            >
              <span className="btn-content">
                Get Started Free
                <ArrowRight size={20} className="btn-arrow" />
              </span>
              <div className="btn-glow"></div>
              <div className="btn-particles"></div>
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="btn-hero-secondary"
            >
              <span className="btn-content">
                Watch Demo
              </span>
              <div className="btn-border-glow"></div>
            </button>
          </div>

          <div className="hero-trust-indicators">
            <div className="trust-indicator">
              <Award size={18} className="trust-icon" />
              <span className="trust-text">Industry Certified</span>
            </div>
            <div className="trust-separator">•</div>
            <div className="trust-indicator">
              <Shield size={18} className="trust-icon" />
              <span className="trust-text">Secure Platform</span>
            </div>
            <div className="trust-separator">•</div>
            <div className="trust-indicator">
              <Clock size={18} className="trust-icon" />
              <span className="trust-text">24/7 Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;