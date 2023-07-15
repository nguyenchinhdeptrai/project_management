import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Comp/LoginandChangePass/Login';
import Splashscreen from './Comp/LoginandChangePass/Splashscreen';
import ChangePass from './Comp/LoginandChangePass/ChangePass';
import ChangePass2 from './Comp/LoginandChangePass/ChangePass2';
const Stack = createNativeStackNavigator();
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
const URL = 'http://localhost:3000';
export default function App() {

  const [state, setstate] = useState([]);


  const getData = () => {
    fetch(`${URL}`)
      .then((response) => response.json())
      .then((response) => {
        console.log("RESPONSE: " + response);
      })
      .catch((error) => console.log("ERROR: " + error));
  };

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
