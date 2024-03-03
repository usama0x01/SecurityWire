import React from 'react';
import { SafeAreaView, View } from 'react-native';

import Constants from 'expo-constants';

function Screen(props) {
    return (
        <View style={{flex:1,paddingTop: Constants.statusBarHeight,flex:1}}>
        {props.children}
        </View>
    );
}

export default Screen;