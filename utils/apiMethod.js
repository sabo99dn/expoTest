import axios from 'axios';

const BASE_URL_API = 'http://45cm.com/vn'

const axiosCreate = axios.create({
  baseURL: BASE_URL_API,
  // You can add your headers here
});

axiosCreate
  .request({
    BASE_URL_API,
    // You can add your headers here
  })
  .catch(function (error) {
    if (!error.response) {
      // network error
      console.error('network error');
      console.error(error);
    } else {
      // http status code
      const code = error.response.status;
      // response data
      const response = error.response.data;
    }
  });

axiosCreate.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  },
);

export default axiosCreate;
