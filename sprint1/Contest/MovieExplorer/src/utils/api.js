const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(category, search, filters) {
  let url;

  if (search) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`;
  } else {
    const endpoints = {
      trending: 'movie/now_playing',
      popular: 'movie/popular',
      top_rated: 'movie/top_rated',
      upcoming: 'movie/upcoming',
    };
    url = `${BASE_URL}/${endpoints[category]}?api_key=${API_KEY}`;
  }

  if (filters.year) url += `&primary_release_year=${filters.year}`;
  if (filters.language) url += `&with_original_language=${filters.language}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return await res.json();
}
