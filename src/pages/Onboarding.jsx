import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    status: '',
    education: '',
    targetRole: '',
    experience: '',
    goal: '',
    resume: null,
    profilePicture: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Onboarding Data Saved:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="onboarding-page">
      {/* JobScout Logo */}
      <div className="jobscout-logo">
        <span className="logo-text">JobScout</span>
      </div>

      <div className="container">
        {/* Header */}
        <div className="onboarding-header">
          <h1>Let's set up your profile!</h1>
          <p>
            Answer a few questions so JobScout can tailor interviews just for you.
          </p>
        </div>

        {/* Onboarding Form */}
        <form className="onboarding-card" onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div className="profile-picture-section">
            <label htmlFor="profile-picture-upload" className="profile-picture-wrapper">
              <input
                type="file"
                id="profile-picture-upload"
                accept="image/*"
                onChange={handleProfilePictureChange}
                hidden
              />
              <div className="profile-picture-circle">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="profile-preview" />
                ) : (
                  <svg
                    className="profile-placeholder-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 14C6.47715 14 2 18.4772 2 24H22C22 18.4772 17.5228 14 12 14Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
            </label>
            <p className="profile-picture-label">Add Photo</p>
          </div>

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
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
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
              <option value="Other">Other</option>
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
                  ? `${formData.resume.name}`
                  : 'Drag & drop your resume or click to upload!'}
              </p>
            </label>
          </div>

          {/* Actions */}
          <div className="onboarding-actions">
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