import { useState } from 'react';
import { Upload, Users, BarChart3, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Upload size={60} />,
      title: 'Upload CV & Job Description',
      description: 'Simply upload your resume and paste the job description. Our AI analyzes your profile and tailors questions to match the role.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80',
    },
    {
      icon: <Users size={60} />,
      title: 'Practice with AI Interviewer',
      description: 'Engage in realistic mock interviews with our adaptive AI. Choose from HR, technical, or panel interview styles.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    },
    {
      icon: <BarChart3 size={60} />,
      title: 'Get Detailed Feedback',
      description: 'Receive comprehensive analysis on your communication, confidence, knowledge, and technical skills with actionable insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    },
    {
      icon: <TrendingUp size={60} />,
      title: 'Track Progress & Improve',
      description: 'Monitor your improvement over time with detailed analytics, percentile rankings, and personalized recommendations.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (index) => {
    if (index !== currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get interview-ready in 4 simple steps
          </p>
        </div>

        <div className="carousel-container">
          <div className="steps-slider">
            <div 
              className="steps-track"
              style={{ transform: `translateX(-${currentStep * 100}%)` }}
            >
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`step-slide ${index === currentStep ? 'active' : ''}`}
                >
                  <div className="step-content-wrapper">
                    <div className="step-number">Step {index + 1}</div>
                    <div className="step-image">
                      <img src={step.image} alt={step.title} />
                    </div>
                    <div className="step-icon">{step.icon}</div>
                    <div className="step-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            className="nav-arrow nav-arrow-left"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="nav-arrow nav-arrow-right"
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="progress-indicators">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentStep ? 'active' : ''}`}
              onClick={() => goToStep(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;