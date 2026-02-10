import { Star, Quote, TrendingUp, Users, Target, Award } from 'lucide-react';
import './SocialProof.css';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'JobScout helped me land my dream job at Google! The AI feedback was incredibly detailed and helped me improve my communication skills dramatically. The adaptive questioning feature is absolutely brilliant.',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at Microsoft',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'The adaptive questioning feature is brilliant. It challenged me exactly where I needed it. Got my offer within 2 weeks of consistent practice! Best investment in my career.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist at Amazon',
      image: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: "Best interview prep tool I've used. The progress tracking kept me motivated, and the percentile rankings showed me exactly where I stood. Highly recommend for serious job seekers!",
    },
  ];

  return (
    <section className="social-proof-section">
      <div className="social-proof-container">

        {/* Section Header */}
        <div className="social-proof-header">
          <h2 className="social-proof-title">Loved by Job Seekers</h2>
          <p className="social-proof-subtitle">
            See what our users have to say about their success with JobScout's AI-powered interview coaching
          </p>
        </div>

        {/* Testimonials */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <Quote className="quote-icon" size={24} />
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#f59e0b"
                      color="#f59e0b"
                    />
                  ))}
                </div>
              </div>

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="author-image"
                />
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
              <div className="testimonial-hover-effect"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
