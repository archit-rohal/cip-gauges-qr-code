import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gaugesData from '../data/gauges.json';
import { useRecentParts } from '../hooks/useRecentParts';
import './Home.css';

/**
 * Home Component
 * 
 * Landing page allowing users to:
 * 1. Scan a QR code (which embeds the part code)
 * 2. Manually enter a part code
 * 3. Browse available parts
 * 4. Quick-access recently viewed parts
 * 
 * Mobile-first design optimized for factory use
 */
export function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const fileInputRef = useRef(null);
  const { recentParts, clearRecentParts } = useRecentParts();

  const availableParts = Object.keys(gaugesData);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
    setInputError('');
  };

  const handleGoToPart = () => {
    if (!inputValue.trim()) {
      setInputError('Please enter a part code');
      return;
    }

    if (!gaugesData[inputValue]) {
      setInputError(`Part code "${inputValue}" not found`);
      return;
    }

    navigate(`/part/${inputValue}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGoToPart();
    }
  };

  const handleQuickLink = (partCode) => {
    navigate(`/part/${partCode}`);
  };

  return (
    <div className="home-container min-h-screen w-full bg-white p-4 md:p-6">
      {/* Header */}
      <div className="home-header mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Gauge Identification
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Find the right inspection gauges for each part
        </p>
      </div>

      {/* Recent Parts Section */}
      {recentParts.length > 0 && (
        <div className="home-recent-parts mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              ⏱ Recently Viewed
            </h2>
            <button
              onClick={clearRecentParts}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
              title="Clear recent history"
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {recentParts.map((partCode) => (
              <button
                key={partCode}
                onClick={() => handleQuickLink(partCode)}
                className="px-4 py-3 text-center font-bold text-white bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transition-colors duration-200 text-lg shadow-md"
                aria-label={`View gauge list for part ${partCode}`}
              >
                {partCode}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Section */}
      <div className="home-input-section mb-8 md:mb-12 max-w-md mx-auto">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 md:p-8">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Enter Part Code:
          </label>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g., EA2"
              className="px-4 py-3 text-lg font-semibold text-gray-900 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 uppercase"
              maxLength="5"
              autoComplete="off"
              aria-label="Part code input"
            />

            {inputError && (
              <div className="text-sm text-red-600 font-medium">
                ⚠ {inputError}
              </div>
            )}

            <button
              onClick={handleGoToPart}
              className="w-full px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200"
              aria-label="Go to gauge details"
            >
              View Gauge List
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4">
            <p>
              💡 Scan QR code or type part code and press Enter
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="home-quick-links">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
          Available Parts
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {availableParts.map((partCode) => (
            <button
              key={partCode}
              onClick={() => handleQuickLink(partCode)}
              className="px-4 py-3 text-center font-bold text-blue-600 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 active:bg-blue-200 transition-colors duration-200 text-lg"
              aria-label={`View gauge list for part ${partCode}`}
            >
              {partCode}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="home-instructions mt-12 md:mt-16 max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          How to Use
        </h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base md:text-lg">
          <li>Scan the QR code on the gauge cabinet, or</li>
          <li>Type the part code (e.g., EA2) in the box above</li>
          <li>View the gauge list for that part</li>
          <li>Pinch or scroll to zoom in for better visibility</li>
          <li>Double-click to toggle zoom in/out</li>
          <li>Click full-screen icon for maximum image space</li>
          <li>Return all gauges to the cabinet after inspection</li>
        </ol>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-8 pt-6 border-t border-gray-200">
        <p>
          Industrial Gauge Identification System — {availableParts.length} parts available
        </p>
      </div>
    </div>
  );
}
