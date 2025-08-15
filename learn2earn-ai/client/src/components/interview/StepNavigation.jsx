export default function StepNavigation({
  step,
  totalSteps,
  disableNext,
  goBack,
  goNext,
}) {
  return (
    <div className="flex items-center justify-between mt-8">
      {/* Back */}
      <button
        onClick={goBack}
        disabled={step === 1}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
          step === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
        }`}
      >
        ← Back
      </button>

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const current = i + 1;
          return (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition ${
                current === step
                  ? "bg-indigo-600 scale-125"
                  : "bg-gray-300"
              }`}
            />
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={goNext}
        disabled={step === totalSteps || disableNext}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          step === totalSteps || disableNext
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        Next →
      </button>
    </div>
  );
}
