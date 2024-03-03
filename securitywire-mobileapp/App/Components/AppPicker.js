import React,{useState} from 'react';

import {Picker} from '@react-native-picker/picker';
import { View } from 'react-native';
import Screen from './Screen';

import { useFormikContext } from 'formik';

const category = [
    {
        label:"a", value:1
    },{
        label:"b", value:2
    },{
        label:"c", value:3
    },
  ]

var dumy =[]
let myUsers = (data)=>{
    dumy = data.map((myValue,myIndex)=>{
        return(
        <Picker.Item label={myValue.label} value={myValue.label} key={myIndex} />
        )
        })
}

function AppPicker({items,name , placeholder}) {
    const {error, setFieldValue, touched , values} = useFormikContext();
    {myUsers(items)}
    return (
        <Screen>
        <View>

            <Picker
            selectedValue={values[name]}
            onValueChange={(itemValue, itemIndex) =>{ 
                setFieldValue(name,itemValue)
            }
            }>
                {dumy}
            </Picker>

        </View>
        </Screen>
    );
}

export default AppPicker;