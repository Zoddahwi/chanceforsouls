import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  // UI state
  ui: {
    isLoading: false,
    activeSection: 'home',
    isMobileMenuOpen: false,
    isScrolled: false,
  },

  // User preferences
  preferences: {
    theme: 'light',
    colorScheme: 1,
    language: 'en',
    reducedMotion: false,
  },

  // Application data
  data: {
    donationStats: null,
    recentDonations: [],
  },

  // Notifications
  notifications: [],
};

// Action types
export const ACTIONS = {
  // UI actions
  SET_LOADING: 'SET_LOADING',
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
  SET_MOBILE_MENU: 'SET_MOBILE_MENU',
  SET_SCROLLED: 'SET_SCROLLED',

  // Preference actions
  SET_THEME: 'SET_THEME',
  SET_COLOR_SCHEME: 'SET_COLOR_SCHEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_REDUCED_MOTION: 'SET_REDUCED_MOTION',

  // Data actions
  SET_DONATION_STATS: 'SET_DONATION_STATS',
  ADD_RECENT_DONATION: 'ADD_RECENT_DONATION',

  // Notification actions
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        ui: { ...state.ui, isLoading: action.payload },
      };

    case ACTIONS.SET_ACTIVE_SECTION:
      return {
        ...state,
        ui: { ...state.ui, activeSection: action.payload },
      };

    case ACTIONS.TOGGLE_MOBILE_MENU:
      return {
        ...state,
        ui: { ...state.ui, isMobileMenuOpen: !state.ui.isMobileMenuOpen },
      };

    case ACTIONS.SET_MOBILE_MENU:
      return {
        ...state,
        ui: { ...state.ui, isMobileMenuOpen: action.payload },
      };

    case ACTIONS.SET_SCROLLED:
      return {
        ...state,
        ui: { ...state.ui, isScrolled: action.payload },
      };

    case ACTIONS.SET_THEME:
      return {
        ...state,
        preferences: { ...state.preferences, theme: action.payload },
      };

    case ACTIONS.SET_COLOR_SCHEME:
      return {
        ...state,
        preferences: { ...state.preferences, colorScheme: action.payload },
      };

    case ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        preferences: { ...state.preferences, language: action.payload },
      };

    case ACTIONS.SET_REDUCED_MOTION:
      return {
        ...state,
        preferences: { ...state.preferences, reducedMotion: action.payload },
      };

    case ACTIONS.SET_DONATION_STATS:
      return {
        ...state,
        data: { ...state.data, donationStats: action.payload },
      };

    case ACTIONS.ADD_RECENT_DONATION:
      return {
        ...state,
        data: {
          ...state.data,
          recentDonations: [action.payload, ...state.data.recentDonations.slice(0, 9)], // Keep last 10
        },
      };

    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }],
      };

    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };

    case ACTIONS.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };

    default:
      return state;
  }
};

// Create contexts
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist and hydrate theme specifically for Hero dark mode only
  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem('hero-theme');
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        dispatch({ type: ACTIONS.SET_THEME, payload: savedTheme });
      }
      
      const savedScheme = window.localStorage.getItem('hero-scheme');
      if (savedScheme) {
        dispatch({ type: ACTIONS.SET_COLOR_SCHEME, payload: parseInt(savedScheme, 10) });
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('hero-theme', state.preferences.theme);
      window.localStorage.setItem('hero-scheme', state.preferences.colorScheme);
    } catch {}
  }, [state.preferences.theme, state.preferences.colorScheme]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// Custom hooks to use the context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context;
};

// Custom hook to use both state and dispatch
export const useApp = () => {
  return {
    state: useAppState(),
    dispatch: useAppDispatch(),
  };
};

// Action creators for common operations
export const actionCreators = {
  setLoading: (isLoading) => ({ type: ACTIONS.SET_LOADING, payload: isLoading }),
  setActiveSection: (section) => ({ type: ACTIONS.SET_ACTIVE_SECTION, payload: section }),
  toggleMobileMenu: () => ({ type: ACTIONS.TOGGLE_MOBILE_MENU }),
  setMobileMenu: (isOpen) => ({ type: ACTIONS.SET_MOBILE_MENU, payload: isOpen }),
  setScrolled: (isScrolled) => ({ type: ACTIONS.SET_SCROLLED, payload: isScrolled }),
  setTheme: (theme) => ({ type: ACTIONS.SET_THEME, payload: theme }), // dark/light for Hero only
  setColorScheme: (scheme) => ({ type: ACTIONS.SET_COLOR_SCHEME, payload: scheme }),
  setLanguage: (language) => ({ type: ACTIONS.SET_LANGUAGE, payload: language }),
  setReducedMotion: (reduced) => ({ type: ACTIONS.SET_REDUCED_MOTION, payload: reduced }),
  setDonationStats: (stats) => ({ type: ACTIONS.SET_DONATION_STATS, payload: stats }),
  addRecentDonation: (donation) => ({ type: ACTIONS.ADD_RECENT_DONATION, payload: donation }),
  addNotification: (notification) => ({ type: ACTIONS.ADD_NOTIFICATION, payload: notification }),
  removeNotification: (id) => ({ type: ACTIONS.REMOVE_NOTIFICATION, payload: id }),
  clearNotifications: () => ({ type: ACTIONS.CLEAR_NOTIFICATIONS }),
};
