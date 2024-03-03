import React, { Component } from 'react'
import { ImageBackground } from 'react-native';
import { SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native'
import Screen from '../Components/Screen';
import colors from '../config/colors';

export default DetailScreen = ({ route, navigation }) =>{
    const { pdata } = route.params;
    if(pdata.sqli.length==0){
        pdata.sqli = ['No Sql Injection Found']
    }
    if(pdata.xss.length==0){
        pdata.xss = ["No Xss Injection Found"]
    }
    if(pdata.exif == null || pdata.exif == "null"){
        pdata.exif = ["No Exif Data Found"]
    }
    if(pdata.port.length==0){
        pdata.port = ["No Open Ports Found"]
    }

    var DATA = [
        {
        title: 'SQL Injection',
        data: pdata.sqli,
        },
        {
        title: 'Cross Site Scripting',
        data: pdata.xss,
        },
        {
        title: 'Open Ports',
        data: pdata.port,
        },
        {
        title: 'Exif Data',
        data: pdata.exif,
        },
    ];

    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
      

        return (
          <ImageBackground style={{flex: 1}} resizeMode='contain' imageStyle={{opacity:0.1}} source={require('../../assets/logo.png')}>
          
            <Screen style={styles.container}>
            <SectionList
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <Item title={item} />}
              renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
              />
             </Screen>
             </ImageBackground>
        )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
      backgroundColor: colors.light,
    },
    item: {
      flex: 1,
      backgroundColor: '#f9c2ff',
      padding: 2,
      marginVertical: 2,
      marginBottom:0
    },
    header: {
        flex: 1,
      fontSize: 25,
      backgroundColor: colors.light,
      borderRadius:30,
      alignSelf: 'center',
      padding: 4
    },
    title: {
      fontSize: 17,
    },
  });