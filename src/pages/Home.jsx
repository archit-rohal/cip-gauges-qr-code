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
    <div className="home-container min-h-screen w-full bg-white">
      {/* Header */}
      <div className="home-header">
        <h1>Gauge Identification</h1>
        <p>Find the right inspection gauges for each part</p>
      </div>

      {/* Recent Parts Section */}
      {recentParts.length > 0 && (
        <div className="home-recent-parts">
          <div className="header-row">
            <h2>⏱ Recently Viewed</h2>
            <button
              onClick={clearRecentParts}
              className="clear-btn"
              title="Clear recent history"
              aria-label="Clear recent parts history"
            >
              Clear
            </button>
          </div>

          <div className="recent-grid">
            {recentParts.map((partCode) => (
              <button
                key={partCode}
                onClick={() => handleQuickLink(partCode)}
                className="recent-button"
                aria-label={`View gauge list for part ${partCode}`}
              >
                {partCode}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Section */}
      <div className="home-input-section">
        <div className="input-box">
          <label className="input-label">Enter Part Code:</label>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g., EA2"
              maxLength="5"
              autoComplete="off"
              aria-label="Part code input"
            />

            {inputError && (
              <div className="input-error">
                ⚠ {inputError}
              </div>
            )}

            <button
              onClick={handleGoToPart}
              className="go-button"
              aria-label="View gauge details"
            >
              View Gauge List
            </button>
          </div>

          <div className="input-hint">
            💡 Scan QR code or type part code and press Enter
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="home-quick-links">
        <h2>Available Parts</h2>

        <div className="grid-container">
          {availableParts.map((partCode) => (
            <button
              key={partCode}
              onClick={() => handleQuickLink(partCode)}
              className="part-button"
              aria-label={`View gauge list for part ${partCode}`}
            >
              {partCode}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="home-instructions">
        <h3>How to Use</h3>
        <ol>
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
      <div className="home-footer">
        <p>
          Industrial Gauge Identification System — {availableParts.length} parts available
        </p>
      </div>
    </div>
  );
}
