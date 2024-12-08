import React from "react";
import Cell from "./Cell";

const Board = ({ snake, food, boardSize }) => {
  return (
    <div
      className="board"
      style={{
        gridTemplateRows: `repeat(${boardSize}, 20px)`,
        gridTemplateColumns: `repeat(${boardSize}, 20px)`,
      }}
    >
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => {
          const isSnake = snake.some(
            (segment) => segment[0] === row && segment[1] === col
          );
          const isFood = food[0] === row && food[1] === col;
          return <Cell key={`${row}-${col}`} isSnake={isSnake} isFood={isFood} />;
        })
      )}
    </div>
  );
};

export default Board;
