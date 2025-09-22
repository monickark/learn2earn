// src/components/common/SectionHeader.jsx
export default function SectionHeader({ badge, title, description }) {
  return (
    <div className="text-center mb-6 sm:mb-8 px-4">
      {badge && (
        <span className="inline-block px-3 py-1 text-xs font-medium bg-pink-100 text-pink-600 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
        {title?.split(" ").map((word, i) =>
          word.toLowerCase() === "ai" ? (
            <span key={i} className="text-pink-500">{word} </span>
          ) : (
            word + " "
          )
        )}
      </h1>
      {description && (
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
