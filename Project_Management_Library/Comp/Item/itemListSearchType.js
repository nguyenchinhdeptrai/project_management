import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'
import React from 'react'

const ItemListSearchType = ({ item, nameType }) => {
    return (
        <View style={styles.contaner}>
            <View style={styles.view1}>
                <Image source={{ uri: item.img }} style={styles.image} />
            </View>
            <View style={styles.view2}>
                <Text style={styles.textNameType}>Thể loại: {nameType}</Text>
                <Text style={{ paddingVertical: 3 }}>Tên Sách: {item.name}</Text>
                <Text style={{ paddingVertical: 3 }}>Số lương: {item.count}</Text>
            </View>
        </View>
    )
}

export default ItemListSearchType

const styles = StyleSheet.create({
    contaner: {
        backgroundColor: '#D9D9D9',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 7,
        borderRadius: 12,
    },
    view1: { flex: 1, },
    view2: { flex: 3, },
    image: {
        width: '90%',
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    textNameType: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 2,
    }
})