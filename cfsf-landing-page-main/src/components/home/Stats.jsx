import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../../context';

const stats = [
  {
    label: 'Individuals Counseled',
    value: '1000',
    suffix: '+',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    label: 'Community Programs',
    value: '50',
    suffix: '+',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    label: 'Support Hotline',
    value: '24',
    suffix: '/7',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    label: 'Workshops & Resources',
    value: '100',
    suffix: '%',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
];

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (easeOutExpo)
      const easePercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

      setCount(Math.floor(easePercentage * target));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

const Stats = () => {
  const { preferences: { theme } } = useAppState();

  return (
    <section className={`py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-8 rounded-[2rem] text-center transform transition-all duration-500 hover:scale-[1.05] ${theme === 'dark'
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl'
                }`}
            >
              <div className="inline-flex p-3 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                {stat.icon}
              </div>

              <div className="font-heading text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-2">
                <AnimatedCounter target={parseInt(stat.value)} />
                <span className="text-primary-500">{stat.suffix}</span>
              </div>

              <div className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
