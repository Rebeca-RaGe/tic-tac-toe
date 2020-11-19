// Set classes
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Get cells
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");

const winningMessage = document.getElementById("winning-message");
const winningMessageText = document.querySelector("[data-winning-message-text]");

const restartBtn = document.getElementById("restartButton");

// Class flag
let circleTurn;

startGame();

restartBtn.addEventListener("click",startGame);

function startGame(){
  circleTurn = false;
  cellElements.forEach( cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click",handleClick, {once:true});
  });
  setBoardHoverClass();
  winningMessage.classList.remove("show");
}

function handleClick(e){
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // Place Mark
  placeMark(cell, currentClass);

  // Check For Win
  if(checkWinner(currentClass)){
    endGame(false);
  }
  else if(isDraw()){
    endGame(true);
  }
  else{
    swapTurns();
    setBoardHoverClass();
  }   
}

function endGame(draw){
  if(draw){
    winningMessageText.innerText = "Draw!";
  }
  else{
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessage.classList.add("show");
}

function isDraw(){
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

// Draw Mark
function placeMark(cell, currentClass){
  cell.classList.add(currentClass);
}

// Switch turns
function swapTurns(){
  circleTurn = !circleTurn;
}

function setBoardHoverClass(){
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if(circleTurn){
    board.classList.add(CIRCLE_CLASS);
  }
  else{
    board.classList.add(X_CLASS);
  }
  
}

function checkWinner(currentclass){
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentclass);
    });
  });
}

