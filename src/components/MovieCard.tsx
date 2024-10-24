import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MoviesStackParamList } from "../navigation/MoviesStack";

type MoviesScreenNavigationProp = NativeStackNavigationProp<
  MoviesStackParamList,
  "Movies"
>;

const MovieCard = ({ movie }) => {
  const navigation = useNavigation<MoviesScreenNavigationProp>();

  const goToMovieDetails = () => {
    navigation.navigate("MovieDetails", { movieId: movie.id });
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={goToMovieDetails}>
      <View style={styles.card}>
        <Image source={{ uri: movie.image }} style={styles.cover} />
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
          <Text style={styles.genre}>{movie.genre}</Text>
          <Text style={styles.rating}>Rating: {movie.rating}/10</Text>
          <Text style={styles.description} numberOfLines={3}>
            {movie.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cover: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  info: {
    flex: 2,
    padding: 12
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4
  },
  year: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2
  },
  genre: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f39c12",
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8
  }
});

export default MovieCard;
