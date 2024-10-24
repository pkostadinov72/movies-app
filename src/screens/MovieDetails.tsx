import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useMovies } from "../api/useMovies";
import Loader from "../components/Loader";

const MovieDetails = () => {
  const route = useRoute();
  const { movieId } = route.params;

  const { useGetMovieById } = useMovies();
  const { data: movie, isLoading: isMovieLoading } = useGetMovieById(movieId);

  const openIMDb = () => {
    Linking.openURL(movie.imdb_url);
  };

  if (isMovieLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.image }} style={styles.cover} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>{movie.year}</Text>
        <Text style={styles.genre}>{movie.genre}</Text>
        <Text style={styles.rating}>Rating: {movie.rating}/10</Text>
        <Text style={styles.description}>{movie.description}</Text>
        <TouchableOpacity style={styles.imdbButton} onPress={openIMDb}>
          <Text style={styles.imdbButtonText}>View on IMDb</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  cover: {
    flex: 1,
    width: "100%",
    height: 300,
    resizeMode: "contain"
  },
  infoContainer: {
    padding: 16,
    flex: 2
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8
  },
  year: {
    fontSize: 18,
    color: "#666",
    marginBottom: 4
  },
  genre: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f39c12",
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    lineHeight: 24
  },
  imdbButton: {
    marginTop: 8,
    backgroundColor: "#f3ce13",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center"
  },
  imdbButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default MovieDetails;
