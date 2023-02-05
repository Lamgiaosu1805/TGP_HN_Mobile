import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestScreens from './src/screens/TestScreens';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreenWebview from './src/screens/HomeScreenWebview';


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <Tab.Navigator
            initialRouteName='HomeWebview' 
            screenOptions={
              ({route}) => ({
                headerShown:false,
                tabBarIcon: ({focused}) => {
                  let iconName;
                  let routeName = route.name;
                  if(routeName == "HomeWebview") {
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
            <Tab.Screen name="HomeWebview" component={HomeScreenWebview} options={{title: 'Trang chủ'}}/>
            <Tab.Screen name="Test" component={TestScreens}/>
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
