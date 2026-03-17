import React from 'react';
import { useAppState } from '../../context';

const Hero = () => {
  const {
    preferences: { theme },
  } = useAppState();

  return (
    <section
      id="home"
      className={`relative min-h-[90vh] flex items-center overflow-hidden pt-20 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
        }`}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${theme === 'dark' ? 'bg-primary-600' : 'bg-primary-400'
          }`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 ${theme === 'dark' ? 'bg-secondary-500' : 'bg-secondary-300'
          }`} />

        {/* Animated Grid Pattern (Optional/Subtle) */}
        <div className={`absolute inset-0 opacity-[0.03] ${theme === 'dark' ? 'invert' : ''
          }`} style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Content Side */}
          <div className="text-left animate-fade-in-right">
            <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                Empowering Communities
              </span>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              Your Path to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                Mental Wellness
              </span>
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-xl animate-fade-in-up delay-200">
              We help individuals lead fuller lives through professional mental health support,
              compassionate counseling, and dedicated community empowerment.
              Join our mission to bring light to every soul.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5 animate-fade-in-up delay-500">
              <a
                href="/Donate"
                className="group relative px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(35,196,100,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center">
                  Donate Now
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>

              <a
                href="#about"
                className="px-8 py-4 bg-white/5 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold rounded-2xl transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/20"
              >
                Learn More
              </a>
            </div>

            {/* Micro Stats or Social Proof */}
            <div className="mt-12 flex items-center space-x-6 animate-fade-in-up delay-700">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 bg-primary-500 flex items-center justify-center text-[10px] font-bold text-white">
                  850+
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-white">850+ lives</span> impacted across Ghana
              </p>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative lg:h-[600px] flex items-center justify-center animate-fade-in-left">
            {/* Main Image with Glassmorphism Card */}
            <div className="relative group w-full max-w-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

              <div className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="images/CFS_bg4.png"
                  alt="CFS Impact"
                  className="w-full h-auto object-cover"
                />

                {/* Floating Glass Element */}
                <div className="absolute bottom-6 right-6 left-6 p-6 backdrop-blur-xl bg-white/70 dark:bg-black/40 border border-white/20 dark:border-white/10 rounded-2xl shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary-500 rounded-xl text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">New Hope</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Restoring dignity through counseling</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-secondary-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse delay-700" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
