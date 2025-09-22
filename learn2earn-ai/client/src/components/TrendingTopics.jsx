import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TrendingTopics({ topics = [], onClick }) {
  const scrollRef = useRef(null);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollInterval = setInterval(() => {
      if (direction === 1 && el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        setDirection(-1);
      } else if (direction === -1 && el.scrollLeft <= 0) {
        setDirection(1);
      }
      el.scrollLeft += direction;
    }, 25);

    return () => clearInterval(scrollInterval);
  }, [direction]);

  return (
    <motion.div
      className="p-0 min-h-[200px] sm:min-h-[260px]"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-sm sm:text-base font-semibold mb-3 text-indigo-700 flex items-center gap-1">
        🔥 Trending Topics
      </h2>

      <div
        ref={scrollRef}
        className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1"
        style={{ scrollBehavior: "smooth" }}
      >
        {topics.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.25 }}
            className="flex-shrink-0 sm:flex-shrink min-w-[140px] sm:min-w-0"
          >
            <button
              onClick={() => onClick(item.topic, "Beginner")}
              className="group flex flex-col items-start justify-center px-3 py-2 rounded-md text-xs sm:text-sm text-gray-700 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-150 w-full break-words text-left"
            >
              <span className="break-words leading-snug">{item.topic}</span>
              <span className="text-gray-400 text-xs mt-1 group-hover:text-indigo-500">
                {item.count} mentions
              </span>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
