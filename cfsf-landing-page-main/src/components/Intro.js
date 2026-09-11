import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editorial.css';
import './Intro.css';

const images = [
  { src: '/images/student_reflections_1.jpg', alt: 'Students in a reflection session' },
  { src: '/images/student_reflections_2.jpg', alt: 'A student sharing during outreach' },
  { src: '/images/students_reflection_activity.png', alt: 'Reflection activity in progress' },
  { src: '/images/student_reflections_5.jpg', alt: 'Group discussion after a workshop' },
];

const Intro = () => {
  const navigate = useNavigate();

  return (
    <section className='ed-section ed-section--paper' id='intro'>
      <div className='ed-container'>
        <div className='intro-split'>
          <div className='ed-header'>
            <span className='ed-eyebrow'>Healing &amp; empowerment</span>
            <h2 className='ed-title'>Transforming lives through mental support</h2>
            <p className='ed-lede'>
              The Foundation helps individuals lead fuller lives by offering new-found
              strength and purpose through mental health support, counseling and community
              empowerment. We believe in the power of expression to heal deep-seated trauma.
            </p>
            <div className='ed-actions'>
              <button
                type='button'
                className='ed-btn ed-btn--primary'
                onClick={() => navigate('/Donate')}
              >
                Donate Now
              </button>
              <button
                type='button'
                className='ed-btn ed-btn--ghost'
                onClick={() => navigate('/About')}
              >
                Our Mission
              </button>
            </div>
          </div>

          <div className='intro-mosaic'>
            {images.map((img) => (
              <figure key={img.src} className='intro-tile'>
                <img src={img.src} alt={img.alt} loading='lazy' />
                <figcaption className='intro-tile__caption'>{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
