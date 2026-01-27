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
                  <div className="profile-avatar-large">
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
                    <label>Current Role</label>
                    <input type="text" defaultValue="Junior Developer" />
                  </div>
                  <div className="input-group">
                    <label>Target Role</label>
                    <input type="text" defaultValue="Full Stack Engineer" />
                  </div>
                  <div className="input-group full-width">
                    <label>Education</label>
                    <input type="text" defaultValue="BS Computer Science, XYZ University" />
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;