import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store user data temporarily (in real app, send to backend)
      console.log('Sign up data:', formData);
      
      // Navigate to onboarding page
      navigate('/onboarding');
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth
    console.log('Google sign up clicked');
    alert('Google sign-up will be implemented with backend integration');
  };

  const handleLinkedInSignUp = () => {
    // TODO: Implement LinkedIn OAuth
    console.log('LinkedIn sign up clicked');
    alert('LinkedIn sign-up will be implemented with backend integration');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Branding */}
        <div className="signup-left">
          <div className="signup-branding">
            <div className="brand-logo" onClick={() => navigate('/')}>
              <span className="logo-icon">🎯</span>
              <span className="logo-text">JobScout</span>
            </div>
            <h1 className="brand-title">Start Your Interview Preparation Journey</h1>
            <p className="brand-description">
              Join thousands of job seekers who have landed their dream jobs with AI-powered interview practice.
            </p>
            
            <div className="brand-features">
              <div className="brand-feature">
                <CheckCircle size={20} className="feature-check" />
                <span>Personalized AI feedback</span>
              </div>
              <div className="brand-feature">
                <CheckCircle size={20} className="feature-check" />
                <span>Adaptive difficulty levels</span>
              </div>
              <div className="brand-feature">
                <CheckCircle size={20} className="feature-check" />
                <span>Track your progress</span>
              </div>
              <div className="brand-feature">
                <CheckCircle size={20} className="feature-check" />
                <span>100% free to start</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="signup-right">
          <div className="signup-form-container">
            <div className="form-header">
              <h2 className="form-title">Create your account</h2>
              <p className="form-subtitle">Get started with your free account</p>
            </div>

            {/* Social Sign Up Buttons */}
            <div className="social-signup">
              <button 
                type="button" 
                className="social-btn google-btn"
                onClick={handleGoogleSignUp}
              >
                <img 
                  src="https://www.google.com/favicon.ico" 
                  alt="Google" 
                  className="social-icon"
                />
                <span>Continue with Google</span>
              </button>
              
              <button 
                type="button" 
                className="social-btn linkedin-btn"
                onClick={handleLinkedInSignUp}
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>Continue with LinkedIn</span>
              </button>
            </div>

            <div className="divider">
              <span className="divider-text">or sign up with email</span>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="signup-form">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <User size={20} className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
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

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
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
                <div className="password-requirements">
                  <small>Must be at least 8 characters with uppercase, lowercase, and number</small>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              {/* Terms and Conditions */}
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors(prev => ({ ...prev, terms: '' }));
                      }
                    }}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">
                    I agree to the{' '}
                    <Link to="/terms" className="link">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="link">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && <span className="error-message">{errors.terms}</span>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <div className="form-footer">
              <p className="footer-text">
                Already have an account?{' '}
                <Link to="/login" className="link-primary">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;