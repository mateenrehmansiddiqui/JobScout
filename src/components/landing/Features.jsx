import { Brain, MessageSquare, BarChart2, Target, Sparkles, Award } from 'lucide-react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: 'Adaptive AI Interviewer',
      description: 'Questions adjust in real-time based on your performance, ensuring optimal challenge and learning.',
      color: '#2563eb',
    },
    {
      icon: <MessageSquare size={32} />,
      title: 'Communication Analysis',
      description: 'Get feedback on verbal and non-verbal cues including pace, tone, eye contact, and body language.',
      color: '#10b981',
    },
    {
      icon: <BarChart2 size={32} />,
      title: 'Performance Tracking',
      description: 'Track your progress over time with detailed analytics and percentile rankings against peers.',
      color: '#f59e0b',
    },
    {
      icon: <Target size={32} />,
      title: 'Multiple Interview Types',
      description: 'Practice technical coding, behavioral HR questions, or panel interviews with different AI personas.',
      color: '#ef4444',
    },
    {
      icon: <Sparkles size={32} />,
      title: 'Personalized Feedback',
      description: 'Receive actionable insights and improvement suggestions tailored to your specific weaknesses.',
      color: '#8b5cf6',
    },
    {
      icon: <Award size={32} />,
      title: 'Gamified Learning',
      description: 'Earn badges, maintain streaks, and unlock achievements as you progress through your practice.',
      color: '#ec4899',
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Everything you need to ace your next interview
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ '--feature-color': feature.color }}>
              <div 
                className="feature-icon-wrapper" 
                style={{ background: `${feature.color}15` }}
              >
                <div style={{ color: feature.color }}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;