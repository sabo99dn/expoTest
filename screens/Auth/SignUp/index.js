import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import Header from "../../../components/Header";

//custom hook
import { useNavigation } from "@react-navigation/native";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions } from "../../../Redux/Auth/Reducer";
import * as authSelectors from "../../../Redux/Auth/Selector";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import email from "./Email";
import mobile from "./Mobile";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Image
        source={require("../../../assets/imgs/logo45cm-onboading.png")}
        style={styles.image}
      />
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={email}
              options={{ tabBarLabel: "Email" }}
            />
            <Tab.Screen
              name="Settings"
              component={mobile}
              options={{ tabBarLabel: "MOBILE" }}
            />
          </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    alignSelf: "center",
    width: "60%",
    height: 100,
    resizeMode: "stretch",
    marginTop: 20,
    marginBottom: 50,
  },
});

export default MyTabs;
