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

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../Components/CredentialsContext';
import {MsgBox,Colors} from './../Components/styles';
import API from "../config/api";


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    name: Yup.string().required().label("name"),
    password: Yup.string().required().min(8).label("Password"),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});


const { darkLight, brand, primary } = Colors;
function SignupScreen(props) {
    const navigation = useNavigation()
    const [pickImg,setPickImg] = useState(require("../../assets/noProfile.png"));
    const [access,setaccess] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    
    // credentials context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  
    const handleSignup = (credentials, setSubmitting) => {
    
      handleMessage(null);
      const {name,email, password,passwordConfirm} = credentials; 
      axios
      .post(`${API}/users/signup`, { name,email, password,passwordConfirm })
      .then((response) => {
        const result = response.data;
        const { status, token, data } = result;
          if (status != 'success') {
            handleMessage("Please fill required field", status);
          } else {
            persistLogin(result);
            navigation.navigate('AppNavigator')
          }
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
          if(error.toJSON().status == 401){
            handleMessage('Some Error occurred');
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
     

    useEffect(() => {
        
    }, [])

    async function imageSelector(){
        const {granted} =await permission.askAsync(permission.CAMERA)
            setaccess(granted)
            if(!granted)
            alert('You need to allow camera permission...!')
            else{
                try {
                    const result = await imagePicker.launchImageLibraryAsync();
                    if(!result.cancelled)
                    setPickImg({uri:result.uri})
                    } catch (error) {
                        console.log("image load error",error)
                    }
            }
        
    }

    return (
        <ScrollView>
            <Screen>
                <View  style={styles.imgcon} >

                {/* <ImageBackground  style={styles.img} source={pickImg}>

                    <View style={styles.imagePickStyle}>
                    <MaterialCommunityIcons style={styles.icon} name="camera-enhance" onPress={imageSelector}  size={40} color={dstyles.colors.medium} />
                    </View>
                

                </ImageBackground> */}
                </View>

                <Formik
            initialValues={{name: '',email:'',password:'',passwordConfirm:''}}
            onSubmit={(values, { setSubmitting }) => {
                handleSignup(values, setSubmitting);
            }}
            validationSchema={validationSchema}
        >
        {({handleChange,handleSubmit, errors , setFieldTouched,touched,isSubmitting }) =>(
            <>
            <AppTextInput placeholder={"name"}
                name="account"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("name")}
                onBlue={() => setFieldTouched("name")}
            />
            {touched.name && errors.name &&  <AppText style={{color: 'red'}}>{errors.name}</AppText>}


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
            <AppButton title="SIGNUP" onPress={handleSubmit} color="primary"/>
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
            </ScrollView>  
    );
}

const styles = StyleSheet.create({
    img:{
        height:120,
        width:120,
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

export default SignupScreen;