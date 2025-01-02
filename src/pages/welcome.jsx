import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="h-screen w-full flex items-center p-10 justify-center relative bg-gradient-to-br from-sky-900 to-gray-300">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-sky-800 bg-opacity-20 backdrop-blur-lg"></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white p-10 rounded-xl bg-gray-800 bg-opacity-40 shadow-2xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to AbhiPlays</h1>
        <p className="text-lg mb-6">Explore the games I've crafted in my free time!</p>
        <Link to="/games">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition">
            Visit Games
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
