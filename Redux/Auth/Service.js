import apiMethod from "../../utils/apiMethod";
import convertFormDataPost from "../../utils/convertFormData";

export const signUpService = payload => {
  const params = convertFormDataPost(payload);
  return apiMethod.post("http://45cm.com/api/v1/auth/register/email", params);
};

export const signUpMobileService = payload => {
  const json = {
     "client_id": "0e9D51091678557192084a37390A306Ca87a4d5C",
     "client_secret": "cb99d714da1F8636A135F7d2b7393a78af25Ec1d687dfed2a820ef4d1713b7ab42504fd9",
     "scope": "send_brandname_otp send_brandname",
     "session_id": "5c22be0c0396440829c98d7ba124092020145753419",
     "grant_type": "client_credentials"
    }
  const params = convertFormDataPost(json);
  return apiMethod.post("http://sandbox.sms.fpt.net/oauth2/token", params,{
    headers: {
       'Content-Type': 'application/json',
    },
 });
};

export const signInService = payload => {
  const params = convertFormDataPost(payload);
  return apiMethod.post("http://45cm.com/api/v1/auth/login", params);
};
