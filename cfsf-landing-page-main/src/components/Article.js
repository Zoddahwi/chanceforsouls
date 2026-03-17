import React from 'react';
import { useNavigate } from 'react-router-dom';

const Article = () => {
  const navigate = useNavigate();

  const handlePentagonClick = () => {
    navigate('/event/pentagon-school-outreach');
  };

  const handlePowerOfWordsClick = () => {
    navigate('/event/power-of-words-series');
  };

  const handleWorkshopClick = () => {
    navigate('/event/mental-health-workshop');
  };

  const handleBridgeRehabClick = () => {
    navigate('/news/bridge-rehab-projects');
  };

  return (
    <article id='blog'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='art-container'>
          <h1>News and Events</h1>
          <div className='article'>
            {/* Bridge & Rehab Project News */}
            <div className='art-item' onClick={handleBridgeRehabClick} style={{ cursor: 'pointer' }}>
              <div style={{
                background: 'linear-gradient(135deg, #2f931d 0%, #1d5e14 100%)',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '10px 10px 0 0'
              }}>
                🌉🏥<br />
                <span style={{ fontSize: '1.3rem' }}>Building Hope & Infrastructure</span>
              </div>
              <div className='a-item'>
                <p className='author'>Announcement • Upcoming Projects 2025</p>
                <h3>Bridge Construction & Rehabilitation Facility</h3>
                <p className='brief'>
                  Exciting news! CSF is embarking on two transformative infrastructure projects in Western
                  Region: a community bridge and a mental health rehabilitation center...
                </p>
              </div>
            </div>

            {/* Mental Health Workshop Event */}
            <div className='art-item' onClick={handleWorkshopClick} style={{ cursor: 'pointer' }}>
              <div style={{
                background: 'linear-gradient(135deg, #2f931d 0%, #1d5e14 100%)',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '10px 10px 0 0'
              }}>
                🎓<br />
                <span style={{ fontSize: '1.5rem' }}>Advocates Training</span>
              </div>
              <div className='a-item'>
                <p className='author'>By CSF Team</p>
                <h3>Mental Health Advocates Workshop</h3>
                <p className='brief'>
                  Equipping Mental Health Advocates with enhanced skills and support systems for effective
                  program delivery - June 29, 2024...
                </p>
              </div>
            </div>

            {/* Power of Words Series Event */}
            <div className='art-item' onClick={handlePowerOfWordsClick} style={{ cursor: 'pointer' }}>
              <div style={{
                background: 'linear-gradient(135deg, #2f931d 0%, #1d5e14 100%)',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '2rem',
                borderRadius: '10px 10px 0 0'
              }}>
                💬<br />
                <span style={{ fontSize: '1.5rem' }}>The Power of Words</span>
              </div>
              <div className='a-item'>
                <p className='author'>By Mrs. Evelyn Benjamin-Sampson</p>
                <h3>Outreach Series: The Power of Words</h3>
                <p className='brief'>
                  Words Matter; You Could Be Harming a Soul - A transformative 3-school outreach series
                  in May 2024 teaching students about emotional wellbeing and the impact of words...
                </p>
              </div>
            </div>

            {/* Pentagon School Outreach Event */}
            <div className='art-item' onClick={handlePentagonClick} style={{ cursor: 'pointer' }}>
              <img src='images/pentagon_teaching_session.jpg' alt='Pentagon School Outreach Program' />
              <div className='a-item'>
                <p className='author'>By Deaconess Evelyn Benjamin Sampson</p>
                <h3>Outreach Program at Pentagon School</h3>
                <p className='brief'>
                  The Chance for Souls Foundation conducted an inspiring outreach program at Pentagon School's Junior High Department, promoting mental health and wellbeing through faith…
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};


export default Article;
