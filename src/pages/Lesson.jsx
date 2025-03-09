import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const lessons = [
  {
    title: "Consequentialist Theories",
    content: "Ang etikal na resulta o epekto ng isang kilos",
    details: [
      "The Utilitarian Approach - Pinakamalaking benepisyo sa pinakamaraming tao.",
      "The Egoistic Approach - Ang isang kilos ay tama kung ito ay nakabubuti sa sarili.",
      "The Common Good Approach - Isinasaalang-alang ang pangkalahatang kapakanan ng lahat."
    ]
  },
  {
    title: "Non-Consequentialist Theories",
    content: "Mas binibigyang pansin ang layunin o intensyon ng gumagawa kaysa sa resulta ng kilos.",
    details: [
      "Duty Based Approach - Gumagawa ng tama dahil ito ang nararapat.",
      "Rights Approach - Iginagalang ang karapatan ng bawat isa sa paggawa ng desisyon.",
      "Fairness and Justice Approach - Dapat maging patas at makatarungan para sa lahat."
    ]
  },
  {
    title: "Agent-Centered Theories",
    content: "Higit na iniintindi ang pangkalahatang etikal na pagkatao ng isang indibidwal.",
    details: [
      "The Virtue Approach - Nagmumula sa mabuting ugali o asal ng isang tao.",
      "The Feminist Approach - Binibigyang-halaga ang pakikiramay at pagkakapantay-pantay."
    ]
  }
];

const LessonSidebar = () => {
  const { steps } = useParams();
  const activeStep = parseInt(steps, 10) || 0;

  return (
    <div className="w-72 bg-[#4E342E] dark:bg-[#3E2723] text-white p-6 min-h-screen flex flex-col">
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
            >
              <BookOpen size={20} />
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LessonContent = () => {
  const { steps } = useParams();
  const step = parseInt(steps, 10) || 0;

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        {lessons[step].title}
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg text-center max-w-2xl mb-4"
      >
        {lessons[step].content}
      </motion.p>
      
      <ul className="list-disc text-lg pl-6">
        {lessons[step].details.map((detail, index) => (
          <motion.li key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + index * 0.1 }}>
            {detail}
          </motion.li>
        ))}
      </ul>
      
      <div className="flex gap-4 mt-6">
        {step > 0 && (
          <Link to={`/lesson/${step - 1}`} className="p-3 bg-[#8D6E63] text-white rounded-lg shadow-lg">
            <ArrowLeft size={24} />
          </Link>
        )}
        {step < lessons.length - 1 && (
          <Link to={`/lesson/${step + 1}`} className="p-3 bg-[#8D6E63] text-white rounded-lg shadow-lg">
            <ArrowRight size={24} />
          </Link>
        )}
      </div>
    </div>
  );
};

const Lesson = () => {
  return (
    <div className="flex min-h-screen bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8]">
      <LessonSidebar />
      <LessonContent />
    </div>
  );
};

export default Lesson;
