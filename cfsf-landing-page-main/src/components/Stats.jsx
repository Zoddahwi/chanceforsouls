import React from 'react';

const stats = [
  { label: 'Individuals Counseled', value: '1,000+' },
  { label: 'Community Programs', value: '50+' },
  { label: 'Support Hotline', value: '24/7' },
  { label: 'Workshops & Resources', value: 'Free' },
];

const parseTarget = (value) => {
  const n = parseInt(String(value).replace(/[^0-9]/g, ''), 10);
  return isNaN(n) ? 0 : n;
};

const AnimatedCounter = ({ value, duration = 2000 }) => {
  // Handle non-numeric values like 'Free'
  const numericTarget = parseTarget(value);
  const suffix = typeof value === 'string' && /\+$/.test(value) ? '+' : '';
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!numericTarget) return; // no animation for zero/non-numeric
    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * numericTarget);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [numericTarget, duration]);

  if (!numericTarget) {
    return <span className='text-2xl sm:text-3xl font-bold text-primary-600'>{value}</span>;
  }
  return (
    <span className='counter text-2xl sm:text-3xl font-bold text-primary-600'>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section aria-labelledby='impact-heading' className='bg-white dark:bg-gray-900'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <h2
          id='impact-heading'
          className='font-heading text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white'
        >
          Our Impact
        </h2>
        <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {stats.map((s) => (
            <div
              key={s.label}
              className='rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center shadow-sm'
            >
              <AnimatedCounter value={s.value} />
              <div className='mt-2 text-sm text-gray-600 dark:text-gray-300'>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
