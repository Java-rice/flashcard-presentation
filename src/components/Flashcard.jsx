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

  const brownTheme = {
    background: "bg-[#4E342E] dark:bg-[#3E2723]",
    card: "bg-[#6D4C41] dark:bg-[#5D4037] text-white",
    button: "bg-[#A1887F] hover:bg-[#8D6E63] text-white",
    correct: "bg-green-500",
    incorrect: "bg-red-500",
  };

  const handleFlip = () => setFlipped((prev) => !prev);

  const handleAnswerClick = (choice) => {
    if (selectedAnswer !== null || answeredPlayers.includes(currentPlayer.name)) return;

    setSelectedAnswer(choice);
    const correct = choice === question.answer;
    setIsCorrect(correct);
    setShowResult(true);
    setAnsweredPlayers((prev) => [...prev, currentPlayer.name]);

    if (correct) {
      setTimeout(() => onCorrectAnswer(true), 1200);
    } else {
      onWrongAnswer();
      setTimeout(() => setAllowSteal(true), 1200);
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

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-white">
          Current Player: <span className="text-yellow-300">{currentPlayer.name}</span>
        </div>
        <button
          onClick={onReset}
          className={`flex items-center gap-2 px-3 py-1 rounded transition ${brownTheme.button}`}
        >
          <RefreshCw size={16} />
          <span>New Question</span>
        </button>
      </div>
      <div className={`relative w-full h-96 rounded-lg shadow-lg ${brownTheme.card}`}>
        {!flipped && (
          <motion.div
            className="absolute w-full h-full flex flex-col items-center justify-center cursor-pointer"
            onClick={handleFlip}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-white">Tap to reveal question</h3>
          </motion.div>
        )}
        {flipped && (
          <motion.div className="absolute w-full h-full p-6">
            {question.video && (
              <div className="mb-3 flex items-center justify-center text-yellow-300">
                <Video size={20} className="mr-2" />
                <span>Video Question</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-white text-center mb-6">
              {question.question}
            </h3>
            <ul className="space-y-3">
              {question.choices?.map((choice, index) => (
                <motion.li
                  key={index}
                  className={`p-3 rounded-md text-center cursor-pointer transition-all duration-200 ${
                    selectedAnswer === choice
                      ? isCorrect
                        ? brownTheme.correct
                        : brownTheme.incorrect
                      : "bg-[#8D6E63] hover:bg-[#795548] text-white"
                  }`}
                  onClick={() => handleAnswerClick(choice)}
                >
                  {choice}
                </motion.li>
              ))}
            </ul>
            <AnimatePresence>
              {showResult && (
                <motion.div className="mt-4 text-center text-white">
                  <div className="text-lg font-semibold flex items-center justify-center gap-2">
                    {isCorrect ? (
                      <div className="text-green-400 flex items-center gap-2">
                        <CheckCircle size={20} />
                        <span>Correct! {currentPlayer.name} earns a point.</span>
                      </div>
                    ) : (
                      <div className="text-red-400 flex items-center gap-2">
                        <XCircle size={20} />
                        <span>Incorrect! Try again.</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {allowSteal && (
              <motion.div className="mt-4">
                <h4 className="text-yellow-300 font-semibold text-center mb-2">
                  Other players can try to answer!
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {players.map((player, index) => (
                    <button
                      key={index}
                      className={`flex items-center gap-1 py-1 px-3 rounded ${brownTheme.button}`}
                      onClick={() => handleSteal(index)}
                    >
                      <User size={16} />
                      {player.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
