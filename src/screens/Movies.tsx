import React, { useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../api/useMovies";
import Loader from "../components/Loader";

export default function Movies() {
  const { useGetAllMovies } = useMovies();
  const { data: movies, isLoading: isMoviesLoading } = useGetAllMovies();

  const renderMovieCard = ({ item }) => <MovieCard movie={item} />;

  if (isMoviesLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 50
  },
  list: {
    padding: 16
  }
});
