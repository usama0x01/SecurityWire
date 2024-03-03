import React from 'react';
import { TouchableOpacity,Text, View } from 'react-native';
import colors from '../config/colors';

function AppButton({onPress,color,title,width="100%",disabled=false}) { 
    return (
        <TouchableOpacity onPress = {onPress} disabled={disabled}>
    <View style = {{backgroundColor: colors[color], alignItems: 'center', 
                    justifyContent: 'center', borderRadius: 25,height:50, width:width}}
           >
        <Text style = {{color: colors.white}}>{title}</Text>
    </View>
</TouchableOpacity>
    );
}

export default AppButton;