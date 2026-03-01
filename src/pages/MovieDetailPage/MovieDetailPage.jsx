import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import { getMovieDetails } from "../../services/moviesApi";
import styles from './MovieDetailPage.module.css';

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const location = useLocation();

    // Geri dönüş için önceki sayfanın yolunu al
    const backLink = useRef(location.state?.from ?? '/movies');

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError(false);

                const results = await getMovieDetails(movieId);
                setMovie(results);
            } catch (err) {
                setError(true);
                console.error('Error fetching movie details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();

    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading movie details.</div>;
    if (!movie) return null;

    const { title, overview, poster_path, release_date, genres = [] } = movie;

    return (
        <div className={styles.container}>
            {/* Back link */}
            <p className={styles.backLink}>
                <Link to={backLink.current}>← Back to Movies</Link>
            </p>

            <div className={styles.topSection}>
                {poster_path && (
                    <img
                        src={`${IMAGE_BASE_URL}${poster_path}`}
                        alt={title}
                        className={styles.poster}
                    />
                )}

                <div className={styles.info}>
                    <h1 className={styles.title}>
                        {title}{" "}
                        <span className={styles.year}>
                            ({release_date?.slice(0, 4)})
                        </span>
                    </h1>

                    <div className={styles.genres}>
                        {genres.map(genre => (
                            <span key={genre.id} className={styles.genreTag}>
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <hr className={styles.divider} />

                    <p className={styles.overview}>{overview}</p>

                    {/* Buraya ileride rating + yorum alanı gelecek */}
                </div>
            </div>
            <div className={styles.bottomSection}>

                <div className={styles.tabs}>
                    <Link
                        to={`/movies/${movieId}/cast`}
                        state={{ from: location.state?.from }}
                        className={styles.tab}
                    >
                        Cast
                    </Link>

                    <Link
                        to={`/movies/${movieId}/reviews`}
                        state={{ from: location.state?.from }}
                        className={styles.tab}
                    >
                        Reviews
                    </Link>
                </div>


                <div className={styles.tabContent}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MovieDetailPage