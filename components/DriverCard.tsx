import { View, Text , StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DriverCardProps } from '@/types/type'
import { icons } from '@/constants'
import { formatTime } from '@/lib/utils'

const DriverCard = ({item,selected,setSelected}:DriverCardProps) => {

  return (
    <TouchableOpacity onPress={setSelected} style={[styles.container,{backgroundColor:selected===item.id?"#0286FF":"white"}]}>

        <Image style={styles.profile}  source={{uri:item.profile_image_url}} />
        <View style={{marginHorizontal:10, display:"flex",flex:1, flexDirection:"row", alignItems:"start", columnGap:10}}>

            <View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", columnGap:10}}>
                <Text style={{fontSize:16, fontWeight:"bold"}}>{item.first_name} {item.last_name}</Text>
                <View style={{display:"flex", flexDirection:"row", alignItems:"center", columnGap:5}}>
                    <Image source={icons.star} style={{width:15,height:15}}/>
                <Text style={{fontSize:14, color:"grey"}}>{item.rating}</Text>
                </View>
                
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", columnGap:10}}>
                <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <Image source={icons.dollar} style={{width:16,height:16}}/>
                    <Text style={{fontSize:14}}>  {item.price? item.price : 20}</Text>
                </View>
                
                <Text style={{fontSize:14, color:"grey"}}>|</Text>
                 <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>

                </View>
                <Text style={{fontSize:14, color:"grey"}}>{formatTime(item.time!)} </Text>
                <Text style={{fontSize:14, color:"grey"}}>|</Text>
                <Text style={{fontSize:14, color:"grey"}}>{item.car_seats} seats</Text>
            </View>
            </View>
        </View>
       

        <Image source={{uri:item.car_image_url}}
        style={{width:50,height:50}}
        resizeMode='contain'
        />
    </TouchableOpacity>
  )
}

export default DriverCard
const styles=StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:10,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:25  
    },
    profile:{
        width:60,
        height:60,
        borderRadius:200
    }
})