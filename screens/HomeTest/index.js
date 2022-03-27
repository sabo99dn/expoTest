import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingCircle from "../../components/LoadingCircle";
import * as Notifications from "expo-notifications";

import useBackHandle from "../../hook/useBackHandle";

//redux
import { useDispatch, useSelector } from "react-redux";

const HomeTest = ({ route }) => {
  console.log("Home_Test");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const webView = useRef(null);
  const [token, setToken] = useState();
  const getToken = async () => {
    setToken((await Notifications.getExpoPushTokenAsync()).data);
  };

  useNotifications();
  useEffect(() => {
    getToken();
  }, []);
  const handleBackPressedWebView = () => {
    if (webView?.current?.canGoBack) {
      webView?.current?.goBack();
      return true;
    } else {
      return true;
    }
  };
  useBackHandle(handleBackPressedWebView);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {loading ? <LoadingCircle /> : null}
      </View>
      <WebView
        ref={webView}
        injectedJavaScript={injectedJavascript}
        source={{
          uri: "http://45cm.com/vn",
        }}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes("45cm.com/vn/account/")) {
            sendPushNotification("ExponentPushToken[Hrjr8kPW_W-hw6emRRdeiO]")
            webView.current.postMessage(
              JSON.stringify({ token_device: token })
            );
          }
        }}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoad={() => {
          setLoading(false);
        }}
        onMessage={(event) => {
          const result = JSON.parse(event.nativeEvent.data);
          console.log(result);
        }}
      />
    </SafeAreaView>
  );
};

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  const a = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  console.log(message)
}

const injectedJavaScriptFunction = () => {
  if (Platform.OS === "ios") {
    return jsCode;
  }
  if (Platform.OS === "android") {
    return injectedJavascript;
  }
};

const injectedJavascript = `(function(){
  document.addEventListener('message',(msg) =>handle(msg))
  async function handle(msg){
    var text = JSON.parse(msg.data);
    if(text){

      const message = {
        to: text.token_device,
        sound: 'sound',
        title: 'title',
        body: 'body',
        data: 'data',
      };

      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      window.ReactNativeWebView.postMessage(JSON.stringify({message}))

    }

  }
})()`;
const jsCode = `
    setTimeout(() => {
          window.ReactNativeWebView.postMessage(JSON.stringify({status: "SUCCESS" }))
          document.getElementById("emailLogin").value = text.email;
          document.getElementById("passwordLogin").value = text.password;
          document.forms["formLogin"].submit();
    }, 100);
`;

export default HomeTest;
