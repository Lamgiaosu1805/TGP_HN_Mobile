import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarScreen from '../screens/CalendarScreen';
import HomeWebView from '../screens/HomeWebView';
import HocGiaoLy from '../screens/HocGiaoLy';

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
                        iconName = 'ios-calendar-outline'
                    }
                    else if(routeName == "GiaoLyView") {
                        iconName = 'ios-book-outline'
                    }
                    // return <Ionicons name={iconName} size={18} color={focused ? 'blue' : ''}/>
                },
                tabBarActiveTintColor: 'blue',
                tabBarStyle: { height: 40 },
                })
            }
        >
            <Tab.Screen name="HomeWebView" component={HomeWebView} options={{title: 'Trang chủ'}}/>
            <Tab.Screen name="CalendarView" component={CalendarScreen} options={{title: 'Lịch Công giáo'}}/>
            <Tab.Screen name="GiaoLyView" component={HocGiaoLy} options={{title: 'Học giáo lý'}}/>
        </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})