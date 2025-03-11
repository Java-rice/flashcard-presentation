import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw, User, Video } from "lucide-react";

const Flashcard = ({
  question,
  onCorrectAnswer,
  onWrongAnswer,
  currentPlayer,
  onReset,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleFlip = () => setFlipped(true);

  const handleAnswerClick = (choice) => {
    if (selectedAnswer) return;

    setSelectedAnswer(choice);
    const correct = choice === question.answer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      if (correct) onCorrectAnswer();
      else onWrongAnswer();
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-lg font-bold">
          Player: <span className="text-blue-500">{currentPlayer.name}</span>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded"
        >
          <RefreshCw size={16} />
          <span>New Question</span>
        </button>
      </div>

      <div className="relative w-full h-auto">
        {!flipped && (
          <motion.div 
            className="bg-[#D7CCC8] dark:bg-[#4E342E] rounded-lg shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleFlip}
          >
            <h3 className="text-xl font-bold text-center mb-4">Click to reveal</h3>
            <Video size={48} className="text-blue-500" />
          </motion.div>
        )}

        {flipped && (
          <motion.div className="bg-[#E0B089] dark:bg-[#5D4037] rounded-lg shadow-lg p-6 flex flex-col">
            {question.video && (
              <div className="mb-4">
                <video
                  src={question.video}
                  controls
                  playsInline
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            <h3 className="text-xl font-bold text-center mb-6">{question.question}</h3>

            <ul className="space-y-3">
              {question.choices.map((choice, index) => (
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
                        <span>Correct!</span>
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
