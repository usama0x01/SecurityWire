import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ScanScreen from '../Screens/ScanScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import ScanButton from './ScanButton';
import AccountNavigator from './AccountNavigator';
import ResultsNavigator from './ResultsNavigator';


const Tab = createBottomTabNavigator()

export default AppNavigator = () =>{
  return(
  <Tab.Navigator
    initialRouteName={'Scan'}
    tabBarOptions={{  
      activeBackgroundColor:colors.primary,
      activeTintColor:colors.white,
      inactiveBackgroundColor:colors.light,
      inactiveTintColor:colors.dark,
    }}
  >
    <Tab.Screen name="Results" component={ResultsNavigator} options={{
      tabBarIcon: ({size,color})=><MaterialCommunityIcons name="file-document" size={size} color={color} />
    }}/>
    <Tab.Screen name="Scan" component={ScanScreen} options={({navigation})=>({
      tabBarIcon: ({size,color})=><ScanButton onPress={()=>navigation.navigate('Scan')} />
    })}/>
    
    <Tab.Screen name="Account" component={AccountNavigator} options={{
      tabBarIcon: ({size,color})=><MaterialCommunityIcons name="account" size={size} color={color} />
    }}/>
  </Tab.Navigator>
  )
  
}

