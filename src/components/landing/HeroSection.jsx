import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
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
              <CheckCircle size={20} className="feature-icon" />
              <span>Adaptive AI Interviewer</span>
            </div>
            <div className="hero-feature">
              <CheckCircle size={20} className="feature-icon" />
              <span>Real-time Feedback</span>
            </div>
            <div className="hero-feature">
              <CheckCircle size={20} className="feature-icon" />
              <span>Progress Tracking</span>
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
      </div>
    </section>
  );
};

export default HeroSection;