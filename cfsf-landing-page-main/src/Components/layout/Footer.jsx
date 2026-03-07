import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../context';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const { preferences: { theme } } = useAppState();

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className={`footer-premium ${theme === 'dark' ? 'footer-dark' : 'footer-light'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <img
              src="/images/Logo_cfs_new.svg"
              alt="CFS Logo"
              className={`h-16 w-auto ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
            />
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              Empowering individuals through professional mental health support,
              compassionate counseling, and dedicated community programs.
            </p>
            <div className="flex items-center space-x-4">
              {['facebook', 'instagram', 'linkedin', 'twitter'].map(social => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-white/5 flex items-center justify-center text-primary-600 dark:text-white hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img src={`/images/icon-${social}.svg`} alt={social} className="w-5 h-5 dark:invert" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-8">
              Foundation
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/About' },
                { label: 'Why Support Us', path: '/WhySupport' },
                { label: 'Our Programs', path: '/Blog' },
              ].map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs mb-8">
              Connect
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Contact Us', path: '/ContactUs' },
                { label: 'Volunteer', path: '#' },
                { label: 'News & Events', path: '/Blog' },
                { label: 'Privacy Policy', path: '#' },
              ].map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly Uplift / Newsletter */}
          <div className="p-8 rounded-[2rem] bg-primary-600 text-white relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
            <h4 className="relative z-10 font-heading font-bold text-xl mb-4">Make a Difference</h4>
            <p className="relative z-10 text-white/80 text-sm mb-6">
              Your donation directly funds counseling sessions and school outreach programs.
            </p>
            <button
              onClick={() => handleLinkClick('/Donate')}
              className="relative z-10 w-full py-4 bg-white text-primary-600 font-black rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Donate Now
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
            © {new Date().getFullYear()} Chance for Souls Foundation. <span className="hidden sm:inline">All Rights Reserved.</span>
          </p>
          <div className="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <a href="#terms" className="hover:text-primary-500">Terms</a>
            <a href="#cookies" className="hover:text-primary-500">Cookies</a>
            <p>Made with 💚 for mental health</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
