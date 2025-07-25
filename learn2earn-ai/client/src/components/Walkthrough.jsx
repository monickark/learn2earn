import Joyride from 'react-joyride';

export default function Walkthrough({ showTour }) {
  const steps = [
    {
      target: '.topic-input',
      content: 'Start by entering a topic you want to learn.',
    },
    {
      target: '.level-input',
      content: 'Choose your learning level here — Beginner, Intermediate, or Expert.',
    },
    {
      target: '.generate-btn',
      content: 'Click here to generate your personalized learning content.',
    },
    {
      target: '.content-display',
      content: 'Here you’ll see the lessons, quizzes, and flashcards.',
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={showTour}
      showSkipButton
      continuous
      scrollToFirstStep
      styles={{ options: { zIndex: 9999 } }}
    />
  );
}
