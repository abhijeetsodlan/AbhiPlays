import React, { useState } from "react";
import { Link } from "react-router-dom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"; // Icon for Game 1
import Rocket from "@mui/icons-material/Rocket"; // Icon for Snake Game

const games = [
  { id: 1, name: "Space Invaders", link: "/spaceInvaders", icon: <SportsEsportsIcon /> },
  { id: 2, name: "Flappy Bird", link: "/flappy", icon: <Rocket /> },
  { id: 3, name: "AbhiEscape", link: "https://abhijeetsodlan.github.io/AbhiEscape/", icon: <SportsEsportsIcon /> },
  { id: 4, name: "Snake & Food", link: "/snake", icon: <Rocket /> },
  // Add more games here with appropriate icons
];

const Games = () => {
  const [loading, setLoading] = useState(false);

  const getRandomRotation = () => {
    return Math.random() * 20 - 10; // Random rotation between -10 and 10 degrees
  };

  const handleGameClick = (link) => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = link; // Redirect after 2 seconds
    }, 2000); // 2 seconds delay for funny loading
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 to-gray-300 text-white py-10 relative">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-sky-800 bg-opacity-20 backdrop-blur-lg"></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>

      <div className="relative z-10">
        <div className="flex justify-center items-center gap-6 flex-wrap px-6">
          {games.map((game) => {
            const rotation = getRandomRotation();
            return (
              <div
                key={game.id}
                onClick={() => handleGameClick(game.link)} // Trigger loading on click
                className="cursor-pointer transform transition duration-300"
              >
                <div
                  className="relative w-52 h-72 bg-gray-800 bg-opacity-60 rounded-xl shadow-xl overflow-hidden flex flex-col items-center justify-center"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300 text-yellow-400 text-9xl mb-4">
                    {game.icon}
                  </div>

                  {/* Game name always visible */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-100">
                    <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-teal-500">
                      {game.name}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Funny Loading Screen */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="text-white text-4xl font-bold animate-bounce">
            🐦 Hold on tight! The game is coming soon... 🎮
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
