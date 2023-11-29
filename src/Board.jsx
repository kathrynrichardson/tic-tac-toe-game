// Board.jsx
import React, { useState } from 'react';
import './AppStyles.css';

const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className='square'
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = computeWinner(squares);
  const [count, setCount] = useState(0);

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setCount(count => count + 1);
  }

  const handlePlayAgain = () => {
    setSquares(initialSquares);
    setXIsNext(true);
    setCount(0);
  }

  let status;
  if (winner) {
    status = winner + ' wins!';
  } else if (count === 9) {
    status = 'Draw!';
  } else {
    status = (xIsNext ? 'X' : 'O') + '\'s turn';
  }

  return (
    <div className='board'>
      <div className='status'>{status}</div>
      {Array(3).fill(null).map((_, row) => (
        <div key={row} className='board-row'>
          {Array(3).fill(null).map((_, col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
      {winner && (
        <button onClick={handlePlayAgain} className='play-again'>
          Play Again
        </button>
      )}
    </div>
  );
};

const computeWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
