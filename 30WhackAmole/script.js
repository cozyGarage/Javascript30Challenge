const gameContainer = document.querySelector('.game');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('.start-button');
const countdownElement = document.querySelector('.down-counter');
const gameResultElement = document.querySelector('.game-result');
let gameTime = 10000;
const minIntervalTime = 500;
const maxIntervalTime = 2000;
const minScoreToWin = 2;
let countdownInterval;

let lastHole;
let timeUp = false;
let score = 0;
let gameTimeout;

// Sound effects
const gameOverSound = new Audio('./assets/game-over.wav');

function giveRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function giveRandomHole(holes) {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    if (hole === lastHole) {
        // console.log("Ah, I've seen this before.");
        return giveRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = giveRandomTime(minIntervalTime, maxIntervalTime);
    const hole = giveRandomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame(e) {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    gameTime = 10000; // Reset gameTime value for each game
    clearUserMessage();
    peep();
    gameTimeout = setTimeout(() => {
        timeUp = true;
        clearTimeout(gameTimeout);
    }, gameTime);

    gameTime = Math.ceil(gameTime / 1000); // Convert milliseconds to seconds
    countdownElement.textContent = `${gameTime}sec`;
    countdownInterval = setInterval(updateCountdown, 1000);
}

function bonk(e) {
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

function updateCountdown() {
    gameTime -= 1;
    countdownElement.textContent = `${gameTime}sec`;
    if (gameTime <= 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = '10sec';
        showUserMessage(isWinner(score));
        gameOverSound.play(); // Play game over sound effect
    }
}

function isWinner(result) {
    if (result < minScoreToWin) return false;
    return true;
}

function showUserMessage(result = false) {
    gameResultElement.textContent = result
        ? "Congratulations, you're the champion!"
        : 'Better luck next time, keep trying!';
}

function clearUserMessage() {
    gameResultElement.textContent = '';
}

startButton.addEventListener('click', startGame);
// moles.forEach((mole) => mole.addEventListener('click', bonk));

// using event delegation by attaching a single click event listener to the game container
// this event listener is responsible for detecting clicks within the gameContainer
gameContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('mole')) {
        bonk.call(e.target, e);
    }
});
