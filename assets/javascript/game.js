
var wordChoices = [
    "zebra", 
    "elephant", 
    "rhinocerous",
    "lion",
    "leopard",
    "cheetah",
    "wildebeest",
    "zebra",
    "giraffe",
    "crocodile",
]

// maximum number of attempts. 'const' cannot be reassigned or redeclared.
const maxTries = 8;

// variable that stores each guessed letter
var guessedLetters = [];

// index of current word in array
var currentWordIndex;

// word being guessed
var guessingWord = [];

// players remaining guesses
var remainingGuesses = 0;

// game started
var gameStarted = false;

// game finished
var gameFinished = false;

// log of wins
var wins = 0;


//
function resetGame() {
    remainingGuesses = maxTries;

    gameStarted = false;

    currentWordIndex = Math.floor(Math.random()*(wordChoices.length));

    guessedLetters = [];

    guessingWord = [];

    for (var i = 0; i < wordChoices[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";

    document.getElementById("loser").style.cssText = "display: none";

    document.getElementById("winner").style.cssText = "display: none";


    updateDisplay();
};

function PlaySound(path) {
    var audioElement = document.createElement("audioPlay");
    audioElement.setAttribute("assets/audio/Africariff.mp3", path);
    audioElement.play();
  }
  

function updateDisplay() {

document.getElementById("totalWins").innerText = wins;

document.getElementById("currentWord").innerText = "";

for (var i = 0; i < guessingWord.length; i++) {
    document.getElementById("currentWord").innerText += guessingWord[i];
};
document.getElementById("remainingGuesses").innerText = remainingGuesses;

document.getElementById("guessedLetters").innerText = guessedLetters;

if (remainingGuesses <= 0) {
    document.getElementById("loser").style.cssText = "display: block";

    document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
    gameFinished = true;
}
}; 

document.onkeydown = function(event) {
    if(gameFinished) {
    resetGame();
    gameFinished = false;

} else {
    if(event.keyCode >= 65 && event.keyCode <= 90) {
        makeGuess(event.key.toLowerCase());
    }
}
};


function makeGuess(letter) {
    if(remainingGuesses > 0) {
        if(!gameStarted) {
            gameStarted = true;
        }
    
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        evaluateGuess(letter);
    }
}

updateDisplay();
checkWin();

};



function evaluateGuess(letter) {
var positions = [];

    for(var i = 0; i < wordChoices[currentWordIndex].length; i++) {
        if(wordChoices[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    }

    else{
        for (var i = 0; i < positions.length; i++){
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winner").style.cssText = "display: block";

        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";

        wins++;

        gameFinished = true;
    }
};



