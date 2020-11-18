// gameboard module displays playground board
let gameboard = (function () {
  let container = document.querySelector("#container");
  let arrayMoves = ["", "", "", "", "", "", "", "", ""];

  function display() {
    container.innerHTML = arrayMoves
      .map((item, i) => {
        return ` <div data-index=${i} class="blocks  ${item === "x" || item === "0" ? "clicked" : ""}">${item}</div> `;
      })
      .join("");
  }
  return { display, arrayMoves, container };
})();
gameboard.display();

function cpuPlay(symbol = "0") {
  let pam = [];
  for (let i = 0; gameboard.arrayMoves.length > i; i++) {
    if (gameboard.arrayMoves[i] === "") pam.push(i);
  }
  let random = Math.floor(Math.random() * pam.length);
  let randomChoice = pam[random];
  gameboard.arrayMoves.splice(randomChoice, 1, symbol);
  gameboard.display();
  working();
}

function working() {
  let gameResult = gameWinLogic.win();
  if (gameResult === undefined) return;
  if (gameResult === "draw") return (result.textContent = "It is a draw");
  result.textContent = `${gameResult[0] === "x" ? "player 1 " : "player 2 "}wins the game`;
}

// gameTickLogic module for x and 0's
let gameTickLogic = (function () {
  function playerMove(e) {
    let result = document.querySelector("#result");
    let el = e.target;
    if (el.matches(".clicked")) return;
    let index = el.dataset.index;

    function subToggle(symbol) {
      symbolName = symbol;
      gameboard.arrayMoves.splice(index, 1, symbolName);
      gameboard.display();
      if (options === "pvc") cpuPlay();
      working();
    }

    if (this.parentNode.matches(".player1")) {
      if (options === "pvc") return subToggle("x");
      this.parentNode.classList.toggle("player1");
      return subToggle("x");
    }
    if (!this.parentNode.matches(".player1")) {
      this.parentNode.classList.toggle("player1");
      return subToggle("0");
    }
  }

  function tick() {
    let boards = document.querySelector("#container");
    boards.addEventListener("click", playerMove);
  }

  return { tick };
})();
gameTickLogic.tick();

// gameWinLogic module for checking win or draw
let gameWinLogic = (function () {
  function win() {
    function winTester(i, j, k) {
      if (gameboard.arrayMoves[i] === "" || gameboard.arrayMoves[j] === "" || gameboard.arrayMoves[k] === "") return;
      if (gameboard.arrayMoves[i] === gameboard.arrayMoves[j] && gameboard.arrayMoves[j] === gameboard.arrayMoves[k]) return "win";
    }
    if (winTester(0, 1, 2) === "win") return [gameboard.arrayMoves[0], "win"];
    if (winTester(3, 4, 5) === "win") return [gameboard.arrayMoves[3], "win"];
    if (winTester(6, 7, 8) === "win") return [gameboard.arrayMoves[6], "win"];
    if (winTester(0, 3, 6) === "win") return [gameboard.arrayMoves[0], "win"];
    if (winTester(1, 4, 7) === "win") return [gameboard.arrayMoves[1], "win"];
    if (winTester(2, 5, 8) === "win") return [gameboard.arrayMoves[2], "win"];
    if (winTester(0, 4, 8) === "win") return [gameboard.arrayMoves[0], "win"];
    if (winTester(2, 4, 6) === "win") return [gameboard.arrayMoves[2], "win"];
    if (!gameboard.arrayMoves.some((x) => x === "")) return "draw";
  }
  return { win };
})();

// player factory
function player(name) {
  return { name };
}

let landingPage = document.querySelector("#landingPage");
let p1div = document.querySelector("#p1div");
let p2div = document.querySelector("#p2div");
let player1Name = document.querySelector("#p1name-select");
let player2Name = document.querySelector("#p2name-select");

let options;
function showBoard() {
  let optionsValue = document.querySelector('input[name="select"]:checked').value;
  let gameContainer = document.querySelector("#gameContainer");
  gameContainer.style.display = "flex";
  landingPage.style.display = "none";
  p1div.textContent = player1Name.value || "Player 1";
  p2div.textContent = player2Name.value || "Player 2";
  options = optionsValue;
  if (options === "cvc") {
    setInterval(aiPlay, 1000);
  }
}

function aiPlay() {
  let finished = false;
  if (finished === true) return;
  if (gameboard.arrayMoves.every((item) => item !== "")) return;
  let gameResult = gameWinLogic.win();
  if (gameResult !== undefined) {
    if (gameResult[1] === "win" || gameResult[1] === "draw") return (finished = true);
  }
  cpuPlay("x");
  cpuPlay("0");
}

let startButton = document.querySelector("#start");
startButton.addEventListener("click", showBoard);
