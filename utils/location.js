import * as Location from "expo-location";
// get current location of user
//output: latitude,longitude
export async function getCurrentLocation() {
  let lat = 0,
    lon = 0;
  
  // request Location permission
  let { status } = await Location.requestForegroundPermissionsAsync();

  //log error when user denied permission
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }
  // get current location of user
  await Location.getCurrentPositionAsync({}).then((res) => {
    lat = res.coords.latitude;
    lon = res.coords.longitude;
  });
  return { lat, lon };
}
