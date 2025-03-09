import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { lessons } from "@src/data/lesson";

const LessonContent = () => {
  const { steps } = useParams();
  const step = parseInt(steps, 10) || 0;
  const lesson = lessons[step];

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen p-6 max-w-4xl mx-auto">
      <div className="w-full flex flex-col align-middle items-center ">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-center"
        >
          {lesson.title}
        </motion.h1>

        {/* Image or Video (if available) */}
        {lesson.media && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full flex justify-center mb-4"
          >
            {lesson.media.type === "image" ? (
              <img
                src={lesson.media.url}
                alt={lesson.title}
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            ) : lesson.media.type === "video" ? (
              <video controls className="max-w-full rounded-lg shadow-md">
                <source src={lesson.media.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </motion.div>
        )}

        {/* Multiple Paragraphs */}
        {lesson.content.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="text-lg text-justify mb-4"
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Bullet Points */}
        {lesson.details && (
          <ul className="list-disc text-lg pl-6 mb-6">
            {lesson.details.map((detail, index) => {
              const [boldText, regularText] = detail.split(" - "); // Split at " - "
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="font-bold">{boldText}</span>
                  {regularText && (
                    <span className="font-normal"> - {regularText}</span>
                  )}
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Navigation Buttons (Always at Bottom) */}
      <div className="w-full flex justify-between mt-16">
        {step > 0 && (
          <Link
            to={`/lesson/${step - 1}`}
            className="p-3 bg-[#8D6E63] text-white rounded-lg shadow-lg flex items-center gap-2"
          >
            <ArrowLeft size={24} />
            Previous
          </Link>
        )}
        {step < lessons.length - 1 && (
          <Link
            to={`/lesson/${step + 1}`}
            className="p-3 bg-[#8D6E63] text-white rounded-lg shadow-lg flex items-center gap-2 ml-auto"
          >
            Next
            <ArrowRight size={24} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonContent;
