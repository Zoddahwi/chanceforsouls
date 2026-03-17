import React from 'react';
import { useToggle } from '../hooks';
import { scrollToDonation } from '../utils';
import { NAVIGATION_ITEMS, SITE_CONFIG } from '../constants';
import { SectionErrorBoundary } from '../components/common/ErrorBoundary';
import '../styles.scss';

const HeaderContent = () => {
  const mobileMenu = useToggle(false);
  const [activeLink, setActiveLink] = React.useState('home');

  const handleNavClick = (linkName) => {
    setActiveLink(linkName);
    mobileMenu.setFalse();
  };

  const handleDonationClick = () => {
    scrollToDonation();
    mobileMenu.setFalse();
  };

  return (
    <header>
      <div className='container'>
        <img src='images/Logo_cfs_new.svg' alt={`${SITE_CONFIG.name} Logo`} className='logo' />

        <nav className={`navbar ${mobileMenu.value ? 'active' : ''}`} aria-label='Main navigation'>
          <ul className='nav-items'>
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.id} className={`nav-item ${activeLink === item.id ? 'selected' : ''}`}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={activeLink === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className='nav-btn'
          onClick={handleDonationClick}
          aria-label='Navigate to donation form'
        >
          Donate Now
        </button>

        <button
          onClick={mobileMenu.toggle}
          className='burger'
          aria-label={mobileMenu.value ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenu.value}
        >
          <img
            src={mobileMenu.value ? 'images/icon-close.svg' : 'images/icon-hamburger.svg'}
            alt=''
            aria-hidden='true'
          />
        </button>
      </div>
    </header>
  );
};

const Header = () => {
  return (
    <SectionErrorBoundary sectionName='Navigation'>
      <HeaderContent />
    </SectionErrorBoundary>
  );
};

export default Header;
