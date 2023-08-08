import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React from 'react'

const ItemListBook = ({ item, navigation }) => {
    if (!item) {
        return null;
    }
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor={'white'} onPress={() => { navigation.navigate('DetailBook', { item: item }) }}>
            <View style={styles.container}>
                <Image source={{ uri: item.img }} style={styles.img} />
                <View style={{ padding: 10 }}>
                    <Text>{item.name}</Text>
                    <Text>{item.categoryName}</Text>
                    <Text>Số lượng:{item.count}</Text>
                </View>
            </View>
        </TouchableHighlight>

    )
}

export default ItemListBook

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        margin: 10,
    },
    img: {
        width: 80,
        height: 80,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        resizeMode:'contain',
    }
})