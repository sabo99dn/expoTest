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
import InputField from "../../../components/InputField";
import * as Yup from 'yup';

//custom hook
import useNotifications from "../../../hook/useNotification";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../config/routes";

//redux
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions } from "../../../Redux/Auth/Reducer";
import * as authSelectors from "../../../Redux/Auth/Selector";
import { signUpMobileService } from "../../../Redux/Auth/Service";

const Mobile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState();

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
    }
  }, [accountTemp]);
  //handle event press buttton sign up
  const handleSignUp = (values) => {
    dispatch(
      authActions.signUp(values)
    );

  };
  const onPress = () => {
    const data = signUpMobileService();
    console.log(data);
  }
  return (
    <View style={styles.container}>
      
      <Formik
        initialValues={{
          email: "",
          codeValidate: "",
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
                  onPress={onPress}
                  sdt = {true}
                  style={styles.input}
                  name={"email"}
                  placeholder={"Nhập số điện thoại của bạn"}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                />
              </View>
              <View style={{ width: "100%" }}>
                <InputField
                  style={styles.input}
                  name={"codeValidate"}
                  placeholder={"Mã xác minh qua điện thoại"}
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
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const validationSchema = Yup.object().shape({

  email: Yup
  .string()
  .matches(phoneRegExp, 'Số điện thoại không đúng')
  .required('Số điện thoại không được để trống'),
  name: Yup.string()
    .min(2, 'Quá ngắn')
    .max(50, 'Quá dài')
    .required('Tên không được để trống'),
  password: Yup.string()
    .min(4, ({ min }) => `Mật khẩu phải ít nhất ${min} kí tự`)
    .required('Password không được để trống'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Xác nhận mật khẩu không khớp'),
});

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
  textInputSDT: {
    width: "100%",
    flexDirection: "row"
  },
  buttonSDT: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSDT: {

  }
});

export default Mobile;
