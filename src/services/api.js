const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMoviesByCategory = async (category, page = 1) => {
  try {
    const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=es-ES&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error al obtener las películas por categoría: ${JSON.stringify(error)}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener películas por categoría:", error);
    throw error;
  }
};
