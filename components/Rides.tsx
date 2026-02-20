import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { Ride } from '@/types/type'
import { icons } from '@/constants'
import { formatDate, formatTime } from '@/lib/utils'



const Rides = ({ride:{
   destination_longitude,destination_latitude,origin_address,destination_address
   ,created_at,ride_time,driver,payment_status
}}:{ride:Ride}) => {
  return (
    <View style={styles.container}>
        <View style={styles.icontainer}>
        <View style={styles.iicontainer}>
            <Image source={{
                uri:`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=12&marker=lonlat:${destination_longitude},${destination_latitude}&apiKey=${process.env.EXPO_PUBLIC_STATIC_MAP}`


            }}
            style={styles.image}/>
        <View style={styles.iimage}>
            <View style={{display:"flex", flexDirection:"row",alignItems:"center",columnGap:2}}>
            <Image source={icons.to} style={{width:20,height:20}}/>
            <Text numberOfLines={1} style={{fontSize:16,fontWeight:"bold"}}>{origin_address}</Text>
            </View>
             <View style={{display:"flex", flexDirection:"row",alignItems:"center",columnGap:2}}>
            <Image source={icons.point} style={{width:20,height:20}}/>
            <Text numberOfLines={1} style={{fontSize:16,fontWeight:"bold"}}>{destination_address}</Text>
            </View>

        </View>
        </View>
        <View style={styles.second}>
                <View style={styles.isecond}>
                <Text style={styles.secondtext}>
                    Date & Time
                </Text>
                <Text style={styles.secondtext}>
                    {formatDate(created_at)}, {formatTime(ride_time)}
                </Text>
                </View>
                <View style={styles.isecond}>
                    <Text style={styles.secondtext}>Driver</Text>
                    <Text style={styles.secondtext}>{driver.first_name} {driver.last_name}</Text>
                </View>
                 <View style={styles.isecond}>
                    <Text style={styles.secondtext}>Car Seats</Text>
                    <Text style={styles.secondtext}>{driver.car_seats}</Text>
                </View>
                 <View style={styles.isecond}>
                    <Text style={styles.secondtext}>Payment Status</Text>
                    <Text style={[styles.secondtext,{color:payment_status==="paid"?"green":"red"}]}>{payment_status}</Text>
                </View>
        </View>
        </View>

    </View>
  )
}

export default Rides
const styles=StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
        borderRadius:20,
        shadowColor:"rgb(212,212,212)",
        shadowOffset:{width:0,height:1},
        shadowOpacity:0.8,
        shadowRadius:3,
        elevation:5,
        boxShadow:"0 1px 3px rgba(0,0,0,0.2)",
        marginBottom:10
    },
    text:{
        fontSize:24
    },
    icontainer:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        padding:10,
    },
    iicontainer:{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    image:{
        width:80,
        height:90,
        borderRadius:25

    },
    iimage:{
        display:"flex",
        flexDirection:"column",
        marginHorizontal:10,
        rowGap:5,
        flex:1,
        marginLeft:10,
    },
    second:{
        display:"flex",
        flexDirection:"column",
        width:"100%",
        marginTop:20,
        backgroundColor:"rgb(246,248,250)",
        borderRadius:25,
        padding:10,
        alignItems:"flex-start",
        justifyContent:"center"


    },
    isecond:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:"100%",
        marginBottom:15
    },
    secondtext:{
        fontSize:14,
        fontWeight:"bold",
        color:"rgb(107,114,128)",
        textTransform:"capitalize"  
    }

})