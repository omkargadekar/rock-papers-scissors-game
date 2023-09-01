const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");
const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const playAgainBtn = document.querySelector(".play-again");
const next = document.querySelector("#next");

const yourScoreElement = document.getElementById("your");
const computerScoreElement = document.getElementById("computer");
let yourScore = parseInt(localStorage.getItem("yourScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
updateScores();

updateScores();

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    resultDiv.innerHTML = `
      <div class="choice ${results[idx].name}">
        <img src="images/icon-${results[idx].name}.png" alt="${results[idx].name}" />
      </div>
    `;
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  const userWins = isWinner(results);
  const aiWins = isWinner(results.reverse());

  if (userWins) {
    resultText.innerHTML = `<h1>You won</h1><h3>against PC</h3>`;
    resultDivs[0].classList.add("winner");

    next.classList.remove("hidden");
    keepScore("your");
  } else if (aiWins) {
    resultText.innerHTML = `<h1>You lost</h1><h3>against PC</h3>`;
    resultDivs[0].classList.remove("winner");
    resultDivs[1].classList.add("winner");

    keepScore("computer");
  } else {
    resultText.innerHTML = "<h1>tie up</h1>";
    resultDivs[0].classList.remove("winner");
    resultDivs[1].classList.remove("winner");
  }
  resultWinner.classList.remove("hidden");
  resultsDiv.classList.add("show-winner");
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(scoreType) {
  if (scoreType === "your") {
    yourScore++;
    yourScoreElement.textContent = yourScore;
    localStorage.setItem("yourScore", yourScore);
  } else if (scoreType === "computer") {
    computerScore++;
    computerScoreElement.textContent = computerScore;
    localStorage.setItem("computerScore", computerScore);
  }
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

function togglefun() {
  let dis = document.querySelector(".display");
  if (dis.style.display == "none") {
    dis.style.display = "block";
  } else if (dis.style.display == "block") {
    dis.style.display = "none";
  } else {
    dis.style.display = "none";
  }
}

function nextFun() {
  window.location.href = "win.html";
}

function reDirect() {
  window.location.href = "index.html";
}

document.querySelector(".display").addEventListener("click", function remove() {
  document.querySelector(".display").style.display = "none";
});

function updateScores() {
  yourScoreElement.textContent = yourScore;
  computerScoreElement.textContent = computerScore;
}
