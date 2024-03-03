import React from 'react';
import { Text,StyleSheet, View } from 'react-native';


function AppText({children,style}) {
    return (
       <View>
        <Text style={[{color: 'black'},style]}>{children}</Text>
       </View>
    );
}




export default AppText;

