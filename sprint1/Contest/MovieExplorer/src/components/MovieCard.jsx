import React from "react";

export default function MovieCard({ movie }) {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden w-40">
      
      <div className="relative">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center justify-center">
          {Math.round(movie.vote_average * 10)}%
        </div>
      </div>

      <div className="p-2 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
