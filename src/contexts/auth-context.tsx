import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";
import * as SecureStore from "expo-secure-store";
import { Profile as FBProfile } from "react-native-fbsdk-next";

interface AuthContextType {
  profile: FBProfile;
  accessToken: string;
  isLoading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  getFbProfile: () => void;
}

const AuthContext = createContext<AuthContextType>({
  profile: {},
  accessToken: "",
  isLoading: true,
  login: () => {},
  logout: () => {},
  getFbProfile: () => {}
});

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState<FBProfile>({});
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const AUTH_KEY = "authStatus";

  const getFbProfile = useCallback(async () => {
    const user = await FBProfile.getCurrentProfile();
    if (user) {
      setProfile(user);
    }
  }, []);

  const getAuthStatus = useCallback(async () => {
    try {
      const storedAuth = await SecureStore.getItemAsync(AUTH_KEY);
      if (storedAuth !== null) {
        setAccessToken(JSON.parse(storedAuth));
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error retrieving auth status from Secure Store:", error);
    }
  }, []);

  const login = useCallback(async (accessToken: string) => {
    try {
      await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(accessToken));
      setAccessToken(accessToken);
      setIsLoading(false);
    } catch (error) {
      console.log("Error saving auth status to Secure Store:", error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync(AUTH_KEY);
      setAccessToken("");
      setIsLoading(false);
    } catch (error) {
      console.log("Error clearing auth status from Secure Store:", error);
    }
  }, []);

  useEffect(() => {
    getAuthStatus();
    getFbProfile();
  }, [getAuthStatus]);

  return (
    <AuthContext.Provider
      value={{ profile, accessToken, isLoading, login, logout, getFbProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
