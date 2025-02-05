import React, { useState } from "react";
import "./App.css";

const targetWord = "REACT"; // Set the correct word for this example (can be randomized)
const maxAttempts = 6;
function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("PLAYING"); // Can be "WON", "LOST", or "PLAYING"

  const handleInputChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentGuess.length !== 5) {
      alert("Guess must be a 5-letter word!");
      return;
    }

    if (!/^[A-Z]+$/.test(currentGuess)) {
      alert("Please enter valid alphabetic characters!");
      return;
    }

    const updatedGuesses = [...guesses, currentGuess];
    setGuesses(updatedGuesses);

    if (currentGuess === targetWord) {
      setGameStatus("WON");
    } else if (updatedGuesses.length >= maxAttempts) {
      setGameStatus("LOST");
    }

    setCurrentGuess("");
  };

  const getLetterColor = (letter, index) => {
    if (targetWord[index] === letter) return "green";
    if (targetWord.includes(letter)) return "yellow";
    return "gray";
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wordle Clone</h1>
         
        {gameStatus === "WON" ? (
          <p className="success">Congratulations! You guessed the word!</p>
        ) : gameStatus === "LOST" ? (
          <p className="error">Game Over! The word was {targetWord}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              maxLength="5"
              value={currentGuess}
              onChange={handleInputChange}
              placeholder="Enter 5-letter word"
              disabled={gameStatus !== "PLAYING"}
            />
            <button type="submit" disabled={gameStatus !== "PLAYING"}>
              Submit Guess
            </button>
          </form>
        )}

        <div className="guesses">
          {guesses.map((guess, guessIndex) => (
            <div key={guessIndex} className="guess-row">
              {guess.split("").map((letter, index) => (
                <span
                  key={index}
                  className="guess-letter"
                  style={{
                    backgroundColor: getLetterColor(letter, index),
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          ))}
        </div>

        </header>
        </div>
  );
}

export default App;







