import { AccessToken, LoginButton } from "react-native-fbsdk-next";
import { useAuth } from "../contexts/auth-context";
import React from "react";

const FacebookAuthButton = () => {
  const { login, logout } = useAuth();

  return (
    <LoginButton
      onLoginFinished={(error, result) => {
        if (error) {
          console.log("login has error: " + result.error);
        } else if (result.isCancelled) {
          console.log("login is cancelled.");
        } else {
          try {
            AccessToken.getCurrentAccessToken().then((data) => {
              if (data?.accessToken) {
                login(data?.accessToken.toString());
              } else {
                throw Error("Missing access token.");
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      }}
      onLogoutFinished={logout}
    />
  );
};

export default FacebookAuthButton;
