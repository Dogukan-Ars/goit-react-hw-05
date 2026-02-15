import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader"
import { searchMovies } from "../../services/moviesApi";
import styles from "./MoviesPage.module.css"

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [inputValue, setInputValue] = useState(query);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // URL query parametresine göre film arama işlemi burada yapılabilir
  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        // Film arama API çağrısı burada yapılabilir
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        setError(true);
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query])

  // Arama formu gönderildiğinde URL query parametresini güncelle
  const handleSubmit = e => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    setSearchParams({ query: inputValue.trim() });
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Search Movies</h1>
          <p className={styles.subtitle}>
            Find your favorite films instantly.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className={styles.searchForm}
        >
          <input
            type="text"
            value={inputValue}
            onChange={e =>
              setInputValue(e.target.value)
            }
            placeholder="Search for a movie..."
            className={styles.input}
          />

          <button
            type="submit"
            className={styles.button}
          >
            Search
          </button>
        </form>

        {loading && <Loader />}
        {error && (
          <p className={styles.error}>
            Something went wrong.
          </p>
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}

        {!loading && !error && query && movies.length === 0 && (
          <p className={styles.empty}>
            No results found.
          </p>
        )}
      </div>
    </div>
  )
}

export default MoviesPage