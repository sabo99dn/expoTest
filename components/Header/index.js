import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const index = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.iconWrap}
      >
        <Icon name="chevron-left" size={30} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  iconWrap: {
    backgroundColor: "white",
    marginTop: 20,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    padding: 5,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 2,
  },
});
export default index;
