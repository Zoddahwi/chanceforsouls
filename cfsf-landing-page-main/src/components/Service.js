import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionErrorBoundary } from '../components/common/ErrorBoundary';
import '../styles/editorial.css';

/*
 * The services card grid that used to live here is commented out upstream
 * (see git history for the SERVICES map). The scroll-reveal and 3D-tilt
 * effects that accompanied it queried `.sec-items` and `.card`, neither of
 * which is rendered any more, so they have been removed rather than left
 * running against an empty NodeList.
 */
const ServiceContent = () => {
  const navigate = useNavigate();

  return (
    <section className='ed-section ed-section--white' id='about'>
      <div className='ed-container'>
        <div className='ed-header ed-header--wide'>
          <span className='ed-eyebrow'>Our purpose</span>
          <h2 className='ed-title'>
            Why support Chance for Souls Foundation
          </h2>
          <p className='ed-lede'>
            The Foundation provides mental wellness, emotional upliftment, healing and
            socio-economic wellbeing to people in need. Your support is what turns that
            intent into counselling rooms, classrooms and community programmes.
          </p>
          <div className='ed-actions'>
            <button
              type='button'
              className='ed-btn ed-btn--primary'
              onClick={() => navigate('/WhySupport')}
            >
              Learn more about supporting us →
            </button>
            <button
              type='button'
              className='ed-btn ed-btn--ghost'
              onClick={() => navigate('/Donate')}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Service = () => (
  <SectionErrorBoundary sectionName='Services'>
    <ServiceContent />
  </SectionErrorBoundary>
);

export default Service;
