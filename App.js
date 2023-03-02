import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import CalendarDetail from './src/screens/CalendarDetail';
import BottomTab from './src/navigator/BottomTab';

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
