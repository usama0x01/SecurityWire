import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { ActivityIndicator,StyleSheet, Text, View } from 'react-native';
import NavTheme from './App/Navigator/navigationTheme';
import { NavigationContainer } from '@react-navigation/native';
import Loading from './App/Screens/Loading';



export default function App() {
  
return (
    <NavigationContainer theme={NavTheme}>
            <Loading/>
    </NavigationContainer>
);
 
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