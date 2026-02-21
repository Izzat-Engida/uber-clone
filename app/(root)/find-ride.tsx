import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocationStore } from '@/store'
import RideLayout from '@/components/RideLayout'
import OpenStreetInput from '@/components/GoogleTextInput'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const FindRide = () => {
    const {userAddress,destinationAddress,setDestinationLocation,setUserLocation}=useLocationStore()
  return (
    <RideLayout title={"Find Ride"}>
         <View style={styles.container}>
            <Text style={{fontSize:20,fontWeight:"bold",marginBottom:10}}>From</Text>
            <OpenStreetInput icon={icons.target} initialLocation={userAddress!}  handlePress={(location)=>setUserLocation(location)}/>

         </View>
         <View style={styles.container}>
            <Text style={{fontSize:20,fontWeight:"bold",marginBottom:10}}>To</Text>
            <OpenStreetInput icon={icons.map} initialLocation={destinationAddress!} handlePress={(location)=>setDestinationLocation(location)}/>
         </View>
         <CustomButton title={"Find Now"} onPress={()=>router.push('/(root)/confirm-ride')} style={{marginTop:20}}/>
    </RideLayout>
  )
}

export default FindRide
const styles=StyleSheet.create({
  container:{
    marginHorizontal:15,

  }
})