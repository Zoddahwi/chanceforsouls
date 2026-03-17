import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useCommon';
import { SITE_CONFIG } from '../../constants';
import { useApp, actionCreators } from '../../context';
import './Navbar.css';

const ThemeToggle = ({ theme, setTheme }) => {
  const isDark = theme === 'dark';
  const [anim, setAnim] = React.useState(false);
  const handleClick = () => {
    setTheme(isDark ? 'light' : 'dark');
    setAnim(true);
    window.setTimeout(() => setAnim(false), 420);
  };
  return (
    <button
      onClick={handleClick}
      className={`theme-toggle-btn ${anim ? 'animate-flash' : ''}`}
      aria-label='Toggle dark mode'
    >
      <span className='theme-icon'>{isDark ? '🌙' : '☀️'}</span>
      <span className='theme-text'>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
};

const Navbar = () => {
  const { isScrolled } = useScroll();
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = useApp();
  const theme = state.preferences.theme;
  const setTheme = (t) => dispatch(actionCreators.setTheme(t));
  const [logoAnim, setLogoAnim] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/About' },
    { id: 'blog', label: 'News & Events', path: '/Blog' },
    { id: 'contact', label: 'Contact', path: '/ContactUs' },
  ];

  const onNavClick = (path) => {
    setOpen(false);
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className='navbar-container'>
        <div className='navbar-content'>
          {/* Logo */}
          <div
            className='navbar-logo'
            onClick={() => {
              setLogoAnim(true);
              navigate('/');
            }}
          >
            <img
              src="/images/Logo_cfs_new.svg"
              alt={`${SITE_CONFIG?.name || 'CFS'} logo`}
              className={`logo-image ${logoAnim ? 'logo-pop' : ''}`}
              onAnimationEnd={() => setLogoAnim(false)}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className='desktop-nav' aria-label='Main navigation'>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.path)}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className='desktop-actions'>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button
              onClick={() => navigate('/Donate')}
              className='donate-btn'
            >
              <span className='donate-icon'>💚</span>
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='mobile-menu-btn'
            aria-label='Toggle menu'
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className='menu-icon'>{open ? '✖' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${open ? 'open' : ''}`}>
        <div className='mobile-menu-header'>
          <div className='mobile-logo'>
            <img
              src="/images/Logo_cfs_new.svg"
              alt="CFS Logo"
              className="drawer-logo"
            />
          </div>
          <button
            className='drawer-close-btn'
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className='mobile-menu-content'>
          <nav className='mobile-nav-links'>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.path)}
                className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className='mobile-actions'>
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button
              onClick={() => {
                onNavClick('/Donate');
              }}
              className='donate-btn mobile'
            >
              <span className='donate-icon'>💚</span>
              <span>Donate Now</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
