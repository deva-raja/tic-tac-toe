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
  return { display, arrayMoves };
})();
gameboard.display();

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
      let gameResult = gameWinLogic.win();
      if (gameResult === "draw") return (result.textContent = "It is a draw");
      result.textContent = `${gameResult[0] === "x" ? "player 1 " : "player 2 "}wins the game`;
    }

    if (this.parentNode.matches(".player1")) {
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

function showBoard() {
  let boardContainer = document.querySelector("#container-wrapper");
  boardContainer.style.display = "flex";
  startButton.style.display = "none";
  labelWrapper.style.display = "none";
  p1span.textContent = "player1 ";
  p2span.textContent = "player2 ";
}

let startButton = document.querySelector("#start");
startButton.addEventListener("click", showBoard);

let p1span = document.querySelector("#p1span");
let p2span = document.querySelector("#p2span");
let labelWrapper = document.querySelector("#label-wrapper");
