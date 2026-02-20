import { GoogleInputProps } from '@/types/type'
import { View, Text } from 'react-native'


const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}:GoogleInputProps) => {
  return (
    <View style={[{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",position:"relative",zIndex:50,borderRadius:25,marginBottom:10},containerStyle]}>
      <Text>Search</Text>
    </View>
  )
}

export default GoogleTextInput