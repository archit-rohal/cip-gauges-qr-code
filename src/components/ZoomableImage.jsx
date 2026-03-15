import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ZoomableImage.css';

/**
 * ZoomableImage Component
 * 
 * Simple, smooth image zoom with:
 * - Pinch-to-zoom on mobile
 * - Mouse wheel zoom on desktop
 * - Drag to pan when zoomed in
 * - Double-click to toggle zoom in/out (toggle behavior)
 * 
 * Uses react-zoom-pan-pinch library for smooth, reliable interactions
 * 
 * Props:
 *   - src: Image source URL
 *   - alt: Alt text for accessibility
 */
export function ZoomableImage({ src, alt }) {
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const handleDoubleClick = (utils) => {
    if (isZoomedIn) {
      // Reset to default view (1x zoom, centered)
      utils.resetTransform();
      setIsZoomedIn(false);
    } else {
      // Zoom to 2.5x (good for inspecting gauge details)
      utils.setTransform(0, 0, 2.5, 200);
      setIsZoomedIn(true);
    }
  };

  return (
    <div className="zoomable-image-container">
      {/* Zoom hint for first-time users */}
      <div className="zoom-hint">
        <p className="text-xs text-gray-500">
          💡 Pinch to zoom • Drag to pan • Double-click to zoom in/out
        </p>
      </div>

      {/* Zoom wrapper with smooth animations */}
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={4}
        wheel={{
          step: 0.1,
          smoothStep: 0.02,
          wheelDisabled: false,
        }}
        pinch={{
          disabled: false,
        }}
        doubleClick={{
          disabled: true, // We handle double-click ourselves for toggle behavior
        }}
        panning={{
          disabled: false,
          velocityDisabled: false,
        }}
        alignmentAnimation={{
          sizeWidth: 100,
          sizeHeight: 100,
          animationTime: 200,
          animationType: 'easeOut',
        }}
      >
        {(utils) => (
          <TransformComponent
            wrapperClass="zoom-wrapper"
            contentClass="zoom-content"
          >
            <img
              src={src}
              alt={alt}
              className="zoom-image"
              draggable={false}
              loading="lazy"
              onDoubleClick={() => handleDoubleClick(utils)}
            />
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
}
