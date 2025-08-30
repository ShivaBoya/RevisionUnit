import React, { useEffect, useState } from "react";
import CategoryTabs from "./CategoryTabs";

const API_KEY = ""; 
const BASE_URL = "https://api.themoviedb.org/3/movie";

export default function MoviesDashboard() {
  const [category, setCategory] = useState("trending");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      let url = "";
      switch (category) {
        case "trending":
          url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
          break;
        case "popular":
          url = `${BASE_URL}/popular?api_key=${API_KEY}`;
          break;
        case "top_rated":
          url = `${BASE_URL}/top_rated?api_key=${API_KEY}`;
          break;
        case "upcoming":
          url = `${BASE_URL}/upcoming?api_key=${API_KEY}`;
          break;
        default:
          url = `${BASE_URL}/popular?api_key=${API_KEY}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="p-4">
      <CategoryTabs category={category} setCategory={setCategory} />

      <div className="flex overflow-x-auto gap-4 py-4 scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[150px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/150x225?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-auto"
            />
            <div className="p-2 bg-gray-800 text-white text-sm font-medium">
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
