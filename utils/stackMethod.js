import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as Screens from "../screens";
import routesScreen from "../config/routes";

import routes from "../config/routes";

import { loginStatusSelector } from "../Redux/Auth/Selector";
import { loginInWeb } from "../Redux/Home/Selector";
import { useSelector } from "react-redux";

const RenderTabScreen = ({ configRoutes }) => {
  const TabScreen = createBottomTabNavigator();
  const screens = Object.values(configRoutes.screens);
  const tabScreen = screens.map((item) => {
    switch (item.modeScreen) {
      case "STACK": {
        return (
          <TabScreen.Screen key={item.name} name={item.name} {...item.props}>
            {(props) => <RenderStackScreen configRoutes={item} />}
          </TabScreen.Screen>
        );
      }
      case "TAB": {
        return (
          <TabScreen.Screen key={item.name} name={item.name}>
            {(props) => <RenderTabScreen configRoutes={item} />}
          </TabScreen.Screen>
        );
      }
      case "SCREEN": {
        return (
          <TabScreen.Screen
            key={item.name}
            name={item.name}
            {...item.props}
            component={Screens[item.screenName]}
          />
        );
      }
    }
  });
  return (
    <TabScreen.Navigator
      screenOptions={{ headerShown: false }}
      {...configRoutes.props}
    >
      {tabScreen}
    </TabScreen.Navigator>
  );
};

const RenderStackScreen = ({ configRoutes }) => {
  const screens = Object.values(configRoutes.screens);
  const StackScreen = createStackNavigator();
  const stackScreen = screens.map((item) => {
    switch (item.modeScreen) {
      case "STACK": {
        return (
          <StackScreen.Screen key={item.name} name={item.name} {...item.props}>
            {(props) => <RenderStackScreen configRoutes={item} />}
          </StackScreen.Screen>
        );
      }
      case "TAB": {
        return (
          <StackScreen.Screen key={item.name} name={item.name} {...item.props}>
            {(props) => <RenderTabScreen configRoutes={item} />}
          </StackScreen.Screen>
        );
      }
      case "SCREEN": {
        return (
          <StackScreen.Screen
            key={item.name}
            name={item.name}
            {...item.props}
            component={Screens[item.screenName]}
          />
        );
      }
    }
  });
  return <StackScreen.Navigator>{stackScreen}</StackScreen.Navigator>;
};

const Stack = createStackNavigator();
const RenderStack = (configRoutes) => {
  const stack = configRoutes.map((item) => {
    switch (item.modeScreen) {
      case "STACK": {
        return (
          <Stack.Screen key={item.name} name={item.name} {...item.props}>
            {(props) => <RenderStackScreen configRoutes={item} />}
          </Stack.Screen>
        );
      }
      case "TAB": {
        return (
          <Stack.Screen key={item.name} name={item.name} {...item.props}>
            {(props) => <RenderTabScreen configRoutes={item} />}
          </Stack.Screen>
        );
      }
      case "SCREEN": {
        return (
          <Stack.Screen
            key={item.name}
            name={item.name}
            {...item.props}
            component={Screens[item.screenName]}
          />
        );
      }
    }
  });
  return stack;
};

const RootStack = () => {
  const status = useSelector(state => loginStatusSelector(state))
  const statusWeb = useSelector(state=> loginInWeb(state))
  const stack = RenderStack(Object.values(routesScreen));
  return(
    <Stack.Navigator
    initialRouteName = { routes.TestStack.name }
    >
      {stack}
    </Stack.Navigator>
  )
};

export default RootStack;
