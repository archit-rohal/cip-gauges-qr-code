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
    <div className={`gauge-page-container ${isFullScreen ? 'gauge-page-container--fullscreen' : ''}`}>
      {/* Main gauge display area */}
      <div className="gauge-page-content">
        <GaugeDisplay
          partCode={partCode}
          onNotFound={handleNotFound}
        />
      </div>

      {/* Control Bar - Always visible, positioned at bottom */}
      {!isFullScreen && (
        <div className="gauge-page-controls">
          <button
            onClick={() => navigate('/')}
            className="gauge-control-btn gauge-control-btn--back"
            aria-label="Go back to part selection"
            title="Go back to home"
          >
            <span className="btn-icon-symbol">←</span>
            <span className="btn-label">Back</span>
          </button>

          <div className="gauge-control-spacer"></div>

          <button
            onClick={toggleFullScreen}
            className="gauge-control-btn gauge-control-btn--fullscreen"
            aria-label="Enter full-screen mode"
            title="Full-screen viewing"
          >
            <span className="btn-icon-symbol">⛶</span>
            <span className="btn-label">Full</span>
          </button>
        </div>
      )}

      {/* Floating exit button in fullscreen mode */}
      {isFullScreen && (
        <button
          onClick={toggleFullScreen}
          className="gauge-control-btn gauge-control-btn--fullscreen-exit"
          aria-label="Exit full-screen mode"
          title="Exit full-screen (ESC)"
        >
          ✕
        </button>
      )}
    </div>
  );
}
