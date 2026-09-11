import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCard from './shared/AnimatedCard';
import '../styles/editorial.css';
import './Article.css';

const Article = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 'bridge-rehab',
      image: 'images/bridge.png', // Bridge/Infrastructure
      header: 'Bridge & Rehab Project',
      content: 'Building Hope & Infrastructure: A community bridge and mental health rehabilitation center in Western Region.',
      category: 'Announcement • Upcoming 2025',
      onClick: () => navigate('/news/bridge-rehab-projects'),
      customIcon: '🌉🏥'
    },
    {
      id: 'workshop',
      image: 'images/students_reflection_activity.png', // Workshop
      header: 'Advocates Workshop',
      content: 'Equipping Mental Health Advocates with enhanced skills and support systems for effective delivery.',
      category: 'By CSF Team',
      onClick: () => navigate('/event/mental-health-workshop'),
      customIcon: '🎓'
    },
    {
      id: 'power-of-words',
      image: 'images/power_words_session3.jpg', // Power of Words
      header: 'Power of Words',
      content: 'Our transformative 3-school outreach series teaching students about emotional wellbeing.',
      category: 'By Mrs. Evelyn Benjamin-Sampson',
      onClick: () => navigate('/event/power-of-words-series'),
      customIcon: '💬'
    },
    {
      id: 'pentagon',
      image: 'images/pentagon_counseling_session.jpg',
      header: 'Pentagon Outreach',
      content: 'Inspiring outreach program at Pentagon School promoting mental health and wellbeing through faith.',
      category: 'By Deaconess Evelyn Benjamin Sampson',
      onClick: () => navigate('/event/pentagon-school-outreach')
    }
  ];

  return (
    <article id='blog' className='ed-section ed-section--paper'>
      <div className='ed-container'>
        <div className='art-container'>
          <div className='ed-header ed-header--wide'>
            <span className='ed-eyebrow'>News &amp; events</span>
            <h2 className='ed-title'>Latest from the Foundation</h2>
            <p className='ed-lede'>
              Outreach programmes, workshops and projects — what we have been doing
              and what is coming next.
            </p>
          </div>
          <div className='article-grid'>
            {articles.map((art) => (
              <AnimatedCard
                key={art.id}
                dataImage={art.image}
                header={
                  <>
                    <p className="text-xs uppercase tracking-widest text-primary-400 mb-2">{art.category}</p>
                    <h1 className="text-2xl font-bold leading-tight">{art.header}</h1>
                  </>
                }
                content={
                  <p className="article-brief">{art.content}</p>
                }
                onClick={art.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
