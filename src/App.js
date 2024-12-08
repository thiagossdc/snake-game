import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import GameOver from "./components/GameOver";

const App = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const boardSize = 20;

  const changeDirection = (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];
    let newHead;

    switch (direction) {
      case "UP":
        newHead = [head[0] - 1, head[1]];
        break;
      case "DOWN":
        newHead = [head[0] + 1, head[1]];
        break;
      case "LEFT":
        newHead = [head[0], head[1] - 1];
        break;
      case "RIGHT":
        newHead = [head[0], head[1] + 1];
        break;
      default:
        return;
    }

    newSnake.push(newHead);
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      generateFood();
    } else {
      newSnake.shift();
    }

    if (checkCollision(newHead, newSnake)) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
    }
  };

  const generateFood = () => {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    setFood([x, y]);
  };

  const checkCollision = (head, body) => {
    const [x, y] = head;
    if (x < 0 || y < 0 || x >= boardSize || y >= boardSize) return true;
    for (const segment of body) {
      if (segment[0] === x && segment[1] === y) return true;
    }
    return false;
  };

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection("RIGHT");
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", changeDirection);
    return () => window.removeEventListener("keydown", changeDirection);
  }, [direction]);

  return (
    <div className="game-container">
      {gameOver ? (
        <GameOver resetGame={resetGame} />
      ) : (
        <Board snake={snake} food={food} boardSize={boardSize} />
      )}
    </div>
  );
};

export default App;
