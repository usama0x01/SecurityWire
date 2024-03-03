
import React,{useState,useEffect,useRef} from 'react'
import { Animated,StyleSheet,View,TextInput,Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, ThemeProvider } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput';
import { NavigationContainer } from '@react-navigation/native';
import urlExist from "url-exist"

import Screen from '../Components/Screen'
import API from "../config/api";
import dstyles from '../config/styles';
import { MsgBox } from '../Components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default  ScanScreen = () => {
  
    const navigation = useNavigation()
    const [url, seturl] = useState();
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [User, setUser] = useState();
    
    async function validURL(str) {
      var pattern = new RegExp('((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }

    
    useEffect(()=>{
      async function checkUser() {
      try {
          var value = await AsyncStorage.getItem('Credentials')
          value = JSON.parse(value)
          if(value != null)
          {
              setUser(value)
          }
      } catch(e) {
          console.log(e)
      }
      }
      checkUser();
  }
  ,[])

  
  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };
  

  const sendValues =async () => {
    setMessage(null)
    const isLive = await urlExist(`https://${url}`)
    if(validURL(url) && isLive ){
      axios
    .get(`${API}/Scanner/status`, {
      headers: {
      'Authorization': 'Bearer ' + User.token
      }
   })
    .then((response) => {
      var { status, data } = response;
      if(data.status != false){
        setMessage("Wait for Previous Scan to complete.");
      }else{
        seturl(null)
        fetch(`${API}/Scanner/create`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + User.token
          },
          body: JSON.stringify({url:url })
        })
        .catch((error) => {
          if(error.status == 403){
            setMessage("Access denied, Login Again")
          }
          else{
              setMessage("An error occurred. Check your network and try again")
            }
            console.log(error);
            console.log("error-inner");
        });
        navigation.navigate("Results");
      }
      })
      .catch((error) => {
        if(error.status == 403){
          setMessage("Access denied, Login Again")
        }
        else{
            setMessage("An error occurred. Check your network and try again")
          }
          console.log(error);
          console.log("error");
      });
    }
    else{
      setMessage("Enter Valid Url.")
    }

  };

    const widthAnim = useRef(new Animated.Value(250)).current;

    const widthinc = () => {
        Animated.timing(widthAnim, {
          toValue: 350,
          duration: 500,
          useNativeDriver: false
        }).start();
      };
    
      const widthdec = () => {
        Animated.timing(widthAnim, {
          toValue: 250,
          duration: 150,
          useNativeDriver: false
        }).start();
      };

  return (
      <Screen>
          <TouchableWithoutFeedback onPress={() => {
              Keyboard.dismiss()
              widthdec()
              }}>
       <View style={{flex:1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor: dstyles.colors.light}}>
        <Animated.View style={{width:widthAnim,alignSelf:'center'}}>
                <View style={styles.container}>
                    {/* <MaterialCommunityIcons name="search-web" size={30} color={dstyles.colors.medium} />   */}
                    <TextInput onFocus={()=>{widthinc()}} value={url} onChangeText={text => seturl(text)} placeholder="Enter Url (www.redacted.com)" style={[dstyles.text,styles.inp]} color="black" autoCapitalize="none" autoCorrect={false}/>
                </View>
            </Animated.View>

          <View style={styles.button}>  
           <AppButton onPress={sendValues} title="Scan"  color="danger"/>
          </View>
          <MsgBox type={messageType}>{message}</MsgBox>  
       </View>
          </TouchableWithoutFeedback>
      </Screen>
   
  );
};








const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: dstyles.colors.white,
        borderRadius:20,
      padding:11,
        overflow:'hidden',
        height:50

    },
    logo:{
        padding:10,
    },
    inp:{
        width:"100%",
    },button: {
      width: "40%",
      padding: 5,
      borderRadius: 10,
      alignSelf:'center'
    }
  });
  

