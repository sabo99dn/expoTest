import React from "react";
import Icon from "react-native-vector-icons/Feather";

export default {
  config: {
    options: { headerShown: false },
    tabBarOptions: {
      showLabel: false,
    },
  },
  screen: (nameIcon,label) => {
    return {
      options: {
        tabBarLabel: 'home',
        tabBarIcon: ({ focused }) => (
          <Icon
            name={nameIcon}
            size={25}
            color={focused ? 'green' : 'black'}
          />
        ),
      }
  }
  }

};

