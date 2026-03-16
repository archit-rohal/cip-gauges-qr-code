import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useFullScreen } from '../context/FullScreenContext';
import './ZoomableImage.css';

/**
 * ZoomableImage Component
 * 
 * Simple, smooth image zoom with:
 * - Pinch-to-zoom on mobile
 * - Mouse wheel zoom on desktop
 * - Drag to pan when zoomed in
 * - Double-click to zoom in/out
 * 
 * Uses react-zoom-pan-pinch library for smooth, reliable interactions
 * 
 * Props:
 *   - src: Image source URL
 *   - alt: Alt text for accessibility
 */
export function ZoomableImage({ src, alt, onError }) {
  const { isFullScreen, toggleFullScreen } = useFullScreen();

  return (
    <div className="zoomable-image-container">
      {/* Zoom hint for first-time users */}
      <div className="zoom-hint">
        <p className="text-xs text-gray-500">
          💡 Tap image to expand • Pinch to zoom • Drag to pan
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
          disabled: false,
          step: 1.5,
          animation: { animationTime: 200 },
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
            onError={onError}
            onClick={() => {
              if (!isFullScreen) toggleFullScreen();
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
