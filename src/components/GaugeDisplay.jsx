import { useEffect, useState } from 'react';
import gaugesData from '../data/gauges.json';
import { useFullScreen } from '../context/FullScreenContext';
import { useRecentParts } from '../hooks/useRecentParts';
import NotFound from './NotFound';
import Loading from './Loading';
import { ZoomableImage } from './ZoomableImage';
import './GaugeDisplay.css';

/**
 * GaugeDisplay Component
 * 
 * Displays gauge information and image with zoom capability
 * Tracks recent parts for quick access
 * Supports full-screen viewing mode
 * 
 * Props:
 *   - partCode: The part code (e.g., 'EA2')
 *   - onNotFound: Optional callback when part is not found
 */
export function GaugeDisplay({ partCode, onNotFound }) {
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isFullScreen } = useFullScreen();
  const { addRecentPart } = useRecentParts();

  useEffect(() => {
    setLoading(false);
  }, [partCode]);

  // Track this part as recently viewed
  useEffect(() => {
    if (partCode && gaugesData[partCode]) {
      addRecentPart(partCode);
    }
  }, [partCode, addRecentPart]);

  if (loading) return <Loading />;

  // Part not found or not provided
  if (!partCode || !gaugesData[partCode]) {
    if (onNotFound) onNotFound();
    return <NotFound partCode={partCode} />;
  }

  const gauge = gaugesData[partCode];

  return (
    <div className={`gauge-page ${isFullScreen ? 'fullscreen-mode' : ''}`}>
      {/* Header with Part Number - Full width banner */}
      {!isFullScreen && (
        <div className="gauge-page-header">
          <h1>
            PART: <span className="accent">{partCode}</span>
          </h1>
        </div>
      )}

      {/* Main Content Area - Flex grow to fill space */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-6 py-6 md:py-8 overflow-auto">
        {/* Gauge Image with Zoom */}
        {imageError ? (
          <div className="flex flex-col items-center justify-center w-full max-w-3xl py-12">
            <div className="text-5xl md:text-6xl mb-4">⚠</div>
            <p className="text-2xl md:text-3xl text-gray-900 font-semibold mb-3">
              Image Not Available
            </p>
            <p className="text-lg md:text-xl text-gray-600 text-center">
              The gauge list image could not be loaded. Please try another part code.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <ZoomableImage
              src={gauge.image}
              alt={`Gauge list for part ${partCode}`}
              maxZoom={4}
            />
          </div>
        )}
      </div>

      {/* Description & Notes - Below image */}
      {!isFullScreen && (
        <div className="px-4 md:px-6 pb-6 md:pb-8">
          {/* Description - If provided */}
          {gauge.description && (
            <div className="mb-6 md:mb-8 max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {gauge.description}
              </p>
            </div>
          )}

          {/* Note/Instructions - Highlighted in yellow */}
          {gauge.note && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 md:p-6 rounded-lg max-w-3xl mx-auto">
              <p className="text-sm md:text-base font-bold text-amber-900 mb-2 flex items-center gap-2">
                ⚡ Important
              </p>
              <p className="text-base md:text-lg text-amber-800 leading-relaxed">
                {gauge.note}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
