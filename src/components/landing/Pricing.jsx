import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 practice sessions per month',
        'Basic feedback',
        'Text-based interviews',
        'Progress tracking',
        'Community support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For serious job seekers',
      features: [
        'Unlimited practice sessions',
        'Advanced AI feedback',
        'Video & voice interviews',
        'Communication analysis',
        'Percentile rankings',
        'Code editor & whiteboard',
        'Priority support',
        'Salary negotiation training',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Custom question banks',
        'Team analytics',
        'Dedicated account manager',
        'API access',
        'White-label option',
        'SSO integration',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">

        <div className="section-header">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
            >
              {plan.highlighted && (
                <div className="popular-badge">Most Popular</div>
              )}

              <div className="plan-header">
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
                className={`plan-cta ${plan.highlighted ? 'primary' : 'secondary'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
