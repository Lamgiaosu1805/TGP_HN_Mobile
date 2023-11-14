import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import CalendarDetail from './src/screens/CalendarDetail';
import BottomTab from './src/navigator/BottomTab';
import LinhMucScreen from './src/screens/LinhMucScreen';
import LinhMucDetailScreen from './src/screens/LinhMucDetailScreen';
import GiaoXuScreen from './src/screens/GiaoXuScreen';
import GiaoXuDetailScreen from './src/screens/GiaoXuDetailScreen';
import GiaoLyDetai from './src/screens/GiaoLyDetai';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Home" component={BottomTab}/>
            <Stack.Screen name="CalendarDetail" component={CalendarDetail}/>
            <Stack.Screen name="LinhMucScreen" component={LinhMucScreen} />
            <Stack.Screen name="LinhMucDetailScreen" component={LinhMucDetailScreen} />
            <Stack.Screen name="GiaoXuScreen" component={GiaoXuScreen} />
            <Stack.Screen name="GiaoXuDetailScreen" component={GiaoXuDetailScreen} />
            <Stack.Screen name="GiaoLyDetail" component={GiaoLyDetai} />
          </Stack.Navigator>
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
