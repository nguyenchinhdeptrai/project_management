import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemType = ({ title }) => {
    return (
        <View style={{ height: 45, backgroundColor: 'white', padding: 10, borderRadius: 12, borderWidth: 1,marginLeft:12 }}>
            <Text>{title}</Text>
        </View>
    )
}

export default ItemType

const styles = StyleSheet.create({})