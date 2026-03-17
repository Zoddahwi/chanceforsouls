import React from 'react';

/**
 * Error Boundary component to catch and handle React errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log the error to an error reporting service here
    if (process.env.NODE_ENV === 'production') {
      // logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='error-boundary'>
          <div className='error-content'>
            <h2>Oops! Something went wrong</h2>
            <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>

            {process.env.NODE_ENV === 'development' && (
              <details className='error-details'>
                <summary>Error Details (Development Only)</summary>
                <pre className='error-stack'>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <button onClick={() => window.location.reload()} className='error-button'>
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional Error Boundary using React 18+ features
 * This is a simpler version for specific use cases
 */
export const SimpleErrorBoundary = ({ children, fallback }) => {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
};

/**
 * Section Error Boundary for individual sections
 */
export const SectionErrorBoundary = ({ children, sectionName }) => {
  const fallback = (
    <div className='section-error'>
      <div className='section-error-content'>
        <h3>Unable to load {sectionName}</h3>
        <p>This section is temporarily unavailable. Please try again later.</p>
        <button onClick={() => window.location.reload()} className='section-error-button'>
          Retry
        </button>
      </div>
    </div>
  );

  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
};

export default ErrorBoundary;
