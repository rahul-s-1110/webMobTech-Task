import { FlatList, Pressable, ScrollView, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ServiceListItem from '../components/serviceListItem';
import PriceList from '../components/priceList';
import { colors } from '../globalConstant/colors';

const ListItem = () => {
  const [selectedService ,setSelectedService] = useState(1)
   const purchaseService = 1;
   const additionservice = 2;
   

  const data1 = [
    {
      serviceId:1,
      price:3500,
      purchaseService:true
    },
    {
      serviceId:2,
      price:3500,
      purchaseService:false
    },
    {
      serviceId:3,
      price:3500,
      purchaseService:false
    },
    {
      serviceId:4,
      price:3500,
      purchaseService:true
    },
    {
      serviceId:5,
      price:3500,
      purchaseService:true
    },
    {
      serviceId:6,
      price:3500,
      purchaseService:false
    },
    {
      serviceId:7,
      price:3500,
      purchaseService:true
    },
    {
      serviceId:8,
      price:3500,
      purchaseService:true
    },
    {
      serviceId:9,
      price:3500,
      purchaseService:true
    }
  ]


  return (
    <>
    <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:8,marginTop:30}}> 
        <MaterialCommunityIcons name="playlist-star" size={32} color={colors.black} />
        <Text style={{fontSize:22,marginLeft:5}}>Services</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Pressable onPress={()=>setSelectedService(purchaseService)} style={[styles.btn,selectedService == 1 && styles.colordBorder]}>
            <Text style={selectedService == 1 && styles.selectedTxt}>PURCHASED SERVICE</Text>
          </Pressable>
          <Pressable onPress={()=>setSelectedService(additionservice)} style={[styles.btn,selectedService == 2 && styles.colordBorder]}>
            <Text style={selectedService == 2 && styles.selectedTxt}>ADDITIONAL SERVICE</Text>
          </Pressable>
      </View>

    <ScrollView style={{paddingTop:10}}>
      <View style={{paddingHorizontal:20}}> 
      <FlatList 
        data={selectedService==1?data1.filter((item)=>item?.purchaseService== true):data1.filter((item)=>item?.purchaseService== false)}
        showsVerticalScrollIndicator={false}
        renderItem={ServiceListItem}
      />
      </View>
      <View style={{backgroundColor:colors.black,padding:20,marginTop:10}}>
        <FlatList 
          data={selectedService==1?data1.filter((item)=>item?.purchaseService== true):data1.filter((item)=>item?.purchaseService== false)}
          ItemSeparatorComponent={<View style={{height:10}} />}
          renderItem={PriceList}
          ListFooterComponent={<View style={{marginVertical:50,borderBottomWidth:1,borderColor:colors.gray}} />}
        />
        <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:40}}>
            <Text style={{color:colors.white}}>Total Costings</Text>
            <Text style={{color:colors.white}}>5000</Text>
        </View>
      </View>
    </ScrollView>
    </>
  )
}

export default ListItem

const styles = StyleSheet.create({
  btn:{
    flex:1,alignItems:"center",justifyContent:"center",paddingVertical:10,borderBottomColor:"gray",borderBottomWidth:1
  },
  selectedTxt:{
    fontWeight:'700',
  },
  colordBorder:{
    borderBottomColor:colors.borderColor,borderBottomWidth:3
  }
})

