import React from 'react';
import './AboutComponents.css';

export default function Mission() {
  return (
    <section id='mission' className='mission-section'>
      <div className='section-container'>
        <div className='content-grid'>
          <div className='content-text'>
            <h2 className='content-title'>Empowering Communities for a Brighter Future</h2>
            <p className='content-description'>
              To create opportunities that uplift vulnerable children, youth, and families by
              expanding access to education, healthcare, and economic empowerment. We work with
              communities and partners to deliver sustainable programs that change lives and build
              brighter futures.
            </p>
            <div className='content-highlights'>
              <div className='highlight-item'>
                <span className='highlight-icon'>✓</span>
                <span>Quality Education Access</span>
              </div>
              <div className='highlight-item'>
                <span className='highlight-icon'>✓</span>
                <span>Healthcare Support</span>
              </div>
              <div className='highlight-item'>
                <span className='highlight-icon'>✓</span>
                <span>Economic Empowerment</span>
              </div>
            </div>
          </div>
          <div className='content-image'>
            <div className='image-wrapper'>
              <img
                src='/images/CFS_bg1.png'
                alt='Chance For Souls mission'
                className='main-image'
              />
              <div className='image-decoration'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
