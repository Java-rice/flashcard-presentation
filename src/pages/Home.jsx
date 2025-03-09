import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Play, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8] p-4 font-serif transition-all duration-500"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 p-2 rounded-full bg-[#D7CCC8] dark:bg-[#5D4037] hover:bg-[#BCAAA4] dark:hover:bg-[#4E342E] transition-all duration-300"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>

      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-6"
      >
        Ethical Pathways
      </motion.h1>
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-center mb-8 max-w-lg"
      >
        Explore ethical dilemmas, learn decision-making strategies, and engage in thought-provoking lessons.
      </motion.p>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/game"
          className="flex items-center gap-2 px-6 py-3 bg-[#6D4C41] dark:bg-[#8D6E63] text-white rounded-lg shadow-lg hover:bg-[#5D4037] dark:hover:bg-[#795548] transition-all duration-300"
        >
          <Play size={24} /> Play Ethical Game
        </Link>

        <Link
          to="/lesson/1"
          className="flex items-center gap-2 px-6 py-3 bg-[#8D6E63] dark:bg-[#A1887F] text-white rounded-lg shadow-lg hover:bg-[#795548] dark:hover:bg-[#6D4C41] transition-all duration-300"
        >
          <BookOpen size={24} /> Start Ethics Lesson
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;