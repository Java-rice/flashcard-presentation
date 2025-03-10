import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw, User, Video } from "lucide-react";

const Flashcard = ({
  question,
  onCorrectAnswer,
  onWrongAnswer,
  currentPlayer,
  players,
  setCurrentPlayerIndex,
  onReset,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [allowSteal, setAllowSteal] = useState(false);
  const [answeredPlayers, setAnsweredPlayers] = useState([]);
  const [stealerIndex, setStealerIndex] = useState(null);

  // Debugging Log
  console.log("Flashcard received question:", question);

  // Prevent error if `question` is missing
  if (!question || !question.question) {
    return (
      <div className="w-full max-w-md p-4 bg-red-200 dark:bg-red-800 rounded-lg text-center">
        <p className="text-red-800 dark:text-red-200 font-semibold">
          Error: No question data available.
        </p>
      </div>
    );
  }

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  const handleAnswerClick = (choice) => {
    if (selectedAnswer !== null || answeredPlayers.includes(currentPlayer.name)) return;

    setSelectedAnswer(choice);
    const correct = choice === question.answer;
    setIsCorrect(correct);
    setShowResult(true);

    setAnsweredPlayers((prev) => [...prev, currentPlayer.name]);

    if (correct) {
      setTimeout(() => onCorrectAnswer(true), 1500);
    } else {
      onWrongAnswer();
      setTimeout(() => setAllowSteal(true), 1500);
    }
  };

  const handleSteal = (index) => {
    const stealingPlayer = players[index];
    if (answeredPlayers.includes(stealingPlayer.name)) return;

    setStealerIndex(index);
    setCurrentPlayerIndex(index);
    
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
    setAllowSteal(false);
  };

  const handleReset = () => {
    setFlipped(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
    setAllowSteal(false);
    setAnsweredPlayers([]);
    setStealerIndex(null);
    onReset();
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          Current Player: <span className="text-blue-500">{currentPlayer.name}</span>
        </div>
        <button 
          onClick={handleReset}
          className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded"
        >
          <RefreshCw size={16} />
          <span>New Question</span>
        </button>
      </div>

      {/* Flashcard */}
      <div className="relative w-full h-96 perspective-1000">
        {/* Card Front */}
        {!flipped && (
          <motion.div 
            className="absolute w-full h-full bg-[#D7CCC8] dark:bg-[#4E342E] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleFlip}
          >
            <h3 className="text-xl font-bold text-center mb-4">Click to reveal question</h3>
            <div className="text-8xl">❓</div>
          </motion.div>
        )}

        {/* Card Back */}
        {flipped && (
          <motion.div 
            className="absolute w-full h-full bg-[#E0B089] dark:bg-[#5D4037] rounded-lg shadow-lg p-6 flex flex-col"
          >
            {question.video && (
              <div className="mb-4 flex items-center justify-center text-blue-500">
                <Video size={24} className="mr-2" />
                <span>Video Question</span>
              </div>
            )}

            <h3 className="text-xl font-bold text-center mb-6">{question.question}</h3>

            {/* Choices */}
            <ul className="space-y-3 mt-2 flex-grow">
              {question.choices?.map((choice, index) => (
                <motion.li
                  key={index}
                  className={`p-3 rounded-md text-center cursor-pointer transition ${
                    selectedAnswer === choice
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-[#D7CCC8] dark:bg-[#3E2723] hover:bg-[#BCAAA4] dark:hover:bg-[#4E342E]"
                  }`}
                  onClick={() => handleAnswerClick(choice)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {choice}
                </motion.li>
              ))}
            </ul>

            {/* Answer Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 text-center"
                >
                  <div className="text-lg font-bold flex items-center justify-center gap-2">
                    {isCorrect ? (
                      <div className="text-green-500 flex items-center gap-2">
                        <CheckCircle size={20} /> 
                        <span>Correct! {currentPlayer.name} gets a point!</span>
                      </div>
                    ) : (
                      <div className="text-red-500 flex items-center gap-2">
                        <XCircle size={20} /> 
                        <span>Incorrect!</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stealing Option */}
            <AnimatePresence>
              {allowSteal && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4"
                >
                  <h4 className="text-yellow-500 font-semibold text-center mb-2">
                    Other players can try to answer!
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {players.map((player, index) => {
                      const alreadyAnswered = answeredPlayers.includes(player.name);
                      return (
                        <button
                          key={index}
                          disabled={alreadyAnswered}
                          className={`flex items-center gap-1 py-1 px-3 rounded ${
                            alreadyAnswered
                              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                          onClick={() => handleSteal(index)}
                        >
                          <User size={16} />
                          {player.name}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
