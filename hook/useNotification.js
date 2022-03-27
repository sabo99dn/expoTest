import React, { useEffect, useState, useRef } from "react";
import { Linking } from "react-native";
import { registerForPushNotificationsAsync } from "../utils/PushNotify";
import * as Notifications from "expo-notifications";

import RootNavigation from "../navigation/RootNavigation";
import { useNavigation } from "@react-navigation/native";

import routes from "../config/routes";

export default useNotifications = () => {
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      console.log("tokenDevice:", token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data) {
          if (data.product) {
            navigation.navigate(
              routes.MainStack.screens.ProductDetail.name,
              data.product
            );
          }
          if (data.type === "MAIL") {
            Notifications.addNotificationResponseReceivedListener(() => {
              Linking.openURL("https://mail.google.com/");
            });
          }
        } else {
          navigation.navigate(
            routes.MainStack.screens.Tab.screens.Notification.name
          );
        }
      });
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
};
