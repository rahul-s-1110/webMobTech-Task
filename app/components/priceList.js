import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PriceList = ({item,index}) => {
  return (
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <Text style={{color:"white"}}>Service {item?.id}</Text>
    <Text style={{color:"white"}}> KR {item?.price}-</Text>
</View>
  )
}

export default PriceList

const styles = StyleSheet.create({})