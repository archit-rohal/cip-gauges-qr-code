import { useEffect, useState } from 'react';
import { useGaugesData } from '../hooks/useGaugesData';
import { useFullScreen } from '../context/FullScreenContext';
import NotFound from './NotFound';
import Loading from './Loading';
import { ZoomableImage } from './ZoomableImage';
import './GaugeDisplay.css';

/**
 * GaugeDisplay Component
 * 
 * Displays gauge information and image with zoom capability
 * Supports full-screen viewing mode
 * Part of the unified design system across the app
 * 
 * Props:
 *   - partCode: The part code (e.g., 'EA2')
 *   - onNotFound: Optional callback when part is not found
 */
export function GaugeDisplay({ partCode, onNotFound }) {
  const [imageError, setImageError] = useState(false);
  const { isFullScreen } = useFullScreen();

  const { data: gaugesData, loading, error } = useGaugesData();

  useEffect(() => {
    setImageError(false);
  }, [partCode]);

  if (loading) return <Loading />;
  if (error) return <div className="gauge-display-wrapper"><div className="gauge-display-error">Failed to load part data</div></div>;

  // Part not found or not provided
  if (!partCode || !gaugesData || !gaugesData[partCode]) {
    if (onNotFound) onNotFound();
    return <NotFound partCode={partCode} />;
  }

  const gauge = gaugesData[partCode];

  return (
    <div className={`gauge-display-wrapper ${isFullScreen ? 'gauge-display-wrapper--fullscreen' : ''}`}>
      {/* Header with Part Code - Hidden in fullscreen */}
      {!isFullScreen && (
        <div className="gauge-page-header">
          <h1 className="gauge-part-title">
            PART: <span className="accent">{partCode}</span>
          </h1>
        </div>
      )}

      {/* Main Image Viewing Area - Flexible, centered content */}
      <div className="gauge-display-content">
        {imageError ? (
          <div className="gauge-display-error">
            <div className="gauge-display-error-icon">⚠</div>
            <h2 className="gauge-display-error-title">Image Not Available</h2>
            <p className="gauge-display-error-msg">
              The gauge list image could not be loaded. Please try another part code.
            </p>
          </div>
        ) : (
          <div className="gauge-image-container">
            <ZoomableImage
              src={gauge.image}
              alt={`Gauge list for part ${partCode}`}
              maxZoom={4}
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>

      {/* Metadata Section - Description and Important Notes */}
      {!isFullScreen && (
        <div className="gauge-metadata-section">
          {/* Description */}
          {gauge.description && (
            <div className="metadata-item">
              <p className="gauge-description">{gauge.description}</p>
            </div>
          )}

          {/* Important Note/Instructions */}
          {gauge.note && (
            <div className="gauge-note-box">
              <p className="gauge-note-label">⚡ Important</p>
              <p className="gauge-note-content">{gauge.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
