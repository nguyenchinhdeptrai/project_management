import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loan = () => {
  return (
    <View style={styles.container}>
      <Text>Loan</Text>
    </View>
  )
}

export default Loan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      }
})