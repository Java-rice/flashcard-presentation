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
