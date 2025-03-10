import React, { useState } from "react";
import { Trophy, Flag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Flashcard from "@src/components/Flashcard";
import PlayerSetup from "@src/components/PlayerSetup";
import questions from "@src/data/questions"

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [winScore, setWinScore] = useState(5);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleStart = (players, winScore) => {
    setPlayers(players.map(player => ({ ...player, position: 0, score: 0 })));
    setWinScore(winScore);
    setGameStarted(true);
    setWinner(null);
    setShowModal(false);
    setActiveQuestion(null);
  };

  const handleSelectPlayer = (index) => {
    setCurrentPlayerIndex(index);
  };

  const handleSelectQuestion = (questionIndex) => {
    if (activeQuestion !== null) return; // Prevent selecting a new question while one is active
    setActiveQuestion(questionIndex);
  };
  
  // Updated `handleAnswer` to properly update the player's score and reset question
  const handleAnswer = (isCorrect) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
  
      if (isCorrect) {
        updatedPlayers[currentPlayerIndex].score += 1;
        updatedPlayers[currentPlayerIndex].position += 1;
  
        if (updatedPlayers[currentPlayerIndex].score >= winScore) {
          setWinner(updatedPlayers[currentPlayerIndex].name);
        }
      }
      return updatedPlayers;
    });
  
    // Ensure question resets after an attempt
    setActiveQuestion(null);
  };

  const handleWrongAnswer = () => {
    // This function is intentionally empty as we'll handle wrong answers in the Flashcard component
    // by allowing other players to answer
  };

  const handleResetQuestion = () => {
    setActiveQuestion(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center min-h-screen bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8] p-4 font-serif transition-all duration-500 relative"
    >
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/assets/ethics_bg.png')" }}></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6"
        >
          Ethical Dilemma Game
        </motion.h1>

        {!gameStarted ? (
          <AnimatePresence>
            {showModal && (
              <PlayerSetup onStart={handleStart} onClose={() => setShowModal(false)} />
            )}
          </AnimatePresence>
        ) : (
          <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 mt-6">
            {/* Race Track Board on the left */}
            <div className="w-full md:w-1/3 p-4 bg-[#E0B089] dark:bg-[#5D4037] rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Race Track</h2>
              
              {/* Player Selection Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Select Player</h3>
                <div className="flex flex-col gap-2">
                  {players.map((player, index) => (
                    <button 
                      key={index} 
                      className={`flex items-center gap-2 p-2 rounded-md transition ${
                        index === currentPlayerIndex 
                          ? "bg-[#5D4037] text-[#F5E1C0] dark:bg-[#F5E1C0] dark:text-[#5D4037] font-bold" 
                          : "bg-[#D7CCC8] text-[#3E2723] hover:bg-[#BCAAA4]"
                      }`}
                      onClick={() => handleSelectPlayer(index)}
                    >
                      <User size={18} />
                      <span>{player.name}</span>
                      <span className="ml-auto font-bold">{player.score} pts</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Race Progress */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-center">Race Progress</h3>
                <div className="relative h-64 w-full bg-[#8D6E63] rounded-lg p-4">
                  {/* Finish Line */}
                  <div className="absolute top-0 right-0 h-full w-2 bg-white dark:bg-gray-300 rounded-r-lg">
                    <div className="h-full flex flex-col justify-between">
                      {Array.from({ length: winScore + 1 }).map((_, i) => (
                        <div key={i} className="w-6 h-1 bg-black -ml-2"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Player Markers */}
                  {players.map((player, index) => {
                    const progressPercentage = (player.position / winScore) * 100;
                    return (
                      <motion.div 
                        key={index}
                        className="absolute left-4 h-8 flex items-center"
                        initial={{ bottom: 0 }}
                        animate={{ 
                          bottom: `calc(${progressPercentage}% - ${progressPercentage > 0 ? 16 : 0}px)` 
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" 
                          style={{ backgroundColor: getPlayerColor(index) }}>
                          {player.name[0]}
                        </div>
                        <div className="ml-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                          {player.name}: {player.score}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Flashcards on the right */}
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold mb-4 text-center">Ethical Dilemmas</h2>
              
              {activeQuestion !== null ? (
                <div className="flex justify-center">
                  <Flashcard
                    question={questions[activeQuestion]}
                    onCorrectAnswer={handleAnswer}
                    onWrongAnswer={handleWrongAnswer}
                    currentPlayer={players[currentPlayerIndex]}
                    players={players}
                    setCurrentPlayerIndex={handleSelectPlayer}
                    onReset={handleResetQuestion}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {questions.map((question, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#D7CCC8] dark:bg-[#4E342E] p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectQuestion(index)}
                    >
                      <h3 className="font-semibold text-center truncate">Question {index + 1}</h3>
                      <div className="text-center mt-2 text-sm">
                        {question.video ? (
                          <span className="flex items-center justify-center">
                            <User size={16} className="mr-1" /> Video Question
                          </span>
                        ) : (
                          "Click to select"
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <AnimatePresence>
          {winner && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed top-10 inset-x-0 mx-auto w-max bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
            >
              <Trophy size={24} /> 
              <span className="text-xl font-bold">🎉 {winner} wins!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Helper function to get different colors for players
const getPlayerColor = (index) => {
  const colors = ["#FF5722", "#2196F3", "#4CAF50", "#FFC107", "#9C27B0", "#00BCD4"];
  return colors[index % colors.length];
};

export default Game;