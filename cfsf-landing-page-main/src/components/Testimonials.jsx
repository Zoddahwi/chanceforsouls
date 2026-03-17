import React from 'react';

const testimonials = [
  {
    name: 'Ada O.',
    role: 'Beneficiary',
    quote:
      'The counseling sessions helped me regain confidence and reconnect with my family. I am deeply grateful.',
  },
  {
    name: 'Samuel T.',
    role: 'Community Partner',
    quote:
      'Their outreach programs have transformed lives in our community. The team is compassionate and professional.',
  },
  {
    name: 'Lucy A.',
    role: 'Volunteer',
    quote:
      'Volunteering with CFS opened my eyes to the power of empathy. The impact is real and inspiring.',
  },
];

const Testimonials = () => {
  return (
    <section aria-labelledby='testimonials-heading' className='bg-secondary-50 dark:bg-gray-950'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        <h2
          id='testimonials-heading'
          className='font-heading text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white'
        >
          Voices of Impact
        </h2>
        <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className='rounded-2xl border border-secondary-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm'
            >
              <blockquote className='text-gray-700 dark:text-gray-300'>“{t.quote}”</blockquote>
              <figcaption className='mt-4'>
                <div className='text-sm font-medium text-gray-900 dark:text-white'>{t.name}</div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
