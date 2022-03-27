import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng email")
    .required("Email không được để trống"),
  password: Yup.string()
    .min(4, ({ min }) => `Mật khẩu phải ít nhất ${min} kí tự`)
    .required("Password không được để trống"),
});
export default validationSchema;
