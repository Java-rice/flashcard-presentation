import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const Flashcard = ({ card, onRemove }) => {
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // true = correct, false = incorrect
  const [showPoint, setShowPoint] = useState(false);
  const [isVideoFull, setIsVideoFull] = useState(false);
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState("auto");

  // Adjust card height dynamically
  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(`${cardRef.current.scrollHeight}px`);
    }
  }, [flipped, isCorrect]);

  // Handle answer selection
  const handleAnswerClick = (choice, event) => {
    event.stopPropagation(); // Prevents card flip

    if (selectedAnswer) return; // Prevent re-selection

    setSelectedAnswer(choice);
    if (choice === card.answer) {
      setIsCorrect(true);
      setShowPoint(true);

      setTimeout(() => {
        setShowPoint(false);
        setTimeout(() => onRemove(card.id), 2000);
      }, 2000);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <motion.div
      className="relative bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-4 rounded-lg shadow-lg cursor-pointer w-72 transition-all duration-500"
      whileTap={{ scale: 0.95 }}
      onClick={() => !selectedAnswer && setFlipped(!flipped)}
      style={{ minHeight: flipped ? cardHeight : "4rem" }}
      ref={cardRef}
    >
      {!flipped ? (
        <div className="flex items-center justify-center h-16 text-4xl font-bold">?</div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Video Question */}
          {card.video && (
            <div className="relative">
              <motion.video
                controls
                className={`w-full rounded-lg ${isVideoFull ? "h-64" : "h-40"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <source src={card.video} type="video/mp4" />
                Your browser does not support the video tag.
              </motion.video>
              <button
                className="absolute top-2 right-2 bg-gray-700 bg-opacity-70 p-1 rounded-full text-white hover:bg-opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoFull(!isVideoFull);
                }}
              >
                <Expand size={20} />
              </button>
            </div>
          )}

          {/* Question Text */}
          <h3 className="text-lg font-semibold text-center">{card.question}</h3>

          {/* Multiple Choice Options */}
          {card.type === "multiple-choice" && (
            <ul className="space-y-2">
              {card.choices.map((choice, index) => (
                <motion.li
                  key={index}
                  className={`p-2 rounded-md text-center cursor-pointer transition-all duration-300 ${
                    selectedAnswer
                      ? choice === card.answer
                        ? "bg-green-500 text-white"
                        : choice === selectedAnswer
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 dark:bg-gray-700"
                      : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                  onClick={(e) => handleAnswerClick(choice, e)}
                  whileTap={{ scale: 0.95 }}
                >
                  {choice}
                </motion.li>
              ))}
            </ul>
          )}

          {/* 🎉 Correct Animation */}
          <AnimatePresence>
            {showPoint && (
              <motion.div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                🎉 +1 Point!
              </motion.div>
            )}
          </AnimatePresence>

          {/* ✅ Correct Message */}
          {isCorrect && (
            <motion.div
              className="mt-3 text-center text-lg font-bold text-green-500 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle size={20} /> Correct!
            </motion.div>
          )}

          {/* ❌ Incorrect Message */}
          {isCorrect === false && (
            <motion.div
              className="mt-3 text-center text-lg font-bold text-red-500 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertTriangle size={20} /> Incorrect!
            </motion.div>
          )}

          {/* ❌ Remove Card Button (After Answering) */}
          {selectedAnswer && (
            <motion.button
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-red-600 transition"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(card.id);
              }}
            >
              <XCircle size={18} /> Remove Card
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Flashcard;
