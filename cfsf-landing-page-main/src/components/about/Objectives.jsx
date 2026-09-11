import React from 'react';
import '../../styles/editorial.css';
import './AboutComponents.css';

const objectives = [
  {
    title: 'Quality Education',
    description: 'Provide access to quality education and learning tools',
    icon: '📚',
    accent: '#2f931d',
  },
  {
    title: 'Mental Wellness',
    description: 'Support mental wellness through counseling and outreach',
    icon: '🧠',
    accent: '#b8524a',
  },
  {
    title: 'Skills Training',
    description: 'Promote skills training and economic empowerment',
    icon: '💼',
    accent: '#b7791f',
  },
  {
    title: 'Community Partnerships',
    description: 'Strengthen community partnerships for sustainable impact',
    icon: '🤝',
    accent: '#2c6e8f',
  },
];

export default function Objectives() {
  return (
    <section id='objectives' className='ed-section ed-section--white'>
      <div className='ed-container'>
        <div className='ed-header'>
          <span className='ed-eyebrow'>Our objectives</span>
          <h2 className='ed-title'>What we strive to achieve</h2>
          <p className='ed-lede'>
            Four strategic objectives that guide every program and initiative we undertake.
          </p>
        </div>

        <div className='about-objectives'>
          {objectives.map((item, idx) => (
            <div
              key={item.title}
              className='about-objective'
              style={{ '--ed-accent': item.accent }}
            >
              <span className='about-objective__num'>
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <div>
                <h3 className='about-objective__title'>
                  <span aria-hidden='true'>{item.icon}</span>
                  {item.title}
                </h3>
                <p className='about-objective__text'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
