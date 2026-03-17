import React from 'react';
import { useAppState, useAppDispatch, actionCreators } from '../context/AppContext';
import LiquidGradientBg from './LiquidGradientBg';

const Hero = () => {
  const {
    preferences: { theme, colorScheme },
  } = useAppState();

  const dispatch = useAppDispatch();
  const setColorScheme = (id) => dispatch(actionCreators.setColorScheme(id));

  return (
    <div className={theme === 'dark' ? 'dark bg-gray-900' : ''}>
      <section
        id='home'
        className='relative w-full pt-16 min-h-screen border-b-0'
        style={{ overflow: 'hidden' }}
      >
        <LiquidGradientBg scheme={colorScheme} />
        
        <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center justify-center text-center py-16 sm:py-24 max-w-4xl mx-auto'>
            {/* Wrapper changes text color globally based on scheme */}
            <div className={`animate-fade-in-up transition-colors duration-500 ${(colorScheme === 3 || colorScheme === 4) ? 'text-white' : 'text-gray-900'}`}>
              <h1 className='font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight drop-shadow-sm'>
                Chance for Souls Foundation
              </h1>
              <p className={`mt-8 text-xl leading-8 animate-fade-in-up font-medium drop-shadow-md max-w-2xl mx-auto transition-colors duration-500 ${(colorScheme === 3 || colorScheme === 4) ? 'text-gray-200' : 'text-gray-800'}`} style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                We help individuals lead fuller lives through mental health support, counseling, and
                community empowerment. Join us in making a real impact.
              </p>
              
              <div className="mt-10 mb-6 flex flex-col items-center animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                <p className={`text-sm font-semibold mb-3 uppercase tracking-widest transition-colors duration-500 ${(colorScheme === 3 || colorScheme === 4) ? 'text-gray-300' : 'text-gray-700'}`}>Select Theme</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { id: 1, name: 'Fresh Light' },
                    { id: 2, name: 'Brand Green' },
                    { id: 3, name: 'Midnight' },
                    { id: 4, name: 'High Contrast' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setColorScheme(s.id)}
                      className={`
                        px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 
                        backdrop-blur-md border 
                        ${colorScheme === s.id 
                          ? 'bg-primary-500/80 text-white border-primary-600 shadow-md scale-105' 
                          : 'bg-white/40 dark:bg-black/30 text-gray-800 dark:text-gray-100 border-gray-400/30 hover:bg-white/60 dark:hover:bg-black/50 hover:scale-105 hover:shadow-sm'
                        }
                      `}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className='mt-10 flex items-center justify-center gap-6 animate-fade-in-up' style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
                <a href='/Donate' className='donate-btn transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-primary-600/90 text-white text-lg px-8 py-4'>
                  Donate Now
                </a>
                <a
                  href='#about'
                  className={`inline-flex items-center rounded-md border px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm
                    ${(colorScheme === 3 || colorScheme === 4) 
                      ? 'border-gray-500/50 text-gray-100 hover:bg-black/40' 
                      : 'border-gray-400/50 text-gray-800 hover:bg-white/50'}
                  `}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
