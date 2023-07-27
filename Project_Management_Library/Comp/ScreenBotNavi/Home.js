import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import ItemMember from '../Item/ItemMember';
import ItemType from '../Item/ItemType';
import ItemListType from '../Item/ItemListType';


function Home({ navigation }) {
    const getCurrentTime = () => {
        const currentHour = new Date().getHours();
        return currentHour;
    };

    const getGreetingMessage = () => {
        const currentHour = getCurrentTime();
        if (currentHour >= 5 && currentHour < 12) {
            return 'Good morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    };

    const data = [
        { id: '1', title: 'Item 1', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '2', title: 'Item 2', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '3', title: 'Item 3', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '4', title: 'Item 4', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ];
    //
    const dataListType = [
        { id: 1, name: 'Truyện kể về anh chăn trâu', des: 'Adsjkflasdjlkajsdclkasdsjdfpaosdfj', count: '12', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 1, name: 'Truyện kể về anh chăn trâu', des: 'Adsjkflasdjlkajsdclkasdsjdfpaosdfj', count: '12', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 1, name: 'Truyện kể về anh chăn trâu', des: 'Adsjkflasdjlkajsdclkasdsjdfpaosdfj', count: '12', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 1, name: 'Truyện kể về anh chăn trâu', des: 'Adsjkflasdjlkajsdclkasdsjdfpaosdfj', count: '12', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },

    ]


    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Trang chủ</Text>
            </View>
            <Text style={styles.textHello}>{getGreetingMessage()}</Text>
            <View style={styles.viewReturnBook}>
                <View style={styles.viewCon}>
                    <Text>Lượt mua sách</Text>
                    <Text>0</Text>
                </View>
                <View style={{ borderWidth: 0.7, borderColor: 'gray', height: '95%' }}></View>
                <View style={styles.viewCon}>
                    <Text>Lượt trả sách</Text>
                    <Text>10</Text>
                </View>
            </View>
            <Text style={styles.textHello}>Danh sách thành viên</Text>
            <View>
                <FlatList
                    data={data}
                    horizontal={true}
                    renderItem={({ item }) => <ItemMember title={item.title} img={item.img} />}
                    keyExtractor={(item) => item.id}
                    style={styles.listMember}
                />
            </View>
            <Text style={styles.textHello}>Thể loại mượn nhiều nhất</Text>
            {/* <View> <FlatList
                data={data}
                horizontal={true}
                renderItem={({ item }) => <ItemType title={item.title} />}
                keyExtractor={(item) => item.id}
                style={styles.listMember} />
            </View> */}
            <View>
                <FlatList
                    data={data}
                    horizontal={true}
                    renderItem={({ item }) => <ItemType title={item.title} />}
                    keyExtractor={(item) => item.id}
                    style={styles.listType}
                />
            </View>
            <FlatList
                data={dataListType}
                renderItem={({ item }) => <ItemListType title={item.name} img={item.img} des={item.des} count={item.count} />}
                keyExtractor={(item) => item.id}

            />
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6F4',
    }, title: {
        marginTop: 25,
        width: '100%',
        height: 60,
        backgroundColor: '#CB9180',
        alignItems: 'center',
        justifyContent: 'center'
    }, textTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5
    }, viewReturnBook: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 325,
        height: 100,
        marginLeft: 35,
        borderRadius: 10
    }, textHello: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 25
    }, viewCon: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    }, listMember: {
        height: 100,
        marginLeft: 20,
        backgroundColor: 'gray'
    }, listType: {
        height: 100,
        marginLeft: 10
    }

});
