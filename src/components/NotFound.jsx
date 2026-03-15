import { useNavigate } from 'react-router-dom';

/**
 * NotFound Component
 * Displays when part number is not found in the database
 * Industrial UX: Large text, high contrast, error state
 */
export default function NotFound({ partCode }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-red-900 to-red-800 p-4 justify-center items-center">
      <div className="w-full max-w-2xl text-center">
        {/* Premium Fallback Design */}
        <div className="not-found-fallback">
          {/* Error Icon - SVG */}
          <svg 
            className="w-24 h-24 mx-auto mb-8 text-white opacity-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          {/* Error Heading */}
          <h1 className="text-5xl font-bold text-white mb-6">
            Part Not Found
          </h1>

          {/* Part Code Display */}
          {partCode && (
            <p className="text-3xl font-mono font-semibold text-red-200 mb-8 bg-red-950 bg-opacity-50 p-6 rounded-lg break-words border-l-4 border-yellow-400">
              {partCode}
            </p>
          )}

          {/* Error Message */}
          <p className="text-xl text-red-50 mb-4 leading-relaxed font-medium">
            We couldn't find this part in our database.
          </p>

          <p className="text-lg text-red-100 mb-12 leading-relaxed">
            Please check the QR code and try again or contact your supervisor.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 text-xl font-bold text-red-900 bg-yellow-400 rounded-lg hover:bg-yellow-300 active:bg-yellow-500 transition-colors duration-200"
            >
              Back to Scan
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 text-xl font-bold text-white bg-red-700 rounded-lg hover:bg-red-600 active:bg-red-800 transition-colors duration-200 border-2 border-red-500"
            >
              Clear & Retry
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-12 p-6 bg-red-950 bg-opacity-50 rounded-lg border border-red-700">
            <p className="text-sm text-red-100">
              If this problem persists, contact your supervisor or the maintenance team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
