const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOISE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_WIN = "WIN";
const RESULT_LOSE = "LOSE";

let gameIsRunning = false;

const getPlayerChoice = () => {
    const selection = prompt(
        `${ROCK}, ${PAPER}, or ${SCISSORS}?`,
        ""
    ).toUpperCase();
    if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
        alert("Invalid choice! We chose Rock for you!");
        return DEFAULT_USER_CHOISE;
    }
    return selection;
};

const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK;
    } else if (randomValue < 0.67) {
        return PAPER;
    } else {
        return SCISSORS;
    }
};

const getWinner = (cpuChoice, playerChoice = DEFAULT_USER_CHOISE) => {
    if (cpuChoice === playerChoice) {
        return RESULT_DRAW;
    } else if (
        (cpuChoice === ROCK && playerChoice === PAPER) ||
        (cpuChoice === SCISSORS && playerChoice === ROCK) ||
        (cpuChoice === PAPER && playerChoice === SCISSORS)
    ) {
        return RESULT_WIN;
    } else {
        return RESULT_LOSE;
    }
};

startGameBtn.addEventListener("click", () => {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log("Game is starting...");
    const computerChoice = getComputerChoice();
    const playerChoise = getPlayerChoice();
    let winner;
    if (playerChoise) {
        winner = getWinner(computerChoice, playerChoise);
    } else {
        winner = getWinner(computerChoice);
    }
    let message = `You picked ${
        playerChoise || DEFAULT_USER_CHOISE
    }, computer picked ${computerChoice}, therefore you `;
    if (winner === RESULT_DRAW) {
        message = message + "draw.";
    } else if (winner === RESULT_WIN) {
        message = message + "won.";
    } else {
        message = message + "lost.";
    }
    alert(message);
    gameIsRunning = false;
});

//Not related to the game. Dynamic parameter amount.

const sumUp = (callback, ...numbers) => {
    const validateNumber = () => {
        return isNaN(number) ? 0 : number;
    };
    let sum = 0;
    sum = a + b;
    for (const num of numbers) {
        sum += validateNumber(num);
    }
    callback(sum, "The result after adding all numbers is");
};

const showResult = (result, messageText) => {
    alert(messageText + " " + result);
};

const subtractUp = function (callback, ...numbers) {
    // arguments can be used to replace the rest feature
    let sum = 0;
    sum = a + b;
    for (const num of numbers) {
        sum += num;
    }
    callback(sum);
};

sumUp(showResult.bind(this), 1, 4, 5, 1, 6, 1, 61);
subtractUpUp(showResult, 1, 4, 5, 1, 6, 1, 61);
