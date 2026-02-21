import { View, Text ,StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, { useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { icons } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Maps from './Maps'
import BottomSheet, {  BottomSheetView } from "@gorhom/bottom-sheet";
const RideLayout = ({children,title}:{children:React.ReactNode,title?:string}) => {
    const router=useRouter();
    const bottomref=useRef<BottomSheet>(null);
  return (
    
    <GestureHandlerRootView style={{flex:1}}>
        
      <View style={styles.container}>
        <View style={styles.c2}>
        <View style={styles.c3}>
            <TouchableOpacity onPress={()=>router.back()}>
                <View style={{width:40,height:40,justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:50}}>
                    <Image source={icons.backArrow} resizeMode='contain' style={{width:20,height:20}}/>
                </View>
            </TouchableOpacity>
            <Text style={{fontSize:20,color:"black",marginLeft:16,fontWeight:"bold"}}>
                {title || "Go Back"}
            </Text>
         
        </View>

            <Maps/>
           
        </View>
        <BottomSheet  ref={bottomref} snapPoints={['40%','85%']} index={0}>
            <BottomSheetView
            style={{
                flex:1,
                padding:20
            }}
            >
                {children}
            </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
   
  )
}

export default RideLayout
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        
    },
    c2:{
        display:"flex",
        flexDirection:"column",
        height:"100%",
        backgroundColor:"rgb(37,99,235)",
    },
    c3:{
        display:"flex",
        flexDirection:"row",
        zIndex:10,
        top:40,
        alignItems:"center",
        justifyContent:"flex-start",
        paddingHorizontal:16,
        position:"absolute",
        width:"100%",
        
    }
})