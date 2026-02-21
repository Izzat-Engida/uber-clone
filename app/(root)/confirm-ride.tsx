import { View, Text } from 'react-native'
import React from 'react'
import RideLayout from '@/components/RideLayout'
import { FlatList } from 'react-native-gesture-handler'
import DriverCard from '@/components/DriverCard'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { useDriverStore } from '@/store'


const ConfirmRide = () => {
    const {drivers,selectedDriver,setSelectedDriver}=useDriverStore()
  return (
    <RideLayout title={"Choose a Driver"}>
      <FlatList data={drivers} 
      renderItem={({item})=>(
        <DriverCard selected={selectedDriver!} setSelected={()=>setSelectedDriver(item.id)} item={item}/>
      )}
      ListFooterComponent={()=>(
        <View style={{marginHorizontal:20,marginTop:20}}>
            <CustomButton title={"Confirm Ride"} onPress={() => router.push('/(root)/book-ride')} />
        </View>
      )}
      />
    </RideLayout>
  )
}

export default ConfirmRide