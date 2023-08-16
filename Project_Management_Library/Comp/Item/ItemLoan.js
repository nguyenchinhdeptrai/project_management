import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native';

const ItemLoan = ({ item, navigation }) => {

    if (!item) {
        return null;
    }
    // Xác định màu nền dựa trên giá trị item.status
    const backgroundColor = item.status == 'yes' ? 'lightgreen' : 'tomato';
    return (

        <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={() => { navigation.navigate('ScreenDeitalLoan', { item: item }) }}>
            <Image source={{ uri: item.bookImage }} style={styles.img} />
            <View style={{ flexDirection: 'column', }}>
                <Text style={styles.textNameBook}>{item.bookName}</Text>
                <Text>Người mượn: {item.nameMember}</Text>
                <Text>Ngày mượn: {item.startDate}</Text>
                <Text>Ngày trả: {item.endDate}</Text>
                <Text>Thủ thư: {item.userName}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default ItemLoan

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 16,
        marginRight: 32,
    },
    textNameBook: {
        fontWeight: 'bold',
        fontSize: 18
    }
})