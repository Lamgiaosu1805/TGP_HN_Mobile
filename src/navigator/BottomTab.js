import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CalendarScreen from '../screens/CalendarScreen';
import HomeWebView from '../screens/HomeWebView';
import HocGiaoLy from '../screens/HocGiaoLy';
import Menu from '../screens/Menu';

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
                        iconName = 'calendar-week'
                    }
                    else if(routeName == "GiaoLyView") {
                        iconName = 'book'
                    }
                    else if(routeName == "MenuView") {
                        iconName = 'bars'
                    }
                    return <Icon name={iconName} size={18} color={focused ? '#003399' : '#413e3e'} />
                },
                tabBarActiveTintColor: '#003399',
                tabBarStyle: { height: Platform.OS === "ios" ? 45 : 60},
                tabBarItemStyle: {paddingBottom: Platform.OS === "ios" ? 0 : 10}
                })
            }
        >
            <Tab.Screen name="HomeWebView" component={HomeWebView} options={{title: 'Trang chủ'}}/>
            <Tab.Screen name="CalendarView" component={CalendarScreen} options={{title: 'Lịch Công giáo'}}/>
            <Tab.Screen name="GiaoLyView" component={HocGiaoLy} options={{title: 'Học giáo lý'}}/>
            <Tab.Screen name="MenuView" component={Menu} options={{title: 'Menu'}}/>
        </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})