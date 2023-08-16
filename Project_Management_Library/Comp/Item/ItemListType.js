import { StyleSheet, Text, View , Image } from 'react-native'
import React from 'react'

const ItemListType = ({title , img , count , des}) => {
  return (
    <View style={styles.container}>
        <Image source={{uri:img}} style={styles.img}/>
        <View style={{padding:10}}>
            <Text>{title}</Text>
            <Text>{des}</Text>
            <Text>Số lượng: {count}</Text>
        </View>
    </View>
  )
}

export default ItemListType

const styles = StyleSheet.create({
    container:{
        borderRadius:15,
        backgroundColor:'#D9D9D9',
        flexDirection:'row',
        margin:10
    },
    img:{
        width:80,
        height:80,
        borderTopLeftRadius:16,
        borderBottomLeftRadius:16,
    }
})