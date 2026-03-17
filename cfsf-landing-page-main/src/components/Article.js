import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedCard from './shared/AnimatedCard';

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
    <article id='blog' className="py-24 sm:py-32 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='art-container'>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-4">
            <div className="max-w-2xl">
              <h2 className="font-heading text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase text-sm mb-4">
                News & Events
              </h2>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.2]">
                Latest from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Foundation</span>
              </h1>
            </div>
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
