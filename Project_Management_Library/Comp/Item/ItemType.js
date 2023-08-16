import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'

const ItemType = ({ item, navigation }) => {
    if (!item) {
        return null;
    }
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor={'white'} onPress={() => navigation.navigate('DeTailTypeBook', { item: item })}>
            <View style={{ height: 45, backgroundColor: 'white', padding: 10, borderRadius: 12, borderWidth: 1, margin: 12 }}>
                <Text>{item.name}</Text>
            </View>
        </TouchableHighlight>

    )
}

export default ItemType

const styles = StyleSheet.create({})