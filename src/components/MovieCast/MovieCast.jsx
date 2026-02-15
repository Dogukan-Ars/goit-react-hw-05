import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCasts } from '../../services/moviesApi';
import style from './MovieCast.module.css';

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/200x300?text=No+Image";

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!movieId) return;

        const getCast = async () => {
            try {
                setLoading(true);
                setError(false);

                const data = await getMovieCasts(movieId);
                setCast(data);
            } catch (err) {
                setError(true);
                console.error('Error fetching movie cast:', err);
            } finally {
                setLoading(false);
            }
        };

        getCast();
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading movie cast.</div>;
    if (!cast.length) return <div>No cast information available.</div>;

    return (
        <ul className={style.list}>
            {cast.map(({ id, name, character, profile_path }) => (
                <li key={id} className={style.item}>
                    <img src={profile_path ?
                        `${IMAGE_BASE_URL}${profile_path}`
                        : PLACEHOLDER_IMAGE_URL
                    } alt={name} width="120" className={style.image}
                    />

                    <p className={style.name}><strong>{name}</strong></p>
                    <p className={style.character}>as {character}</p>
                </li>
            ))}
        </ul>
    )
}

export default MovieCast