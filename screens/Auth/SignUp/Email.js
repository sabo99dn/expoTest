import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Notifications from "expo-notifications";
import { sendPushNotification } from "../../../utils/PushNotify";
import validationSchema from "./validation";
import InputField from "../../../components/InputField";

//custom hook
import useNotifications from "../../../hook/useNotification";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../config/routes";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions } from "../../../Redux/Auth/Reducer";
import * as authSelectors from "../../../Redux/Auth/Selector";

const Email = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const error = useSelector((state)=> authSelectors.errorSignUpSelector(state));

  //getToken device
  const getToken = async () => {
    setToken((await Notifications.getExpoPushTokenAsync()).data);
  };

  useNotifications();
  useEffect(() => {
    getToken();
  }, []);
  const status = useSelector((state) => authSelectors.signUpStatus(state));
  const accountTemp = useSelector((state) => authSelectors.accountTemp(state));
  useEffect(() => {
    if(status && accountTemp){
      navigation.navigate(routes.AuthStack.screens.SignIn.name,accountTemp )
      sendPushNotification(token,"Đăng kí", "Đăng kí thành công, vui lòng vào email để xác nhận tài khoản.")
      dispatch(authActions.resetStatus())
    }
  }, [accountTemp]);
  useEffect(() => {
    if(error){
      if(error?.message?.email){
        sendPushNotification(token,"Đăng kí",error.message.email[0]);
      }
    }
  }, [error]);
  //handle event press buttton sign up
  const handleSignUp = (values) => {
    dispatch(
      authActions.signUp(values)
    );

  };
  return (
    <View style={styles.container}>
      
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSignUp}
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
                  placeholder={"Nhập email của bạn"}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                />
              </View>
              <View style={{ width: "100%" }}>
                <InputField
                  style={styles.input}
                  name={"name"}
                  placeholder={"Họ tên"}
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
              <View style={{ width: "100%" }}>
                <InputField
                  style={styles.input}
                  name={"confirmPassword"}
                  security={true}
                  placeholder={"Xác nhận mật khẩu"}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View></View>
      <Text style={styles.textConfirm}>
        Bằng cách ấn vào nút “ĐĂNG KÝ”, tôi đồng ý với Điều Khoản Sử Dụng và
        Chính Sách Bảo Mật của 45CM
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white'
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
});

export default Email;
