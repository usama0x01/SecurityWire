
import React,{useState,useEffect,useContext} from 'react';
import { View,StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from '../Components/Icon';
import ListItem from '../Components/ListItem';
import Screen from '../Components/Screen';
import colors from '../config/colors';
import {useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Restart} from 'fiction-expo-restart';


const DATA = [
    {
        title: "Update Profile",
        icon:{
            name: "account-edit",
            backgroundColor: colors.secondary
        }
    },
    {
        title: "Change Password",
        icon:{
            name: "key",
            backgroundColor: colors.logotext
        }
    },
    
]




function AccountScreen({route,navigation}) {
    const [AccName, setAccName] = useState("Demo User");
    const [Email, setEmail] = useState("demo@demo.com");
    const [User, setUser] = useState();

    const loggingOut =async () =>{
        try {
            await AsyncStorage.removeItem("Credentials");
            Restart()
        }
        catch(exception) {
            console.log(exception)
        }
}

    useEffect(()=>{
        async function checkUser() {
        try {
            var value = await AsyncStorage.getItem('Credentials')
            value = JSON.parse(value)
            if(value != null)
            {
                setAccName(value.data.user.name)
                setEmail(value.data.user.email)
                setUser(value.data.user)
            }
        } catch(e) {
            console.log(e)
        }
        }
        checkUser();
    }
    )
    
    
    return (
        <View style={style.container}>
        <Screen>
            <View style={{marginBottom: 20}}>

            <ListItem img='https://i.ibb.co/6y1dKSV/logo.png'
            subtitle={Email} title={AccName} />
            </View>
            <View style={{marginVertical: 20}}>

            <FlatList
              data={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={
                ({item}) =>
                    <ListItem
                    icon={<Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />}
                    title={item.title}
                    onPress={()=>{navigation.navigate(item.title)}}
                    />
              }
              ItemSeparatorComponent={()=>
                  <View style={{width:"100%", height:2, backgroundColor: "light"}}/>
              }
            />

            </View>
            <View >
            <ListItem
                    icon={<Icon name="logout" backgroundColor="#ffe66d" />}
                    title="Logout"
                    onPress={loggingOut}
                    />
            </View>
        </Screen>
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.light
    },
    listing:{
        left:10
    },
    
}
)

export default AccountScreen;