import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for image zoom functionality
 * 
 * Features:
 * - Pinch-to-zoom on touch devices (iOS/Android)
 * - Scroll-to-zoom on desktop (mouse wheel)
 * - Programmatic zoom in/out buttons
 * - Smooth CSS transforms
 * - Bounds checking (min/max zoom)
 * - Touch-friendly with velocity
 */
export function useImageZoom(initialZoom = 1, minZoom = 1, maxZoom = 4) {
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  const touchDistanceRef = useRef(0);

  // Handle pinch-to-zoom on touch devices
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      touchDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
      
      setIsDragging(true);
    } else if (e.touches.length === 1 && zoom > 1) {
      // Single finger drag when zoomed in
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  }, [zoom, pan]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;

    if (e.touches.length === 2) {
      // Pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      
      if (touchDistanceRef.current > 0) {
        const scale = currentDistance / touchDistanceRef.current;
        const newZoom = Math.max(minZoom, Math.min(maxZoom, zoom * scale));
        setZoom(newZoom);
      }
      
      touchDistanceRef.current = currentDistance;
      e.preventDefault();
    } else if (e.touches.length === 1 && zoom > 1) {
      // Single finger drag
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
      e.preventDefault();
    }
  }, [isDragging, zoom, pan, dragStart, minZoom, maxZoom]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchDistanceRef.current = 0;
  }, []);

  // Handle mouse wheel zoom on desktop
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1; // Scroll down = zoom out, up = zoom in
    const newZoom = Math.max(minZoom, Math.min(maxZoom, zoom * delta));
    setZoom(newZoom);
  }, [zoom, minZoom, maxZoom]);

  // Programmatic zoom functions
  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(maxZoom, prev * 1.2));
  }, [maxZoom]);

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(minZoom, prev / 1.2));
  }, [minZoom]);

  const resetZoom = useCallback(() => {
    setZoom(initialZoom);
    setPan({ x: 0, y: 0 });
  }, [initialZoom]);

  return {
    zoom,
    pan,
    containerRef,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onWheel: handleWheel,
    },
    controls: {
      zoomIn,
      zoomOut,
      resetZoom,
    },
    state: {
      isDragging,
      canZoomIn: zoom < maxZoom,
      canZoomOut: zoom > minZoom,
    },
  };
}
