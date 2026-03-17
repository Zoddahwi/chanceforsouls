import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  const goToDonation = () => {
    navigate('/Donate');
  };

  return (
    <section className='intro' id='home'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='contain'>
          <div className='intro-text'>
            <h1>CHANCE FOR SOULS' FOUNDATION</h1>
            <p>
              The foundation seeks to help individuals lead fuller lives by offering them new-found
              strength and purpose through mental health support, counseling, and community
              empowerment.
            </p>
            <button
              className='intro-btn'
              onClick={goToDonation}
              aria-label='Navigate to donation form'
            >
              Donate Now
            </button>
          </div>

          <div className='intro-img'>
            <div className='mock-img' role='img' aria-label='Foundation vision and mission'>
              <img
                src='images/chance.svg'
                alt='Chance for Souls Foundation - Vision for Mental Health and Wellbeing'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
