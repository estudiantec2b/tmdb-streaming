const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const GENRE_IDS = {
  popular: null,        // usa /movie/popular
  top_rated: null,      // usa /movie/top_rated
  upcoming: null,       // usa /movie/upcoming
  now_playing: null,    // usa /movie/now_playing
  action: 28,
  comedy: 35,
  drama: 18,
  thriller: 53,
  animation: 16,
};

export const getMoviesByCategory = async (category, page = 1) => {
  const genreId = GENRE_IDS[category];
  let url;

  if (genreId) {
    // Películas por género
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&page=${page}&with_genres=${genreId}`;
  } else {
    // Categorías generales de películas
    url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=es-ES&page=${page}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Error al obtener las películas por categoría: ${errorDetails}`);
  }

  return (await response.json()).results;
};
