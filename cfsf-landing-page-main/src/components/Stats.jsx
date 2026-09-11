import React from 'react';
import '../styles/editorial.css';

const stats = [
  { label: 'Individuals Counseled', value: '1,000+', accent: '#2f931d' },
  { label: 'Community Programs', value: '50+', accent: '#b7791f' },
  { label: 'Support Hotline', value: '24/7', accent: '#2c6e8f' },
  { label: 'Workshops & Resources', value: 'Free', accent: '#b8524a' },
];

const parseTarget = (value) => {
  const n = parseInt(String(value).replace(/[^0-9]/g, ''), 10);
  return isNaN(n) ? 0 : n;
};

const AnimatedCounter = ({ value, duration = 2000 }) => {
  // Handle non-numeric values like 'Free' and '24/7'
  const numericTarget = parseTarget(value);
  const suffix = typeof value === 'string' && /\+$/.test(value) ? '+' : '';
  const isPlainNumber = /^[\d,]+\+?$/.test(String(value));
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!numericTarget || !isPlainNumber) return undefined;
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * numericTarget));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [numericTarget, duration, isPlainNumber]);

  // '24/7' parses to 247, so only animate values that are purely numeric
  if (!numericTarget || !isPlainNumber) {
    return <span className='ed-card__figure'>{value}</span>;
  }

  return (
    <span className='ed-card__figure counter'>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Stats = () => (
  <section aria-labelledby='impact-heading' className='ed-section ed-section--paper'>
    <div className='ed-container'>
      <div className='ed-header'>
        <span className='ed-eyebrow'>By the numbers</span>
        <h2 id='impact-heading' className='ed-title'>
          Our Impact
        </h2>
        <p className='ed-lede'>
          Counseling, outreach and community programmes delivered across Ghana — and
          the reach they have had so far.
        </p>
      </div>

      <div className='ed-grid ed-grid--4'>
        {stats.map((s, i) => (
          <div key={s.label} className='ed-card' style={{ '--ed-accent': s.accent }}>
            <span className='ed-card__index'>{String(i + 1).padStart(2, '0')}</span>
            <AnimatedCounter value={s.value} />
            <p className='ed-card__text'>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
