import { View, Text,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React, {  useRef,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Swiper from "react-native-swiper"
import { onboarding } from '../../constants'
import CustomButton from '@/components/CustomButton'
const Welcome = () => {
  const swiperef=useRef<Swiper>(null)
  const [active,setActive]=useState(0);

  const last=active===onboarding.length-1

  const router=useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skip} onPress={()=>{
        router.replace('./sign-up')
      }}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
<Swiper ref={swiperef}
loop={false}
dot={<View style={styles.dot} />}
activeDot={<View style={[styles.dot,{backgroundColor:"#0286FF"}]} />}
onIndexChanged={(index)=>{
  setActive(index)
}}

>
{onboarding.map((item,index)=>(
  <View key={index} style={styles.slides}>
    
    <Image 
    source={item.image}
    style={{width:"100%",height:300,resizeMode:"contain", marginBottom:30}}
    />
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center", width:"100%", marginTop:20}}>
  <Text style={{color:"black",fontSize:25, fontWeight:"bold", paddingHorizontal:20, textAlign:"center"}}>{item.title}</Text>
    </View>
  <Text style={{fontSize:16,textAlign:"center",marginHorizontal:10,marginTop:3,color:"#858585",fontWeight:"semibold"}}>{item.description}</Text>
  </View>
))
}
</Swiper>
<CustomButton title={last? "Get Started":"Next"} 
onPress={()=> last? router.replace('/(auth)/sign-up'): swiperef.current?.scrollBy(1)} 
style={{marginTop:12,width:"90%", marginBottom:10}}/>
    </SafeAreaView>
  )
}

export default Welcome
const styles=StyleSheet.create({
  container:{
    flex:1,
    height:"100%",
    justifyContent:"space-between",
    alignItems:"center",
    backgroundColor:"white"
  },
  skip:{
    width:"100%",
    alignItems:"flex-end",
    padding:5,
    justifyContent:"flex-end"
  },
  skipText:{
    color:"black",
    fontSize:20,
    fontWeight:"bold"
  },
  dot:{
    width:32,
    height:8,
    marginHorizontal:1,
    backgroundColor:"#E2E8F0",
    borderRadius:50
  },
  slides:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:5,
  }
})