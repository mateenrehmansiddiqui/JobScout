import { useNavigate } from 'react-router-dom';
import './LegalPage.css';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: January 2026</p>
        
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using JobScout, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section>
          <h2>2. Use of Service</h2>
          <p>
            JobScout provides AI-powered interview preparation tools. You agree to use the service
            for lawful purposes only.
          </p>
        </section>

        <section>
          <h2>3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials.
          </p>
        </section>

        <section>
          <h2>4. Content and Intellectual Property</h2>
          <p>
            All content provided by JobScout is protected by copyright and other intellectual
            property laws.
          </p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            JobScout is provided "as is" without warranties of any kind.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;