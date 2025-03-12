import React, { useState } from "react";
import { Trophy, Flag, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Flashcard from "@src/components/Flashcard";
import PlayerSetup from "@src/components/PlayerSetup";
import questions from "@src/data/questions";
import RaceTrackBoard from "../components/RaceTrackBoard";

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [winScore, setWinScore] = useState(5);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions

  const handleStart = (players, winScore) => {
    setPlayers(players.map((player) => ({ ...player, position: 0, score: 0 })));
    setWinScore(winScore);
    setGameStarted(true);
    setWinner(null);
    setShowModal(false);
    setActiveQuestion(null);
    setAnsweredQuestions([]); // Reset answered questions
  };

  const handleSelectPlayer = (index) => {
    setCurrentPlayerIndex(index);
  };

  const handleSelectQuestion = (questionIndex) => {
    if (activeQuestion !== null || answeredQuestions.includes(questionIndex))
      return; // Prevent selection
    setActiveQuestion(questionIndex);
  };

  const handleCorrect = (isCorrect) => {
    if (answeredQuestions.includes(activeQuestion)) return;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => {
        if (index === currentPlayerIndex && isCorrect) {
          return {
            ...player,
            score: player.score + 1,
            position: player.position + 1,
          };
        }
        return player;
      })
    );

    if (isCorrect) {
      setAnsweredQuestions((prev) =>
        prev.includes(activeQuestion) ? prev : [...prev, activeQuestion]
      );
    }
  };

  const handleWrong = (isWrong) => {
    if (answeredQuestions.includes(activeQuestion)) return;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => {
        if (index === currentPlayerIndex && isWrong) {
          return {
            ...player,
            score: player.score,
            position: player.position,
          };
        }
        return player;
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center min-h-screen bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8] p-4 font-serif transition-all duration-500 relative"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/assets/ethics_bg.png')" }}
      ></div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl text-center font-bold mb-6"
        >
          Games of Ethics
        </motion.h1>

        {!gameStarted ? (
          <AnimatePresence>
            {showModal && (
              <PlayerSetup
                onStart={handleStart}
                onClose={() => setShowModal(false)}
              />
            )}
          </AnimatePresence>
        ) : (
          <div className="w-full flex flex-col md:flex-row gap-6 mt-6">
            <RaceTrackBoard
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              winScore={winScore}
              onSelectPlayer={handleSelectPlayer}
            />
            {/* Flashcards on the right */}
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold mb-4 text-center">
                Ethical Dilemmas
              </h2>

              {activeQuestion !== null ? (
                <div className="flex justify-center">
                  <Flashcard
                    question={questions[activeQuestion]}
                    onCorrectAnswer={handleCorrect}
                    onWrongAnswer={handleWrong}
                    currentPlayer={players[currentPlayerIndex]}
                    players={players}
                    setCurrentPlayerIndex={handleSelectPlayer}
                    onReset={() => setActiveQuestion(null)}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {questions.map((question, index) => {
                    const isAnswered = answeredQuestions.includes(index);
                    return (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg shadow transition ${
                          isAnswered
                            ? "bg-gray-400 text-white cursor-default" // Style for answered questions
                            : "bg-[#D7CCC8] dark:bg-[#4E342E] cursor-pointer hover:shadow-lg"
                        }`}
                        whileHover={isAnswered ? {} : { scale: 1.02 }}
                        whileTap={isAnswered ? {} : { scale: 0.98 }}
                        onClick={() => handleSelectQuestion(index)}
                      >
                        <h3 className="font-semibold text-center truncate">
                          Question {index + 1}
                        </h3>
                        <div className="text-center mt-2 text-sm">
                          {isAnswered ? (
                            <span className="text-green-500 font-bold">
                              Answered ✅
                            </span>
                          ) : question.video ? (
                            <span className="flex items-center justify-center">
                              <User size={16} className="mr-1" /> Video Question
                            </span>
                          ) : (
                            "Click to select"
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
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

export default Game;
