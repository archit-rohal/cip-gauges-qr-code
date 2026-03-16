import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { useGaugesData } from '../hooks/useGaugesData';
import Loading from '../components/Loading';
import './Home.css';

/**
 * Home Component
 * 
 * Landing page for gauge identification:
 * - Enter part codes manually with fuzzy auto-complete
 * - Browse available parts
 */
export function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  // Dynamically load part data
  const { data: gaugesData, loading, error } = useGaugesData();

  const availableParts = useMemo(() => {
    if (!gaugesData) return [];
    return Object.keys(gaugesData).map(code => ({
      code,
      description: gaugesData[code].description || ''
    }));
  }, [gaugesData]);

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(availableParts, {
      keys: ['code', 'description'],
      threshold: 0.4,
      distance: 100,
    });
  }, [availableParts]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
    setInputError('');

    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const results = fuse.search(value);
    setSuggestions(results.slice(0, 5).map(result => result.item));
    setShowSuggestions(true);
  };

  const handleGoToPart = (partCode = inputValue) => {
    const targetCode = typeof partCode === 'string' ? partCode : inputValue;

    if (!targetCode.trim()) {
      setInputError('Please enter a part code');
      return;
    }

    // Exact match check (if user bypasses suggestions)
    if (!gaugesData[targetCode]) {
      // If we only have suggestions, pick the best one automatically
      if (suggestions.length > 0) {
        navigate(`/part/${suggestions[0].code}`);
        return;
      }
      setInputError(`Part code "${targetCode}" not found`);
      return;
    }

    navigate(`/part/${targetCode}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGoToPart();
    }
  };

  const handleSuggestionClick = (partCode) => {
    setInputValue(partCode);
    setShowSuggestions(false);
    handleGoToPart(partCode);
  };

  const handleQuickLink = (partCode) => {
    navigate(`/part/${partCode}`);
  };

  if (loading) return <Loading />;
  if (error) return <div className="home-page"><div className="home-content"><p>Error loading parts list. Please refresh the page.</p></div></div>;

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
          
          <div className="input-wrapper" ref={suggestionRef}>
            <input
              id="part-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (inputValue) setShowSuggestions(true); }}
              placeholder="Enter part code (e.g., EA2)"
              maxLength="10"
              autoComplete="off"
              aria-label="Part code input"
              className="part-input"
            />
            
            <button
              onClick={() => handleGoToPart(inputValue)}
              className="btn-primary search-btn"
              aria-label="View gauge details"
            >
              Search
            </button>

            {/* Fuzzy Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((part) => (
                  <li 
                    key={part.code} 
                    onClick={() => handleSuggestionClick(part.code)}
                    className="suggestion-item"
                  >
                    <span className="suggestion-code">{part.code}</span>
                    {part.description && <span className="suggestion-desc">&nbsp;- {part.description.split(' ').slice(0, 3).join(' ')}...</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {inputError && (
            <div className="input-error" role="alert">
              <span className="error-icon">⚠</span>
              <span>{inputError}</span>
            </div>
          )}

          <p className="input-hint">Search for a part code with auto-complete</p>
        </div>

        {/* Parts Grid */}
        <div className="home-parts-section">
          <h2 className="parts-heading">All Parts</h2>
          <div className="parts-grid">
            {availableParts.map((part) => (
              <button
                key={part.code}
                onClick={() => handleQuickLink(part.code)}
                className="part-tile"
                aria-label={`View gauge list for part ${part.code}`}
              >
                <span className="part-code">{part.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="home-instructions">
          <h3>Quick Guide</h3>
          <ol className="instructions-list">
            <li>
              <strong>Search:</strong> Use fuzzy search to quickly find parts
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
        
        {/* Sync Indicator */}
        <div className="sync-indicator">
          <span>Data synced: {new Date().toLocaleDateString()}</span>
          <button 
            className="sync-btn"
            onClick={() => {
              // Clear cache and reload for latest data
              if ('caches' in window) {
                caches.keys().then((names) => {
                  names.forEach(name => caches.delete(name));
                });
              }
              window.location.reload();
            }}
            aria-label="Refresh app data to latest"
          >
            ↻ Refresh
          </button>
        </div>

        <p className="footer-credit">
          Created by <span className="creator-name">Archit Rohal</span>
        </p>
      </div>
    </div>
  );
}
