import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FullScreenProvider } from './context/FullScreenContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { GaugePage } from './pages/GaugePage';
import './App.css';

/**
 * App Component
 * 
 * Main application router using React Router v6
 * Hash-based routing for Netlify compatibility (no server config needed)
 * 
 * Routes:
 *   / → Home page with part selection
 *   /part/:partCode → Gauge detail page
 *   * → Redirects to home
 */
function App() {
  return (
    <FullScreenProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/part/:partCode" element={<GaugePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </FullScreenProvider>
  );
}

export default App;
