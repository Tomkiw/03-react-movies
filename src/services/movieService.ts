import { type Movie } from "../types/movie";
import axios from "axios";
const key = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  results: Movie[];
}

const api = axios.create({
  //створення Екземлпяра тому що чи часто використовуємо один і тоай самий токен !
  baseURL: "https://api.themoviedb.org/3/search/movie",
  headers: { Authorization: `Bearer ${key}` }, // підключаємо ключ
});

export const fetchMovies = async (nameMovie: string): Promise<Movie[]> => {
  const response = await api.get<TMDBResponse>("", {
    params: {
      query: nameMovie, //обовязоковий параметр для нашого запиту
    },
  });

  return response.data.results;
};
