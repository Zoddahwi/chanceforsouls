import React from 'react';
import './AboutComponents.css';

const objectives = [
  {
    title: 'Quality Education',
    description: 'Provide access to quality education and learning tools',
    icon: '📚'
  },
  {
    title: 'Mental Wellness',
    description: 'Support mental wellness through counseling and outreach',
    icon: '🧠'
  },
  {
    title: 'Skills Training',
    description: 'Promote skills training and economic empowerment',
    icon: '💼'
  },
  {
    title: 'Community Partnerships',
    description: 'Strengthen community partnerships for sustainable impact',
    icon: '🤝'
  },
];

export default function Objectives() {
  return (
    <section id='objectives' className='objectives-section'>
      <div className='section-container'>
        <div className='section-header'>
          <h2 className='section-title'>What We Strive to Achieve</h2>
          <p className='section-subtitle'>
            Our strategic objectives guide every program and initiative we undertake
          </p>
        </div>
        <div className='objectives-grid'>
          {objectives.map((item, idx) => (
            <div key={idx} className='objective-card'>
              <div className='objective-number'>{(idx + 1).toString().padStart(2, '0')}</div>
              <div className='objective-icon'>{item.icon}</div>
              <h3 className='objective-title'>{item.title}</h3>
              <p className='objective-description'>{item.description}</p>
              <div className='objective-hover-effect'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
