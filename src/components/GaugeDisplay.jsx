import { useEffect, useState } from 'react';
import gaugesData from '../data/gauges.json';
import NotFound from './NotFound';
import Loading from './Loading';

/**
 * GaugeDisplay Component
 * 
 * Main component that:
 * 1. Reads the 'part' parameter from URL query string
 * 2. Looks up the part in gauges.json
 * 3. Displays the gauge image and metadata
 * 4. Handles loading and error states
 * 
 * Usage: mysite.com/?part=EA2
 */
export function GaugeDisplay() {
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Read URL parameter from query string
    const params = new URLSearchParams(window.location.search);
    const partCode = params.get('part');
    setPart(partCode);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  // Part not found or not provided
  if (!part || !gaugesData[part]) {
    return <NotFound partCode={part} />;
  }

  const gauge = gaugesData[part];

  return (
    <div className="flex flex-col h-screen w-full bg-white p-4 md:p-6">
      {/* Header: Part Number - Large and prominent */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
          PART: <span className="text-blue-600">{part}</span>
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center mb-6 md:mb-8">
        {/* Gauge Image */}
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
          <img
            src={gauge.image}
            alt={`Gauge list for part ${part}`}
            className="max-w-full max-h-96 md:max-h-full object-contain"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Description - If provided */}
      {gauge.description && (
        <div className="mb-4 md:mb-6">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {gauge.description}
          </p>
        </div>
      )}

      {/* Note/Instructions - Highlighted in yellow */}
      {gauge.note && (
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
      <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
        <p>Scan another QR code to view a different gauge list</p>
      </div>
    </div>
  );
}
