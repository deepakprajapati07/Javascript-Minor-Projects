// Team Objects
let teamA = {
    name: "",
    toss: false,
    batting: false,
    score: 0,
    wicket: 0,
    overCount: 0
};

let teamB = {
    name: "",
    toss: false,
    batting: false,
    score: 0,
    wicket: 0,
    overCount: 0
};

// Global Variables
let TOTAL_OVER;
let TOTAL_WICKET;
const BALLS_PER_OVER = 6;
let wideBallRun;
let noBallRun;

let winner;
let currentOver = [];
let previousOvers = [];
let innings = 0;
let ballCount = 0;
let tossResult;
let battingTeam;
let bowlingTeam;
let activeTeam;
let targetRunValue;
let runLeftValue;

// HTML Elements Access
let playBtn = document.querySelector("#playBtn");
let inningsSpan = document.querySelector("#innings");
let tossContainer = document.querySelector(".tossContainer");
let optionContainer = document.querySelector(".optionContainer");
let inningsContainer = document.querySelector(".inningsContainer");
let teamABtn = document.querySelector("#teamABtn");
let teamBBtn = document.querySelector("#teamBBtn");
let gameOver = document.querySelector("#gameOver");
let restart = document.querySelector("#restart");
let targetRun = document.querySelector("#targetRun");
let runLeftContainer = document.querySelector(".runLeft");
let runLeft = document.querySelector("#runLeft");
let remainingRunContainer = document.querySelector("#remainingRunContainer");
let ballRemaining = document.querySelector("#ballRemaining");

// Scoreboard Display Elements
let TotalScore = document.querySelector("#score");
let TotalWicket = document.querySelector("#wicket");
let TotalOver = document.querySelector("#overCount");
let currOverCount = document.querySelector("#currOverSummary");
let prevOverCount = document.querySelector("#allOverSummary");

// Score Buttons
const btn_0 = document.querySelector("#btn_0");
const btn_1 = document.querySelector("#btn_1");
const btn_2 = document.querySelector("#btn_2");
const btn_3 = document.querySelector("#btn_3");
const btn_4 = document.querySelector("#btn_4");
const btn_5 = document.querySelector("#btn_5");
const btn_6 = document.querySelector("#btn_6");
const wideBtn = document.querySelector("#wd");
const noBallBtn = document.querySelector("#nb");
const wicketBtn = document.querySelector("#wkt");
const extra = document.querySelector("#extra");
const extraBtn = document.querySelector("#extraBtn");
const nextInnings = document.querySelector("#nextInnings");

// Array of all the score buttons
const buttons = [btn_0, btn_1, btn_2, btn_3, btn_4, btn_5, btn_6];
let isEventListenersAdded = false;

// Disable property of the score buttons
const gameOverBtns = () => {
    buttons.forEach((button) => {
        button.disabled = true;
    });
    wideBtn.disabled = true;
    noBallBtn.disabled = true;
    wicketBtn.disabled = true;
    extraBtn.disabled = true;
};

// Enable property of the score buttons
const reverseBtns = () => {
    buttons.forEach((button) => {
        button.disabled = false;
    });
    wideBtn.disabled = false;
    noBallBtn.disabled = false;
    wicketBtn.disabled = false;
    extraBtn.disabled = false;
};

// check if the game is over or not after each ball is bowled during the 2nd innings
const checkWinner = () => {
    if (innings > 1) {
        if (runLeftValue <= 0) {
            gameOverBtns();
            remainingRunContainer.innerText = `${activeTeam.name} won the match by ${TOTAL_WICKET - activeTeam.wicket} wickets and ${((TOTAL_OVER * 6) - ((Math.floor(activeTeam.overCount) * 6) + ballCount + 1))} balls remaining`;
            gameOver.style.display = "block";
            gameOver.innerText = `Congratulations ${activeTeam.name}!`;
            restart.style.display = "block";
        } else if (activeTeam.wicket === TOTAL_WICKET) {
            gameOverBtns();
            remainingRunContainer.innerText = `${bowlingTeam.name} won the match by ${runLeftValue - 1} runs`;
            gameOver.style.display = "block";
            gameOver.innerText = `Congratulations ${bowlingTeam.name}!`;
            restart.style.display = "block";
        } else if (activeTeam.overCount === TOTAL_OVER) {
            gameOverBtns();
            remainingRunContainer.innerText = `${bowlingTeam.name} won the match by ${runLeftValue - 1} runs`;
            gameOver.style.display = "block";
            gameOver.innerText = `Congratulations ${bowlingTeam.name}!`;
            restart.style.display = "block";
        } else if (activeTeam.score === bowlingTeam.score && activeTeam.overCount === TOTAL_OVER) {
            gameOverBtns();
            remainingRunContainer.innerText = `Match Draw!`;
            gameOver.style.display = "block";
            gameOver.innerText = `Match Draw!`;
            restart.style.display = "block";
        }
        nextInnings.style.display = "none";
    }
};

// Update current over and total over count
const updateCurrOver = (team, value) => {
    if (value[1] === "Ex") {
        currentOver.push(value[1] + value[0]);
    } else {
        currentOver.push(value[0]);
    }
    currOverCount.innerText = currentOver.join(' ');

    if (value[0] !== "Wd" && value[0] !== "Nb" && value[1] !== "Ex") {
        ballCount++;
    }

    if (ballCount === BALLS_PER_OVER) {
        const currentOverSummary = currentOver.join(' ');
        previousOvers.push(currentOverSummary);
        previousOvers = previousOvers.slice(-5);
        const overSummary = previousOvers.join(' | ');
        prevOverCount.innerText = overSummary;

        team.overCount += 1;
        currentOver = [];
        ballCount = 0;
    }
    team.overCount = Math.floor(team.overCount) + ballCount / 10;
    TotalOver.innerText = team.overCount.toFixed(1);

    if (innings === 2) {
        ballRemaining.innerText =((TOTAL_OVER * 6) - ((Math.floor(team.overCount) * 6) + ballCount));
    }

    if (innings === 1 && team.overCount === TOTAL_OVER) {
        nextInnings.style.display = "block";
    }

    if (innings === 2 && team.overCount === TOTAL_OVER) {
        checkWinner();
    }
    else if (innings === 1 && team.overCount === TOTAL_OVER){
        alert("Overs Completed!");
        gameOverBtns();
    }
};

// Update runs left to win the match
const updateRunLeft = (team) => {
    runLeftValue = targetRunValue - team.score;
    runLeft.innerText = runLeftValue;
    checkWinner();
};

// Update Score
const updateScore = (team, value) => {
    team.score += value;
    TotalScore.innerText = team.score;

    if (innings === 2) {
        updateRunLeft(team);
    }
};

// Update Wicket
const updateWicket = (team) => {
    team.wicket += 1;
    TotalWicket.innerText = team.wicket;

    if (innings == 1 && team.wicket === TOTAL_WICKET) {
        nextInnings.style.display = "block";
    }

    if (innings === 2 && team.wicket === TOTAL_WICKET) {
        checkWinner();
    }
    else if (innings === 1 && team.wicket === TOTAL_WICKET){
        alert("All Out!");
        gameOverBtns();
    }
};

const updateWide = (team) => {
    if (wideBallRun === 1) {
        updateScore(team, 1);
    } else {
        updateScore(team, 0);
    }
};

const updateNoBall = (team) => {
    if (noBallRun === 1) {
        updateScore(team, 1);
    } else {
        team.score += 0;
        updateScore(team, 0);
    }
};

// Helper function to add or remove event listeners
const handleEventListeners = (team, action) => {
    // Clear existing event listeners
    removeAllEventListeners();

    buttons.forEach((button) => {
        button[action]("click", buttonClickHandler);
    });

    wideBtn[action]("click", wideBtnClickHandler);
    noBallBtn[action]("click", noBallBtnClickHandler);
    wicketBtn[action]("click", wicketBtnClickHandler);
    extraBtn[action]("click", extraBtnClickHandler);
};

// Function to remove all event listeners
const removeAllEventListeners = () => {
    buttons.forEach((button) => {
        button.removeEventListener("click", buttonClickHandler);
    });
    wideBtn.removeEventListener("click", wideBtnClickHandler);
    noBallBtn.removeEventListener("click", noBallBtnClickHandler);
    wicketBtn.removeEventListener("click", wicketBtnClickHandler);
    extraBtn.removeEventListener("click", extraBtnClickHandler);
};

// Event handlers
const buttonClickHandler = () => {
    // Add listeners only for the active batting team
    if (activeTeam.batting) {
        updateScore(activeTeam, Number(event.target.value));
        updateCurrOver(activeTeam, [Number(event.target.value)]);
    }
};

const wideBtnClickHandler = () => {
    if (activeTeam.batting) {
        updateWide(activeTeam);
        updateCurrOver(activeTeam, [wideBtn.value]);
    }
};

const noBallBtnClickHandler = () => {
    if (activeTeam.batting) {
        updateNoBall(activeTeam);
        updateCurrOver(activeTeam, [noBallBtn.value]);
    }
};

const wicketBtnClickHandler = () => {
    if (activeTeam.batting) {
        updateWicket(activeTeam);
        updateCurrOver(activeTeam, [wicketBtn.value]);
    }
};

const extraBtnClickHandler = () => {
    if (activeTeam.batting && extra.value !== "" && !isNaN(extra.value)) {
        updateScore(activeTeam, Number(extra.value));
        updateCurrOver(activeTeam, [Number(extra.value), extra.name]);
        extra.value = "";
    } else {
        alert("Enter valid number");
        extra.value = "";
    }
};

// Game Controls
const gameControls = (team) => {
    let [playingTeamBtn, otherTeamBtn] = team == teamA ? [teamABtn, teamBBtn] : [teamBBtn, teamABtn];
    playingTeamBtn.style.backgroundColor = "red";
    otherTeamBtn.style.backgroundColor = "#58BC82";

    // Check if event listeners are not already added
    if (!isEventListenersAdded) {
        handleEventListeners(team, "addEventListener");
        isEventListenersAdded = true; // Set the flag to true after adding listeners
    }
};

// Game Setup
const gameSetUp = () => {
    const option = document.querySelector('input[name="field"]:checked');

    if (!option) {
        alert("Choose either Batting or Bowling");
    }
    else {
        tossContainer.style.display = "none";
        optionContainer.style.display = "none";
        inningsContainer.style.display = "block";
        nextInnings.style.display = "none";
        // Display Team Name
        teamABtn.innerText = teamA.name;
        teamBBtn.innerText = teamB.name;
        innings++;
        inningsSpan.innerText = innings;
        tossResult = option.value;
        let tossWinnerChoice = tossResult

        battingTeam = teamA.toss && tossWinnerChoice == "batting" ? teamA : teamB;
        bowlingTeam = battingTeam === teamA ? teamB : teamA;
        activeTeam = battingTeam;
        battingTeam.batting = true;

        // start the game
        gameControls(activeTeam);
    }
};

// Coin Flip
const coinFlip = () => {
    tossBtn.disabled = true;
    const tossWinner = document.querySelector("#tossWinner");
    const coin = document.querySelector("#coin");
    const optionContainer = document.querySelector(".optionContainer");
    const startGame = document.querySelector("#startGame");
    coin.classList.add("animation");
    const choice = Math.floor(Math.random() * 2);

    const handleTossResult = (team, teamName) => {
        team.toss = true;
        coin.innerText = teamName;
        tossWinner.innerText = teamName + " won the toss!";
        coin.classList.remove("animation");
        tossBtn.style.display = "none";
        optionContainer.style.display = "flex";
        startGame.addEventListener("click", () => gameSetUp());
    };

    setTimeout(() => {
        if (choice === 0) {
            handleTossResult(teamA, teamA.name);
        } else {
            handleTossResult(teamB, teamB.name);
        }
    }, 1000);
};

// Toss
const toss = () => {
    // Initial Inputs 
    const mainContainer = document.querySelector(".mainContainer");
    const playersCount = document.querySelector("#playersCount");
    const oversCount = document.querySelector("#oversCount");
    const wideBall = document.querySelector('input[name="wideBall"]:checked');
    const noBall = document.querySelector('input[name="noBall"]:checked');

    const tempOver = parseFloat(oversCount.value);
    TOTAL_OVER = Math.round(tempOver * 10) / 10;
    TOTAL_WICKET = Number(playersCount.value) - 1;

    teamA.name = document.querySelector("#teamA").value;
    teamB.name = document.querySelector("#teamB").value;
    const tossContainer = document.querySelector(".tossContainer");
    const tossBtn = document.querySelector("#tossBtn");

    if (teamA.name == "") {
        alert("Enter the name of Team A");
    } else if (teamB.name == "") {
        alert("Enter the name of Team B");
    } else if (isNaN(TOTAL_WICKET) || TOTAL_WICKET < 1) {
        alert("Enter valid number of players");
    } else if (isNaN(TOTAL_OVER)) {
        alert("Enter valid number of overs");
    } else if (!wideBall) {
        alert("Check the any one of the option for wide ball run");
    } else if (!noBall) {
        alert("Check the any one of the option for no ball run")
    } else {
        wideBallRun = Number(wideBall.value);
        noBallRun = Number(noBall.value);
        mainContainer.style.display = "none";
        tossContainer.style.display = "block";
        tossBtn.addEventListener("click", coinFlip);
    }
};

// Next Innings
nextInnings.addEventListener("click", () => {
    // Update innings
    innings++;
    inningsSpan.innerText = innings;
    reverseBtns();
    currentOver = [];
    previousOvers = [];
    nextInnings.style.display = "none";
    runLeftContainer.style.display = "flex";

    // Update the target run value and runs left to win the match
    targetRunValue = activeTeam.score + 1;
    targetRun.innerText = targetRunValue;
    runLeftValue = targetRunValue - bowlingTeam.score;
    runLeft.innerText = runLeftValue;
    ballRemaining.innerText = TOTAL_OVER * 6;

    // Reset the values
    TotalScore.innerText = bowlingTeam.score;
    TotalWicket.innerHTML = bowlingTeam.wicket;
    TotalOver.innerText = bowlingTeam.overCount;
    currOverCount.innerText = currentOver;
    prevOverCount.innerText = previousOvers;
    ballCount = 0;

    // Remove all the event listeners
    removeAllEventListeners();

    // Reset the flag to false
    isEventListenersAdded = false;

    // Swap the teams
    battingTeam.batting = false;
    battingTeam = activeTeam === teamA ? teamB : teamA;
    bowlingTeam = battingTeam === teamA ? teamB : teamA;
    activeTeam = battingTeam;
    battingTeam.batting = true;

    // 2nd Innings
    gameControls(activeTeam);
});

// Start the game
playBtn.addEventListener("click", toss);

// When the user reloads the page
window.addEventListener('beforeunload', function (event) {
    var confirmationMessage = 'Are you sure you want to leave?';
    event.returnValue = confirmationMessage;
    return confirmationMessage;
});

// Restart the game
restart.addEventListener("click", () => {
    location.reload();
});
