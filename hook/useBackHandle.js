import React, { useState, useEffect } from "react";
import { BackHandler } from 'react-native'

export const handleBack = () => {
  return false;
}

const useBackHandle = (handleFunction) => {
  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener('hardwareBackPress', handleFunction ? handleFunction : handleBack);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleFunction ? handleFunction : handleBack);
      };
    }
  },[])
  return(false)
}

export default useBackHandle;
