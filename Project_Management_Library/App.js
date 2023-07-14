import { StatusBar } from 'expo-status-bar';
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
    <View style={styles.container}>
      <Button onPress={() => getData()} title='Get' />
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{state}</Text>
      <StatusBar style="auto" />
    </View>
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
