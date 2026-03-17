import React from 'react';
import { useAppState } from '../context';
import Mission from '../components/about/Mission';
import Vision from '../components/about/Vision';
import Objectives from '../components/about/Objectives';
import Leadership from '../components/about/Leadership';
import LiquidGradientBg from '../components/LiquidGradientBg';
import './About.css';

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
        <div className='section-container'>
          <div className='section-header'>
            <h2 className='section-title'>Our Core Values</h2>
            <p className='section-subtitle'>The principles that guide our mission</p>
          </div>
          <div className='values-grid'>
            <div className='value-card'>
              <div className='value-icon'>💙</div>
              <h3>Compassion</h3>
              <p>We lead with empathy and understanding in all our interactions</p>
            </div>
            <div className='value-card'>
              <div className='value-icon'>🤝</div>
              <h3>Integrity</h3>
              <p>We operate with transparency and accountability in everything we do</p>
            </div>
            <div className='value-card'>
              <div className='value-icon'>🌟</div>
              <h3>Excellence</h3>
              <p>We strive for the highest quality in our programs and services</p>
            </div>
            <div className='value-card'>
              <div className='value-icon'>🌍</div>
              <h3>Community</h3>
              <p>We believe in the power of collective action and partnership</p>
            </div>
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
