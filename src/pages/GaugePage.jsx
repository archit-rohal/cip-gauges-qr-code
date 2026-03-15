import { useParams, useNavigate } from 'react-router-dom';
import { useFullScreen } from '../context/FullScreenContext';
import { GaugeDisplay } from '../components/GaugeDisplay';
import './GaugePage.css';

/**
 * GaugePage Component
 * 
 * Route wrapper for viewing a specific gauge
 * Extracts part code from URL parameters and passes to GaugeDisplay
 * Provides navigation back to home page and full-screen toggle
 */
export function GaugePage() {
  const { partCode } = useParams();
  const navigate = useNavigate();
  const { isFullScreen, toggleFullScreen } = useFullScreen();

  const handleNotFound = () => {
    // Could add telemetry here if needed
    console.warn(`Part code not found: ${partCode}`);
  };

  return (
    <div className="gauge-page">
      {/* Back Button */}
      {!isFullScreen && (
        <button
          onClick={() => navigate('/')}
          className="back-button"
          aria-label="Go back to part selection"
          title="Go back to part selection"
        >
          ← Back
        </button>
      )}

      {/* Full-Screen Toggle Button */}
      <button
        onClick={toggleFullScreen}
        className={`fullscreen-button ${isFullScreen ? 'fullscreen-button--active' : ''}`}
        aria-label={isFullScreen ? 'Exit full-screen' : 'Enter full-screen'}
        title={isFullScreen ? 'Exit full-screen (ESC)' : 'Full-screen mode'}
      >
        {isFullScreen ? '⛶' : '⛶'}
      </button>

      {/* Gauge Display Component */}
      <GaugeDisplay
        partCode={partCode}
        onNotFound={handleNotFound}
      />
    </div>
  );
}
