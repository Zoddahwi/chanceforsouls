import React from 'react';
import { useAppState } from '../context/AppContext';

const Hero = () => {
  const {
    preferences: { theme },
  } = useAppState();
  return (
    <div className={theme === 'dark' ? 'dark bg-gray-900' : ''}>
      <section
        id='home'
        className='relative overflow-hidden w-full bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-900 pt-16'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2'>
            <div className='animate-fade-in-right'>
              <h1 className='font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white'>
                Chance for Souls Foundation
              </h1>
              <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 animate-fade-in-up' style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                We help individuals lead fuller lives through mental health support, counseling, and
                community empowerment. Join us in making a real impact.
              </p>
              <div className='mt-10 flex items-center gap-4 animate-fade-in-up' style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
                <a href='/Donate' className='donate-btn transition-all duration-300 hover:scale-105 hover:shadow-lg'>
                  Donate Now
                </a>
                <a
                  href='#about'
                  className='inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105'
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className='relative animate-fade-in-left' style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <div className='relative mx-auto h-96 w-full max-w-xl sm:h-[28rem] lg:h-[32rem] hover:animate-float'>
                <img
                  src='images/CFS_bg4.png'
                  alt='Chance for Souls Foundation - Vision for Mental Health and Wellbeing'
                  className='h-full w-full rounded-2xl object-contain shadow-xl ring-1 ring-black/5 bg-white transition-transform duration-300 hover:scale-105'
                  loading='eager'
                />
                <div className='pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-primary-200/40 to-primary-100/40 blur-2xl animate-pulse'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
