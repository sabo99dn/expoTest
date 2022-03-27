import React, { useState } from "react";
import { View, Modal, StyleSheet, StatusBar, Image, Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const ModalLoading = ({ visible = true }) => {
  return (
    <View>
      <StatusBar hidden={visible} />
      <AnimatedLoader
        visible={visible}
        overlayColor="white"
        source={require("./loading.json")}
        animationStyle={{ width: 100, height: 100 }}
        speed={1}
      >
        <Text>Đang load chờ xíu nhé</Text>
      </AnimatedLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  ModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: "stretch",
  },
});

export default ModalLoading;
