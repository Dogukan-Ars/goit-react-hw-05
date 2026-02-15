import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/moviesApi";
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(false);

                const data = await getMovieReviews(movieId);
                setReviews(data);
            } catch (err) {
                setError(true);
                console.error('Error fetching movie reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading movie reviews.</div>;
    if (reviews.length === 0) return <div>No reviews available for this movie.</div>;

    return (
        <ul className={styles.list}>
            {reviews.map(({ id, author, content }) => (
                <li key={id} className={styles.item}>
                    <h4 className={styles.title}>Author: {author}</h4>
                    <p className={styles.content}>{content}</p>
                </li>
            ))}
        </ul>
    )
}

export default MovieReviews