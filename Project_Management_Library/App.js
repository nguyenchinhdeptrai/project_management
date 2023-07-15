import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Comp/LoginandChangePass/Login';
import Splashscreen from './Comp/LoginandChangePass/Splashscreen';
import ChangePass from './Comp/LoginandChangePass/ChangePass';
import ChangePass2 from './Comp/LoginandChangePass/ChangePass2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Splashscreen'>
        <Stack.Screen name="Splashscreen" component={Splashscreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePass" component={ChangePass} options={{ headerShown: false }} />
        <Stack.Screen name='ChangePass2' component={ChangePass2} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
