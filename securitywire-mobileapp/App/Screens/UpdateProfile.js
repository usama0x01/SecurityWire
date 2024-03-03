import React,{useState,useEffect} from 'react';
import { Image, View, StyleSheet,ScrollView } from 'react-native';
import { ImageBackground } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import * as permission from 'expo-permissions';
import * as imagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import AppButton from '../Components/AppButton';
import AppTextInput from '../Components/AppTextInput';
import Screen from '../Components/Screen';
import AppText from '../Components/AppText.android';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API from "../config/api";
import {MsgBox,Colors} from './../Components/styles';
import dstyles from '../config/styles';



const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    name: Yup.string().required().label("Name"),
});

function UpdateProfile({route,navigation}) {
    const [pickImg,setPickImg] = useState(require("../../assets/noProfile.png"));
    const [access,setaccess] = useState(false);
    const [User, setUser] = useState();
    const [pname, setname] = useState("");
    const [pemail, setemail] = useState("");
    const [message, setmessage] = useState();

    useEffect(()=>{
        async function checkUser() {
        try {
            var value = await AsyncStorage.getItem('Credentials')
            value = JSON.parse(value)
            if(value != null)
            {
                setUser(value)
                setname(value.data.user.name)
                setemail(value.data.user.email)
            }
        } catch(e) {
            console.log(e)
        }
        }
        checkUser();
    }
    ,[])
    
      const handleButton = (values, {setSubmitting, setErrors, setStatus, resetForm}) => {
        const {name,email}  = values;
        axios
      .patch(`${API}/users/updateMe`,
      {name, email}, {
        headers: {
        'Authorization': 'Bearer ' + User.token
        }
     })
      .then(async (response) => {
        const result = response.data;
        var { status, data } = result;
        if(status != 'success'){
          setmessage("Error occured");
        }else{
            await AsyncStorage.getItem( 'Credentials' )
            .then( data => {
            data = JSON.parse( data );
            // Decrement
            data.data.user.email=email;
            data.data.user.name=name;
            //save the value to AsyncStorage again
            AsyncStorage.setItem( 'Credentials', JSON.stringify( data ) );
            }).done();
          navigation.goBack();
        }
        })
        .catch((error) => {
          if(error.status == 403){
            setmessage("Access denied, Login Again")
          }
          else{
              setmessage("An error occurred. Check your network and try again")
            }
            console.log(error);
            console.log("error");
        });

        resetForm
        console.log(values)
          
        }
     


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
                initialValues={{name: pname,email:pemail}}
                onSubmit={handleButton}
                enableReinitialize={true}
                validationSchema={validationSchema}
            >
            {({handleChange,handleSubmit, errors , setFieldTouched,touched}) =>(
                <>
                

                <AppTextInput placeholder={"Name"}
                name="account"
                autoCapitalize="none"
                autoCorrect={false}
                defaultValue={pname}
                onChangeText={handleChange("name")}
                onBlue={() => setFieldTouched("name")}
                />
            {touched.Name && <AppText style={{color: 'red'}}>{errors.Name}</AppText>}

                
                <AppTextInput placeholder={"Email"}
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                // defaultValue={"User.email"}
                defaultValue={pemail}
                onChangeText={handleChange("email")}
                onBlue={() => setFieldTouched("email")}
                testContentType="emailAddress"
            />
            {touched.email && <AppText style={{color: 'red'}}>{errors.email}</AppText>}
                
            

             
            <View style={{margin:20}}>  
                <AppButton title="Update" onPress={handleSubmit} color="secondary"/>
            </View>
                </>
            )}
            </Formik>
            <MsgBox type="error">{message}</MsgBox> 
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

export default UpdateProfile;