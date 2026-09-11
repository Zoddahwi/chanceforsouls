import React from 'react';
import '../styles/editorial.css';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Ada O.',
    role: 'Beneficiary',
    accent: '#b8524a',
    quote:
      'The counseling sessions helped me regain confidence and reconnect with my family. I am deeply grateful.',
  },
  {
    name: 'Samuel T.',
    role: 'Community Partner',
    accent: '#2f931d',
    quote:
      'Their outreach programs have transformed lives in our community. The team is compassionate and professional.',
  },
  {
    name: 'Lucy A.',
    role: 'Volunteer',
    accent: '#2c6e8f',
    quote:
      'Volunteering with CFS opened my eyes to the power of empathy. The impact is real and inspiring.',
  },
];

const Testimonials = () => (
  <section aria-labelledby='testimonials-heading' className='ed-section ed-section--white'>
    <div className='ed-container'>
      <div className='ed-header'>
        <span className='ed-eyebrow'>In their words</span>
        <h2 id='testimonials-heading' className='ed-title'>
          Voices of Impact
        </h2>
        <p className='ed-lede'>
          From the people who have sat in our counselling rooms, partnered with us, and
          given their time.
        </p>
      </div>

      <div className='ed-grid ed-grid--3'>
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className='ed-card testimonial-card-ed'
            style={{ '--ed-accent': t.accent }}
          >
            <span className='testimonial-mark' aria-hidden='true'>
              &ldquo;
            </span>
            <blockquote className='testimonial-quote'>{t.quote}</blockquote>
            <figcaption className='testimonial-attribution'>
              <span className='testimonial-name'>{t.name}</span>
              <span className='testimonial-role'>{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
