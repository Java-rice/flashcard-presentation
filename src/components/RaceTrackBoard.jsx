import React from "react";
import { motion } from "framer-motion";
import { CircleUser, Flag } from "lucide-react";

// Function to get distinct colors for players
const getPlayerColor = (index) => {
  const colors = [
    "#FF5722",
    "#2196F3",
    "#4CAF50",
    "#FFC107",
    "#9C27B0",
    "#00BCD4",
  ];
  return colors[index % colors.length];
};

const RaceTrackBoard = ({
  players,
  currentPlayerIndex,
  winScore,
  onSelectPlayer,
}) => {
  return (
    <div className="w-full min-h-vh md:w-1/3 p-6 bg-gradient-to-b from-[#E0B089] to-[#D7A37B] dark:from-[#5D4037] dark:to-[#3E2723] rounded-xl shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100">
        🏁 Race Track
      </h2>

      {/* Player Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
          Select Player
        </h3>
        <div className="flex flex-col gap-3">
          {players.map((player, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 font-semibold shadow-md ${
                index === currentPlayerIndex
                  ? "bg-[#5D4037] text-[#F5E1C0] dark:bg-[#F5E1C0] dark:text-[#5D4037] font-bold ring-2 ring-[#F5E1C0] dark:ring-[#5D4037]"
                  : "bg-[#D7CCC8] text-[#3E2723] hover:bg-[#BCAAA4] dark:bg-[#4E342E] dark:text-gray-200 dark:hover:bg-[#6D4C41]"
              }`}
              onClick={() => onSelectPlayer(index)}
            >
              <circle-user size={22} className="opacity-80" />
              <span className="text-lg">{player.name}</span>
              <span className="ml-auto font-bold">{player.score} pts</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Race Progress */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
          Race Progress 🚦
        </h3>
        <div className="relative h-64 w-full bg-gradient-to-b from-[#6D4C41] to-[#4E342E] rounded-lg p-4 shadow-inner overflow-hidden border-2 border-[#5D4037]">
          {/* Track Lanes */}
          {players.map((_, index) => (
            <div
              key={index}
              className="absolute left-0 right-6 h-[2px] bg-gray-200 opacity-50 top-[calc(16%+40px*index)]"
            ></div>
          ))}

          {/* Finish Line */}
          <div className="absolute top-0 right-0 h-full w-6 bg-white dark:bg-gray-300 rounded-r-lg flex items-center">
            <Flag size={32} className="text-black mx-auto" />
          </div>

          {/* circle-user Players */}
          {players.map((player, index) => {
            const progressPercentage = (player.position / winScore) * 100;
            const laneOffset = index * 40 + 10; // Space players apart vertically

            return (
              <motion.div
                key={index}
                className="absolute flex items-center gap-2"
                initial={{ left: "5%" }}
                animate={{
                  left: `${progressPercentage}%`,
                  top: `calc(${laneOffset}px)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.2,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white dark:border-gray-400 text-white"
                  style={{
                    backgroundColor: getPlayerColor(index),
                    fontSize: "1rem",
                    transform: "scaleX(-1)", // Flip horizontally
                  }}
                >
                  🏃‍♂️
                </div>
                <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md text-sm shadow-md font-medium">
                  {player.name}: {player.score}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RaceTrackBoard;
