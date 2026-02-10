import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { User, Briefcase, GraduationCap, Target, Sparkles } from 'lucide-react';
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
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Onboarding Data Saved:', formData);
    
    navigate('/dashboard');
  };
  return (
    <div className="onboarding-page">
      <div className="container">
        {/* Header */}
        <div className="onboarding-header">
          <h1>Let's set up your profile</h1>
          <p>
            Answer a few questions so JobScout can tailor interviews just for you.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="onboarding-progress">
          <div className="progress-line-container">
            <div className="progress-line">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>

        {/* Onboarding Form */}
        <form className="onboarding-card" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="profile-image-section">
            <div className="profile-image-container" onClick={handleImageClick}>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder">
                  <User size={48} />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
            <p className="add-photo-text" onClick={handleImageClick}>
              {imagePreview ? 'Change Photo' : 'Add Photo'}
            </p>
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label>
              <User size={16} className="inline mr-2" />
              Full Name
            </label>
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
            <label>
              <Briefcase size={16} className="inline mr-2" />
              Current Status
            </label>
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
              <label>
                <GraduationCap size={16} className="inline mr-2" />
                Education Level
              </label>
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
                <option value="High School">High School</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <Briefcase size={16} className="inline mr-2" />
                Years of Experience
              </label>
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
                <option value="5 - 10">5 - 10</option>
                <option value="10+">10+</option>
              </select>
            </div>
          </div>

          {/* Target Role */}
          <div className="form-group">
            <label>
              <Target size={16} className="inline mr-2" />
              Target Role
            </label>
            <input
              type="text"
              name="targetRole"
              placeholder="e.g. Frontend Developer, Data Scientist"
              value={formData.targetRole}
              onChange={handleChange}
              required
            />
          </div>

          {/* Goal */}
          <div className="form-group">
            <label>
              <Sparkles size={16} className="inline mr-2" />
              What are you preparing for?
            </label>
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
              <option value="Skill Development">Skill Development</option>
            </select>
          </div>

          {/* Resume Upload */}
          <div className="form-group">
            <label>
              <Briefcase size={16} className="inline mr-2" />
              Upload Resume (Optional)
            </label>
            <label className="upload-box">
              <input
                type="file"
                name="resume"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
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