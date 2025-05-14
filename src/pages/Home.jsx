import React, { useEffect, useState } from "react";
import { getMoviesByCategory } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";

const categories = {
  popular: "Populares",
  top_rated: "Mejor valoradas",
  upcoming: "Próximamente",
};

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadMovies(selectedCategory, 1, true);
  }, [selectedCategory]);

  const loadMovies = async (category, page = 1, reset = false) => {
    setLoading(true);
    try {
      const data = await getMoviesByCategory(category, page);
      if (reset) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Error al cargar las películas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLoadMore = () => {
    loadMovies(selectedCategory, currentPage + 1);
  };

  return (
    <div className="home">
      <div className="category-dropdown">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {Object.entries(categories).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {loading && currentPage === 1 ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {loading ? (
            <p>Cargando más...</p>
          ) : (
            <button onClick={handleLoadMore}>Cargar más</button>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
