import { useEffect, useState } from "react";
import { fetchMovies } from "../utils/api";

export default function useMovies(category, search, filters) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchMovies(category, search, filters)
      .then((data) => {
        if (isMounted) {
          setMovies(data.results || []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMovies([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [category, search, filters]);

  return { movies, loading };
}
