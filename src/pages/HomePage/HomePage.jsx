import { useEffect, useState } from "react"
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader"
import { getTrendingMovies } from "../../services/moviesApi";
import styles from "./HomePage.module.css"

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadTrendingMovies = async () => {
            try {
                setLoading(true);
                setError(false);

                const trendingMovies = await getTrendingMovies();
                setMovies(trendingMovies);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        loadTrendingMovies();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <section className={styles.hero}>
                    <h1 className={styles.title}>
                        Trending Today
                    </h1>
                    <p className={styles.subtitle}>
                        Discover the most popular movies right now.
                    </p>
                </section>

                {loading && <Loader />}
                {error && (
                    <p className={styles.error}>
                        Something went wrong.
                    </p>
                )}

                {!loading && !error && (
                    <MovieList movies={movies} />
                )}
            </div>
        </div>
    )
}

export default HomePage