import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Full-Screen Context
 * 
 * Manages full-screen viewing mode for gauges
 * Hides UI elements (back button, hints, footer) for maximum image space
 */
const FullScreenContext = createContext();

export function FullScreenProvider({ children }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

  const enterFullScreen = useCallback(() => {
    setIsFullScreen(true);
  }, []);

  const exitFullScreen = useCallback(() => {
    setIsFullScreen(false);
  }, []);

  return (
    <FullScreenContext.Provider
      value={{
        isFullScreen,
        toggleFullScreen,
        enterFullScreen,
        exitFullScreen,
      }}
    >
      {children}
    </FullScreenContext.Provider>
  );
}

/**
 * Hook to use full-screen context
 */
export function useFullScreen() {
  const context = useContext(FullScreenContext);
  if (!context) {
    throw new Error('useFullScreen must be used within FullScreenProvider');
  }
  return context;
}
