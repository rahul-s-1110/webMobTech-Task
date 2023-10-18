import { StyleSheet, Text, View,Image } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

const ServiceListItem = ({item,index}) => {
  return (
    <View>
      <Text>Main Service {item?.serviceId} :</Text>
      <View
        style={{
          marginVertical: 10,
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 0.7,
          borderRadius: 10,
          borderColor: "gray",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 80, height: 60, borderRadius: 10 }}
            source={{ uri: "https://picsum.photos/200" }}
          />
          <View style={{ marginLeft: 10, justifyContent: "space-around" }}>
            <Text>SErvice {item?.serviceId}</Text>
            <Text>Kr {item?.price}</Text>
          </View>
        </View>
        <Ionicons name="information-circle-outline" size={24} color="black" />
      </View>
    </View>
  );
};

export default ServiceListItem;

const styles = StyleSheet.create({});
