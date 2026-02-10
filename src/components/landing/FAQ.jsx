import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does JobScout's AI interview coaching work?",
      answer: "Our AI-powered platform conducts realistic interview simulations tailored to your target role and industry. The system analyzes your responses, provides real-time feedback on communication skills, body language, and answer quality, and helps you improve through personalized practice sessions."
    },
    {
      question: "What types of interviews does JobScout prepare me for?",
      answer: "JobScout covers various interview types including technical interviews, behavioral questions, case studies, panel interviews, and phone screenings. We support multiple industries like tech, finance, healthcare, marketing, and more."
    },
    {
      question: "Is JobScout suitable for entry-level job seekers?",
      answer: "Absolutely! JobScout is designed for all career levels. For entry-level candidates, we focus on building confidence, mastering common interview questions, and developing strong storytelling skills to showcase your potential."
    },
    {
      question: "How long does it take to see improvement?",
      answer: "Most users report noticeable improvement after just 3-5 practice sessions. Our AI tracks your progress over time, and you'll typically see significant improvements in confidence, response quality, and interview performance within 2-3 weeks of regular practice."
    },
    {
      question: "Can I practice interviews for specific companies?",
      answer: "Yes! JobScout allows you to customize practice sessions based on specific companies, roles, and interview formats. We incorporate company-specific questions and cultural insights to help you prepare for targeted opportunities."
    },
    {
      question: "What makes JobScout different from other interview prep tools?",
      answer: "JobScout combines advanced AI technology with personalized coaching, real-time feedback, and progress tracking. Unlike generic question banks, our platform adapts to your performance, provides detailed insights, and simulates actual interview scenarios for comprehensive preparation."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about JobScout's AI-powered interview coaching
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <h3 className="faq-footer-title">Still have questions?</h3>
          <p className="faq-footer-text">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <button className="faq-footer-btn">Contact Support</button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
