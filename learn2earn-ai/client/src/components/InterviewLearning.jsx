import useInterviewLearning from "../hooks/useInterviewLearning";
import InterviewLearningForm from "./InterviewLearningForm";
import InterviewRoundsSelection from "./InterviewRoundsSelection";
import InterviewLearningTabs from "./InterviewLearningTabs";

export default function InterviewLearning() {
  const {
    step,
    formData,
    setFormData,
    rounds,
    selectedRounds,
    setSelectedRounds,
    learningContent,
    loading,
    error,
    fetchInterviewRounds,
    fetchLearningContent,
  } = useInterviewLearning();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && <p className="text-red-600">{error}</p>}
      {step === 1 && (
        <InterviewLearningForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={fetchInterviewRounds}
          loading={loading}
        />
      )}
      {step === 2 && (
        <InterviewRoundsSelection
          rounds={rounds}
          selectedRounds={selectedRounds}
          setSelectedRounds={setSelectedRounds}
          onSubmit={fetchLearningContent}
          loading={loading}
        />
      )}
      {step === 3 && <InterviewLearningTabs learningContent={learningContent} />}
    </div>
  );
}
