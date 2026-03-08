import css from "./App.module.css";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // state modal window! if close = null

  const handleSearch = async (topic: string) => {
    setMovies([]); //Очищає попередні результати пошуку
    setIsError(false); //Скидає помилку
    setIsLoading(true); // Вмикає індикатор завантаження Лоадер

    try {
      const data = await fetchMovies(topic);

      if (data.length === 0) {
        toast.error("No movies found for your request."); //Показуємо сповіщення
      } else {
        setMovies(data);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {/* onSubmit={handleSearch} — це пропс, через який App дає SearchBar-у 
          функцію, щоб SearchBar міг передати текст пошуку наверх */}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie !== null && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <Toaster />
    </div>
  );
}
