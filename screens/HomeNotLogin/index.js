import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingCircle from "../../components/LoadingCircle";

import useBackHandle from "../../hook/useBackHandle";
import ModalLoading from "../../components/ModalLoading";
import routes from "../../config/routes";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions } from "../../Redux/Auth/Reducer";
import { actions as homeActions } from "../../Redux/Home/Reducer";
import * as homeSelectors from "../../Redux/Home/Selector";

const HomeNotLogin = ({ route }) => {
  console.log('Home_not_login')
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const webView = useRef(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [url, setUrl] = useState("http://45cm.com/vn")
  const visible = useSelector((state) => homeSelectors.splash(state));
  const handleBackPressedWebView = () => {
    if (webView?.current?.canGoBack) {
      
      webView?.current?.goBack();
      return true;
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (
      currentUrl === "http://45cm.com/vn"
    ) {
      let set = setTimeout(() => {
        dispatch(homeActions.renderSplash(false));
      }, 2000);
      return () => {
        clearTimeout(set);
      };
    }
  }, [currentUrl]);
  useBackHandle(handleBackPressedWebView);
  const reset = () => {
    dispatch(authActions.resetData());
    dispatch(homeActions.resetData());
  };
  const onMessage = (event) => {
    const result = JSON.parse(event.nativeEvent.data);
    switch (result?.action) {
      case "LOGOUT": {
        reset();
        break;
      }
      case "LOGIN": {
        reset();
        navigation.navigate(routes.AuthStack.name);
        break;
      }
      case "REGISTER": {
        reset();
        navigation.navigate(routes.AuthStack.name);
        break;
      }
    }
  };
  console.log(useSelector(state => homeSelectors.webUrl(state)));
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
        source={{
          uri: url,
        }}
        onNavigationStateChange={(navState) => {
          webView.current.canGoBack = navState.canGoBack;
          setCurrentUrl(navState.url);
          if (
            navState.canGoBack &&
            navState.url.includes("45cm.com/vn/account/")
          ) {
            navigation.navigate(routes.AuthStack.name);
          }else{
            if(navState.url !== "http://45cm.com/vn"){
              dispatch(homeActions.setUrl(navState.url));
            }
          }
        }}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoad={() => {
          setLoading(false);
        }}
        onMessage={onMessage}
      />
      <ModalLoading visible={visible} />
    </SafeAreaView>
  );
};

export default HomeNotLogin;
