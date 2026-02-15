import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const PLACEHOLDER =
    "https://via.placeholder.com/500x500?text=No+Image+Available";

const MovieList = ({ movies }) => {
    const location = useLocation();

    return (
        <ul className={styles.list}>
            {movies.map(movie => {
                const poster = movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : PLACEHOLDER;

                return (
                    <li key={movie.id}>
                        <Link
                            to={`/movies/${movie.id}`}
                            state={{ from: location }}
                            className={styles.card}
                        >
                            <img
                                src={poster}
                                alt={movie.title}
                                className={styles.poster}
                            />

                            {movie.vote_average > 0 && (
                                <span className={styles.rating}>
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </span>
                            )}

                            <div className={styles.overlay}>
                                <h3 className={styles.title}>
                                    {movie.title}
                                </h3>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default MovieList;
