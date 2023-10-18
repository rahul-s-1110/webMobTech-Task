import { FlatList, Pressable, ScrollView, StyleSheet, Text, View,Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ServiceListItem from '../components/serviceListItem';
import PriceList from '../components/priceList';
import { colors } from '../globalConstant/colors';

const ListItem = () => {
  const [selectedService ,setSelectedService] = useState(1)
  const [purchaseServiceList,setPurchaseServiceList] = useState([]);
  const [additionalserviceList,setAdditionServiceList] = useState([]);
  const [purchaseServiceTotalPrice,setPurchaseServiceTotalPrice] = useState('');
  const [additionserviceTotalPrice,setAdditionserviceTotalPrice] = useState('');
   const purchaseService = 1;
   const additionservice = 2;

   useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('https://fir-dynamiclinks-e43dd.web.app/practical-api.json'); 
        const result = await response.json();
        const allService = result?.data?.purchased_services;
        const purchasedServices = [];
        const additionalServices = [];
        allService.forEach(mainService => {
          mainService.purchased_office_template.purchased_office_services.forEach(subService => {
            if (subService.service_selected !== null) {
              purchasedServices.push(subService);
            } else {
              additionalServices.push(subService);
            }
          });
        });
        const totalpurchasePrice = purchasedServices.reduce((acc, item) => {
          const itemPrice = parseFloat(item.price);
          if (!isNaN(itemPrice)) {
            return acc + itemPrice;
          }
          return acc;
        }, 0);
        const totaladditionolPrice = additionalServices.reduce((acc, item) => {
          const itemPrice = parseFloat(item.price);
          if (!isNaN(itemPrice)) {
            return acc + itemPrice;
          }
          return acc;
        }, 0);
        setPurchaseServiceList(purchasedServices);
        setPurchaseServiceTotalPrice(totalpurchasePrice)
        setAdditionServiceList(additionalServices)
        setAdditionserviceTotalPrice(totaladditionolPrice)
      } catch (error) {
        Alert.alert("error to fecth data",error)
      }
    };
    fetchData();
   },[])

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
       nestedScrollEnabled
        data={selectedService == 1? purchaseServiceList : additionalserviceList}
        showsVerticalScrollIndicator={false}
        renderItem={ServiceListItem}
      />
      
      </View>
      <View style={{backgroundColor:colors.black,padding:20,marginTop:10}}>
        <FlatList 
        nestedScrollEnabled
          data={selectedService == 1? purchaseServiceList : additionalserviceList}
          ItemSeparatorComponent={<View style={{height:10}} />}
          renderItem={PriceList}
          ListFooterComponent={<View style={{marginVertical:50,borderBottomWidth:1,borderColor:colors.gray}} />}
        />
        <View style={{flexDirection:"row",justifyContent:"space-between",paddingBottom:40}}>
            <Text style={{color:colors.lightBrown}}>Total Costings</Text>
            <Text style={{color:colors.lightBrown}}>{selectedService == 1? purchaseServiceTotalPrice : additionserviceTotalPrice}</Text>
        </View>
      </View>
    </ScrollView>
    </>
  )
}

export default ListItem

const styles = StyleSheet.create({
  btn:{
    flex:1,alignItems:"center",justifyContent:"center",paddingVertical:10,borderBottomColor:colors.gray,borderBottomWidth:1
  },
  selectedTxt:{
    fontWeight:'700',
  },
  colordBorder:{
    borderBottomColor:colors.borderColor,borderBottomWidth:3
  }
})

