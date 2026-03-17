import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context';

const newsItems = [
  {
    id: 'bridge-rehab',
    tag: 'Announcement',
    title: 'Bridge Construction & Rehabilitation Facility',
    brief: 'Exciting news! CSF is embarking on two transformative infrastructure projects in Western Region: a community bridge and a mental health rehabilitation center...',
    author: 'Upcoming Projects 2026',
    path: '/news/bridge-rehab-projects',
    emoji: '🌉🏥',
  },
  {
    id: 'workshop',
    tag: 'Training',
    title: 'Mental Health Advocates Workshop',
    brief: 'Equipping Mental Health Advocates with enhanced skills and support systems for effective program delivery - July 2025...',
    author: 'CSF Training Team',
    path: '/event/mental-health-workshop',
    emoji: '🎓',
  },
  {
    id: 'power-of-words',
    tag: 'Outreach',
    title: 'Series: The Power of Words',
    brief: 'Words Matter; You Could Be Harming a Soul - A transformative multi-school outreach series teaching students about emotional wellbeing...',
    author: 'Mrs. Evelyn Benjamin-Sampson',
    path: '/event/power-of-words-series',
    emoji: '💬',
  },
  {
    id: 'pentagon-school',
    tag: 'Program',
    title: 'Outreach at Pentagon School',
    brief: "The Chance for Souls Foundation conducted an inspiring outreach program at Pentagon School's JHS Department, promoting mental health...",
    author: 'Deaconess Evelyn Benjamin Sampson',
    path: '/event/pentagon-school-outreach',
    image: 'images/pentagon_teaching_session.jpg',
  },
];

const News = () => {
  const navigate = useNavigate();
  const { preferences: { theme } } = useAppState();

  return (
    <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-white'}`} id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase text-sm mb-4">
              News & Events
            </h2>
            <h3 className="font-heading text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.2]">
              Latest from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Foundation</span>
            </h3>
          </div>
          <button
            onClick={() => navigate('/Blog')}
            className="mt-6 md:mt-0 px-6 py-3 border border-gray-200 dark:border-white/10 rounded-xl font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            View All News
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="group cursor-pointer flex flex-col h-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10 focus-within:ring-2 focus-within:ring-primary-500"
              tabIndex={0}
            >
              {/* Media Part */}
              <div className="relative h-56 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-600 to-secondary-600 flex flex-col items-center justify-center text-white">
                    <span className="text-5xl mb-2">{item.emoji}</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full text-primary-600">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Content Part */}
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
                  {item.author}
                </p>
                <h4 className="font-heading text-xl font-extrabold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-primary-500 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.brief}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Read More</span>
                  <svg className="w-5 h-5 text-primary-600 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
