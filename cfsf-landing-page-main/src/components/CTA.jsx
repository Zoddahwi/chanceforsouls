import React from 'react';

const CTA = () => {
  return (
    <section aria-labelledby='donate-cta' className='relative isolate'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        <div className='overflow-hidden rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 p-8 sm:p-12 text-white shadow-lg'>
          <div className='relative z-10 grid gap-8 sm:grid-cols-2 items-center'>
            <div>
              <h2 id='donate-cta' className='font-heading text-2xl sm:text-3xl font-bold'>
                Your support changes lives
              </h2>
              <p className='mt-2 text-white/90'>
                Help us expand counseling services, outreach, and community programs. Every donation
                counts.
              </p>
            </div>
            <div className='flex flex-wrap items-center gap-3 sm:justify-end'>
              <a href='/Donate' className='donate-btn'>
                Donate Now
              </a>
              <a
                href='#about'
                className='inline-flex items-center rounded-md border border-white/60 px-6 py-3 text-base font-semibold text-white hover:bg-white/10'
              >
                How we use funds
              </a>
            </div>
          </div>
          <div className='absolute inset-0 -z-0 opacity-20 [mask-image:radial-gradient(70%_50%_at_50%_50%,black,transparent)]'>
            <img
              src='images/charity.svg'
              alt=''
              aria-hidden
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
