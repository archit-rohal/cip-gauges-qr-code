import { GaugeDisplay } from './components/GaugeDisplay'
import './App.css'

/**
 * App Component
 * 
 * Main application wrapper for the Gauge Identification System
 * Renders the gauge display component in a full-screen layout
 * optimized for factory mobile environment
 */
function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <GaugeDisplay />
    </div>
  )
}

export default App
