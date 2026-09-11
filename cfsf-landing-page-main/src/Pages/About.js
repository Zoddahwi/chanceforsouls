import React from 'react';
import { useAppState } from '../context';
import Mission from '../components/about/Mission';
import Vision from '../components/about/Vision';
import Objectives from '../components/about/Objectives';
import Leadership from '../components/about/Leadership';
import LiquidGradientBg from '../components/LiquidGradientBg';
import '../styles/editorial.css';
import '../components/CTA.css';
import './About.css';

const IMPACT_AREAS = [
  {
    id: 'mental-health',
    icon: '💚',
    title: 'Mental Health Support',
    text: 'Professional counseling and therapy for individuals facing mental health challenges.',
    badge: 'Transforming lives',
    accent: '#2f931d',
  },
  {
    id: 'schools',
    icon: '🎓',
    title: 'School Outreach',
    text: 'Educational programs teaching students about emotional wellbeing and mental health.',
    badge: '850+ students impacted',
    accent: '#b7791f',
  },
  {
    id: 'infrastructure',
    icon: '🏗️',
    title: 'Infrastructure Development',
    text: 'Rehabilitation facilities and community bridges serving underserved areas.',
    badge: 'Communities empowered',
    accent: '#2c6e8f',
  },
  {
    id: 'resources',
    icon: '📚',
    title: 'Resources & Training',
    text: 'Books, materials and training so advocates can deliver effective support.',
    badge: 'Knowledge shared widely',
    accent: '#b8524a',
  },
];

const CORE_VALUES = [
  {
    id: 'compassion',
    icon: '❤️',
    name: 'Compassion',
    text: 'We lead with empathy and understanding in all our interactions.',
    accent: '#b8524a',
  },
  {
    id: 'integrity',
    icon: '🤝',
    name: 'Integrity',
    text: 'We operate with transparency and accountability in everything we do.',
    accent: '#2f931d',
  },
  {
    id: 'excellence',
    icon: '🌟',
    name: 'Excellence',
    text: 'We strive for the highest quality in our programs and services.',
    accent: '#b7791f',
  },
  {
    id: 'community',
    icon: '🌍',
    name: 'Community',
    text: 'We believe in the power of collective action and partnership.',
    accent: '#2c6e8f',
  },
];

export default function About() {
  const {
    preferences: { colorScheme },
  } = useAppState();

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className='about-hero'>
        <LiquidGradientBg scheme={colorScheme} />
        <div className='hero-content-container'>
          <div className='hero-content'>
            <div className='hero-badge'>
              <span className='badge-icon'>❤️</span>
              <span>Non-Profit Organization</span>
            </div>
            <h1 className='hero-title'>
              About <span className='gradient-text'>Chance For Souls</span>
            </h1>
            <p className='hero-subtitle'>
              Transforming lives through education, wellness, and community empowerment.
              <br />
              <strong>Every soul deserves a chance to thrive.</strong>
            </p>
            <div className='hero-stats'>
              <div className='stat-card'>
                <div className='stat-number'>850+</div>
                <div className='stat-label'>Lives Impacted</div>
              </div>
              <div className='stat-card'>
                <div className='stat-number'>6</div>
                <div className='stat-label'>Programs</div>
              </div>
              <div className='stat-card'>
                <div className='stat-number'>4</div>
                <div className='stat-label'>Schools Reached</div>
              </div>
            </div>
          </div>
        </div>
        <div className='hero-scroll-indicator'>
          <div className='scroll-arrow'>↓</div>
          <span>Scroll to learn more</span>
        </div>
      </section>

      {/* Core Values Section */}
      <section className='core-values-section'>
        <div className='ed-container'>
          <header className='values-header'>
            <span className='values-eyebrow'>What we stand for</span>
            <h2 className='values-title'>Our Core Values</h2>
            <p className='values-lede'>
              Four principles shape every program we run, every partnership we build,
              and every soul we serve.
            </p>
          </header>
          <div className='values-grid'>
            {CORE_VALUES.map((value, index) => (
              <article
                key={value.id}
                className='value-card'
                style={{ '--value-accent': value.accent }}
              >
                <span className='value-index'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='value-icon' aria-hidden='true'>
                  {value.icon}
                </span>
                <h3 className='value-name'>{value.name}</h3>
                <p className='value-text'>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Sections */}
      <Mission />
      <Vision />
      <Objectives />

      {/* Impact Section */}
      <section className='ed-section ed-section--paper'>
        <div className='ed-container'>
          <div className='ed-header'>
            <span className='ed-eyebrow'>Our impact</span>
            <h2 className='ed-title'>Making a difference in Ghana and beyond</h2>
            <p className='ed-lede'>
              Four areas where our programmes are already changing outcomes for the
              people we serve.
            </p>
          </div>

          <div className='ed-grid ed-grid--2 impact-rows'>
            {IMPACT_AREAS.map((area) => (
              <article
                key={area.id}
                className='ed-card impact-row'
                style={{ '--ed-accent': area.accent }}
              >
                <span className='ed-card__icon' aria-hidden='true'>
                  {area.icon}
                </span>
                <h3 className='ed-card__title'>{area.title}</h3>
                <p className='ed-card__text'>{area.text}</p>
                <span className='impact-badge-ed'>{area.badge}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <Leadership />

      {/* Call to Action */}
      <section className='ed-section ed-section--white'>
        <div className='ed-container'>
          <div className='cta-band'>
            <div>
              <span className='cta-eyebrow'>Join us</span>
              <h2 className='cta-title'>Join us in our mission</h2>
              <p className='cta-text'>
                Together, we can create lasting change and give every soul a chance to thrive.
              </p>
            </div>
            <div className='cta-actions'>
              <a href='/Donate' className='cta-primary'>
                Donate Now
              </a>
              <a href='/ContactUs' className='cta-secondary'>
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
