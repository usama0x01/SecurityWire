import React from 'react';
import { Text,StyleSheet, View } from 'react-native';

import { Zocial } from '@expo/vector-icons';

function AppText({children,style}) {
    return (
       <View>
        <Text style={[style.text,style]}>{children}</Text>
       </View>
    );
}

const style = StyleSheet.create({
    text:{
        color: 'red',
        fontSize: 25,
        fontFamily: 'Avenir'
    }
})

export default AppText;

