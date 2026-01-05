import { Star, Quote } from 'lucide-react';
import './SocialProof.css';

const SocialProof = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'JobScout helped me land my dream job at Google! The AI feedback was incredibly detailed and helped me improve my communication skills dramatically.',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at Microsoft',
      image: 'https://i.pravatar.cc/150?img=3',
      rating: 5,
      text: 'The adaptive questioning feature is brilliant. It challenged me exactly where I needed it. Got my offer within 2 weeks of consistent practice!',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist at Amazon',
      image: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: "Best interview prep tool I've used. The progress tracking kept me motivated, and the percentile rankings showed me exactly where I stood.",
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '85%', label: 'Success Rate' },
    { number: '50,000+', label: 'Practice Sessions' },
    { number: '4.9/5', label: 'User Rating' },
  ];

  return (
    <section className="social-proof-section">
      <div className="social-proof-container">

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Loved by Job Seekers</h2>
          <p className="section-subtitle">
            See what our users have to say about their success
          </p>
        </div>

        {/* Testimonials */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <Quote className="quote-icon" size={32} />

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

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="author-image"
                />
                <div>
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
