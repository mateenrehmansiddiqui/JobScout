import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, FileText, Settings as SettingsIcon, Bell, Shield, 
  LogOut, Upload, Trash2, Eye, Download, ChevronRight, 
  Camera, CheckCircle, AlertTriangle 
} from 'lucide-react';
import './ProfileSettings.css';
import { mockUser } from '../data/mockData';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('student');
  const [educationLevel, setEducationLevel] = useState('bachelors');
  const [yearsOfExperience, setYearsOfExperience] = useState('0-1');
  const [preparingFor, setPreparingFor] = useState('first job');

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button 
      className={`sidebar-item ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      <Icon size={18} />
      <span>{label}</span>
      {activeTab === id && <ChevronRight size={14} className="active-arrow" />}
    </button>
  );

  return (
    <div className="settings-wrapper">
      {/* --- HEADER --- */}
      <nav className="settings-nav">
        <div className="nav-left">
          <span className="logo" onClick={() => navigate('/dashboard')}>JobScout</span>
        </div>
        <div className="nav-right">
          <button className="nav-btn-secondary" onClick={() => navigate('/dashboard')}>Exit Settings</button>
        </div>
      </nav>

      <div className="settings-layout">
        {/* --- SIDEBAR --- */}
        <aside className="settings-sidebar">
          <div className="sidebar-group">
            <SidebarItem id="profile" icon={User} label="Profile Information" />
            <SidebarItem id="resume" icon={FileText} label="Resume Management" />
            <SidebarItem id="account" icon={SettingsIcon} label="Account Settings" />
            <SidebarItem id="notifications" icon={Bell} label="Notifications" />
            <SidebarItem id="privacy" icon={Shield} label="Privacy & Security" />
          </div>
          <button className="sidebar-item logout-btn" onClick={() => console.log("Logout")}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </aside>

        {/* --- CONTENT AREA --- */}
        <main className="settings-content">
          <div className="content-container">
            {activeTab === 'profile' && (
              <section className="fade-in">
                <header className="section-header">
                  <h2>Profile Information</h2>
                  <p>Update your personal details and career targets.</p>
                </header>

                <div className="avatar-upload-section">
                  <div className="profile-avatar-large" onClick={() => console.log("Upload avatar")}>
                    {mockUser.avatar ? <img src={mockUser.avatar} alt="Avatar" /> : <User size={40} />}
                    <div className="avatar-overlay">
                      <Camera size={20} />
                    </div>
                  </div>
                  <div className="avatar-text">
                    <h4>Profile Picture</h4>
                    <p>JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={mockUser.name} />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue={mockUser.email} />
                  </div>
                  <div className="input-group">
                    <label>Current Status</label>
                    <select 
                      className="status-select" 
                      value={currentStatus} 
                      onChange={(e) => setCurrentStatus(e.target.value)}
                    >
                      <option value="student">Student</option>
                      <option value="graduate">Graduate</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Target Role</label>
                    <input type="text" defaultValue="Full Stack Engineer" />
                  </div>
                  <div className="input-group">
                    <label>Education Level</label>
                    <select 
                      className="status-select" 
                      value={educationLevel} 
                      onChange={(e) => setEducationLevel(e.target.value)}
                    >
                      <option value="bachelors">Bachelors</option>
                      <option value="masters">Masters</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Years of Experience</label>
                    <select 
                      className="status-select" 
                      value={yearsOfExperience} 
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    >
                      <option value="0-1">0 - 1</option>
                      <option value="1-3">1 - 3</option>
                      <option value="3-5">3 - 5</option>
                      <option value="5+">5+</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-grid" style={{marginTop: '24px'}}>
                  <div className="input-group full-width">
                    <label>What are you preparing for?</label>
                    <select 
                      className="status-select" 
                      value={preparingFor} 
                      onChange={(e) => setPreparingFor(e.target.value)}
                    >
                      <option value="first job">First Job</option>
                      <option value="job switch">Job Switch</option>
                      <option value="promotion">Promotion</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                </div>
                
                <footer className="form-footer">
                  <button className="save-btn" onClick={handleSave}>
                    {isSaved ? <><CheckCircle size={18} /> Changes Saved</> : 'Save Changes'}
                  </button>
                </footer>
              </section>
            )}

            {activeTab === 'resume' && (
              <section className="fade-in">
                <header className="section-header">
                  <h2>Resume Management</h2>
                  <p>Manage the resume used by AI to tailor your interviews.</p>
                </header>

                <div className="resume-card">
                  <div className="resume-info">
                    <div className="file-icon"><FileText size={24} /></div>
                    <div>
                      <h4>John_Doe_Resume_2026.pdf</h4>
                      <p>Uploaded Jan 15, 2026 • 1.2 MB</p>
                    </div>
                  </div>
                  <div className="resume-actions">
                    <button className="icon-btn" title="Preview"><Eye size={18} /></button>
                    <button className="icon-btn" title="Download"><Download size={18} /></button>
                    <button className="icon-btn delete" title="Delete"><Trash2 size={18} /></button>
                  </div>
                </div>

                <div className="upload-dropzone">
                  <Upload size={32} />
                  <p><strong>Click to upload</strong> or drag and drop</p>
                  <span>PDF, DOCX (Max 5MB)</span>
                </div>
              </section>
            )}

            {activeTab === 'notifications' && (
              <section className="fade-in">
                <header className="section-header">
                  <h2>Notification Preferences</h2>
                  <p>Control how and when we contact you.</p>
                </header>

                <div className="toggle-list">
                  {[
                    { title: "Practice Reminders", desc: "Get nudged when you haven't practiced in 2 days." },
                    { title: "Streak Alerts", desc: "Notifications to help you keep your daily momentum." },
                    { title: "Performance Insights", desc: "Weekly summaries of your AI analysis." }
                  ].map((item, idx) => (
                    <div className="toggle-item" key={idx}>
                      <div className="toggle-text">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'account' && (
              <section className="fade-in">
                <header className="section-header">
                  <h2>Account Settings</h2>
                  <p>Manage your account preferences and subscription.</p>
                </header>

                <div className="form-grid">
                  <div className="input-group">
                    <label>Time Zone</label>
                    <input type="text" defaultValue="UTC+05:30" />
                  </div>
                  <div className="input-group">
                    <label>Date Format</label>
                    <input type="text" defaultValue="DD/MM/YYYY" />
                  </div>
                </div>

                <div className="form-grid" style={{marginTop: '24px'}}>
                  <div className="input-group full-width">
                    <label>Manage Subscription</label>
                    <div className="subscription-card" style={{padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div>
                          <h4 style={{margin: '0 0 4px 0', fontSize: '15px', fontWeight: '500'}}>Free</h4>
                          <p style={{margin: 0, color: '#64748b', fontSize: '13px'}}>$0/month</p>
                        </div>
                        <button className="change-subscription-btn" style={{padding: '8px 16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
                          Change Subscription
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="toggle-item">
                  <div className="toggle-text">
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-text">
                    <h4>Email Notifications</h4>
                    <p>Receive updates and alerts via email</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <footer className="form-footer">
                  <button className="save-btn" onClick={handleSave}>
                    {isSaved ? <><CheckCircle size={18} /> Changes Saved</> : 'Save Changes'}
                  </button>
                </footer>
              </section>
            )}

            {activeTab === 'privacy' && (
              <section className="fade-in">
                <header className="section-header">
                  <h2>Privacy & Security</h2>
                  <p>Control your data and privacy preferences.</p>
                </header>

                <div className="toggle-item">
                  <div className="toggle-text">
                    <h4>Analytics Tracking</h4>
                    <p>Help us improve by sharing usage analytics</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-text">
                    <h4>Data Processing</h4>
                    <p>Allow AI to process your resume and interview data</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-text">
                    <h4>Session Management</h4>
                    <p>Remember login across devices</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="form-grid" style={{marginTop: '32px'}}>
                  <div className="input-group full-width">
                    <label>Change Password</label>
                    <input type="password" placeholder="Current password" />
                  </div>
                  <div className="input-group">
                    <label>New Password</label>
                    <input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="input-group">
                    <label>Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" />
                  </div>
                </div>

                <div className="danger-zone" style={{marginTop: '32px', padding: '24px', border: '1px solid #fecaca', borderRadius: '12px', background: '#fef2f2'}}>
                  <h4 style={{color: '#dc2626', marginBottom: '8px'}}>Danger Zone!</h4>
                  <p style={{color: '#7f1d1d', fontSize: '14px', marginBottom: '16px'}}>Irreversible actions that affect your account.</p>
                  <button className="icon-btn delete" style={{padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca'}}>
                    <Trash2 size={16} style={{marginRight: '8px'}} />
                    Delete Account
                  </button>
                </div>

                <footer className="form-footer">
                  <button className="save-btn" onClick={handleSave}>
                    {isSaved ? <><CheckCircle size={18} /> Changes Saved</> : 'Save Changes'}
                  </button>
                </footer>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;