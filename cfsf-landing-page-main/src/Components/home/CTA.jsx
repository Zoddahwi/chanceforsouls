import React from 'react';
import { useAppState } from '../../context';

const CTA = () => {
  const { preferences: { theme } } = useAppState();

  return (
    <section className={`py-12 pb-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 dark:bg-primary-900/40 text-white shadow-2xl">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-primary-600/30 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-50%] right-[-50%] w-full h-full bg-secondary-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
          </div>

          <div className="relative z-10 p-8 sm:p-16 lg:p-20 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-400">Join the movement</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.1] mb-6">
                Your Support <br /> <span className="text-primary-500">Changes Lives</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg mb-8">
                Help us expand counseling services, outreach, and community programs.
                Every contribution brings us closer to a world where mental wellness is accessible to all.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <a
                  href="/Donate"
                  className="group relative px-10 py-5 bg-primary-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(35,196,100,0.5)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">Make a Donation</span>
                </a>

                <a
                  href="#about"
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold rounded-2xl transition-all duration-300 hover:bg-white/20"
                >
                  Learn How We Help
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Goal Tracking</h4>
                      <p className="text-sm text-gray-400 italic">2026 Expansion Fund</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-2xl text-primary-500">75%</span>
                    <span className="text-xs text-gray-400">Reached</span>
                  </div>
                </div>

                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-primary-500 w-[75%] rounded-full shadow-[0_0_15px_rgba(35,196,100,0.5)]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Impact</span>
                    <span className="block font-bold">12 Schools</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Target</span>
                    <span className="block font-bold">5000 People</span>
                  </div>
                </div>
              </div>

              {/* Extra decorative blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
