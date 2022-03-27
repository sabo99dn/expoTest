import React from "react";
import { Alert, BackHandler } from "react-native";

const createTwoButtonAlert = ({
  alertTitle,
  alertMessage,
  textCancel = "Cancel",
  textOk = "Ok",
  onPressCancel = () => {},
  onPressOK = () => {
    BackHandler.exitApp();
  },
}) => {
  Alert.alert(alertTitle, alertMessage, [
    {
      text: textCancel,
      onPress: onPressCancel,
    },
    { text: textOk, onPress: onPressOK },
  ]);
};

export default createTwoButtonAlert;
