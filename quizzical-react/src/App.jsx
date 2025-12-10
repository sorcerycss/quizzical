// Requirements:
// -Two screens (start & questions)
// -Pull 5 questions from OTBD API: https://opentdb.com/api_config.php
// -Tally correct answers after "Check answers" is clicked
// -Styled & polished

// Hints:
// -Use a library to decode the HTML Entities (he or html-entities).

// -Create new array will all answers. Randomly insert the "correct_answer" into the
// array with the "incorrect_answers". Use Google/ChatGPT for help on how to shuffle
// items in an array at random or how to insert an item randomly into an array.

// -Limit answer choice to 1 and style selected answer: either (1) track the selected
// answer index inside each question object, OR (2) use an HTML form w/ radio inputs
// using the same "name" attribute to automatically only allow one selection (and check
// Google on how to style a radio input to look like a button).

import { useState, useEffect } from "react";
import "./App.css";

import Question from "./components/Question.jsx";

function App() {
  // Set the game state; main state of the game
  const [gameStart, setGameStart] = useState(false);

  const [questions, setQuestions] = useState([]);

  // Set "start quiz" button state to toggle visibility
  // const [showStartBtn, setShowStartBtn] = useState(true);

  // Start the game after user hits "Start quiz" button;
  // setGameStart state turns into "true"
  function startQuizzical() {
    setGameStart(true); // start the game -> sets to "true"
    // setShowStartBtn((prev) => !prev); // remove "start quiz" btn
  }

  // Render modal with questions;
  function renderQuestion() {}

  // Fetch API data
  // prevent re-rendering old components
  // and show new content after an API fetch:
  useEffect(() => {
    // Add a small delay before fetching
    const timer = setTimeout(() => {
      fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
      )
        .then((res) => res.json())
        .then((data) => {
          const processedQuestions = data;
        })
        .catch((err) => console.error(err));
    }, 1000); // Wait 1 second

    return () => clearTimeout(timer); // Cleanup
  }, [gameStart]);

  const questionElements = questions.map((question, index) => {
    <Question
      key={index}
      question={question.question}
      answers={question.answers}
    />;
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
          {/* {Main container with questions} */}
          <div className="questions-container">
            {/* {Question Element needs to go here:} */}
            {/* ******* */} <Question /> {/* ******* */}
            {/* {*** Question Element ************} */}
          </div>
          {/* {Main container with questions} */}
          {/* ******** Check answer button: ************/}
          {/*  */} <button>Check answers</button> {/*  */}
          {/* **************************************** */}
        </>
      )}
    </>
  );
}

export default App;
