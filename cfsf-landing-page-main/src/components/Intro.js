import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  const goToDonation = () => {
    navigate('/Donate');
  };

  const images = [
    { src: '/images/student_reflections_1.jpg', alt: 'Student Reflection 1', delay: '0.1s' },
    { src: '/images/student_reflections_2.jpg', alt: 'Student Reflection 2', delay: '0.3s' },
    { src: '/images/students_reflection_activity.png', alt: 'Reflection Activity', delay: '0.5s' },
    { src: '/images/student_reflections_5.jpg', alt: 'Student Reflection 5', delay: '0.7s' },
  ];

  return (
    <section className='relative py-20 overflow-hidden' id='intro'>
      {/* Decorative background elements */}
      <div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10' />
      <div className='absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl -z-10' />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Text Content */}
          <div className='animate-fade-in-right'>
            <span className='inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary-600 uppercase bg-primary-50 rounded-full'>
              Healing & Empowerment
            </span>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight'>
              Transforming Lives Through <span className='text-primary-600'>Mental Support</span>
            </h2>
            <p className='text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl'>
              The foundation seeks to help individuals lead fuller lives by offering them new-found
              strength and purpose through mental health support, counseling, and community
              empowerment. We believe in the power of expression to heal deep-seated trauma.
            </p>
            <div className='flex flex-wrap gap-4'>
              <button
                className='px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-600/20'
                onClick={goToDonation}
                aria-label='Donate now'
              >
                Donate Now
              </button>
              <button
                className='px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                onClick={() => navigate('/About')}
              >
                Our Mission
              </button>
            </div>
          </div>

          {/* Image Cards Grid */}
          <div className='grid grid-cols-2 gap-4'>
            {images.map((img, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-xl animate-fade-in-up transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
                style={{ animationDelay: img.delay, animationFillMode: 'both' }}
              >
                <div className='aspect-square overflow-hidden'>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                </div>
                {/* Glass Overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                  <p className='text-white text-sm font-medium'>Activity Spotlight</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
