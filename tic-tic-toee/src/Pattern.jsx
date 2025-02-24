import React, { useEffect, useState } from "react";
import "./Pattern.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pattern() {
  const mapping = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
    [1, 4, 7]
  ];

  const [board, setBoard] = useState(Array(9).fill(""));
  const [playerMoves, setPlayerMoves] = useState([]);
  const [computerMoves, setComputerMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState("Playing...");
  const [gameOver, setGameOver] = useState(false);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setPlayerMoves([]);
    setComputerMoves([]);
    setGameStatus("Playing...");
    setGameOver(false);
  };

  const checkWinner = (moves, player) => {
    for (const combination of winningCombinations) {
      if (combination.every((index) => moves.includes(index))) {
        setGameOver(true);
        if (player === "Player") {
          toast.success("You won!");
          setGameStatus("You Won!");
          resetGame()
        } else {
          toast.error("You Lost!");
          setGameStatus("Computer Won!");
          resetGame()
        }
        return true;
      }
    }
    return false;
  };

  const makeMove = (index, player) => {
    if (board[index] !== "" || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = player === "Player" ? "X" : "O";

    if (player === "Player") {
      setPlayerMoves([...playerMoves, index]);
    } else {
      setComputerMoves([...computerMoves, index]);
    }

    setBoard(newBoard);
  };

  useEffect(() => {
    if (playerMoves.length > 0) {
      if (checkWinner(playerMoves, "Player")) return;

      if (playerMoves.length + computerMoves.length === 9) {
        toast.dark("It's a tie!");
        setGameStatus("Tie!");
        setGameOver(true);
        resetGame()
        return;
      }

      setTimeout(computerTurn, 500);
    }
  }, [playerMoves]);

  const computerTurn = () => {
    if (gameOver) return;
    let availableMoves = mapping.filter((index) => board[index] === "");

    let move = findBestMove(availableMoves, computerMoves, playerMoves);
    makeMove(move, "Computer");

    if (checkWinner([...computerMoves, move], "Computer")) return;

    if (playerMoves.length + computerMoves.length + 1 === 9) {
      toast.dark("It's a tie!");
      setGameStatus("Tie!");
      setGameOver(true);
    }
  };

  const findBestMove = (availableMoves, computer, player) => {
    // Block player’s winning move
    for (const move of availableMoves) {
      const testMoves = [...player, move];
      if (winningCombinations.some((combo) => combo.every((i) => testMoves.includes(i)))) {
        return move;
      }
    }
    // Try to win
    for (const move of availableMoves) {
      const testMoves = [...computer, move];
      if (winningCombinations.some((combo) => combo.every((i) => testMoves.includes(i)))) {
        return move;
      }
    }
    // Pick a random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  return (
    <>
 
      <div className="container " style={{textAlign:"center"}}>
        {mapping.map((index) => (
          <div
            style={{display:"flex", justifyContent:"center" , alignItems:"Center"}}
            key={index}
            className={`cell ${board[index]}`}
            onClick={() => makeMove(index, "Player")}
          >
            {board[index] === "X" ? "❌" : board[index] === "O" ? "⭕" : ""}
          </div>
        ))}
      </div>
     
    </>
  );
}

export default Pattern;
