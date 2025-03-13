import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

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
    <div className="w-full md:w-1/3 p-6 bg-[#E0B089] dark:bg-[#5D4037] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Race Track 🏁</h2>

      {/* Player Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Select Player
        </h3>
        <div className="flex flex-col gap-2">
          {players.map((player, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 p-3 rounded-md transition font-semibold 
      ${player.wrong ? "bg-red-500 text-white shadow-lg" : ""}
      ${
        !player.wrong
          ? index === currentPlayerIndex
            ? "bg-[#5D4037] text-[#F5E1C0] dark:bg-[#F5E1C0] dark:text-[#5D4037] font-bold shadow-lg"
            : "bg-[#D7CCC8] text-[#3E2723] hover:bg-[#BCAAA4]"
          : ""
      }
    `}
              onClick={() => {
                if (!player.wrong) {
                  // Prevents clicking only if player is wrong
                  onSelectPlayer(index);
                }
              }}
            >
              <User
                size={20}
                className={`${player.wrong ? "text-white" : "opacity-80"}`}
              />
              <span>{player.name}</span>
              <span className="ml-auto font-bold">{player.score} pts</span>
            </button>
          ))}
        </div>
      </div>

      {/* Race Progress */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Race Progress 🚦
        </h3>
        <div className="relative h-64 w-full bg-[#8D6E63] rounded-lg p-4 overflow-hidden">
          {/* Finish Line */}
          <div className="absolute top-0 right-0 h-full w-3 bg-white dark:bg-gray-300 rounded-r-lg">
            <div className="h-full flex flex-col justify-between">
              {Array.from({ length: winScore + 1 }).map((_, i) => (
                <div key={i} className="w-6 h-1 bg-black -ml-2"></div>
              ))}
            </div>
          </div>

          {/* Player Markers */}
          {players.map((player, index) => {
            const progressPercentage = (player.position / winScore) * 100;
            const leftOffset = 20 + index * 40; // Space players apart horizontally

            return (
              <motion.div
                key={index}
                className="absolute h-8 flex items-center gap-2"
                initial={{ bottom: 0 }}
                animate={{
                  bottom: `calc(${progressPercentage}% - ${
                    progressPercentage > 0 ? 10 : 0
                  }px)`,
                  left: `${leftOffset}px`, // Stagger players horizontally
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white"
                  style={{
                    backgroundColor: getPlayerColor(index),
                    fontSize: "0.75rem",
                  }}
                >
                  {player.name[0]}
                </div>
                <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded-md text-xs shadow">
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
