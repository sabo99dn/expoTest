import React, { useState, useEffect, useRef } from "react";
import { Platform, View } from "react-native";
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
import * as authSelectors from "../../Redux/Auth/Selector";
import { actions as homeActions } from "../../Redux/Home/Reducer";
import * as homeSelectors from "../../Redux/Home/Selector";

const Home = ({ route }) => {
  console.log("Home_login");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const webView = useRef(null);
  const account = useSelector((state) => authSelectors.login(state));
  const [currentUrl, setCurrentUrl] = useState("");
  const [loginWebStatus, setLoginWebStatus] = useState("");
  const visible = useSelector((state) => homeSelectors.splash(state));
  const tempUrl = useSelector((state) => homeSelectors.webUrl(state));
  const loginInWeb = useSelector((state) => homeSelectors.loginInWeb(state));
  const handleBackPressedWebView = () => {
    if (webView?.current?.canGoBack) {
      webView?.current?.goBack();
      return true;
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (currentUrl === "trang chủ của trang web") {
      let set = setTimeout(() => {
        dispatch(homeActions.renderSplash(false));
      }, 2000);
      return () => {
        clearTimeout(set);
      };
    }
  }, [currentUrl]);
  useEffect(() => {
    if (loginWebStatus === "SUCCESS") {
      dispatch(homeActions.loginInWeb(true));
    }
  }, [loginWebStatus]);
  useBackHandle(handleBackPressedWebView);
  const reset = () => {
    dispatch(authActions.resetData());
    dispatch(homeActions.resetData());
  };
  const onMessage = (event) => {
    //nhận action từ web trả về
    // khi ấn vào nút logout, login, register trên web => possMessage về app => app xử lý logic ở đây -- dev app và web tự quy định với nhau
    //

    const result = JSON.parse(event.nativeEvent.data);
    setLoginWebStatus(result?.status);
    console.log(result);
    switch (result?.action) {
      case "LOGOUT": {
        navigation.navigate(routes.HomeStack.name);
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
  const injectedJavaScriptFunction = () => {
    if (Platform.OS === "ios") {
      return jsCode;
    }
    if (Platform.OS === "android") {
      return injectedJavascript;
    }
  };
  // window.ReactNativeWebView.postMessage(JSON.stringify({status: "SUCCESS" }))
  // dòng này là gửi lên app 1 params là đã đăng nhập thành công --  dev app và web tự quy định với nhau
  const injectedJavascript = `(function(){
    window.ReactNativeWebView.postMessage(JSON.stringify({status: "SUCCESS" }))
    document.addEventListener('message', function(msg){
    var text = JSON.parse(msg.data);
    if(text.data === 'SUCCESS'){
      document.getElementById("emailLogin").value = text.account.email;
      document.getElementById("passwordLogin").value = text.account.password;
      document.forms["formLogin"].submit();
      
  }
    })
  })()`;

  // hàm giải pháp đăng nhập cho IOS không nhận được data post từ app gửi xuông
  // hơi phèn nhưng nó work
  // nếu nó không hoạt động thì tăng time của setTimeout lên
  const jsCode = `
      setTimeout(() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({status: "SUCCESS" }))
            var text = {email: "${account?.email}", password: "${account?.password}"};
            document.getElementById("emailLogin").value = text.email;
            document.getElementById("passwordLogin").value = text.password;
            document.forms["formLogin"].submit();
      }, 100);
  `;
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
        injectedJavaScript={injectedJavaScriptFunction()}
        ref={webView}
        source={{
          uri: loginInWeb
            ? tempUrl
              ? tempUrl
              : "trang chủ của trang web"
            : "trang login",
        }}
        onNavigationStateChange={(navState) => {
          webView.current.canGoBack = navState.canGoBack;
          setCurrentUrl(navState.url);
          if (
            navState.canGoBack &&
            navState.url.includes("trang login")
          ) {
            navigation.navigate(routes.AuthStack.name);
          }
        }}
        onLoadStart={() => {
          setLoading(true);
        }}
        // cái này là khi trang web đang được load thì app post xuống web account đăng nhập 
        // => web lấy data => đẩy vào field và login
        // chỉ hoạt động trên android
        // đã test trên các IOS đời cao(12,13) => không nhận được data post ở đây gửi xuống
        // giải pháp ở hàm injectedJavascript
        onLoad={() => {
          setLoading(false);
          webView.current.postMessage(
            JSON.stringify({ data: "SUCCESS", account: { ...account } })
          );
        }}
        // hàm nhận message từ web gửi lên
        onMessage={onMessage}
      />
      <ModalLoading visible={visible} />
    </SafeAreaView>
  );
};

export default Home;
