import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestScreens from './src/screens/TestScreens';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Tab.Navigator
          initialRouteName='Home' 
          screenOptions={
            ({route}) => ({
              headerShown:false,
              tabBarIcon: ({focused}) => {
                let iconName;
                let routeName = route.name;
                if(routeName == "Home") {
                  iconName = 'home'
                }
                else if(routeName == "Test") {
                  iconName = 'add'
                }
                return <Ionicons name={iconName} size={18} color={focused ? 'blue' : ''}/>
              },
              tabBarActiveTintColor: 'blue',
              tabBarStyle: { height: 40 },
            })
          }
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Trang chủ'}}/>
          <Tab.Screen name="Test" component={TestScreens}/>
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
