import React from "react";
import MovieDetails from "../screens/MovieDetails";
import Movies from "../screens/Movies";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type MoviesStackParamList = {
  Movies: undefined;
  MovieDetails: { movieId: string };
};

const Stack = createNativeStackNavigator<MoviesStackParamList>();

export default function MoviesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
}
