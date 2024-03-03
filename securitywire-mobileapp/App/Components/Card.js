import React from 'react';
import { View,StyleSheet,Image,Text } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText'

function Card({styleimg,title,subtitle,style1,img}) {
    return (
        <View style={{backgroundColor: colors.white , overflow:"hidden" ,borderRadius:15,marginBottom:20}}>
             <Image style={[style.image,styleimg]} source={{
              uri: img
            }} />
            <View style={{padding:20,marginVertical:5}}>
                <AppText style={style.title}>
                   {title}
                </AppText>
                <AppText style={[style.subtitle,style1]}>
                    {subtitle}
                </AppText>
            </View>
        </View>
    );
}
const style = StyleSheet.create({
    image:{
        width: "100%",
        height: 200,
        
    },
    title:{
        color: "black",
        fontSize: 25
    },
    subtitle:{
        color: colors.secondary,
        fontSize: 20,
        fontWeight: '900',
        marginVertical:10
    }
}
)


export default Card;