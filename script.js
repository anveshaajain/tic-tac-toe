const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
let cells = Array(9).fill(null);
let currentPlayer = "❌";
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener("click", () => handleCellClick(index));
    div.textContent = cell;
    board.appendChild(div);
  });
}

function handleCellClick(index) {
  if (!gameActive || cells[index]) return;
  cells[index] = currentPlayer;
  createBoard();
  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (!cells.includes(null)) {
    statusText.textContent = "It's a draw! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
    statusText.textContent = `Turn: ${currentPlayer}`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

resetBtn.addEventListener("click", () => {
  cells = Array(9).fill(null);
  currentPlayer = "❌";
  gameActive = true;
  statusText.textContent = `Turn: ${currentPlayer}`;
  createBoard();
});

createBoard();
statusText.textContent = `Turn: ${currentPlayer}`;
