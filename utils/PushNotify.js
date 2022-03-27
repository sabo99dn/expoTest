import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  //config notification
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
//function push notification()
// INPUT: {
//  string  expoPushtoken - token device
//  string  title notification
//  string  body - content notificaion
//  json    data - can null
//  string  sound - can null
export async function sendPushNotification(
  expoPushToken,
  title,
  body,
  data,
  sound = "default"
) {
  const message = {
    to: expoPushToken,
    sound: sound,
    title: title,
    body: body,
    data: data,
  };

  //Api expo push notificaion
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
//funtion handle push notification
//OUTPUT: a promise(token device)
export async function registerForPushNotificationsAsync() {
  let token;
  //check device - push notiification not working in emulator
  if (Constants.isDevice) {

    //check permission Notification
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // request notificaition permission
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // alert when not have notificaion permission
    if (finalStatus !== "granted") {
      // alert("Failed to get push token for push notification!");
      return;
    }

    //get device token
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  //config notification android
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
