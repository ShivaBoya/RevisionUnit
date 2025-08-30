import React, { useState } from 'react';
import CategoryTabs from './components/CategoryTabs';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import MovieCard from './components/MovieCard';
import BackToTop from './components/BackToTop';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import useMovies from './hooks/useDebounce';

export default function App() {
  const [category, setCategory] = useState('trending');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ year: '', rating: '', language: '' });

  const { movies: fetchedMovies, loading } = useMovies(category, search, filters);

  const filteredMovies = fetchedMovies
    .filter((movie) =>
      filters.year ? new Date(movie.release_date).getFullYear() === Number(filters.year) : true
    )
    .filter((movie) => (filters.rating ? movie.vote_average >= Number(filters.rating) : true))
    .filter((movie) =>
      filters.language ? movie.original_language === filters.language : true
    );

  const chunkMovies = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const movieRows = chunkMovies(filteredMovies, 5);

  return (
    <div className="w-full bg-gray-900 min-h-screen text-gray-200">
      <div className="container mx-auto px-4 pt-16">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">🎬 Movie Explorer</h1>

        <div className="flex flex-col gap-4 md:gap-6 mb-6">
          <SearchBar search={search} setSearch={setSearch} />
          <CategoryTabs category={category} setCategory={setCategory} />
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {loading ? (
          <p className="text-center text-lg mt-6">Loading...</p>
        ) : filteredMovies.length === 0 ? (
          <EmptyState message="No movies found. Try another search or filter." />
        ) : (
          <div className="flex flex-col gap-8">
            {movieRows.map((row, idx) => (
              <div key={idx} className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                {row.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex-shrink-0 w-40 md:w-48 lg:w-56 hover:scale-105 transform transition-transform"
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <BackToTop />
      </div>

      <Footer />
    </div>
  );
}
