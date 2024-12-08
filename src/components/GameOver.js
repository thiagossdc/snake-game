import React from "react";

const GameOver = ({ resetGame }) => {
  return (
    <div className="game-over">
      <h1>Game Over!</h1>
      <button onClick={resetGame}>Play Again</button>
    </div>
  );
};

export default GameOver;
