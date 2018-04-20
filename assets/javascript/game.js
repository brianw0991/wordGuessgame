
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
    "crocodile"
]

// maximum number of attempts. 'const' cannot be reassigned or redeclared.
const maxTries = 8

// variable that stores each guessed letter
var guessedLetters = []

// index of current word in array
var currentWordIndex;

// word being guessed
var guessingWord = []

// players remaining guesses
var remainingGuesses = 0

// game started
var gameStarted = false

// game finished
var gameFinished = false

// log of wins
var wins = 0


//
function resetGame() {
    remainingGuesses = maxTries

    gameStarted = false

    currentWordIndex = Math.floor(Math.random()*(wordChoices.length));

    guessedLetters = []

    guessingWord = []

    for (var i = 0; i < wordChoices[currentWordIndex].length; i++) {
        guessingWord = push("_");
    }

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";

    document.getElementById("loser").style.cssText = "display: none";

    document.getElementById("winner").style.cssText = "display: none";


    updateGame()
};

function updateDisplay() {

document.getElementById("totalWins").innerHTML = wins;

document.getElementById("currentWord").innerHTML = "";

for (var i = 0; i < wordChoices.length; i++) {
    document.getElementById("currentWord").innerText = guessingWord[i];
};
document.getElementById("remainingGuesses").innerText = remainingGuesses;

document.getElementById("guessedLetters").innerText = guessedLetters;

if (remainingGuesses <= 0) {
    document.getElementById("loser").style.cssText = "display: block";

    document.getElementById("pressKeyTryAgain").style.css = "display: block";
    hasFinished = true;
}

document.onkeyup = function(event) {
    if(hasFinished) {
    resetGame();
    hasFinished = false;}

 else {
    if(event.keycode >= 65 && event.keyCode <= 90) {
        makeGuess(event.key.toLowerCase());
    }
}
};


function makeGuess(letter) {
    if(remainingGuesses > 0) {
        if(!gameStarted) {
            gameStarted=true;
        }
    
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        evaluatedGuess(letter);
    }
}
};

updateDisplay();
checkWin();

function evaluateGuess(letter) {
    var positions = []

    for(var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
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
}

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winner").style.cssText = "display.block";

        document.getElementById("pressKeyTryAgain").style.cssText = "display.block";

        wins++;

        hasFinished = true;
    }
}
}


