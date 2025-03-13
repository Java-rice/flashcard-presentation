import React, { useState } from "react";
import { Plus, X, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const PlayerSetup = ({ onStart, onClose }) => {
  const [players, setPlayers] = useState([{ name: "", score: 0 }]);
  const [winScore, setWinScore] = useState(5);
  const [gameMode, setGameMode] = useState("winScore"); // 'winScore' or 'completeQuestions'

  // Add a new player input field
  const addPlayer = () => {
    setPlayers([...players, { name: "", score: 0 }]);
  };

  // Remove a player input field
  const removePlayer = (index) => {
    if (players.length > 1) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  // Update a player's name
  const updatePlayerName = (index, name) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = name;
    setPlayers(updatedPlayers);
  };

  // Handle game start
  const handleStart = () => {
    const validPlayers = players.filter((p) => p.name.trim() !== "");
    if (validPlayers.length === 0) {
      toast.error("At least one player is required to start the game.");
      return;
    }
    onStart(validPlayers, gameMode === "winScore" ? winScore : "completeQuestions");
    onClose(); // Close the setup modal after starting
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="p-6 bg-[#F5E1C0] dark:bg-[#3E2723] rounded-2xl shadow-xl text-[#4E342E] dark:text-[#D7CCC8] max-w-md w-full"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Setup Players</h2>

      {/* Players Input List */}
      <div className="space-y-4">
        {players.map((player, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              className="p-3 border rounded-lg w-full dark:bg-[#5D4037] focus:outline-none"
              placeholder={`Player ${index + 1} Name`}
              value={player.name}
              onChange={(e) => updatePlayerName(index, e.target.value)}
            />
            {players.length > 1 && (
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removePlayer(index)}
              >
                <X size={24} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Player Button */}
      <button
        className="mt-4 w-full flex items-center justify-center gap-2 bg-[#6D4C41] dark:bg-[#8D6E63] text-white p-3 rounded-lg shadow-lg hover:bg-[#5D4037] dark:hover:bg-[#795548] transition-all duration-300"
        onClick={addPlayer}
      >
        <Plus size={20} /> Add Player
      </button>

      {/* Game Mode Selection */}
      <div className="mt-6">
        <label className="block text-lg font-medium">Game Mode:</label>
        <select
          className="w-full p-3 border rounded-lg dark:bg-[#5D4037] focus:outline-none"
          value={gameMode}
          onChange={(e) => setGameMode(e.target.value)}
        >
          <option value="winScore">Winning Score</option>
          <option value="completeQuestions">Complete All Questions</option>
        </select>
      </div>

      {/* Winning Score Selection (Shown if gameMode is 'winScore') */}
      {gameMode === "winScore" && (
        <div className="mt-6">
          <label className="block text-lg font-medium">Winning Score:</label>
          <select
            className="w-full p-3 border rounded-lg dark:bg-[#5D4037] focus:outline-none"
            value={winScore}
            onChange={(e) => setWinScore(Number(e.target.value))}
          >
            {[3, 5, 7, 10].map((score) => (
              <option key={score} value={score}>
                {score} Points
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Start Game Button */}
      <button
        className="mt-6 w-full flex items-center justify-center gap-2 bg-[#388E3C] text-white p-3 rounded-lg shadow-lg hover:bg-[#2E7D32] transition-all duration-300"
        onClick={handleStart}
      >
        <CheckCircle size={20} /> Start Game
      </button>
    </motion.div>
  );
};

export default PlayerSetup;
