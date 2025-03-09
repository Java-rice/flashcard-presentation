import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, ArrowLeft, Menu } from "lucide-react";
import { lessons } from "@src/data/lesson";

const LessonSidebar = () => {
  const { steps } = useParams();
  const activeStep = parseInt(steps, 10) || 0;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 cursor-pointer left-4 z-50 p-2 ${isOpen ? "hidden" : "fixed"} bg-[#8D6E63] text-white rounded-md shadow-lg lg:hidden`}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0  left-0 w-72 bg-[#4E342E] dark:bg-[#3E2723] text-white p-6 min-h-screen flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Menu (Mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute cursor-pointer top-4 right-4 text-white lg:hidden"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Lessons</h2>

        <ul className="space-y-3 flex-1">
          {lessons.map((lesson, index) => (
            <li key={index}>
              <Link
                to={`/lesson/${index}`}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 shadow-md ${
                  activeStep === index
                    ? "bg-[#8D6E63] text-white font-semibold"
                    : "bg-[#6D4C41] hover:bg-[#5D4037] text-gray-200"
                }`}
                onClick={() => setIsOpen(false)} // Close menu on selection
              >
                <BookOpen size={20} />
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-[#8D6E63] hover:bg-[#6D4C41] text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && <div className="lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default LessonSidebar;
