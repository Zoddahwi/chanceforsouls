import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context';

const Intro = () => {
  const navigate = useNavigate();
  const { preferences: { theme } } = useAppState();

  return (
    <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative lg:order-2">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl transform lg:rotate-2">
              <img
                src="images/chance.svg"
                alt="Our Vision"
                className="w-full h-auto bg-primary-50 dark:bg-primary-900/10 p-12"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          <div className="lg:w-1/2 lg:order-1">
            <h2 className="font-heading text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase text-sm mb-4">
              Our Philosophy
            </h2>
            <h3 className="font-heading text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.2] mb-8">
              A Foundation Built on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Strength & Purpose</span>
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
              We believe that every soul deserves a chance to thrive. Our foundation seeks to help
              individuals lead fuller lives by offering them new-found strength and purpose
              through professional mental health support, compassionate counseling, and active
              community empowerment.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                onClick={() => navigate('/About')}
                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Our Full Story
              </button>
              <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 font-medium">
                <span className="flex h-2 w-2 rounded-full bg-primary-500" />
                <span>850+ Students Impacted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
