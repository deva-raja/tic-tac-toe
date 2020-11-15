let arrayMoves = ["", "", "", "", "", "", "", "", ""];
let gameboard = (function () {
  let container = document.querySelector("#container");
  //   prettier-ignore
  function display(){
  container.innerHTML = arrayMoves.map((item,i)=>{
      return` <div data-index=${i} class="blocks  ${(item==="x"||item==="0")?"clicked":""}">${item}</div> `;
  }).join("");
}
  return { display };
})();

gameboard.display();

function move(e) {
  let el = e.target;
  if (el.matches(".clicked")) return;
  let index = el.dataset.index;

  function subToggle(symbol) {
    symbolName = symbol;
    arrayMoves.splice(index, 1, symbolName);
    gameboard.display();
    return win();
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
  boards.addEventListener("click", move);
}
tick();

function win() {
  if(arrayMoves.some(x=>x==="")) return;
  if (arrayMoves[0] === arrayMoves[1] && arrayMoves[1] === arrayMoves[2]) console.log("win");
  if (arrayMoves[3] === arrayMoves[4] && arrayMoves[4] === arrayMoves[5]) console.log("win");
  if (arrayMoves[6] === arrayMoves[7] && arrayMoves[7] === arrayMoves[8]) console.log("win");
  if (arrayMoves[0] === arrayMoves[3] && arrayMoves[3] === arrayMoves[6]) console.log("win");
  if (arrayMoves[1] === arrayMoves[4] && arrayMoves[4] === arrayMoves[7]) console.log("win");
  if (arrayMoves[2] === arrayMoves[5] && arrayMoves[5] === arrayMoves[6]) console.log("win");
  if (arrayMoves[0] === arrayMoves[4] && arrayMoves[4] === arrayMoves[6]) console.log("win");
  if (arrayMoves[2] === arrayMoves[4] && arrayMoves[4] === arrayMoves[6]) console.log("win");
}
