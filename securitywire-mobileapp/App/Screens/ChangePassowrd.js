import React,{useState,useEffect,useContext} from 'react';
import { Image, View, StyleSheet,ScrollView,ActivityIndicator } from 'react-native';
import { ImageBackground } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import * as permission from 'expo-permissions';
import * as imagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput';
import Screen from '../Components/Screen';
import AppText from '../Components/AppText.android';
import dstyles from '../config/styles';
import axios from 'axios';
import {Restart} from 'fiction-expo-restart';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../Components/CredentialsContext';
import {MsgBox,Colors} from './../Components/styles';
import API from "../config/api";


const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(8).label("Password"),
    passwordConfirm: Yup.string().required().min(8).label("Password"),
    
});


const { darkLight, brand, primary } = Colors;
function ChangePassowrd(props) {
    const navigation = useNavigation()
    const [access,setaccess] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [User, setUser] = useState();

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

    
    const loggingOut =async () =>{
      try {
          await AsyncStorage.removeItem("Credentials");
          Restart()
      }
      catch(exception) {
          console.log(exception)
      }
    }
    // credentials context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  
    const handleChangePassowrd = (credentials, setSubmitting) => {
    
      handleMessage(null);
      const {passwordCurrent,password,passwordConfirm} = credentials; 
      axios
      .patch(`${API}/users/updateMyPassword`, {passwordCurrent,password,passwordConfirm },{
        headers: {
        'Authorization': 'Bearer ' + User.token
        }
     })
      .then((response) => {
        const result = response.data;
        const { status, token, data } = result;
          if (status != 'success') {
            handleMessage("incorrect old password.", status);
          } else {
            loggingOut()
          }
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          if(error.toJSON().status == 401){
            handleMessage('Old password is incorrect.');
          }
          else{
            handleMessage('An error occurred. Check your network and try again');
          }
          console.log(error.toJSON());
        });
    };
  
    const handleMessage = (message, type = '') => {
      setMessage(message);
      setMessageType(type);
    };

     // Persisting login
  const persistLogin = async (credentials) => {
    AsyncStorage.setItem('Credentials', JSON.stringify(credentials))
    .then((res) => {
      setStoredCredentials(credentials);
    })
    .catch((error) => {
      handleMessage('Persisting login failed');
      console.log("sucess")
      console.log(error);
    });
  };
     


   
    return (
            <Screen>
            <View style={styles.container}>
                <Formik
            initialValues={{passwordCurrent:'',password:'',passwordConfirm:''}}
            onSubmit={(values, { setSubmitting }) => {
                handleChangePassowrd(values, setSubmitting);
            }}
            validationSchema={validationSchema}
        >
        {({handleChange,handleSubmit, errors , setFieldTouched,touched,isSubmitting }) =>(
            <>
            <AppTextInput placeholder={"Current Password"}
                name="lock"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                onChangeText={handleChange("passwordCurrent")}
                onBlue={() => setFieldTouched("passwordCurrent")}
                textContentType="password"
             />
             <View>
            {touched.passwordCurrent && errors.passwordCurrent &&  <AppText style={{color: 'red'}}>{errors.passwordCurrent}</AppText>}
             </View>
        <AppTextInput placeholder={"Password"}
            name="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlue={() => setFieldTouched("password")}
            textContentType="password"
         />
         <View>
        {touched.password && errors.password &&  <AppText style={{color: 'red'}}>{errors.password}</AppText>}
         </View>

         <AppTextInput placeholder={"Confirm Password"}
                name="lock"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                onChangeText={handleChange("passwordConfirm")}
                onBlue={() => setFieldTouched("passwordConfirm")}
                textContentType="password"
             />
             <View>
            {touched.passwordConfirm && errors.passwordConfirm &&  <AppText style={{color: 'red'}}>{errors.passwordConfirm}</AppText>}
             </View>
         

        {!isSubmitting && (
        <View style={{margin:20}}>  
            <AppButton title="Change Password"  onPress={handleSubmit} color="primary"/>
        </View>
        )}
        {isSubmitting && (
        <View style={{margin:20}} disabled={true}>
            <ActivityIndicator size="large" color={primary} />
        </View>
        )}
        <MsgBox type={messageType}>{message}</MsgBox>   
        </>
        )}
        </Formik>
        
            </View>
            </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
    },icon:{
        opacity: 0.8
    },
    imgcon:{
        height:120,
        width:120,
        alignSelf:'center',
        borderRadius:100,
        margin:10,
        overflow:'hidden',
        borderColor:dstyles.colors.danger,
    },
    imgtext:{
        color:dstyles.colors.medium,
        fontSize:12
    },
    imagePickStyle:{
        width:120,
        height:120,
        justifyContent: "center",
        alignItems:"center",
        borderRadius:50,
    }
})

export default ChangePassowrd;