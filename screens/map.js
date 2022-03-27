import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { getCurrentLocation } from "../utils/location";

import { PROVIDER_GOOGLE } from 'react-native-maps'

const map = () => {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const getlocation = async () => {
    let locations = await getCurrentLocation();
    setLocation(locations);
  };
  useEffect(() => {
    getlocation();
    // return () => {
    // setLocation();
  // }
  }, [location]);
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: 400, height: 400 }}
        region={{
          latitude: location.lat,
          longitude: location.lon,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        minZoomLevel={10}
      >
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.lon }}
          icon={<Icon name="map" />}
        />
      </MapView>
    </View>
  );
};

export default map;
