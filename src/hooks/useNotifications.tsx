import { useCallback } from "react";
import { PermissionsAndroid } from "react-native";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export const useNotifications = () => {
  const requestPermissions = useCallback(async () => {
    try {
      // Request Android permissions
      const androidPermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      // Request Firebase permissions
      const authStatus = await messaging().requestPermission();
      const enabledFirebase =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      return enabledFirebase && androidPermissionStatus; // returs true if permissions are granted
    } catch (error) {
      console.error("Error requesting permissions:", error);
    }
  }, []);

  const getFCMToken = useCallback(async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("Your Firebase Token:", fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.error("Failed to get FCM token:", error);
    }
  }, []);

  const handleForegroundNotification = async (remoteMessage: any) => {
    console.log("Received foreground message:", remoteMessage);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title || "New Message",
        body: remoteMessage.notification?.body,
        data: remoteMessage.data
      },
      trigger: null // triggers the notification immediately
    });
  };

  const initializeNotifications = useCallback(async () => {
    try {
      const permissionGranted = await requestPermissions();

      if (!permissionGranted) {
        console.error(
          "Permission not granted, notifications cannot be set up."
        );
        return;
      }

      await getFCMToken(); // console logs the token if permissions are granted

      // Listen for foreground notifications
      const listenForForegroundNotifications = messaging().onMessage(
        handleForegroundNotification
      );

      // Check if app was launched from a notification
      const notificationThatOpenedApp =
        await messaging().getInitialNotification();
      if (notificationThatOpenedApp) {
        console.log("App opened from quit state:", notificationThatOpenedApp);
        // Initial navigation logic can be handled here or through a callback
      }

      // Handle notification open events
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log("Notification opened app:", remoteMessage);
        // Navigation logic can be handled here or through a callback
      });

      return listenForForegroundNotifications;
    } catch (error) {
      console.error("Error setting up notifications:", error);
    }
  }, [requestPermissions]);

  return {
    initializeNotifications,
    getFCMToken,
    requestPermissions
  };
};
