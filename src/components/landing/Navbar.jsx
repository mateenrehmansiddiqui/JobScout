import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <span className="logo-text">JobScout</span>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
            How It Works
          </button>
          <button onClick={() => scrollToSection('features')} className="nav-link">
            Features
          </button>
          <button onClick={() => scrollToSection('pricing')} className="nav-link">
            Pricing
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="navbar-actions">
          <button onClick={() => navigate('/login')} className="btn-secondary-nav">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="btn-primary-nav">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <button onClick={() => scrollToSection('how-it-works')} className="mobile-nav-link">
            How It Works
          </button>
          <button onClick={() => scrollToSection('features')} className="mobile-nav-link">
            Features
          </button>
          <button onClick={() => scrollToSection('pricing')} className="mobile-nav-link">
            Pricing
          </button>
          <div className="mobile-actions">
            <button onClick={() => navigate('/login')} className="btn-secondary-nav">
              Login
            </button>
            <button onClick={() => navigate('/signup')} className="btn-primary-nav">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;