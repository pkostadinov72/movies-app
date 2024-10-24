import React from "react";
import { View, StyleSheet } from "react-native";
import FacebookAuthButton from "../components/FacebookAuthButton";

export default function Login() {
  return (
    <View style={styles.container}>
      <FacebookAuthButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
