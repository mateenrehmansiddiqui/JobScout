import { useNavigate } from 'react-router-dom';
import { Check, Star, Rocket, Shield, Zap, Users, Headphones, Video } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: <Rocket size={24} />,
      features: [
        '5 practice sessions',
        'Basic AI feedback',
        'Progress tracking',
        'Community support',
      ],
      cta: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$19',
      period: 'per month',
      description: 'For serious job seekers',
      icon: <Star size={24} />,
      features: [
        'Unlimited practice sessions',
        'Advanced AI feedback',
        'Video & voice interviews',
        'Priority support',
        'Interview recording',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
  ];

  const benefits = [
    { icon: <Shield size={20} />, text: "30-day money-back guarantee" },
    { icon: <Zap size={20} />, text: "Cancel anytime" },
    { icon: <Users size={20} />, text: "Join 10,000+ job seekers" },
    { icon: <Headphones size={20} />, text: "24/7 customer support" },
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">

        <div className="pricing-header">
          <h2 className="pricing-title">Simple, Transparent Pricing</h2>
          <p className="pricing-subtitle">
            Choose the perfect plan to accelerate your career journey with AI-powered interview coaching
          </p>
        </div>

        <div className="pricing-layout">
          {/* Left Trust Indicators */}
          <div className="trust-indicators-left">
            {benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} className="trust-item">
                <div className="trust-icon">
                  {benefit.icon}
                </div>
                <span className="trust-text">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card`}
              >
                <div className="plan-header">
                  <div className="plan-icon-wrapper">
                    <div className="plan-icon">
                      {plan.icon}
                    </div>
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    {plan.price}
                    <span className="plan-period">/{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <Check size={20} className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/signup')}
                  className={`plan-cta`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Right Trust Indicators */}
          <div className="trust-indicators-right">
            {benefits.slice(2).map((benefit, index) => (
              <div key={index} className="trust-item">
                <div className="trust-icon">
                  {benefit.icon}
                </div>
                <span className="trust-text">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
