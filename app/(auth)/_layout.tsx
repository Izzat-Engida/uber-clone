import {Stack} from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayOut(){
    return (
        <>
         <StatusBar  translucent={false} style="auto" />
        <Stack>
          
            <Stack.Screen name="welcome" options={{headerShown:false}}/>
            <Stack.Screen name="sign-in" options={{headerShown:false}}/>
            <Stack.Screen name="sign-up" options={{headerShown:false}}/>
              
        </Stack>
       
    </>
    )
}