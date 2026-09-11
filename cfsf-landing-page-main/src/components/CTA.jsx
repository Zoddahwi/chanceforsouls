import React from 'react';
import '../styles/editorial.css';
import './CTA.css';

const CTA = () => (
  <section aria-labelledby='donate-cta' className='ed-section ed-section--white'>
    <div className='ed-container'>
      <div className='cta-band'>
        <div>
          <span className='cta-eyebrow'>Get involved</span>
          <h2 id='donate-cta' className='cta-title'>
            Your support changes lives
          </h2>
          <p className='cta-text'>
            Help us expand counseling services, outreach, and community programs.
            Every donation counts.
          </p>
        </div>
        <div className='cta-actions'>
          <a href='/Donate' className='cta-primary'>
            Donate Now
          </a>
          <a href='/WhySupport' className='cta-secondary'>
            How we use funds
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
