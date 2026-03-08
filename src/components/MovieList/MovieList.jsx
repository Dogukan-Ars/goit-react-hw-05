import { Link, useLocation } from "react-router-dom";
import noPoster from "../../assets/noPoster.png";
import styles from "./MovieList.module.css";

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const PLACEHOLDER = noPoster;

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
                                onError={(e) => {
                                    e.target.src = PLACEHOLDER;
                                }}
                            />

                            {movie.vote_average > 0 && (
                                <span className={styles.rating}>
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </span>
                            )}

                            <div className={styles.overlay}>
                                <div className={styles.content}>
                                    <h3 className={styles.title}>{movie.title}</h3>

                                    <div className={styles.meta}>
                                        <span>{movie.release_date?.slice(0, 4)}</span>
                                    </div>

                                    <p className={styles.overview}>
                                        {movie.overview
                                            ? movie.overview.slice(0, 120) + "..."
                                            : "No description available."}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default MovieList;
