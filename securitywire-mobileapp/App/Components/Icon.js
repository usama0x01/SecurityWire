import React from 'react';
import {  View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Icon({name,size=40,color="#fff",backgroundColor="red"}) {
    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size/2,
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <MaterialCommunityIcons name={name} size={size/2} color={color} />
        </View>
    );
}

export default Icon;