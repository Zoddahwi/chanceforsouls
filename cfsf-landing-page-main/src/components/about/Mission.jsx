import React from 'react';
import '../../styles/editorial.css';
import './AboutComponents.css';

const highlights = [
  'Quality Education Access',
  'Healthcare Support',
  'Economic Empowerment',
];

export default function Mission() {
  return (
    <section id='mission' className='ed-section ed-section--white'>
      <div className='ed-container'>
        <div className='about-split'>
          <div className='ed-header'>
            <span className='ed-eyebrow'>Our mission</span>
            <h2 className='ed-title'>Empowering communities for a brighter future</h2>
            <p className='ed-lede'>
              To create opportunities that uplift vulnerable children, youth and families by
              expanding access to education, healthcare and economic empowerment. We work with
              communities and partners to deliver sustainable programs that change lives.
            </p>
            <ul className='about-checklist'>
              {highlights.map((item) => (
                <li key={item}>
                  <span className='about-check' aria-hidden='true'>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='about-split__media'>
            <figure className='about-figure'>
              <img src='/images/CFS_bg1.png' alt='Chance For Souls mission' loading='lazy' />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
