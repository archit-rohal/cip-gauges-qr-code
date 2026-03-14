/**
 * Loading Component
 * Displays loading skeleton while data is being fetched
 * Used for industrial environment with high contrast
 */
export default function Loading() {
  return (
    <div className="flex flex-col h-screen w-full bg-white p-4 justify-center items-center">
      {/* Loading Spinner */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        <p className="text-2xl text-gray-700 font-semibold">Loading...</p>
      </div>
    </div>
  );
}
