import React,{useEffect,useState} from 'react';
import { ActivityIndicator,StyleSheet, Text, View } from 'react-native';
import AuthNavigator from '../Navigator/AuthNavigator';
import AppNavigator from '../Navigator/AppNavigator';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Loading = () =>{
  const [condition, setcondition] = useState(0)
//   return(
//     <AuthNavigator/>
// )
  
  

  useEffect(()=>{
      async function checkUser() {
        try {
          const value = await AsyncStorage.getItem('Credentials')
          if(value !== null) {
              setcondition(2)
          }
          else{
              setcondition(1)
          }
        } catch(e) {
          console.log(e)
        }
      }
      checkUser();
    }
 ,[])
  
 
   if(condition==0){
      return(
        <ActivityIndicator size='large' />
      )
   }
   else if(condition==1){
      return(
             <AuthNavigator/>
        )
   }
   else if(condition==2){
      return(
            <AppNavigator/>
        )
   }
 
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#3FC5AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});