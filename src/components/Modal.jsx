import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8] p-6 rounded-lg shadow-lg w-96 relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-[#6D4C41] dark:text-[#D7CCC8] hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>

        {/* Content */}
        <div className="text-center">{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
