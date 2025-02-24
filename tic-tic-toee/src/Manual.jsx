import React, { useState, useEffect } from 'react';
import './Pattern.css';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Manual({ restartGame }) {
  const mapping = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [images, setImages] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState('cross');
  const [moves, setMoves] = useState({ cross: [], zero: [] });

  const winningPossibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [2, 5, 8], [2, 4, 6],
    [0, 4, 8], [1, 4, 7]
  ];

  const reset = () => {
    setImages(Array(9).fill(""));
    setCurrentPlayer('cross');
    setMoves({ cross: [], zero: [] });
  };

  useEffect(() => {
    checkWinner();
  }, [moves]);

  const checkWinner = () => {
    for (const state of winningPossibilities) {
      const crossCount = state.filter(pos => moves.cross.includes(pos)).length;
      const zeroCount = state.filter(pos => moves.zero.includes(pos)).length;

      if (crossCount === 3) {
        toast.success('Cross wins');
        restartGame();
        return;
      } else if (zeroCount === 3) {
        toast.error('Zero wins');
        restartGame();
        return;
      } else if (moves.cross.length + moves.zero.length === mapping.length) {
        toast.dark('Tie');
        restartGame();
        return;
      }
    }
  };

  const handleClick = (index) => {
    if (images[index] === "") {
      const newImages = [...images];
      newImages[index] = currentPlayer;
      setImages(newImages);

      const newMoves = { ...moves };
      newMoves[currentPlayer].push(index);
      setMoves(newMoves);

      setCurrentPlayer(currentPlayer === 'cross' ? 'zero' : 'cross');
    }
  };

  return (
    <div className="container">
      {mapping.map((value, index) => (
        <div
          key={index}
          className={images[value - 1]}
          id={value - 1}
          onClick={() => handleClick(value - 1)}
        />
      ))}
    </div>
  );
}

export default Manual;