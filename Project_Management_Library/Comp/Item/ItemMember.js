import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ItemMember = ({ name, img }) => {

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.img} />
      <Text>{name}</Text>
    </View>
  )
}

export default ItemMember

const styles = StyleSheet.create({

  container: {
    height: 100,
    backgroundColor: '#F8F6F4',
    marginRight:10,
    alignItems:'center',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 60
  }
})