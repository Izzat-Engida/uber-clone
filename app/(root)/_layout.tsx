import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const Layout=()=>{
    return(
        <>
        <Stack>
            <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
            <Stack.Screen name='find-ride' options={{headerShown:false}}/>
            <Stack.Screen name='index' options={{headerShown:false}}/>
            <Stack.Screen name='confirm-ride' options={{headerShown:false}}/>
            <Stack.Screen name='book-ride' options={{headerShown:false}}/>
                    
            
        </Stack>
        <StatusBar translucent={true} /> 
        </>
    )
}
export default Layout