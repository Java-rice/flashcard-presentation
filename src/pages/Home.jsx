import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Play, BookOpen, Info, Users } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8] p-4 font-serif transition-all duration-500 relative"
    >
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ backgroundImage: "url('/assets/ethics_bg.png')" }}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6"
        >
          Ethical Pathways
        </motion.h1>
        
        {/* Introduction */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-center mb-8 max-w-lg"
        >
          Explore ethical dilemmas, learn decision-making strategies, and engage in thought-provoking lessons.
        </motion.p>

        {/* Action Buttons */}
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

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-semibold mb-4">Why Learn Ethics?</h2>
          <p className="text-lg mb-6">
            Ethics shape our decisions and interactions. By understanding ethical principles,
            we can make better choices in life, work, and society.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="bg-[#E0B089] dark:bg-[#5D4037] p-6 rounded-lg shadow-lg">
              <Info size={32} className="mx-auto mb-3" />
              <h3 className="text-xl font-medium mb-2">Learn Ethical Decision-Making</h3>
              <p>Develop critical thinking skills for real-world dilemmas.</p>
            </div>
            <div className="bg-[#D7CCC8] dark:bg-[#795548] p-6 rounded-lg shadow-lg">
              <Users size={32} className="mx-auto mb-3" />
              <h3 className="text-xl font-medium mb-2">Engage with the Community</h3>
              <p>Discuss ethical topics with like-minded individuals.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
