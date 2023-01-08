`use strict`;
var player1;
var player2;
var playerTurn;
var gBoard;
var isRunning = true;
const statusText = document.querySelector("#statusText");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];

function startGame() {
  gBoard = buildBoard();
  statusText.innerText = "";
  isRunning = true;
  options = ["", "", "", "", "", "", "", "", ""];
  renderBoard(gBoard);
  var inputEl = document.getElementById("status");
  inputEl.checked ? (player1 = "o") : (player1 = "x");
  player1 === "x" ? (player2 = "o") : (player2 = "x");
  playerTurn = player1;
  let playerNameEl = document.querySelector(".player-name");
  playerNameEl.innerText = "who play : " + playerTurn;
}
function buildBoard() {
  let SIZE = 3;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = [];
    }
  }
  return board;
}

function renderBoard(board) {
  let boardEl = document.querySelector(".gameBoard");
  let index = 0;
  let str = '<table class="table">';
  board.map((column) => {
    str += '<tr class="column">';
    column.map((row) => {
      str += `<td class="square" cellindex=${index} onclick="doMove(this)"> </td>`;
      index++;
    });
    str += "</tr>";
  });
  str += "</table>";
  boardEl.innerHTML = str;
}

function doMove(squre) {
  if (!isRunning) return;
  const cellIndex = squre.getAttribute("cellIndex");
  updateCell(squre, cellIndex);
  checkWinner();
  playerTurn === "x" ? (playerTurn = "o") : (playerTurn = "x");
  let playerNameEl = document.querySelector(".player-name");
  playerNameEl.innerText = "who play : " + playerTurn;
}

function updateCell(cell, index) {
  options[index] = playerTurn;
  cell.textContent = playerTurn;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${playerTurn} wins!`;
    isRunning = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    isRunning = false;
  } 
}

