import React from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
function MessageDelete(props) {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View  style={{backgroundColor: colors.danger,height: "100%", width:80,justifyContent:"center",alignItems: "center"}}>
                <MaterialCommunityIcons name="trash-can-outline" size={35} color="white" />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default MessageDelete;

