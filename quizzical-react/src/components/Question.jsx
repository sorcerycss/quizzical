export default function Question(props) {
  const answerElements = props.answers.map((answer, index) => {
    let buttonClass = "";

    if (props.showResults) {
      // Check if this answer is correct
      const isCorrect = answer === props.correctAnswer;
      // Check if this answer was selected
      const isSelected = props.selectedAnswer === index;

      if (isCorrect) {
        buttonClass += "correct"; // Always highlight correct answer in green
      } else if (isSelected) {
        buttonClass += "incorrect"; // Highlight wrong selected answer in red
      }
    } else if (props.selectedAnswer === index) {
      buttonClass += "selected"; // Before checking, just show selection
    }

    return (
      <button
        key={index}
        className={buttonClass}
        onClick={() => props.selectAnswer(props.questionIndex, index)}
        disabled={props.showResults}
      >
        {answer}
      </button>
    );
  });

  return (
    <>
      <div className="question">
        <h2 className="question-text">{props.question}</h2>
        <div className="answers">{answerElements}</div>
      </div>
    </>
  );
}
