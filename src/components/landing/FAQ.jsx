import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does JobScout's AI interview coaching work?",
      answer: "JobScout uses advanced AI technology to simulate real interview scenarios. Our system analyzes your responses, provides instant feedback on your communication skills, body language, and answer quality, and helps you improve through personalized practice sessions."
    },
    {
      question: "What types of interviews does JobScout prepare me for?",
      answer: "We cover various interview types including technical interviews, behavioral questions, case studies, panel interviews, and industry-specific scenarios. Our AI adapts to different roles like software engineering, product management, marketing, and more."
    },
    {
      question: "Is JobScout suitable for entry-level job seekers?",
      answer: "Absolutely! JobScout is designed for all experience levels. We provide foundational training for entry-level candidates, advanced scenarios for experienced professionals, and customized difficulty levels that match your career stage."
    },
    {
      question: "How long does it take to see improvement?",
      answer: "Most users notice significant improvement within 2-3 weeks of consistent practice. Our analytics dashboard tracks your progress, showing measurable improvements in confidence, response quality, and interview performance metrics."
    },
    {
      question: "Can I practice interviews for specific companies?",
      answer: "Yes! JobScout includes company-specific interview patterns and questions from top tech companies and Fortune 500 firms. We regularly update our database with real interview questions and company culture insights."
    },
    {
      question: "What makes JobScout different from other interview prep tools?",
      answer: "JobScout combines AI-powered real-time feedback, personalized learning paths, and comprehensive analytics. Unlike static question banks, our interactive AI interviewer adapts to your performance, provides detailed feedback, and creates a truly immersive practice experience."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-badge">
            <HelpCircle size={16} />
            <span>Got Questions?</span>
          </div>
          <h2 className="faq-title">
            Frequently Asked <span className="title-highlight">Questions</span>
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about JobScout's AI-powered interview coaching
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <div className="question-content">
                    <div className="question-icon">
                      <Sparkles size={20} />
                    </div>
                    <h3>{faq.question}</h3>
                  </div>
                  <div className={`faq-arrow ${activeIndex === index ? 'rotated' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
                <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="faq-footer">
          <div className="faq-cta">
            <h3>Still have questions?</h3>
            <p>Our support team is here to help you succeed</p>
            <button className="faq-contact-btn">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
