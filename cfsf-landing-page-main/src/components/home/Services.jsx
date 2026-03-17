import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../../constants';
import { SectionErrorBoundary } from '../common/ErrorBoundary';
import { useAppState } from '../../context';

const ServiceContent = () => {
  const navigate = useNavigate();
  const { preferences: { theme } } = useAppState();

  return (
    <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`} id="about">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="font-heading text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase text-sm mb-4">
            Our Mission & Impact
          </h2>
          <h3 className="font-heading text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.2] mb-6">
            Why You Should Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Chance for Souls</span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            The foundation aims to provide mental wellness, emotional upliftment,
            healing, and socio-economic wellbeing to people in need. Your support makes a real difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="group p-8 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-primary-500 outline-none"
              tabIndex={0}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-8 group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-500">
                <img
                  src={service.image}
                  alt=""
                  className="w-8 h-8 group-hover:invert group-hover:brightness-0 transition-all duration-500"
                />
              </div>
              <h4 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button
            onClick={() => navigate('/WhySupport')}
            className="inline-flex items-center space-x-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          >
            <span>Learn More About Supporting Us</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const Service = () => {
  return (
    <SectionErrorBoundary sectionName="Services">
      <ServiceContent />
    </SectionErrorBoundary>
  );
};

export default Service;
