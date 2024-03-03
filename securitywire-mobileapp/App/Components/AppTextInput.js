import React from 'react';
import { TextInput, View, StyleSheet, Platform,Keyboard,  TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from './Screen';
import dstyles from '../config/styles';



function AppTextInput({name,pstyle={width:"95%"},align="auto",...otherprop}) {
    return (
        
            <View style={[style.container,{width:pstyle.width,alignSelf:align}]}>
                    <MaterialCommunityIcons style={style.logo} name={name} size={25} color={dstyles.colors.medium} />
                    
                    
                    <TextInput style={[dstyles.text,style.inp]} color="black" {...otherprop}/>
            </View>
        
        
    );
}

const style = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: dstyles.colors.light,
        borderRadius:25,
        margin:10,
        overflow:'hidden'
        
    },
    logo:{
        padding:10
    },
    inp:{
        width:"80%"
    }
}
)

export default AppTextInput;