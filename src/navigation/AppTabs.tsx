import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MoviesStack from "./MoviesStack";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName={"MoviesTab"}
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarInactiveTintColor: "#3e2465",
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          paddingBottom: 5,
          paddingTop: 10,
          height: 60,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12
        }
      }}
    >
      <Tab.Screen
        name="MoviesTab"
        component={MoviesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "film" : "film-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color,
                fontSize: 14,
                fontWeight: focused ? "bold" : "normal",
                marginBottom: 3
              }}
            >
              Movies
            </Text>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text
              style={{
                color,
                fontSize: 14,
                fontWeight: focused ? "bold" : "normal",
                marginBottom: 3
              }}
            >
              Profile
            </Text>
          )
        }}
      />
    </Tab.Navigator>
  );
}
