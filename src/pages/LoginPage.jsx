import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, CheckCircle } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login data:', formData, 'Remember me:', rememberMe);
      // In a real app, you'd verify credentials here
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Branding (Cohesive with Sign Up) */}
        <div className="login-left">
          <div className="login-branding">
            <div className="brand-logo" onClick={() => navigate('/')}>
              <span className="logo-icon">🎯</span>
              <span className="logo-text">JobScout</span>
            </div>
            <h1 className="brand-title">Welcome Back to JobScout</h1>
            <p className="brand-description">
              Log in to continue your interview practice and track your progress toward your dream job.
            </p>
            
            <div className="brand-features">
              <div className="brand-feature">
                <CheckCircle size={20} className="feature-check" />
                <span>Resume where you left off</span>
              </div>
              <div className="brand-feature">
                <CheckCircle size={20} className="feature-check" />
                <span>View your latest AI feedback</span>
              </div>
              <div className="brand-feature">
                <CheckCircle size={20} className="feature-check" />
                <span>Check upcoming mock interviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="login-form-container">
            <div className="form-header">
              <h2 className="form-title">Login to account</h2>
              <p className="form-subtitle">Enter your credentials to access your account</p>
            </div>

            {/* Social Login Buttons */}
            <div className="social-login">
              <button type="button" className="social-btn google-btn" onClick={() => console.log('Google login')}>
                <img src="https://www.google.com/favicon.ico" alt="Google" className="social-icon" />
                <span>Continue with Google</span>
              </button>
              
              <button type="button" className="social-btn linkedin-btn" onClick={() => console.log('LinkedIn login')}>
                <svg className="social-icon" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>Continue with LinkedIn</span>
              </button>
            </div>

            <div className="divider">
              <span className="divider-text">or login with email</span>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Link to="/forgot-password" style={{fontSize: '13px'}} className="link-primary">Forgot password?</Link>
                </div>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Remember me for 30 days</span>
                </label>
              </div>

              <button type="submit" className="submit-btn">Login</button>
            </form>

            <div className="form-footer">
              <p className="footer-text">
                Don't have an account?{' '}
                <Link to="/signup" className="link-primary">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;