import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FacebookAuthButton from "../components/FacebookAuthButton";
import { useAuth } from "../contexts/auth-context";

const Profile = () => {
  const { profile } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {profile?.imageURL && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: profile.imageURL }} style={styles.image} />
          </View>
        )}

        <Text style={styles.label}>First Name</Text>
        <Text style={styles.info}>{profile?.firstName}</Text>

        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.info}>{profile?.lastName}</Text>

        {/* On Android, the email field doesn't get retrieved even if the [..., 'email', ...] permission will be request. In fact, the email field doesn't exist in the native Java SDK provided by Facebook at the moment */}
        <Text style={styles.label}>Email</Text>
        <Text style={styles.info}>{profile?.email}</Text>
      </View>
      <View style={styles.logoutButton}>
        <FacebookAuthButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    fontWeight: "bold"
  },
  info: {
    fontSize: 18,
    color: "#666",
    marginBottom: 15
  },
  logoutButton: {
    alignItems: "center"
  },
  imageContainer: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 40
  }
});

export default Profile;
