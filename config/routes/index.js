import stackConfig from "../navigation/stackConfig";
import tabConfig from "../navigation/tabConfig";
import screenConfig from "../navigation/screenConfig";

export default {
  TestStack: {
    name: "TEST_STACK",
    modeScreen: "STACK",
    props: { ...stackConfig },
    screens: {
      Home: {
        name: "TEST_STACK_TAB_HOME",
        modeScreen: "SCREEN",
        screenName: "HomeTest",
        props: { ...stackConfig },
      },
    },
  },
  HomeStack: {
    name: "HOME_STACK",
    modeScreen: "STACK",
    props: { ...stackConfig },
    screens: {
      Home: {
        name: "HOME_STACK_TAB_HOME",
        modeScreen: "SCREEN",
        screenName: "HomeNotLogin",
        props: { ...stackConfig },
      },
    },
  },
  AuthStack: {
    name: "AUTH_STACK",
    modeScreen: "STACK",
    props: { ...stackConfig },
    screens: {
      SignIn: {
        name: "AUTH_STACK_SIGN_IN",
        modeScreen: "SCREEN",
        screenName: "SignIn",
        props: {
          ...screenConfig,
        },
      },

      SignUp: {
        name: "AUTH_STACK_SIGN_UP",
        modeScreen: "SCREEN",
        screenName: "SignUp",
        props: {
          ...screenConfig,
        },
      },
    },
  },
  MainStack: {
    name: "MAIN_STACK",
    modeScreen: "STACK",
    props: { ...stackConfig },
    screens: {
      Tab: {
        name: "MAIN_STACK_TAB",
        modeScreen: "TAB",
        props: {
          ...tabConfig.config,
        },
        screens: {
          Home: {
            name: "MAIN_STACK_TAB_HOME",
            modeScreen: "SCREEN",
            screenName: "Home",
            props: {
              ...tabConfig.screen("home"),
            },
          },
          Notification: {
            name: "MAIN_STACK_TAB_NOTIFICATION",
            modeScreen: "SCREEN",
            screenName: "Notification",
            props: { ...tabConfig.screen("file-text") },
          },
        },
      },

      //Main stack sreen
      ProductDetail: {
        name: "MAIN_STACK_PRODUCT_DETAIL",
        modeScreen: "SCREEN",
        screenName: "ProductDetail",
        props: {
          ...screenConfig,
        },
      },
    },
  },
};
