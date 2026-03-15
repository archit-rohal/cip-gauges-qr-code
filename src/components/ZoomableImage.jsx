import { useImageZoom } from '../hooks/useImageZoom';
import './ZoomableImage.css';

/**
 * ZoomableImage Component
 * 
 * Renders an image with pinch-to-zoom and scroll-to-zoom capabilities
 * Includes manual zoom buttons for accessibility
 * 
 * Props:
 *   - src: Image source URL
 *   - alt: Alt text for accessibility
 *   - maxZoom: Maximum zoom level (default: 4)
 */
export function ZoomableImage({ src, alt, maxZoom = 4 }) {
  const {
    zoom,
    pan,
    containerRef,
    handlers,
    controls,
    state,
  } = useImageZoom(1, 1, maxZoom);

  return (
    <div className="zoomable-image-container" ref={containerRef}>
      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button
          className="zoom-btn zoom-btn--minus"
          onClick={controls.zoomOut}
          disabled={!state.canZoomOut}
          aria-label="Zoom out"
          title="Scroll wheel or pinch to zoom"
        >
          −
        </button>

        <span className="zoom-level">
          {Math.round(zoom * 100)}%
        </span>

        <button
          className="zoom-btn zoom-btn--plus"
          onClick={controls.zoomIn}
          disabled={!state.canZoomIn}
          aria-label="Zoom in"
          title="Scroll wheel or pinch to zoom"
        >
          +
        </button>

        {zoom !== 1 && (
          <button
            className="zoom-btn zoom-btn--reset"
            onClick={controls.resetZoom}
            aria-label="Reset zoom"
            title="Reset to original size"
          >
            ↺
          </button>
        )}
      </div>

      {/* Image Viewport */}
      <div
        className="zoom-viewport"
        onWheel={handlers.onWheel}
        onTouchStart={handlers.onTouchStart}
        onTouchMove={handlers.onTouchMove}
        onTouchEnd={handlers.onTouchEnd}
      >
        <div
          className="zoom-content"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center',
            cursor: zoom > 1 ? (state.isDragging ? 'grabbing' : 'grab') : 'default',
          }}
        >
          <img
            src={src}
            alt={alt}
            className="zoom-image"
            draggable={false}
            loading="lazy"
          />
        </div>
      </div>

      {/* Zoom instructions for first-time users */}
      {zoom === 1 && (
        <div className="zoom-hint">
          <p className="text-xs text-gray-500">
            💡 Pinch or scroll to zoom in
          </p>
        </div>
      )}
    </div>
  );
}
