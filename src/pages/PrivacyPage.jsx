import { useNavigate } from 'react-router-dom';
import './LegalPage.css';

const PrivacyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: January 2026</p>
        
        <section>
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly, such as your name, email, and interview
            practice data.
          </p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to provide, maintain, and improve our services, and to
            personalize your experience.
          </p>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information.
          </p>
        </section>

        <section>
          <h2>4. Third-Party Services</h2>
          <p>
            We may use third-party services for analytics and AI processing.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;