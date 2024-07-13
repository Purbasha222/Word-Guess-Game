"use strict";
//Score and Highscore
let score1 = 0;

let score2 = 0;

let setWord; //for entering the word

let currentRound = 1; //for counting 5 rounds

let guessesLeft = 5;

const guessLeftField = document.querySelector(".guess-left");

const inputBox = document.querySelector(".word");

let guessBtn = document.querySelector(".guess");

let enterBtn = document.querySelector(".enter");

let resetBtn = document.querySelector(".reset");

let displayField = document.querySelector(".mystery");

let set = document.querySelector(".set");

let guessWord;

let displayWord;

const backgroundColor = function () {
  document.querySelector("body").style.backgroundColor = "#60b347";
};

//if the word is not correct
function ifNotCorrect() {
  currentRound++;
  if (currentRound < setWord.length && currentRound <= 5) {
    guessesLeft--;
    guessLeftField.textContent = guessesLeft;
    wordToBeDisplayed();
    updateDisplay();
  } else {
    endGame();
    guessLeftField.textContent = 0;
  }
}

// End the game and update score
function endGame() {
  score1 = 5 - (currentRound - 1);
  score2 = 5 - score1;
  document.querySelector(".label-score-1").textContent = score1;
  document.querySelector(".label-score-2").textContent = score2;
  guessBtn.disabled = true;

  if (score1 > score2) {
    set.textContent = "🥳 Player 1 wins!";
    displayField.textContent = setWord;
    backgroundColor();
  } else if (score2 > score1) {
    set.textContent = "🥳 Player 2 wins!";
    displayField.textContent = setWord;
    backgroundColor();
  } else {
    set.textContent = "💥 It's a tie!";
    displayField.textContent = setWord;
  }
}

//for the player who have to guess
guessBtn.addEventListener("click", function () {
  if (setWord) {
    guessWord = inputBox.value;
    if (guessWord === "") {
      set.textContent = "Cannot keep empty";
    } else if (guessWord === setWord) {
      displayField.textContent = setWord;
      score1 = 5 - (currentRound - 1);
      score2 = 5 - score1;
      document.querySelector(".label-score-1").textContent = score1;
      document.querySelector(".label-score-2").textContent = score2;
      backgroundColor();
      // set.textContent = "🎉 Congratulations you have guessed the word!";
      guessBtn.disabled = true;
      endGame();
    } else {
      set.textContent = "Try again!";
      ifNotCorrect();
    }
  }
});

//for the player who will set the word
enterBtn.addEventListener("click", function () {
  setWord = inputBox.value;
  inputBox.value = "";
  wordToBeDisplayed();
  updateDisplay();
  enterBtn.disabled = true;
  set.textContent = "Guess the mystery word!";
  if (setWord === "") {
    enterBtn.disabled = true;
    set.textContent = "Mystery Word cannot be empty!";
  }
});

//for displaying the secret word on the page
function wordToBeDisplayed() {
  displayWord = setWord
    .slice(0, currentRound)
    .padEnd(setWord.length, "_")
    .split("")
    .join(" ");
}

//after the player set the word it should update on the screen
function updateDisplay() {
  displayField.textContent = displayWord;
}

// Reset the game
function resetGame() {
  // score1 = 0;
  // score2 = 0;
  currentRound = 1;
  document.querySelector(".label-score-1").textContent = 0;
  document.querySelector(".label-score-2").textContent = 0;
  displayField.textContent = "?";
  guessesLeft = 5;
  guessLeftField.textContent = guessesLeft;
  set.textContent = "Set a new word!";
  inputBox.value = "";
  guessBtn.disabled = false;
  enterBtn.disabled = false;
  document.querySelector("body").style.backgroundColor = "#222";
}

// Optional: Add a reset button for convenience

resetBtn.addEventListener("click", function () {
  setWord = "";
  resetGame();
});
