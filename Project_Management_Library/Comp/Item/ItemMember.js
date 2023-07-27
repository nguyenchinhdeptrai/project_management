import { StyleSheet, Text, View  , Image} from 'react-native'
import React from 'react'

const ItemMember = ({title , img}) => {
  
  return (
    <View style={{height:100 , backgroundColor:'white'}}>
      <Image source={{uri: img}} style={styles.img}/>
      <Text>{title}</Text>
    </View>
  )
}

export default ItemMember

const styles = StyleSheet.create({
  img:{
    width:80,
    height:80,
    borderRadius:30
  }
})