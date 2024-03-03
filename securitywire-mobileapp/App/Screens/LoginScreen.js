import React,{useState,useEffect,useContext} from 'react';
import { Image, View, StyleSheet,ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../Components/CredentialsContext';

// api client
import axios from 'axios';

import {MsgBox,Colors} from '../Components/styles';
import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput';
import Screen from '../Components/Screen';
import AppText from '../Components/AppText.android';
import { useNavigation } from '@react-navigation/native';
import API from "../config/api";


const { darkLight, brand, primary } = Colors;

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")

});

function LoginScreen(props) {
    const navigation = useNavigation()
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    
    // credentials context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  
    const handleLogin = (credentials, setSubmitting) => {
      handleMessage(null);
      const {email,password} = credentials; 
      axios
      .post(`${API}/users/login`, { email, password })
      .then((response) => {
        const result = response.data;
        const { status, token, data } = result;
          if (status != 'success') {
            handleMessage("Wrong Email or Password.", status);
          } else {
            persistLogin(result);
            navigation.navigate('AppNavigator')
          }
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          if(error.toJSON().status == 401){
            handleMessage('Wrong Email or Password.');
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
    AsyncStorage.getItem('Credentials')
    .then((res)=>{
      // console.log(res+"asd2")

    })
    
  };
    
    return (
        <Screen>
            <View style={styles.imgcon} >
            <Image style={styles.img} source={require("../../assets/logo.png")}/>
            </View>

        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
                handleLogin(values, setSubmitting);
            }}
            validationSchema={validationSchema}
        >
        {({handleChange,handleSubmit, errors , setFieldTouched,touched,isSubmitting }) =>(
            <>
            <AppTextInput placeholder={"Email"}
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleChange("email")}
            onBlue={() => setFieldTouched("email")}
            testContentType="emailAddress"
        />
        {touched.email && errors.email && <AppText style={{color: 'red'}}>{errors.email}</AppText>}
        
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

        {!isSubmitting && (
        <View style={{margin:20}}>  
            <AppButton title="LOGIN" onPress={handleSubmit} color="primary"/>
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
        
        </Screen>
    
);

}

const styles = StyleSheet.create({
    img:{
        height:130,
        width:130
    },
    imgcon:{
        alignItems:"center",
        margin:30
    }
})

export default LoginScreen;