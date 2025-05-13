import React, { useEffect, useState } from 'react';
import { getMoviesByCategory } from '../services/api';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'popular', name: 'Populares' },
    { id: 'top_rated', name: 'Mejor valoradas' },
    { id: 'upcoming', name: 'Próximamente' },
    { id: 'action', name: 'Acción' },
    { id: 'comedy', name: 'Comedia' },
    { id: 'drama', name: 'Drama' },
    { id: 'thriller', name: 'Suspenso' },
    { id: 'animation', name: 'Animación' },
  ];


  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setCurrentPage(1);  // Reseteamos la página cuando cambia la categoría
  };

  useEffect(() => {
  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await getMoviesByCategory(category, currentPage);
      if (currentPage === 1) {
        setMovies(data);  // Al cambiar de categoría, reseteamos las películas
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data]);  // Cargar más películas
      }
    } catch (error) {
      console.error('Error al cargar las películas:', error);
    } finally {
      setLoading(false);
    }
  };

  loadMovies();
}, [category, currentPage]);


  const loadMoreMovies = () => {
    setCurrentPage((prevPage) => prevPage + 1);  // Cargamos la siguiente página
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="home">
      <div className="category-dropdown">
        <select value={category} onChange={handleCategoryChange}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No se encontraron películas.</p>
        )}
      </div>

      <button onClick={loadMoreMovies} disabled={loading}>
        {loading ? 'Cargando...' : 'Cargar más películas'}
      </button>
    </div>
  );
};

export default Home;
