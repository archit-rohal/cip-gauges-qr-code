import { useParams, useNavigate } from 'react-router-dom';
import { GaugeDisplay } from '../components/GaugeDisplay';
import './GaugePage.css';

/**
 * GaugePage Component
 * 
 * Route wrapper for viewing a specific gauge
 * Extracts part code from URL parameters and passes to GaugeDisplay
 * Provides navigation back to home page
 */
export function GaugePage() {
  const { partCode } = useParams();
  const navigate = useNavigate();

  const handleNotFound = () => {
    // Could add telemetry here if needed
    console.warn(`Part code not found: ${partCode}`);
  };

  return (
    <div className="gauge-page">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="back-button"
        aria-label="Go back to part selection"
        title="Go back to part selection"
      >
        ← Back
      </button>

      {/* Gauge Display Component */}
      <GaugeDisplay
        partCode={partCode}
        onNotFound={handleNotFound}
      />
    </div>
  );
}
