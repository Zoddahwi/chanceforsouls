import React from 'react';
import { useAppState } from '../../context';

const testimonials = [
  {
    name: 'Ada Osei',
    role: 'Beneficiary',
    image: 'https://i.pravatar.cc/150?u=ada',
    quote:
      'The counseling sessions helped me regain confidence and reconnect with my family. I am deeply grateful for the support I received during my hardest times.',
  },
  {
    name: 'Samuel Tetteh',
    role: 'Community Partner',
    image: 'https://i.pravatar.cc/150?u=sam',
    quote:
      'Their outreach programs have transformed lives in our community. The team is compassionate, professional, and truly dedicated to mental wellness.',
  },
  {
    name: 'Lucy Afriyie',
    role: 'Volunteer',
    image: 'https://i.pravatar.cc/150?u=lucy',
    quote:
      'Volunteering with CFS opened my eyes to the power of empathy. Seeing the transformation in people first-hand is the most rewarding experience.',
  },
];

const Testimonials = () => {
  const { preferences: { theme } } = useAppState();

  return (
    <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`} id="testimonials">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase text-sm mb-4">
            Testimonials
          </h2>
          <h3 className="font-heading text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.2]">
            Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Impact</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`relative p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 ${theme === 'dark'
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl'
                }`}
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <svg className="w-12 h-12 text-primary-500 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V5H21.017V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.9124 16 5.01697 16H8.01697C8.56925 16 9.01697 15.5523 9.01697 15V9C9.01697 8.44772 8.56925 8 8.01697 8H4.01697C3.46468 8 3.01697 8.44772 3.01697 9V12C3.01697 12.5523 2.56925 13 2.01697 13H0.0169678V5H10.017V15C10.017 18.3137 7.33065 21 4.01697 21H3.01697Z" />
                </svg>
              </div>

              <div className="flex flex-col h-full">
                <blockquote className="text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed">
                  "{t.quote}"
                </blockquote>

                <div className="mt-auto flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary-500 overflow-hidden shadow-lg shadow-primary-500/20">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-gray-900 dark:text-white leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
