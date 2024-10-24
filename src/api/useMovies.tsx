import { useQuery } from "@tanstack/react-query";

const fetchMovies = async () => {
  try {
    const response = await fetch(`${process.env.MOVIES_API_URL}/movies`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const fetchMovieById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.MOVIES_API_URL}/movies/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};

export const useMovies = () => {
  const useGetAllMovies = () => {
    return useQuery({
      queryKey: ["movies"],
      queryFn: fetchMovies
    });
  };

  const useGetMovieById = (id: string) => {
    return useQuery({
      queryKey: ["movie", id],
      queryFn: () => fetchMovieById(id),
      enabled: !!id
    });
  };

  return {
    useGetAllMovies,
    useGetMovieById
  };
};
