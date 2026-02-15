import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom"
import { getMovieDetails } from "../../services/moviesApi";

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
        <div>
            {/* Back link */}
            <Link to={backLink.current}>← Back to Movies</Link>

            <hr />

            <h2>{title}</h2>

            {poster_path && (
                <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={title}
                    width="300"
                />
            )}

            <p>{overview}</p>

            <p>{release_date}</p>

            <h3>Genres</h3>
            <ul>
                {genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>

            <hr />

            {/* Nested navigation */}

            <nav>
                <NavLink to="cast">Cast</NavLink>{' | '}
                <NavLink to="reviews">Reviews</NavLink>
            </nav>

            <Link to="cast" state={{ from: location }}>Cast</Link>
            <Link to="reviews" state={{ from: location }}>Reviews</Link>
            <hr />
            <Outlet />
        </div>
    )
}

export default MovieDetailPage