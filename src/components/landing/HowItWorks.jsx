import { Upload, Users, BarChart3, TrendingUp } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload size={40} />,
      title: 'Upload CV & Job Description',
      description: 'Simply upload your resume and paste the job description. Our AI analyzes your profile and tailors questions to match the role.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80',
    },
    {
      icon: <Users size={40} />,
      title: 'Practice with AI Interviewer',
      description: 'Engage in realistic mock interviews with our adaptive AI. Choose from HR, technical, or panel interview styles.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
    },
    {
      icon: <BarChart3 size={40} />,
      title: 'Get Detailed Feedback',
      description: 'Receive comprehensive analysis on your communication, confidence, knowledge, and technical skills with actionable insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Track Progress & Improve',
      description: 'Monitor your improvement over time with detailed analytics, percentile rankings, and personalized recommendations.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get interview-ready in 4 simple steps
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{index + 1}</div>
              <div className="step-image">
                <img src={step.image} alt={step.title} />
                <div className="step-icon">{step.icon}</div>
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;