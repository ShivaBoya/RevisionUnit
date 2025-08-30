import React from "react";

const categories = [
  { key: "trending", label: "Trending" },
  { key: "popular", label: "Popular" },
  { key: "top_rated", label: "Top Rated" },
  { key: "upcoming", label: "Upcoming" },
];

export default function CategoryTabs({ category, setCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 my-4 overflow-x-auto scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => setCategory(cat.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
            ${
              category === cat.key
                ? "bg-purple-500 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
