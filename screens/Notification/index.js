import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Entypo";

import routes from '../../config/routes';

const Notifications = () => {
  const navigation = useNavigation();
  const ItemNotification = ({ title, content, image, data }) => {
    return (
      <TouchableOpacity style={styles.itemNotiContainer}
      onPress= {() => {
        navigation.navigate(routes.MainStack.screens.ProductDetail.name,data.product)
      }}
      >
        <Image style={styles.imageNoti} />
        <View style={styles.contentNofi}>
          <Text style={styles.titleNoti}>hskshjdkf</Text>
          <Text style={styles.contentNoti}>
            nádfkjhasdkjfhjsdhfkjashfkjhsdkfhadkjhfskjfhdsjfhskdjfhskjdhfkjsdhkj
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const data = {product : 'http://45cm.com/vn/collections/products/used/1270923634'}
  return (
    <SafeAreaView>
        <View style={styles.headerWrap}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-left" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>THÔNG BÁO</Text>
        </View>
      <ScrollView>
        {array.map((item, index) => (
          <ItemNotification item={item} key={index} data = {data} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    paddingLeft: 10,
  },
  titleHeader: {
    marginLeft: 100,
    fontSize: 18,
    fontWeight: "700",
  },
  itemNotiContainer: {
    backgroundColor: 'white',
    margin: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  imageNoti: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  contentNofi:{
    padding: 10,
    flex: 1,
  }
});

export default Notifications;
