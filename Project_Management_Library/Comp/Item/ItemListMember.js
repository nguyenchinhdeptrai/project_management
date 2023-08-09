import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'


const ItemListMember = ({ item, navigation }) => {


    return (
        <TouchableOpacity onPress={() => { navigation.navigate('DetailMember', { item: item, navigation: navigation }) }}>
            <View style={styles.container}>
                <Image source={{ uri: item.img }} style={styles.img} />
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default ItemListMember

const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,
        borderRadius: 12,
        resizeMode: 'contain',
    }, container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 35,
        marginTop: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 7,
    }
})