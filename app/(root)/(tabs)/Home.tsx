import Rides from '@/components/Rides';
import * as Location from 'expo-location'
import { icons, images } from '@/constants';
import { useUser } from '@clerk/clerk-expo';
import { View, Text,StyleSheet, FlatList,Image,  TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleTextInput from '../../../components/GoogleTextInput';
import Maps from '@/components/Maps';
import { useLocationStore } from '@/store';
import { useState,useEffect } from 'react';

const data=[
    {
        "ride_id": "1",
        "origin_address": "Kathmandu, Nepal",
        "destination_address": "Pokhara, Nepal",
        "origin_latitude": "27.717245",
        "origin_longitude": "85.323961",
        "destination_latitude": "28.209583",
        "destination_longitude": "83.985567",
        "ride_time": 391,
        "fare_price": "19500.00",
        "payment_status": "paid",
        "driver_id": 2,
        "user_id": "1",
        "created_at": "2024-08-12 05:19:20.620007",
        "driver": {
            "driver_id": "2",
            "first_name": "David",
            "last_name": "Brown",
            "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
            "car_seats": 5,
            "rating": "4.60"
        }
    },
    {
        "ride_id": "2",
        "origin_address": "Jalkot, MH",
        "destination_address": "Pune, Maharashtra, India",
        "origin_latitude": "18.609116",
        "origin_longitude": "77.165873",
        "destination_latitude": "18.520430",
        "destination_longitude": "73.856744",
        "ride_time": 491,
        "fare_price": "24500.00",
        "payment_status": "not paid",
        "driver_id": 1,
        "user_id": "1",
        "created_at": "2024-08-12 06:12:17.683046",
        "driver": {
            "driver_id": "1",
            "first_name": "James",
            "last_name": "Wilson",
            "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
            "car_seats": 4,
            "rating": "4.80"
        }
    },
    {
        "ride_id": "3",
        "origin_address": "Zagreb, Croatia",
        "destination_address": "Rijeka, Croatia",
        "origin_latitude": "45.815011",
        "origin_longitude": "15.981919",
        "destination_latitude": "45.327063",
        "destination_longitude": "14.442176",
        "ride_time": 124,
        "fare_price": "6200.00",
        "payment_status": "paid",
        "driver_id": 1,
        "user_id": "1",
        "created_at": "2024-08-12 08:49:01.809053",
        "driver": {
            "driver_id": "1",
            "first_name": "James",
            "last_name": "Wilson",
            "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
            "car_seats": 4,
            "rating": "4.80"
        }
    },
    {
        "ride_id": "4",
        "origin_address": "Okayama, Japan",
        "destination_address": "Osaka, Japan",
        "origin_latitude": "34.655531",
        "origin_longitude": "133.919795",
        "destination_latitude": "34.693725",
        "destination_longitude": "135.502254",
        "ride_time": 159,
        "fare_price": "7900.00",
        "payment_status": "paid",
        "driver_id": 3,
        "user_id": "1",
        "created_at": "2024-08-12 18:43:54.297838",
        "driver": {
            "driver_id": "3",
            "first_name": "Michael",
            "last_name": "Johnson",
            "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
            "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
            "car_seats": 4,
            "rating": "4.70"
        }
    }
]

export default function Home() {
  const {user}=useUser()
  const {setDestinationLocation,setUserLocation}=useLocationStore()
  const [permission,setPermisson]=useState(false)
  const handle=async()=>{
    
  }
  const handledestination=async()=>{
    
  }

const loading=true
useEffect(()=>{
const requestLocation=async () => {
 let {status}= await Location.requestForegroundPermissionsAsync()
 if(status !== 'granted'){
  setPermisson(false)
  return
 }
let location=await Location.getCurrentPositionAsync()
const address=await Location.reverseGeocodeAsync({
  latitude:location.coords?.latitude!,
  longitude:location.coords?.longitude!
})
setUserLocation({
  latitude:location.coords?.latitude!,
  longitude:location.coords?.longitude!,
  address:`${address[0].name}, ${address[0].region}`
})
}

requestLocation()
},[])
  return (
   <SafeAreaView style={styles.container}>
    <FlatList
    data={data?.slice(0,5)}
  //data={[]}
    renderItem={({item})=><Rides ride={item}/>}
    style={styles.list}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{
      paddingBottom:100
    }}
    ListEmptyComponent={()=>(
      <View style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
       {!loading?(
        <>
        <Image source={images.noResult}
        />

        </>
       ):(
        <>
        <Text>Loading....</Text>
        </>
       )}
      </View>
  )}
  ListHeaderComponent={()=>(
    <>
    <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between", marginVertical:10}}>
    <Text style={{fontSize:20, fontWeight:"bold"}} >Welcome {user?.firstName} 👋</Text>
    <TouchableOpacity onPress={handle}>
      <Image source={icons.out} style={{width:30,height:30}}/>
    </TouchableOpacity>
    </View>
    <GoogleTextInput
    icon={icons.search}
    containerStyle={{backgroundColor:"white", boxShadow:"0 1px 3px rgba(95, 88, 88, 0.2)"}}
    handlePress={handledestination}
    />
    <>
      <Text style={{fontSize:20,fontWeight:"bold",marginTop:10,marginBottom:7 }}>
        Your Current Location
      </Text>
      <View style={{display:"flex",flexDirection:"row",backgroundColor:"transparent",height:300}}>
        <Maps/>
      </View>
    </>
   <Text style={{fontSize:20,fontWeight:"bold",marginTop:10,marginBottom:7 }}>
      Recent Rides
      </Text>
    </>
  )}
    />

  
   </SafeAreaView>
  );
}
const styles=StyleSheet.create({
  container:{
    backgroundColor:"rgb(246,248,250)"
  },
  list:{
    paddingHorizontal:15
  }
})