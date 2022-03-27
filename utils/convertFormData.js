function convertFormDataPost(data) {
  const params = new FormData();
  Object.keys(data).forEach(key => {
    params.append(key, data[key]);
  });
  return params;
}

export default convertFormDataPost;
