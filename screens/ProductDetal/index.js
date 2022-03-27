import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import {SafeAreaView} from 'react-native-safe-area-context'

import Icon from "react-native-vector-icons/Entypo";

import useBackHandle from "../../hook/useBackHandle";

const ProductDetail = ({route}) => {
  const navigation = useNavigation();
  const [source, setSource] = useState({uri: route.params});
  const webViewpro = useRef(null);
  const handleBackPressedWebView = () => {
    if (webViewpro?.current?.canGoBack) {
      webViewpro.current?.goBack();
    }else{
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style = {{flex: 1}}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrap}>
          <TouchableOpacity onPress = {handleBackPressedWebView}>
            <Icon name="chevron-left" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>CHI TIẾT SẢN PHẨM</Text>
        </View>
      </SafeAreaView>
      <WebView
        ref = {webViewpro}
        // onLoadEnd = {() => webViewData.postMessage(JSON.stringify(route.params))}
        source={source}
        onNavigationStateChange={(navState) => {
          webViewpro.current.canGoBack = navState.canGoBack;
        }}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  header: {
    height: 85,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 2,
  },
  headerWrap: {
    backgroundColor: "white",
    width: "100%",
    height: 75,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    paddingLeft: 10,
  },
  titleHeader: {
    marginLeft: 70,
    fontSize: 18,
    fontWeight: "700",
  },
});
