import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../Screens/WelcomeScreen';
import SignupScreen from '../Screens/SignupScreen';
import LoginScreen from '../Screens/LoginScreen';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
      <Stack.Navigator>
      <Stack.Screen name="Welcome" options={{headerShown:false}} component={WelcomeScreen} />
      <Stack.Screen name="Login" options={{headerShown:false}}  component={LoginScreen} />
      <Stack.Screen name="Signup" options={{headerShown:false}} component={SignupScreen} /> 
      <Stack.Screen name="AppNavigator" options={{headerShown:false}} component={AppNavigator} /> 
    </Stack.Navigator>
     
    )
}

export default AuthNavigator

const styles = StyleSheet.create({})
