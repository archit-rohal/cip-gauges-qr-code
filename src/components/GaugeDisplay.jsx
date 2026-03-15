import { useEffect, useState } from 'react';
import gaugesData from '../data/gauges.json';
import { useFullScreen } from '../context/FullScreenContext';
import { useRecentParts } from '../hooks/useRecentParts';
import NotFound from './NotFound';
import Loading from './Loading';
import { ZoomableImage } from './ZoomableImage';

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
    <div className={`flex flex-col h-screen w-full bg-white p-4 md:p-6 ${isFullScreen ? 'fullscreen-mode' : ''}`}>
      {/* Header: Part Number - Large and prominent */}
      {!isFullScreen && (
        <div className="mb-6 md:mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            PART: <span className="text-blue-600">{partCode}</span>
          </h1>
        </div>
      )}

      {/* Main Content Area with Zoomable Image */}
      <div className="flex-1 flex flex-col justify-center items-center mb-6 md:mb-8">
        {/* Gauge Image with Zoom */}
        {imageError ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-lg p-6">
            <div className="text-6xl mb-4">⚠</div>
            <p className="text-2xl text-gray-700 font-semibold mb-2">
              Image Not Available
            </p>
            <p className="text-lg text-gray-600">
              The gauge list image could not be loaded.
            </p>
          </div>
        ) : (
          <ZoomableImage
            src={gauge.image}
            alt={`Gauge list for part ${partCode}`}
            maxZoom={4}
          />
        )}
      </div>

      {/* Description - If provided */}
      {!isFullScreen && gauge.description && (
        <div className="mb-4 md:mb-6">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {gauge.description}
          </p>
        </div>
      )}

      {/* Note/Instructions - Highlighted in yellow */}
      {!isFullScreen && gauge.note && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 md:p-6 rounded">
          <p className="text-sm md:text-base font-bold text-yellow-900 mb-2">
            ⚡ Important:
          </p>
          <p className="text-base md:text-lg text-yellow-800 leading-relaxed">
            {gauge.note}
          </p>
        </div>
      )}

      {/* Footer Info - Minimal */}
      {!isFullScreen && (
        <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
          <p>Scan or enter another part code to view a different gauge list</p>
        </div>
      )}
    </div>
  );
}
