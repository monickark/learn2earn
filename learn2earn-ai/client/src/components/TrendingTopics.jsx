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
        setDirection(-1); // reached end → go left
      } else if (direction === -1 && el.scrollLeft <= 0) {
        setDirection(1); // reached start → go right
      }
      el.scrollLeft += direction; // move 1px per tick
    }, 25);

    return () => clearInterval(scrollInterval);
  }, [direction]);

  return (
    <motion.div
      className="p-0"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-base font-semibold mb-2 text-indigo-700 flex items-center gap-1">
        🔥 Trending
      </h2>

      {/* Mobile: auto-scroll bounce | Desktop: grid */}
      <div
        ref={scrollRef}
        className="flex sm:grid sm:grid-cols-2 gap-2 sm:gap-x-3 sm:gap-y-1 overflow-x-auto no-scrollbar pb-1"
        style={{ scrollBehavior: "smooth" }}
      >
        {topics.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.25 }}
            className="flex-shrink-0 sm:flex-shrink"
          >
            <button
              onClick={() => onClick(item.topic, "Beginner")}
              className="group flex items-center justify-between whitespace-nowrap px-3 py-1 rounded-md text-sm text-gray-700 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-150"
            >
              <span className="truncate max-w-[140px]">{item.topic}</span>
              <span className="text-gray-400 text-xs ml-2 group-hover:text-indigo-500">
                {item.count}
              </span>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
