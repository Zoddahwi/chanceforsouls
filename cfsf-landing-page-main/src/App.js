import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useAppState } from './context';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoader from './components/common/PageLoader';
import Footer from './Footer';
import Navbar from './components/layout/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Blog from './Pages/Blog';
import Donate from './Pages/Donate';
import WhySupport from './Pages/WhySupport';
import PentagonSchoolEvent from './Pages/PentagonSchoolEvent';
import PowerOfWordsEvent from './Pages/PowerOfWordsEvent';
import MentalHealthWorkshop from './Pages/MentalHealthWorkshop';
import BridgeRehabProject from './Pages/BridgeRehabProject';
import RevKwafoProfile from './Pages/RevKwafoProfile';
import DanielLediProfile from './Pages/DanielLediProfile';
import DeaconessFaustinaProfile from './Pages/DeaconessFaustinaProfile';
import EvelynProfile from './Pages/EvelynProfile';
import MaryTobbinOseiProfile from './Pages/MaryTobbinOseiProfile';

// Redirects any hash URL on non-root paths to root while preserving the hash
// Example: "/About#home" -> "/#home" so Home sections are shown
const HashRedirector = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const homeAnchors = React.useMemo(() => new Set(['#home', '#about', '#blog']), []);

  React.useEffect(() => {
    if (location.hash && location.pathname !== '/') {
      // Only normalize hashes that belong to Home sections to avoid
      // redirecting away from dedicated pages like /Donate
      if (homeAnchors.has(location.hash.toLowerCase())) {
        navigate(`/${location.hash}`, { replace: true });
      }
    }
  }, [location, navigate, homeAnchors]);

  return null;
};

// Main App Content with routes mirroring CFS-Website
const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    preferences: { theme, colorScheme },
  } = useAppState();

  // Show loader on route change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    // Scroll to top on route change
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Apply dark mode class to document root for global styling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.color = '#f3f4f6';
      
      // Theme backgrounds based on scheme
      if (colorScheme === 3) {
         document.body.style.backgroundColor = '#021207'; // midnight
      } else if (colorScheme === 4) {
         document.body.style.backgroundColor = '#060c08'; // high contrast dark
      } else {
         document.body.style.backgroundColor = '#041c0e'; // brand green dark
      }
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.color = '#1f2937';
      
      // Light theme backgrounds
      if (colorScheme === 1) {
         document.body.style.backgroundColor = '#f8faf9'; // fresh light tint
      } else if (colorScheme === 2) {
         document.body.style.backgroundColor = '#f2fcf5'; // brand green tint
      } else {
         document.body.style.backgroundColor = '#ffffff';
      }
    }
  }, [theme, colorScheme]);

  return (
    <div className={`App ${theme === 'dark' ? 'dark-mode' : ''} min-h-screen`}>
      {/* Show loader during route transitions */}
      {isLoading && <PageLoader />}

      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      {/* Normalize hash links to always render Home sections */}
      <HashRedirector />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Donate' element={<Donate />} />
        <Route path='/About' element={<About />} />
        <Route path='/ContactUs' element={<ContactUs />} />
        <Route path='/Blog' element={<Blog />} />
        <Route path='/WhySupport' element={<WhySupport />} />
        <Route path='/event/pentagon-school-outreach' element={<PentagonSchoolEvent />} />
        <Route path='/event/power-of-words-series' element={<PowerOfWordsEvent />} />
        <Route path='/event/mental-health-workshop' element={<MentalHealthWorkshop />} />
        <Route path='/news/bridge-rehab-projects' element={<BridgeRehabProject />} />
        <Route path='/leader/rev-kwafo' element={<RevKwafoProfile />} />
        <Route path='/leader/daniel-ledi' element={<DanielLediProfile />} />
        <Route path='/leader/deaconess-faustina' element={<DeaconessFaustinaProfile />} />
        <Route path='/leader/evelyn-benjamin-sampson' element={<EvelynProfile />} />
        <Route path='/leader/mary-tobbin-osei' element={<MaryTobbinOseiProfile />} />
      </Routes>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

// Root App Component with Providers
function App() {
  return (
    <AppProvider>
      <ErrorBoundary
        fallback={
          <div className='app-error'>
            <h1>Something went wrong</h1>
            <p>
              We're sorry, but the application encountered an error. Please refresh the page to try
              again.
            </p>
            <button onClick={() => window.location.reload()}>Refresh Page</button>
          </div>
        }
      >
        <AppContent />
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;
