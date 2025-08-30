import React from "react";

export default function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center my-4">
      {/* Year Filter */}
      <div className="flex flex-col">
        <label className="text-gray-300 text-sm mb-1">Year</label>
        <input
          type="number"
          name="year"
          placeholder="e.g. 2023"
          value={filters.year}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md hover:shadow-lg"
        />
      </div>

      {/* Rating Filter */}
      <div className="flex flex-col">
        <label className="text-gray-300 text-sm mb-1">Min Rating</label>
        <input
          type="number"
          name="rating"
          placeholder="0-10"
          min="0"
          max="10"
          step="0.1"
          value={filters.rating}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md hover:shadow-lg"
        />
      </div>

      {/* Language Filter */}
      <div className="flex flex-col">
        <label className="text-gray-300 text-sm mb-1">Language</label>
        <select
          name="language"
          value={filters.language}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 shadow-md hover:shadow-lg"
        >
          <option value="">All Languages</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="ja">Japanese</option>
        </select>
      </div>
    </div>
  );
}
