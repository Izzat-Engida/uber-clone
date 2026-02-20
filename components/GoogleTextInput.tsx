import { icons } from '@/constants'
import { GoogleInputProps } from '@/types/type'
import { View, Text, Image } from 'react-native'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

const googleapi=process.env.EXPO_PUBLIC_GOOGLE!

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}:GoogleInputProps) => {
  return (
    <View style={[{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",position:"relative",zIndex:50,borderRadius:25,marginBottom:10},containerStyle]}>
      <GooglePlacesAutocomplete
      fetchDetails={true}
      placeholder='Search'
      debounce={200}
      styles={{
        textInputContainer:{
          alignItems:'center',
          justifyContent:'center',
          borderRadius:20,
          marginHorizontal:20,
          position:'relative',
          shadowColor:'#d4d4d4'
        },
        textInput:{
          backgroundColor:textInputBackgroundColor||'white',
          fontSize:16,
          fontWeight:600,
          marginTop:5,
          width:"100%",
        },
        listView:{
          backgroundColor:textInputBackgroundColor||'white',
          position:"relative",
          top:0,
          width:"100%",
          borderRadius:10,
          shadowColor:"#d4d4d4",
          zIndex:99,
        }
      }}
          onPress={(data, details) => {
      if (!details) return;

      handlePress({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        address: data.description,
      });
      }}
      query={{
        key:googleapi,
        Language:"en",
      }}
      renderLeftButton={()=>(
        <View style={{display:"flex",justifyContent:"center",alignItems:"center",
          width:15,
          height:15

        }}>
          <Image
          source={icon? icon :icons.search}
          style={{
            width:15,
            height:15
          }}
          resizeMode='contain'
          />
        </View>
      )}
      textInputProps={{
        placeholderTextColor:'gray',
        placeholder:initialLocation?? "Where to go"
      }}
      />
    </View>
  )
}

export default GoogleTextInput