import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { SERVICES } from '../constants';
import { SectionErrorBoundary } from '../components/common/ErrorBoundary';

const ServiceContent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const section = document.querySelector('.service');
    if (!section) return;

    const items = Array.from(section.querySelectorAll('.reveal-on-scroll'));
    const grid = section.querySelector('.sec-items');

    // Respect reduced motion preferences – show items without animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add('in-view'));
    }

    // Scroll reveal — once the grid enters view, reveal all cards with stagger
    let io;
    if (!prefersReducedMotion && 'IntersectionObserver' in window && grid && items.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              items.forEach((el, i) => {
                el.style.setProperty('--reveal-delay', `${(i % 4) * 90}ms`);
                el.classList.add('in-view');
              });
              io.unobserve(grid);
            }
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
      );
      io.observe(grid);
    }

    // Subtle 3D tilt for fine pointers without reduced motion
    const precisePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = prefersReducedMotion;
    const cards = Array.from(section.querySelectorAll('.card'));
    const listeners = [];
    if (precisePointer && !reduceMotion) {
      cards.forEach((card) => {
        const maxTilt = 6;
        let rafId;
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const rx = (0.5 - y) * maxTilt;
          const ry = (x - 0.5) * maxTilt;
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            card.style.setProperty('--tilt', `rotateX(${rx}deg) rotateY(${ry}deg)`);
          });
        };
        const reset = () => {
          cancelAnimationFrame(rafId);
          card.style.setProperty('--tilt', 'none');
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', reset);
        card.addEventListener('blur', reset);
        listeners.push({ card, onMove, reset });
      });
    }

    return () => {
      if (io) io.disconnect();
      listeners.forEach(({ card, onMove, reset }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', reset);
        card.removeEventListener('blur', reset);
      });
    };
  }, []);

  return (
    <section className='service' id='about'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='container-sec'>
          <div className='sec-intro'>
            <h1 className='font-heading text-2xl sm:text-3xl font-semibold text-gray-900'>
              Why You Should Support Chance for Souls Foundation
            </h1>
            <p className='text-gray-700 leading-7'>
              The Chance for Souls Foundation aims to provide mental wellness, emotional upliftment,
              healing, and socio-economic wellbeing to people in need. Your support makes a real
              difference.
            </p>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                onClick={() => navigate('/WhySupport')}
                style={{
                  background: 'linear-gradient(135deg, #2f931d 0%, #1d5e14 100%)',
                  color: 'white',
                  padding: '0.875rem 2rem',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(47, 147, 29, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(47, 147, 29, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(47, 147, 29, 0.3)';
                }}
              >
                Learn More About Supporting Us →
              </button>
            </div>
          </div>
          {/* <div className='sec-items'>
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className='sec-item card reveal-on-scroll rounded-2xl shadow-sm border border-gray-100 bg-white focus:outline-none'
                tabIndex={0}
              >
                <div className='card__icon' aria-hidden='true'>
                  <img src={service.image} alt='' />
                </div>
                <h3 className='card__title font-heading text-gray-900'>{service.title}</h3>
                <p className='card__body text-gray-700 leading-7'>{service.description}</p>
              </article>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

const Service = () => {
  return (
    <SectionErrorBoundary sectionName='Services'>
      <ServiceContent />
    </SectionErrorBoundary>
  );
};

export default Service;
