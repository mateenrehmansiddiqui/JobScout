import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import Button from '../components/Button'; // 2. Updated to relative path
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate(); // 3. Initialize the navigate function

  const [formData, setFormData] = useState({
    fullName: '',
    status: '',
    education: '',
    targetRole: '',
    experience: '',
    goal: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Onboarding Data Saved:', formData);
    
    // 4. Navigate to the Dashboard after form submission
    navigate('/dashboard');
  };

  const handleSkip = () => {
    // 5. Navigate to Dashboard even if they skip
    navigate('/dashboard');
  };

  return (
    <div className="onboarding-page">
      <div className="container">
        {/* Header */}
        <div className="onboarding-header">
          <h1>Let’s set up your profile</h1>
          <p>
            Answer a few questions so JobScout can tailor interviews just for you.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="onboarding-progress">
          <span className="active-step" />
          <span />
        </div>

        {/* Onboarding Form */}
        <form className="onboarding-card" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Current Status */}
          <div className="form-group">
            <label>Current Status</label>
            <div className="choice-grid">
              {['Student', 'Graduate', 'Professional'].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`choice-card ${formData.status === item ? 'active' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, status: item }))}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Education & Experience */}
          <div className="form-row">
            <div className="form-group">
              <label>Education Level</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Bachelor’s">Bachelor’s</option>
                <option value="Master’s">Master’s</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="form-group">
              <label>Years of Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="0 - 1">0 - 1</option>
                <option value="1 - 3">1 - 3</option>
                <option value="3 - 5">3 - 5</option>
                <option value="5+">5+</option>
              </select>
            </div>
          </div>

          {/* Target Role */}
          <div className="form-group">
            <label>Target Role</label>
            <input
              type="text"
              name="targetRole"
              placeholder="e.g. Frontend Developer"
              value={formData.targetRole}
              onChange={handleChange}
              required
            />
          </div>

          {/* Goal */}
          <div className="form-group">
            <label>What are you preparing for?</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="First Job">First Job</option>
              <option value="Job Switch">Job Switch</option>
              <option value="Promotion">Promotion</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Resume Upload */}
          <div className="form-group">
            <label>Upload Resume (Optional)</label>
            <label className="upload-box">
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                hidden
              />
              <p>
                {formData.resume
                  ? `📄 ${formData.resume.name}`
                  : 'Drag & drop your resume or click to upload'}
              </p>
            </label>
          </div>

          {/* Actions */}
          <div className="onboarding-actions">
            <button type="button" className="skip-btn" onClick={handleSkip}>
              Skip for now
            </button>
            <Button type="submit" size="large">
              Continue →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;