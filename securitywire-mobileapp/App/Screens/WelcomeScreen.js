
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, Image,ImageBackground ,StatusBar, TouchableWithoutFeedback,Platform, SafeAreaView, Button, Alert, View } from 'react-native';
import LottieView from 'lottie-react-native';

import AppButton from '../Components/AppButton';
import colors from '../config/colors';

import {useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
 

  const navigation  = useNavigation()

    const [isLoading, setisLoading] = useState(true);


  useEffect(()=>{
    setTimeout(()=>{
      setisLoading(false);
    },2500)
  },[])

    if(isLoading){
      return (
        <View style={{flex:1,backgroundColor:colors.bg}}>
          {/* <LottieView source={require('../../assets/8878-done.json')} autoPlay loop/> */}
          <LottieView source={require('../../assets/5765-security-lock-encryption-animation.json')} autoPlay loop/>
        </View>
    )
    }
    return (
      <SafeAreaView style={styles.container}>
        
        <View style={{top: StatusBar.currentHeight,flex:1}}>
          <ImageBackground blurRadius={1} source={{}} style={styles.image}>
  
              <View style={styles.container1}>
            <TouchableWithoutFeedback onPress={() => { console.log("img")}}>
              <Image style={{height: 150,width: 150}} source={require('../../assets/logo.png')} />
            </TouchableWithoutFeedback>
              <Text style={styles.text} numberOfLines={1}  >SecurityWire Vulnerbilty Scanner</Text>
            </View>
            
        
  
          <View style={styles.button}>  
           <AppButton title="LOGIN" onPress={() => {navigation.navigate("Login")}} color="primary"/>
          </View>
          <View style={styles.button}>  
           <AppButton title="SIGNUP" onPress={() => { navigation.navigate("Signup") }} color="secondary"/>
          </View>
             
  
          </ImageBackground>
        </View>
  
        
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: "20%"

  },image: {
    width: null,
    height: null,
    flex: 1,
    backgroundColor:colors.light,
    resizeMode: "cover",
  },button: {
    width: "100%",
    padding: 5,
    bottom:StatusBar.currentHeight,
    borderRadius: 10,
  },text:{
    color: colors.logotext,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical:10
  },
});
