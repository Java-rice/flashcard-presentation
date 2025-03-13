import React, { useState, useEffect } from "react";
import { Trophy, XCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Flashcard from "@src/components/Flashcard";
import PlayerSetup from "@src/components/PlayerSetup";
import questions from "@src/data/questions";
import RaceTrackBoard from "@src/components/RaceTrackBoard";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [winScore, setWinScore] = useState(5);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showRankingModal, setShowRankingModal] = useState(false);

  useEffect(() => {
    if (answeredQuestions.length === questions.length && gameStarted) {
      setShowRankingModal(true);
    }
  }, [answeredQuestions, gameStarted]);

  const handleStart = (players, winScore) => {
    setPlayers(
      players.map((player) => ({
        ...player,
        position: 0,
        score: 0,
        wrong: 0,
      }))
    );
    setWinScore(winScore);
    setGameStarted(true);
    setWinner(null);
    setShowModal(false);
    setActiveQuestion(null);
    setAnsweredQuestions([]);
  };

  const handleSelectPlayer = (index) => {
    if (players[index].wrong === 1) return;
    setCurrentPlayerIndex(index);
  };

  const handleSelectQuestion = (questionIndex) => {
    if (activeQuestion !== null || answeredQuestions.includes(questionIndex))
      return;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        wrong: 0,
      }))
    );

    setActiveQuestion(questionIndex);
  };

  const handleCorrect = (isCorrect) => {
    if (answeredQuestions.includes(activeQuestion)) return;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => {
        if (index === currentPlayerIndex && isCorrect) {
          const newScore = player.score + 1;
          if (newScore >= winScore) {
            setWinner(player.name);
          }
          return {
            ...player,
            score: newScore,
            position: player.position + 1,
            wrong: 0,
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
            wrong: 1,
          };
        }
        return player;
      })
    );

    setCurrentPlayerIndex((prevIndex) => {
      let newIndex = (prevIndex + 1) % players.length;
      while (players[newIndex].wrong === 1) {
        newIndex = (newIndex + 1) % players.length;
      }
      return newIndex;
    });
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
                            ? "bg-[#7e635f] text-white cursor-default"
                            : "bg-[#D7CCC8] dark:bg-[#4E342E] cursor-pointer hover:shadow-lg"
                        }`}
                        whileHover={isAnswered ? {} : { scale: 1.02 }}
                        whileTap={isAnswered ? {} : { scale: 0.98 }}
                        onClick={() => handleSelectQuestion(index)}
                      >
                        <h3 className="font-semibold text-center truncate">
                          Question {index + 1}
                        </h3>
                        <div className="flex justify-center align-middle mx-auto text-center mt-2 text-sm">
                          {isAnswered ? (
                            <span className="text-green-500 font-bold flex items-center gap-1">
                              <CheckCircle
                                size={20}
                                className="text-green-500"
                              />
                              Answered
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

        {/* Ranking Modal */}
        {showRankingModal &&
          (() => {
            // Sort players by score in descending order
            const sortedPlayers = [...players].sort(
              (a, b) => b.score - a.score
            );
            const winner =
              sortedPlayers.length > 0 ? sortedPlayers[0].name : "No Winner";

            return (
              <div className="fixed inset-0 flex items-center justify-center bg-[#3E2723] bg-opacity-80 z-50">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-[#6D4C41] dark:bg-[#4E342E] p-6 rounded-lg shadow-lg text-center text-[#EFEBE9] border-4 border-[#D7CCC8]"
                >
                  <h2 className="text-2xl font-bold text-[#FFCC80]">
                    🎉 Congratulations! 🎉
                  </h2>
                  <h1 className="text-4xl font-extrabold text-[#FFEB3B] mt-2">
                    {winner}
                  </h1>
                  <h3 className="text-lg font-semibold text-[#FFCC80]">
                    is the Champion! 🏆
                  </h3>
                  <h2 className="text-2xl font-bold text-[#FFCC80] mt-8">
                    🏅 Final Rankings 🏅
                  </h2>
                  <ol className="mt-4 text-lg text-[#FFEB3B] font-semibold">
                    {sortedPlayers.map((player, index) => (
                      <li
                        key={player.name}
                        className={`my-1 ${
                          index === 0 ? "text-[#FFD700] font-extrabold" : ""
                        }`}
                      >
                        {index + 1}. {player.name} - {player.score} points
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                      onClick={() => navigate("/game")}
                      className="bg-[#795548] text-[#EFEBE9] px-4 py-2 rounded-lg border border-[#A1887F] hover:bg-[#5D4037] transition"
                    >
                      Back to Main Menu
                    </button>
                    <button
                      onClick={() => navigate("/questions")}
                      className="bg-[#A1887F] text-[#4E342E] px-4 py-2 rounded-lg border border-[#6D4C41] hover:bg-[#D7CCC8] transition"
                    >
                      View All Questions
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })()}

        {/* Winner Modal */}
        {winner && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#3E2723] bg-opacity-80 z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#6D4C41] dark:bg-[#4E342E] p-6 rounded-lg shadow-lg text-center text-[#EFEBE9] border-4 border-[#D7CCC8]"
            >
              <Trophy size={50} className="text-[#FFD54F] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#FFCC80]">
                🎉 Congratulations! 🎉
              </h2>
              <h1 className="text-4xl font-extrabold text-[#FFEB3B] mt-2">
                {winner}
              </h1>
              <h3 className="text-lg font-semibold text-[#FFCC80]">
                is the Champion! 🏆
              </h3>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => navigate("/game")}
                  className="bg-[#795548] text-[#EFEBE9] px-4 py-2 rounded-lg border border-[#A1887F] hover:bg-[#5D4037] transition"
                >
                  Back to Main Menu
                </button>
                <button
                  onClick={() => navigate("/questions")}
                  className="bg-[#A1887F] text-[#4E342E] px-4 py-2 rounded-lg border border-[#6D4C41] hover:bg-[#D7CCC8] transition"
                >
                  View All Questions
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Game;
