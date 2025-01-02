import React, { useState, useEffect } from "react";

const FlappyBird = () => {
  const [birdY, setBirdY] = useState(window.innerHeight / 2); // Bird's vertical position
  const [birdVelocity, setBirdVelocity] = useState(0); // Initial vertical velocity
  const [obstacles, setObstacles] = useState([]); // Obstacles on the screen
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [score, setScore] = useState(0); // Game score
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  const birdSize = 40; // Bird's size
  const gap = 150; // Gap between obstacles
  const obstacleWidth = 60; // Width of the obstacles
  const gravity = 0.5; // Gravity effect
  const flapStrength = -10; // Vertical velocity change when bird flaps

  const handleFlap = () => {
    if (!gameOver) {
      setBirdVelocity(flapStrength); // Flap: give bird an upward velocity
    }
  };

  const generateObstacles = () => {
    const obstacleHeight = Math.floor(Math.random() * (window.innerHeight - gap));
    return {
      top: obstacleHeight,
      bottom: window.innerHeight - obstacleHeight - gap,
      x: window.innerWidth,
    };
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return; // Don't continue game loop if game is over or not started

    const interval = setInterval(() => {
      setBirdY((prevY) => {
        // Prevent bird from going below the ground
        if (prevY + birdVelocity + birdSize >= window.innerHeight) {
          setGameOver(true); // End the game if bird hits the ground
          return window.innerHeight - birdSize;
        }

        return Math.max(prevY + birdVelocity, 0); // Keep bird within the screen's bounds
      });

      setBirdVelocity((prevVelocity) => prevVelocity + gravity); // Apply gravity

      setObstacles((prevObstacles) => {
        const newObstacles = prevObstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - 5 })) // Move obstacles left
          .filter((obstacle) => obstacle.x + obstacleWidth > 0); // Remove obstacles that go off-screen

        if (newObstacles.length === 0 || newObstacles[newObstacles.length - 1].x < window.innerWidth - 300) {
          newObstacles.push(generateObstacles()); // Generate new obstacles
        }

        return newObstacles;
      });

      checkCollision(); // Check if bird hits an obstacle

      setScore((prevScore) => prevScore + 1); // Increase score over time
    }, 1000 / 60);

    return () => clearInterval(interval); // Clear the interval when component is unmounted
  }, [birdVelocity, obstacles, gameOver, gameStarted]);

  const checkCollision = () => {
    obstacles.forEach((obstacle) => {
      if (
        birdY < obstacle.top || // Bird hits top obstacle
        birdY + birdSize > window.innerHeight - obstacle.bottom // Bird hits bottom obstacle
      ) {
        if (obstacle.x < birdSize && obstacle.x + obstacleWidth > 0) {
          setGameOver(true); // End the game if bird collides with any obstacle
        }
      }
    });
  };

  const restartGame = () => {
    setBirdY(window.innerHeight / 2); 
    setBirdVelocity(0); // Reset velocity
    setObstacles([]); // Clear obstacles
    setGameOver(false); // Restart the game
    setScore(0); // Reset score
    setGameStarted(false); // Set gameStarted to false for start screen
  };

  const startGame = () => {
    setGameStarted(true); // Start the game
  };

  return (
    <div className="min-h-screen bg-blue-200 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Start screen */}
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-50">
          <h1 className="text-white text-4xl font-bold mb-6">Flappy Bird</h1>
          <p className="text-white text-lg mb-4">Click anywhere to make the bird flap.</p>
          <button
            onClick={startGame}
            className="bg-white text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-300"
          >
            Start Game
          </button>
        </div>
      )}

      {/* Game Over screen */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <h1 className="text-red-500 text-4xl font-bold mb-6">Game Over</h1>
          <p className="text-white text-2xl mb-6">You scored: {score}</p>
          <button
            onClick={restartGame}
            className="bg-white text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-300"
          >
            Restart
          </button>
        </div>
      )}

      {/* Score display */}
      {!gameOver && (
        <div className="absolute top-5 left-5 text-lg font-bold text-black">
          Score: {score}
        </div>
      )}

      {/* Game elements */}
      <div
        className="absolute bg-yellow-400 rounded-full"
        style={{
          width: birdSize,
          height: birdSize,
          top: birdY,
          left: window.innerWidth / 4,
        }}
      ></div>

      {/* Obstacles */}
      {obstacles.map((obstacle, index) => (
        <div key={index}>
          <div
            className="absolute bg-green-600"
            style={{
              width: obstacleWidth,
              height: obstacle.top,
              left: obstacle.x,
              bottom: window.innerHeight - obstacle.top - obstacle.bottom,
            }}
          ></div>
          <div
            className="absolute bg-green-600"
            style={{
              width: obstacleWidth,
              height: obstacle.bottom,
              left: obstacle.x,
            }}
          ></div>
        </div>
      ))}

      {/* Click area to flap */}
      <div
        onClick={handleFlap}
        className="absolute inset-0 cursor-pointer"
      ></div>
    </div>
  );
};

export default FlappyBird;
