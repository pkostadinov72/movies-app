import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import { useAuth } from "../contexts/auth-context";
import Login from "../screens/Login";
import Loader from "../components/Loader";

type RootStackParamList = {
  home: undefined;
  login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { accessToken, isLoading } = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!isLoading) {
      if (accessToken) {
        navigation.navigate("home");
      } else {
        navigation.navigate("login");
      }
    }
  }, [accessToken, isLoading, navigation]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      {accessToken ? (
        <Stack.Screen
          name="home"
          component={AppTabs}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
