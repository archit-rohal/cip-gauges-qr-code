/**
 * NotFound Component
 * Displays when part number is not found in the database
 * Industrial UX: Large text, high contrast, error state
 */
export default function NotFound({ partCode }) {
  return (
    <div className="flex flex-col h-screen w-full bg-red-50 p-4 justify-center items-center">
      <div className="w-full max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-red-900 mb-4">⚠</div>
        </div>

        {/* Error Heading */}
        <h1 className="text-5xl font-bold text-red-900 mb-6">
          Part Not Found
        </h1>

        {/* Part Code Display */}
        {partCode && (
          <p className="text-3xl font-semibold text-red-700 mb-8 bg-red-100 p-6 rounded-lg break-words">
            {partCode}
          </p>
        )}

        {/* Error Message */}
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          We couldn't find this part in our database.
        </p>

        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          Please check that the QR code is correct and try scanning again.
        </p>

        {/* Action Button */}
        <a
          href={window.location.origin + window.location.pathname}
          className="inline-block px-8 py-4 bg-blue-600 text-white text-2xl font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Scan Again
        </a>

        {/* Support Info */}
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            If this problem persists, contact your supervisor or the maintenance team.
          </p>
        </div>
      </div>
    </div>
  );
}
