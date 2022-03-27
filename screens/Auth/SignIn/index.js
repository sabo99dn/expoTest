import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Formik } from "formik";
import * as Notifications from "expo-notifications";
import { sendPushNotification } from "../../../utils/PushNotify";
import validationSchema from "./validation";
import InputField from "../../../components/InputField";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import Header from "../../../components/Header";
//custom hook
import useNotifications from "../../../hook/useNotification";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../config/routes";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions, types } from "../../../Redux/Auth/Reducer";
import * as authSelectors from "../../../Redux/Auth/Selector";
import { actions as homeActions } from "../../../Redux/Home/Reducer";

const SignIn = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const status = useSelector((state) =>
    authSelectors.loginStatusSelector(state)
  );
  const error = useSelector((state) => authSelectors.errorSelector(state));
  const array = [
    { text: "facebook", icon: "facebook-square" },
    { text: "google", icon: "google" },
    { text: "apple", icon: "apple1" },
    { text: "zalo", icon: "appstore1" },
  ];

  // getToken device
  const getToken = async () => {
    setToken((await Notifications.getExpoPushTokenAsync()).data);
  };

  useNotifications();
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    if (status) {
      dispatch(homeActions.setUrl("http://45cm.com/vn/account/login"));
      navigation.navigate(routes.MainStack.name);
      dispatch(homeActions.renderSplash(true));
      sendPushNotification(token, "Đăng nhập", "Đăng nhập thành công", {
        type: "MAIL",
      });
    }
  }, [status]);
  useEffect(() => {
    if (error !== {}) {
      sendPushNotification(token, "Đăng nhập", error.message);
    }
  }, [error]);
  //handle event press buttton sign up
  const handleSignIn = (values) => {
    dispatch(authActions.accountLogin(values));
    dispatch(authActions.login({ token_device: token, ...values }));
  };

  //component button facebook, zalo,... login
  const ItemRegister = ({ iconName, text }) => {
    const onPress = () => {
      if (text === "facebook") {
        logInFacebook();
      }
      if (text === "google") {
        loginGoogle();
      }
    };
    return (
      <TouchableOpacity onPress={onPress} style={styles.itemRegisterContainer}>
        <Icon name={iconName} size={20} style={styles.itemRegisterIcon} />
        <Text style={styles.itemRegisterText}>{text}</Text>
      </TouchableOpacity>
    );
  };
  const accountTemp = route.params;
  const loginGoogle = () => {
    const config = {
      androidClientId:
        "752916213063-h03tjqgo5r1jckm7akmbkpntp4rfuv26.apps.googleusercontent.com",
      iosClientId:
        "752916213063-0tma215174dq6m5qk6ih5cqa578h2jl1.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    };
    Google.logInAsync(config)
      .then((r) => {
        const { type, user } = r;
        if (type === "success") {
          Alert.alert("Logged in!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  async function logInFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: "431526765299696",
        appName: "45cm",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      console.log(type);
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const res = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&field=id,name,picture.type(large)`
        );
        const re = await res.json();
        console.log(re)
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  return (
    <View style={styles.container}>
      <View style={{margin: - 20}}>
        <Header />
      </View>
      <Image
        source={require("../../../assets/imgs/logo45cm-onboading.png")}
        style={styles.image}
      />
      <Formik
        enableReinitialize
        initialValues={{
          email: accountTemp ? accountTemp.email : "",
          password: accountTemp ? accountTemp.password : "",
        }}
        onSubmit={handleSignIn}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View style={styles.inputContainer}>
              <View style={{ width: "100%" }}>
                <InputField
                  style={styles.input}
                  name={"email"}
                  placeholder={"Nhập số điện thoại hoặc email của bạn"}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                />
              </View>
              <View style={{ width: "100%" }}>
                <InputField
                  style={styles.input}
                  name={"password"}
                  security={true}
                  placeholder={"Mật khẩu"}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                />
              </View>
            </View>
            <View style={styles.optionWrap}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(routes.AuthStack.screens.SignUp.name);
                }}
              >
                <Text>Tạo tài khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "http://45cm.com/vn/account/login#forgot-password"
                  );
                }}
              >
                <Text>Quên mật khẩu</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={(event) => handleSubmit(event)}
            >
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View></View>
      <Text style={styles.textConfirm}></Text>
      <View>
        <Text style={styles.textOR}>Hoặc</Text>
        <FlatList
          style={styles.itemRegisterWrap}
          keyExtractor={(item, index) => "key" + index}
          data={array}
          numColumns={2}
          renderItem={({ item }) => (
            <ItemRegister text={item.text} iconName={item.icon} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    alignSelf: "center",
    width: "60%",
    height: 100,
    resizeMode: "stretch",
    marginTop: 80,
    marginBottom: 50,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 0.3,
    borderRadius: 5,
  },
  optionWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: "#f20000",
    alignSelf: "center",
    width: "60%",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  textConfirm: {
    fontSize: 12,
    marginTop: 10,
  },
  textOR: {
    alignSelf: "center",
    marginTop: 20,
  },
  itemRegisterWrap: {},
  itemRegisterContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  itemRegisterText: {
    paddingLeft: 10,
  },
});

export default SignIn;
