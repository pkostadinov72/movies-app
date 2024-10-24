import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RootStack from "./src/navigation/RootStack";
import { AuthProvider } from "./src/contexts/auth-context";
import { NavigationContainer } from "@react-navigation/native";
import { Settings } from "react-native-fbsdk-next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNotifications } from "./src/hooks/useNotifications";

const queryClient = new QueryClient();

Settings.initializeSDK(); // Initialize the Facebook SDK here

export default function App() {
  const { initializeNotifications } = useNotifications();

  useEffect(() => {
    initializeNotifications(); // Call initializeNotifications here without calling it in the dependency array
  }, [initializeNotifications]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <RootStack />
            <StatusBar style="auto" />
          </View>
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
