import { Text, ScrollView, StyleSheet, View, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import OAuth from '@/components/OAuth'

const Signin = () => {
  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",
  })
  const handleSubmit=async()=>{

  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.first}>
        <View style={{ position: "relative", width: "100%", height: 250 }}>
          
          <Image 
            source={images.signUpCar}
            style={styles.image}
          />

          <Text style={styles.title}>
            Welcome 👋
          </Text>

        </View>
        <View style={styles.inputs}>
           <InputField 
          label="Email"
          placeholder="Enter your Email"
          icon={icons.email}
          value={form.email}
          onChangeText={(value:string)=>setForm({...form,email:value})}
          />
           <InputField 
          label="Password"
          placeholder="Enter your Password"
          icon={icons.lock}
          value={form.password}
          secureTextEntry={true}
          onChangeText={(value:string)=>setForm({...form,password:value})}
          />
        <CustomButton
        title="Sign in"
        onPress={handleSubmit}
        bgVariant="primary"
        style={{marginTop:24,width:"80%",alignSelf:"center", backgroundColor:"#7C3AED"}}
        />
        <OAuth/>
        <Link href='/(auth)/sign-up' style={{fontSize:16,textAlign:"center",marginTop:24}}>
        <Text>Don't have An Account?  </Text>
        <Text style={{color:"#7C3AED"}}>Sign up</Text>
        </Link>
        </View>
      </View>
    </ScrollView>
  )
}

export default Signin

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
  },
  first:{
    flex:1,
    backgroundColor:"white"
  },
  image:{
    width:"100%",
    height:250,
  },
  title:{
    position:"absolute",
    bottom:5,
    left:5,
    fontSize:24,
    lineHeight:32,
    color:"black",
    fontWeight:"bold"
  },
  inputs:{
    padding:5
  }
})
