import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gaugesData from '../data/gauges.json';
import './Home.css';

/**
 * Home Component
 * 
 * Landing page for gauge identification:
 * - Scan QR codes or manually enter part codes
 * - Browse available parts
 * - Clean, premium entry point
 */
export function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

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
    <div className="home-page">
      {/* Hero Header */}
      <div className="home-hero">
        <h1 className="home-title">Gauge Identification</h1>
        <p className="home-subtitle">Fast reference for part inspection gauges</p>
      </div>

      {/* Main Content */}
      <div className="home-content">
        {/* Input Card */}
        <div className="home-input-card">
          <label htmlFor="part-input" className="input-label">Find a Part</label>
          
          <div className="input-wrapper">
            <input
              id="part-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter part code (e.g., EA2)"
              maxLength="5"
              autoComplete="off"
              aria-label="Part code input"
              className="part-input"
            />
            
            <button
              onClick={handleGoToPart}
              className="btn-primary search-btn"
              aria-label="View gauge details"
            >
              Search
            </button>
          </div>

          {inputError && (
            <div className="input-error" role="alert">
              <span className="error-icon">⚠</span>
              <span>{inputError}</span>
            </div>
          )}

          <p className="input-hint">Scan the QR code or enter part code manually</p>
        </div>

        {/* Parts Grid */}
        <div className="home-parts-section">
          <h2 className="parts-heading">All Parts</h2>
          <div className="parts-grid">
            {availableParts.map((partCode) => (
              <button
                key={partCode}
                onClick={() => handleQuickLink(partCode)}
                className="part-tile"
                aria-label={`View gauge list for part ${partCode}`}
              >
                <span className="part-code">{partCode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="home-instructions">
          <h3>Quick Guide</h3>
          <ol className="instructions-list">
            <li>
              <strong>Scan or Enter:</strong> Use QR code on cabinet or type part code
            </li>
            <li>
              <strong>View Gauges:</strong> See the complete gauge list for that part
            </li>
            <li>
              <strong>Zoom & Inspect:</strong> Pinch, scroll, or double-tap to zoom
            </li>
            <li>
              <strong>Full Screen:</strong> Toggle full-screen for maximum viewing space
            </li>
          </ol>
        </div>
      </div>

      {/* Footer Info */}
      <div className="home-footer">
        <p className="footer-text">{availableParts.length} parts available</p>
      </div>
    </div>
  );
}
