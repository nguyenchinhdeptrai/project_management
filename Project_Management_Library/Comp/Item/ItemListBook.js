import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ItemListType = ({ item }) => {
    if (!item) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.img }} style={styles.img} />
            <View style={{ padding: 10 }}>
                <Text>{item.name}</Text>
                <Text>{item.categoryName}</Text>
                <Text>Số lượng:{item.count}</Text>
            </View>
        </View>
    )
}

export default ItemListType

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        margin: 10
    },
    img: {
        width: 80,
        height: 80,
    }
})