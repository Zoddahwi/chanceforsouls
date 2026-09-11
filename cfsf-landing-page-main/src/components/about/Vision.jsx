import React from 'react';
import '../../styles/editorial.css';
import './AboutComponents.css';

const pillars = [
  {
    icon: '🌍',
    title: 'Global Impact',
    text: 'Reaching communities worldwide',
    accent: '#2c6e8f',
  },
  {
    icon: '🤝',
    title: 'Empowerment',
    text: 'Building self-sufficient communities',
    accent: '#2f931d',
  },
];

export default function Vision() {
  return (
    <section id='vision' className='ed-section ed-section--paper'>
      <div className='ed-container'>
        <div className='about-split about-split--reverse'>
          <div className='ed-header'>
            <span className='ed-eyebrow'>Our vision</span>
            <h2 className='ed-title'>A world where every soul thrives</h2>
            <p className='ed-lede'>
              A world where every soul has a fair chance to thrive — free from poverty,
              inequality and barriers to opportunity. We envision resilient communities
              empowered with the knowledge, resources and dignity to shape their own future.
            </p>
            <div className='about-pillars'>
              {pillars.map((p) => (
                <div key={p.title} className='about-pillar' style={{ '--ed-accent': p.accent }}>
                  <span className='about-pillar__icon' aria-hidden='true'>
                    {p.icon}
                  </span>
                  <div>
                    <h3 className='about-pillar__title'>{p.title}</h3>
                    <p className='about-pillar__text'>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='about-split__media'>
            <figure className='about-figure'>
              <img src='/images/CFS_bg2.png' alt='Our vision' loading='lazy' />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
