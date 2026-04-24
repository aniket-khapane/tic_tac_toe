import React, { useState } from "react";
import "./styles.css";

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

// Correct winner logic — only returns line if all 3 match
function calculateWinner(squares) {
  debugger;
  for (let [a, b, c] of LINES) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square 
        ${value === "X" ? "square-x" : ""} 
        ${value === "O" ? "square-o" : ""} 
        ${isWinning ? "square-winning" : ""}
      `}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

// Maps winning line to CSS class
function getLineClass(line) {
  debugger;
  const [a, , c] = line;

  // Rows
  if (a === 0 && c === 2) return "row-top";
  if (a === 3 && c === 5) return "row-middle";
  if (a === 6 && c === 8) return "row-bottom";

  // Columns
  if (a === 0 && c === 6) return "col-left";
  if (a === 1 && c === 7) return "col-middle";
  if (a === 2 && c === 8) return "col-right";

  // Diagonals
  if (a === 0 && c === 8) return "diag-anti";
  if (a === 2 && c === 6) return "diag-main";

  return "";
}

function Board({ squares, onSquareClick, winningLine, winner }) {
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

      {/* Only draw red line if winner exists */}
      {winner && winningLine.length === 3 && (
        <div className={`win-line win-line-${getLineClass(winningLine)}`} />
      )}
    </div>
  );
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const { winner, line: winningLine } = calculateWinner(squares);
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

  let status = "";
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
        <span className={`player-label ${currentPlayer === "O" ? "active" : ""}`}>
          Player 1 - O
        </span>
        <span className={`player-label ${currentPlayer === "X" ? "active" : ""}`}>
          Player 2 - X
        </span>
      </div>

      <Board
        squares={squares}
        onSquareClick={handleSquareClick}
        winningLine={winningLine}
        winner={winner}
      />

      <div className="status">{status}</div>

      <button className="reset-btn" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}
