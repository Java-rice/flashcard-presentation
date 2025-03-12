import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { lessons } from "@src/data/lesson";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const LessonContent = () => {
  const { steps } = useParams();
  const step = parseInt(steps, 10) || 0;
  const lesson = lessons[step];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
      className="flex flex-1 flex-col items-center justify-center min-h-screen p-6 max-w-4xl mx-auto"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-4xl font-bold mb-6 text-center"
      >
        {lesson.title}
      </motion.h1>

      {/* Media Animation */}
      {lesson.media && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full flex justify-center mb-6"
        >
          {lesson.media.type === "image" ? (
            <img
              src={lesson.media.url}
              alt={lesson.title}
              className="w-3/4 h-auto rounded-lg shadow-lg"
            />
          ) : (
            <video controls className="max-w-full rounded-lg shadow-lg">
              <source src={lesson.media.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </motion.div>
      )}

      {/* Lesson Content with Staggered Animation */}
      <motion.div
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="w-full"
      >
        {lesson.content.map((paragraph, index) => (
          <motion.p
            key={index}
            variants={fadeInUp}
            custom={index * 0.1}
            className="text-lg text-justify mb-4"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>

      {/* Bullet Points */}
      {lesson.details && (
        <motion.ul
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="list-disc text-lg pl-6 mb-6"
        >
          {lesson.details.map((detail, index) => {
            const [boldText, regularText] = detail.split(" - ");
            return (
              <motion.li key={index} variants={fadeInUp}>
                <span className="font-bold">{boldText}</span>
                {regularText && (
                  <span className="font-normal"> - {regularText}</span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      )}

      {/* Navigation Buttons with Hover Animations */}
      <div className="w-full flex justify-between mt-16">
        {step > 0 && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/lesson/${step - 1}`}
              className="p-3 bg-[#8D6E63] text-white rounded-lg shadow-lg flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              Previous
            </Link>
          </motion.div>
        )}
        {step < lessons.length - 1 && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/lesson/${step + 1}`}
              className="p-3 bg-[#8D6E63] text-white rounded-lg shadow-lg flex items-center gap-2 ml-auto"
            >
              Next
              <ArrowRight size={24} />
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LessonContent;
