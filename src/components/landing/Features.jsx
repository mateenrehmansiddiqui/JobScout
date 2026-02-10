import { Brain, MessageSquare, BarChart2, Target, Sparkles, Award } from 'lucide-react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <Brain size={40} />,
      title: 'Adaptive AI Interviewer',
      description: 'Questions adjust in real-time based on your performance, ensuring optimal challenge and learning. Our AI adapts to your skill level and provides personalized questions that grow with you.',
    },
    {
      icon: <MessageSquare size={40} />,
      title: 'Communication Analysis',
      description: 'Get comprehensive feedback on verbal and non-verbal cues including pace, tone, eye contact, and body language. Advanced algorithms analyze your communication patterns.',
    },
    {
      icon: <BarChart2 size={40} />,
      title: 'Performance Tracking',
      description: 'Track your progress over time with detailed analytics and percentile rankings against peers. Visual dashboards show your improvement trends and areas for growth.',
    },
    {
      icon: <Target size={40} />,
      title: 'Multiple Interview Types',
      description: 'Practice technical coding, behavioral HR questions, or panel interviews with different AI personas. Specialized training for every interview scenario.',
    },
    {
      icon: <Sparkles size={40} />,
      title: 'Personalized Feedback',
      description: 'Receive actionable insights and improvement suggestions tailored to your specific weaknesses. Machine learning identifies patterns and provides targeted recommendations.',
    },
    {
      icon: <Award size={40} />,
      title: 'Gamified Learning',
      description: 'Earn badges, maintain streaks, and unlock achievements as you progress through your practice. Stay motivated with rewards and recognition milestones.',
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features</h2>
          <p className="features-subtitle">
            Everything you need to ace your next interview with cutting-edge AI technology
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  {feature.icon}
                </div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;