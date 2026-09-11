import React from 'react';
import { useAppState } from '../context';
import Mission from '../components/about/Mission';
import Vision from '../components/about/Vision';
import Objectives from '../components/about/Objectives';
import Leadership from '../components/about/Leadership';
import LiquidGradientBg from '../components/LiquidGradientBg';
import './About.css';

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
        <div className='values-container'>
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
      <section className='impact-section'>
        <div className='section-container'>
          <div className='section-header'>
            <h2 className='section-title'>Our Impact</h2>
            <p className='section-subtitle'>Making a difference in Ghana and beyond</p>
          </div>
          <div className='impact-cards-grid'>
            <div className='impact-card-modern'>
              <div className='card-top-border'></div>
              <div className='card-icon-wrapper'>
                <div className='icon-circle'>
                  <span className='card-emoji'>💚</span>
                </div>
              </div>
              <div className='card-content'>
                <h3 className='card-title'>Mental Health Support</h3>
                <p className='card-description'>
                  Professional counseling and therapy services for individuals struggling with mental health challenges.
                </p>
                <div className='card-badge'>
                  <span className='badge-text'>Transforming Lives</span>
                </div>
              </div>
            </div>

            <div className='impact-card-modern'>
              <div className='card-top-border'></div>
              <div className='card-icon-wrapper'>
                <div className='icon-circle'>
                  <span className='card-emoji'>🎓</span>
                </div>
              </div>
              <div className='card-content'>
                <h3 className='card-title'>School Outreach</h3>
                <p className='card-description'>
                  Educational programs teaching students about emotional wellbeing and mental health awareness.
                </p>
                <div className='card-badge highlight'>
                  <span className='badge-text'>850+ Students Impacted</span>
                </div>
              </div>
            </div>

            <div className='impact-card-modern'>
              <div className='card-top-border'></div>
              <div className='card-icon-wrapper'>
                <div className='icon-circle'>
                  <span className='card-emoji'>🏗️</span>
                </div>
              </div>
              <div className='card-content'>
                <h3 className='card-title'>Infrastructure Development</h3>
                <p className='card-description'>
                  Building rehabilitation facilities and community bridges to serve underserved areas.
                </p>
                <div className='card-badge'>
                  <span className='badge-text'>Communities Empowered</span>
                </div>
              </div>
            </div>

            <div className='impact-card-modern'>
              <div className='card-top-border'></div>
              <div className='card-icon-wrapper'>
                <div className='icon-circle'>
                  <span className='card-emoji'>📚</span>
                </div>
              </div>
              <div className='card-content'>
                <h3 className='card-title'>Resources & Training</h3>
                <p className='card-description'>
                  Providing books, materials, and training for advocates to deliver effective support.
                </p>
                <div className='card-badge'>
                  <span className='badge-text'>Knowledge Shared Widely</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <Leadership />

      {/* Call to Action */}
      <section className='cta-section'>
        <div className='cta-content'>
          <h2>Join Us in Our Mission</h2>
          <p>Together, we can create lasting change and give every soul a chance to thrive</p>
          <div className='cta-buttons'>
            <a href='/Donate' className='cta-btn primary'>Donate Now</a>
            <a href='/ContactUs' className='cta-btn secondary'>Get Involved</a>
          </div>
        </div>
      </section>
    </main>
  );
}
