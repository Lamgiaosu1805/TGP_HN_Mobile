import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarScreen from '../screens/CalendarScreen';
import HomeWebView from '../screens/HomeWebView';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <View style={styles.container}>
        <Tab.Navigator
            initialRouteName='HomeWebView' 
            screenOptions={
                ({route}) => ({
                headerShown:false,
                tabBarIcon: ({focused}) => {
                    let iconName;
                    let routeName = route.name;
                    if(routeName == "HomeWebView") {
                    iconName = 'home'
                    }
                    else if(routeName == "CalendarView") {
                    iconName = 'calendar'
                    }
                    return <Ionicons name={iconName} size={18} color={focused ? 'blue' : ''}/>
                },
                tabBarActiveTintColor: 'blue',
                tabBarStyle: { height: 40 },
                })
            }
        >
            <Tab.Screen name="HomeWebView" component={HomeWebView} options={{title: 'Trang chủ'}}/>
            <Tab.Screen name="CalendarView" component={CalendarScreen} options={{title: 'Lịch Công giáo'}}/>
        </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})