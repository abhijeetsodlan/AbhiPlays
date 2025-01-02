import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Games from "./pages/games";
import Bulletgame from "./pages/bulletgame";
import Snake from "./pages/snake";
import Pong from "./pages/pong";

const App = () => {
  return (
    <Router>
     

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="games" element={<Games />} />
        <Route path="/spaceInvaders" element={<Bulletgame />} />
        <Route path="/Snake" element={<Snake />} />
        <Route path="/flappy" element={<Pong />} />

      </Routes>
    </Router>
  );
};

export default App;
