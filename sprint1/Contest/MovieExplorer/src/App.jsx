import React, { useState } from 'react';
import CategoryTabs from './components/CategoryTabs';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import MovieCard from './components/MovieCard';
import BackToTop from './components/BackToTop';
import EmptyState from './components/EmptyState';
import useMovies from './hooks/useDebounce';

export default function App() {
  const [category, setCategory] = useState('trending');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ year: '', rating: '', language: '' });

  const { movies, loading } = useMovies(category, search, filters);

  // Helper function: Split movies into chunks of 5
  const chunkMovies = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const movieRows = chunkMovies(movies, 5);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 Movie Explorer</h1>

      {/* Search & Filters */}
      <SearchBar search={search} setSearch={setSearch} />
      <CategoryTabs category={category} setCategory={setCategory} />
      <Filters filters={filters} setFilters={setFilters} />

      {/* Movies Rows */}
      {loading ? (
        <p className="text-center text-lg mt-6">Loading...</p>
      ) : movies.length === 0 ? (
        <EmptyState message="No movies found. Try another search or filter." />
      ) : (
        <div className="flex flex-col gap-6">
          {movieRows.map((row, idx) => (
            <div key={idx} className="flex gap-4 overflow-x-auto scrollbar-hide">
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
  );
}
