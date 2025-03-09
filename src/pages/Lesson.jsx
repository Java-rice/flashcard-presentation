import React from "react";
import LessonSidebar from "@src/components/LessonSidebar";
import LessonContent from "@src/components/LessonContent";

const Lesson = () => {
  return (
    <div className="flex min-h-screen bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8]">
      <LessonSidebar />
      <LessonContent />
    </div>
  );
};

export default Lesson;
