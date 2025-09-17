// components/interview/InterviewLearning.jsx
import { useEffect } from "react";
import useInterviewLearning from "../../hooks/useInterviewLearning";
import Step1Form from "./Step1Form";
import Step2RoundsSelection from "./Step2RoundsSelection";
import Step3LearningTabs from "./Step3LearningTabs";
import StepNavigation from "./StepNavigation";

export default function InterviewLearning({ setInterviewStep }) {
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
    generateRoundContent,
    goBack,
    goNext
  } = useInterviewLearning();

  // 🔹 Keep parent App step in sync for HeroSection
  useEffect(() => {
    if (setInterviewStep) {
      setInterviewStep(step);
    }
  }, [step, setInterviewStep]);

  return (
    <div className="py-8">
      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Step Content */}
      {step === 1 && (
        <>
          <Step1Form
            formData={formData}
            setFormData={setFormData}
            onSubmit={fetchInterviewRounds} // hook moves to Step 2 on success
            loading={loading}
          />
          <StepNavigation
            step={step}
            totalSteps={3}
            disableNext={loading}
            goBack={goBack}
            goNext={goNext}
          />
        </>
      )}

      {step === 2 && (
        <>
          <Step2RoundsSelection
            formData={formData}
            rounds={Array.isArray(rounds) ? rounds : []}
            selectedRounds={selectedRounds}
            setSelectedRounds={setSelectedRounds}
            onSubmit={generateRoundContent} // hook moves to Step 3 on success
            loading={loading}
          />
          <StepNavigation
            step={step}
            totalSteps={3}
            disableNext={loading || selectedRounds.length === 0}
            goBack={goBack}
            goNext={goNext}
          />
        </>
      )}

      {step === 3 && (
        <>
          <Step3LearningTabs learningContent={learningContent} />
          <StepNavigation
            step={step}
            totalSteps={3}
            goBack={goBack}
            goNext={goNext}
          />
        </>
      )}
    </div>
  );
}
