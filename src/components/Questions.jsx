import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import questions from "@src/data/questions.json";

const Questions = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center min-h-screen bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#F5F5F5] px-6 py-8 font-serif transition-all duration-500 relative"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/assets/ethics_bg.png')" }}
      ></div>

      {/* Top Navigation Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="absolute top-6 cursor-pointer left-6 gap-2  bg-[#6D4C41] dark:bg-[#8D6E63] text-white rounded-lg shadow-lg hover:bg-[#5D4037] dark:hover:bg-[#795548]  font-semibold px-6 py-3 transition"
      >
        Back to Home
      </motion.button>

      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl text-center font-bold mb-8 mt-16 relative z-10"
      >
        List of All Questions
      </motion.h1>

      {/* Question Grid */}
      <div className="w-full  grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {questions.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: q.id * 0.1 }}
            className="bg-white dark:bg-[#5D4037] shadow-lg rounded-2xl p-6 w-full"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">{q.title}</h2>
            <p className="mt-3 text-lg sm:text-xl font-medium">{q.question}</p>

            {/* Display Video if available */}
            {q.video && (
              <video
                controls
                className="w-full mt-4 rounded-lg shadow-md"
              >
                <source src={q.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Display Image if available */}
            {q.image && (
              <img
                src={q.image}
                alt={q.title}
                className="w-full mt-4 rounded-lg shadow-md"
              />
            )}

            {/* Choices */}
            <div className="mt-4 space-y-3">
              {q.choices.map((choice, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg text-lg sm:text-xl font-medium transition ${
                    choice === q.answer
                      ? "bg-green-500 text-white font-bold"
                      : "hover:bg-[#FFCC80] dark:hover:bg-[#795548]"
                  }`}
                >
                  {choice}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Navigation Button */}
    </motion.div>
  );
};

export default Questions;
