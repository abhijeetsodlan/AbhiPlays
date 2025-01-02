import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Define grid size
const GRID_SIZE = 20;
const NUM_ROWS = Math.floor(window.innerHeight / GRID_SIZE);
const NUM_COLS = Math.floor(window.innerWidth / GRID_SIZE);

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // State to control the intro screen

  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = [...prevSnake[0]];

        switch (direction) {
          case "UP":
            newHead[1] -= 1;
            break;
          case "DOWN":
            newHead[1] += 1;
            break;
          case "LEFT":
            newHead[0] -= 1;
            break;
          case "RIGHT":
            newHead[0] += 1;
            break;
          default:
            break;
        }

        // Check for collision with walls or self
        if (
          newHead[0] < 0 ||
          newHead[0] >= NUM_COLS ||
          newHead[1] < 0 ||
          newHead[1] >= NUM_ROWS ||
          prevSnake.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check for food collision
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood([Math.floor(Math.random() * NUM_COLS), Math.floor(Math.random() * NUM_ROWS)]);
          setScore((prevScore) => prevScore + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, food, gameOver, gameStarted]);

  const handleDirectionChange = (newDirection) => {
    if (
      (newDirection === "UP" && direction !== "DOWN") ||
      (newDirection === "DOWN" && direction !== "UP") ||
      (newDirection === "LEFT" && direction !== "RIGHT") ||
      (newDirection === "RIGHT" && direction !== "LEFT")
    ) {
      setDirection(newDirection);
    }
  };

  const startGame = () => {
    setGameStarted(true); // Start the game when the button is clicked
    setSnake([[5, 5]]);
    setFood([10, 10]);
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0); // Reset score at the start
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Intro Screen */}
      {!gameStarted && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to Snake Game!</h1>
          <p className="text-xl mb-4">
            Use the arrow keys to control the snake.
          </p>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg text-xl hover:bg-green-400"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Game Screen */}
      {gameStarted && (
        <>
          {/* Score Display */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            Score: {score}
          </div>

          {gameOver ? (
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Game Over</h2>
              <p className="text-xl mb-4">Final Score: {score}</p>
              <button
                className="bg-orange-500 text-white px-6 py-2 rounded-lg text-xl hover:bg-orange-400"
                onClick={() => {
                  setSnake([[5, 5]]);
                  setFood([10, 10]);
                  setDirection("RIGHT");
                  setGameOver(false);
                  setScore(0); // Reset score on restart
                }}
              >
                Restart
              </button>
            </div>
          ) : (
            <div
              className="flex flex-wrap"
              style={{ width: `${NUM_COLS * GRID_SIZE}px`, height: `${NUM_ROWS * GRID_SIZE}px` }}
            >
              {Array.from({ length: NUM_ROWS }).map((_, row) => (
                <div key={row} className="flex w-full">
                  {Array.from({ length: NUM_COLS }).map((_, col) => {
                    const isSnake = snake.some(
                      (segment) => segment[0] === col && segment[1] === row
                    );
                    const isFood = food[0] === col && food[1] === row;
                    return (
                      <div
                        key={`${row}-${col}`}
                        className={`flex-1 w-5 h-5 ${isSnake ? "bg-lime-500" : ""} ${isFood ? "bg-red-500" : "bg-gray-800"}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Direction buttons */}
          {!gameOver && (
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4">
              <button
                className="bg-gray-700 p-4 rounded-full mb-4 hover:bg-gray-600"
                onClick={() => handleDirectionChange("UP")}
              >
                <FaArrowUp size={24} className="text-white" />
              </button>
              <div className="flex space-x-6">
                <button
                  className="bg-gray-700 p-4 rounded-full hover:bg-gray-600"
                  onClick={() => handleDirectionChange("LEFT")}
                >
                  <FaArrowLeft size={24} className="text-white" />
                </button>
                <button
                  className="bg-gray-700 p-4 rounded-full hover:bg-gray-600"
                  onClick={() => handleDirectionChange("RIGHT")}
                >
                  <FaArrowRight size={24} className="text-white" />
                </button>
              </div>
              <button
                className="bg-gray-700 p-4 rounded-full mt-4 hover:bg-gray-600"
                onClick={() => handleDirectionChange("DOWN")}
              >
                <FaArrowDown size={24} className="text-white" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SnakeGame;
