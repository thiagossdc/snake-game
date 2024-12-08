import React from "react";

const Cell = ({ isSnake, isFood }) => {
  const cellClass = isSnake
    ? "cell snake"
    : isFood
    ? "cell food"
    : "cell";
  return <div className={cellClass}></div>;
};

export default Cell;
