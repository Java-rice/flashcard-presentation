import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
// import ethicsImage from "@src/assets/ethics.jpg";
// import ethicsVideo from "@src/assets/ethics.mp4";

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

const Lesson = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < lessons.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8] p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        {lessons[step].title}
      </motion.h1>
      
      <motion.img 
        src="#"
        alt="Ethics" 
        className="w-full max-w-md rounded-lg shadow-lg mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      
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
      
      {step === 0 && (
        <motion.video 
          src="#"
          controls 
          className="w-full max-w-md rounded-lg shadow-lg my-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
      )}
      
      <div className="flex gap-4 mt-6">
        <button onClick={prevStep} disabled={step === 0} className="p-3 bg-[#8D6E63] text-white rounded-lg shadow-lg disabled:opacity-50">
          <ArrowLeft size={24} />
        </button>
        <button onClick={nextStep} disabled={step === lessons.length - 1} className="p-3 bg-[#8D6E63] text-white rounded-lg shadow-lg disabled:opacity-50">
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Lesson;
