import React from 'react';
import './AboutComponents.css';

export default function Vision() {
  return (
    <section id='vision' className='vision-section'>
      <div className='section-container'>
        <div className='content-grid reverse'>
          <div className='content-image'>
            <div className='image-wrapper'>
              <img
                src='/images/CFS_bg2.png'
                alt='Our vision'
                className='main-image'
              />
              <div className='image-decoration vision-decoration'></div>
            </div>
          </div>
          <div className='content-text'>
            <h2 className='content-title'>A World Where Every Soul Thrives</h2>
            <p className='content-description'>
              A world where every soul has a fair chance to thrive—free from poverty, inequality,
              and barriers to opportunity. We envision resilient communities empowered with the
              knowledge, resources, and dignity to shape their own future.
            </p>
            <div className='vision-pillars'>
              <div className='pillar'>
                <div className='pillar-icon'>🌍</div>
                <div className='pillar-content'>
                  <h4>Global Impact</h4>
                  <p>Reaching communities worldwide</p>
                </div>
              </div>
              <div className='pillar'>
                <div className='pillar-icon'>🤝</div>
                <div className='pillar-content'>
                  <h4>Empowerment</h4>
                  <p>Building self-sufficient communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
