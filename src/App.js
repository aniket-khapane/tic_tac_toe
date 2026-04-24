// App.jsx
import React, { useState } from "react";
import "./App.css";
import "./style.css"

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (let line of LINES) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: [] };
}

function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? "square-winning" : ""} ${
        value === "X" ? "square-x" : value === "O" ? "square-o" : ""
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, onSquareClick, winningLine }) {
  return (
    <div className="board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onSquareClick(idx)}
          isWinning={winningLine.includes(idx)}
        />
      ))}
      {winningLine.length > 0 && (
        <div className={`win-line win-line-${getLineClass(winningLine)}`} />
      )}
    </div>
  );
}

function getLineClass(line) {
  const [a, , c] = line;
  // rows
  if (line[0] === 0 && line[2] === 2) return "row-top";
  if (line[0] === 3 && line[2] === 5) return "row-middle";
  if (line[0] === 6 && line[2] === 8) return "row-bottom";
  // cols
  if (line[0] === 0 && line[2] === 6) return "col-left";
  if (line[0] === 1 && line[2] === 7) return "col-middle";
  if (line[0] === 2 && line[2] === 8) return "col-right";
  // diagonals
  if (a === 0 && c === 8) return "diag-main";
  if (a === 2 && c === 6) return "diag-anti";
  return "";
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const { winner, line } = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  function handleSquareClick(i) {
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = isXNext ? "X" : "O";
    setSquares(next);
    setIsXNext(!isXNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  const currentPlayer = isXNext ? "X" : "O";

  let status;
  if (winner) {
    status = `Player ${winner === "O" ? "1" : "2"} Wins`;
  } else if (isDraw) {
    status = "It's a Draw";
  } else {
    status = `Turn: Player ${currentPlayer === "O" ? "1 - O" : "2 - X"}`;
  }

  return (
    <div className="app">
      <h1 className="title">Tic-Tac-Toe</h1>

      <div className="players">
        <span className={`player-label ${!isXNext ? "active" : ""}`}>
          Player 1 - O
        </span>
        <span className={`player-label ${isXNext ? "active" : ""}`}>
          Player 2 - X
        </span>
      </div>

      <Board
        squares={squares}
        onSquareClick={handleSquareClick}
        winningLine={line}
      />

      <div className="status">{status}</div>

      <button className="reset-btn" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}
