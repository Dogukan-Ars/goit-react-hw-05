import axios from 'axios';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const ACCESS_KEY = import.meta.env.VITE_TMDB_TOKEN;


const tmdbApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        // api_read_access_token yerine kendi tokeninizi yerleştirin
        Authorization: `Bearer ${ACCESS_KEY}`,
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        language: 'en-US',
        include_adult: false,
    }
});

// Trending Movies (HomePage)
export const getTrendingMovies = async () => {
    try {
        const { data } = await tmdbApi.get('/trending/movie/day');
        return data.results;
    } catch (error) {

        console.error('Error fetching trending movies:', error);
        throw error;
    }
}

// Movie Search (MoviesPage)
export const searchMovies = async (query, page = 1) => {
    if (!query) return [];

    const { data } = await tmdbApi.get('/search/movie', {
        params: {
            query, page
        },
    });
    return data.results;
}

// Movie Details (MovieDetailsPage)
export const getMovieDetails = async (movieId) => {
    const { data } = await tmdbApi.get(`/movie/${movieId}`);
    return data;
}

// Movie Casts (MovieCasts)
export const getMovieCasts = async (movieId) => {
    const { data } = await tmdbApi.get(`/movie/${movieId}/credits`);
    return data.cast;
}

// Movie Reviews (MovieReviews)
export const getMovieReviews = async (movieId, page = 1) => {
    const { data } = await tmdbApi.get(`/movie/${movieId}/reviews`, {
        params: { page }
    });

    return data.results;
}