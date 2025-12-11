// Requirements:
// -Two screens (start & questions) - DONE
// -Pull 5 questions from OTBD API: https://opentdb.com/api_config.php -DONE
// -Tally correct answers after "Check answers" is clicked - DONE
// -Styled & polished - WIP

// Hints:
// -Use a library to decode the HTML Entities (he or html-entities).

// -Create new array will all answers. Randomly insert the "correct_answer" into the
// array with the "incorrect_answers". Use Google/ChatGPT for help on how to shuffle
// items in an array at random or how to insert an item randomly into an array.

// -Limit answer choice to 1 and style selected answer: either (1) track the selected
// answer index inside each question object, OR (2) use an HTML form w/ radio inputs
// using the same "name" attribute to automatically only allow one selection (and check
// Google on how to style a radio input to look like a button).

// Combining correct + incorrect answers into one array - DONE
// Rendering answer buttons - DONE
// Tracking selected answers - DONE
// We have an array of 5 questions. When the user clicks an answer on question #2,
// we need to update ONLY that question's selectedAnswer property.
// 1. Handle clicks on answer buttons
// 2. Track which answer the user selected for each question
// 3. Style the selected button differently
// Checking answers - DONE
// 1. Compare each selected answer with the correct answer
// 2. Count how many the user got right
// 3. Show the score

// TO DO:
// Add a loading state while fetching questions
// Use a library to decode the HTML Entities (he or html-entities)
// Style & polish
// Work on a11y
// Add "Play again" button - DONE
// Hide check answers button after first click - DONE

import { useState, useEffect } from "react";
import "./App.css";

import Question from "./components/Question.jsx";

function App() {
  const [gameStart, setGameStart] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const [score, setScore] = useState(0);

  // Start the game after user hits "Start quiz" button;
  function startQuizzical() {
    setGameStart(true); // start the game -> sets to "true"
  }

  // Fetch API data
  // prevent re-rendering old components
  // and show new content after an API fetch:
  useEffect(() => {
    if (gameStart) {
      // Only fetch when game starts
      fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      )
        .then((res) => res.json())
        .then((data) => {
          const processedQuestions = data.results.map((question) => {
            // Combine all answers into one array
            const allAnswers = [
              ...question.incorrect_answers,
              question.correct_answer,
            ];

            // Custom sort with a function (rearranges items):
            const shuffled = allAnswers.sort(() => Math.random() - 0.5);

            return {
              ...question,
              allAnswers: shuffled,
              selectedAnswer: null, // Track user's choice
            };
          });

          console.log("API Response:", data);
          console.log("Questions array:", data.results);
          console.log("First question:", data.results[0]);
          console.log("Processed:", processedQuestions[0]);

          setQuestions(processedQuestions);
        })
        .catch((err) => console.error(err));
    }
  }, [gameStart]);

  function selectAnswer(questionIndex, answerIndex) {
    // questionIndex = which question (0-4)
    // answerIndex = which answer button they clicked (0-3)
    console.log(`Question ${questionIndex}, Answer ${answerIndex} selected`);
    setQuestions((prevQuestions) => {
      // prevQuestions = the current array of all 5 questions
      return prevQuestions.map((question, index) => {
        // Loop through each question
        if (index === questionIndex) {
          // Is this the question they clicked on?
          return {
            ...question,
            selectedAnswer: answerIndex,
            // YES: Copy the question and update selectedAnswer
          };
        }
        return question;
        // NO: Return the question unchanged
      });
    });
  }

  function checkAnswer() {
    let scoreCount = 0;

    questions.forEach((question) => {
      // Get the text of the selected answer
      const selectedAnswerText = question.allAnswers[question.selectedAnswer];
      // Compare it to the correct answer
      if (selectedAnswerText === question.correct_answer) {
        scoreCount++;
      }
    });
    setScore(scoreCount);
    setShowResults(true);
  }

  function resetGame() {
    setGameStart(false);
    setShowResults(false);
    setScore(0);
    setQuestions([]);
  }

  const questionElements = questions.map((question, index) => {
    return (
      <Question
        key={index}
        questionIndex={index}
        question={question.question}
        answers={question.allAnswers}
        correctAnswer={question.correct_answer}
        selectedAnswer={question.selectedAnswer}
        selectAnswer={selectAnswer}
        showResults={showResults}
      />
    );
  });

  return (
    <>
      {!gameStart && (
        <div className="game-start">
          <h1>Quizzical</h1>
          <button onClick={startQuizzical}>Start quiz</button>
        </div>
      )}

      {gameStart && (
        <>
          <div className="questions-container">{questionElements}</div>

          {!showResults && <button onClick={checkAnswer}>Check answers</button>}
          {showResults && (
            <>
              <p className="score">
                You scored {score}/{questions.length} correct answers
              </p>
              <button onClick={resetGame}>Play again</button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
