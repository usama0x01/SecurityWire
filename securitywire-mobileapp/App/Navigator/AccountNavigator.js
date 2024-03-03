import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../Screens/AccountScreen';
import UpdateProfile from '../Screens/UpdateProfile';
import ChangePassowrd from '../Screens/ChangePassowrd';


const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
      <Stack.Navigator>
      <Stack.Screen name="Account" options={{headerShown:false}} component={AccountScreen} />
      <Stack.Screen name="Update Profile" options={{headerShown:false}}  component={UpdateProfile} />
      <Stack.Screen name="Change Password" options={{headerShown:false}}  component={ChangePassowrd} />
    </Stack.Navigator>
     
    )
}
    
export default AccountNavigator

const styles = StyleSheet.create({})
