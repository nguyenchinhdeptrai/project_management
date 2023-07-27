import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Book = () => {
  return (
    <View style={styles.container}>
      <Text>Book</Text>
    </View>
  )
}

export default Book

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})