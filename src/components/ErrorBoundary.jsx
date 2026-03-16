import React from 'react';
import './ErrorBoundary.css';

/**
 * ErrorBoundary Component
 * 
 * Global error catcher that prevents the white screen of death
 * when an uncaught JavaScript error occurs in child component trees.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h1>Scanner Encountered an Error</h1>
            <p>Something went wrong while loading the app interface.</p>
            <button
              className="btn-primary"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
            >
              Tap here to reload
            </button>
            {import.meta.env.MODE === 'development' && (
              <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px', textAlign: 'left', background: 'var(--bg-card)', padding: '10px', borderRadius: '4px' }}>
                {this.state.error && this.state.error.toString()}
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
