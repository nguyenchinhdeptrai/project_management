import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemType from '../../Item/ItemType';
import { API_IP } from '../../config';
import { RefreshControl } from 'react-native'; import { AntDesign } from '@expo/vector-icons';


const TypeBook = ({ navigation }) => {
    const url = `http://${API_IP}:3000/api/typebook`;
    const [isLoading, setisLoading] = useState(false);
    const [listTypeBook, setlistTypeBook] = useState([]);

    const [countTypeBook, setCountTypeBook] = useState('');

    const getData = () => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setlistTypeBook(json)
                setCountTypeBook(json.count);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const reloadData = React.useCallback(() => {
        getData();
        setisLoading(true);
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    })
    useEffect(() => {
        getData();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{ flex: 1, marginTop: 24 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Sách') }} style={styles.btnBack}>
                        <Icon name="arrow-left" size={24} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, alignItems: 'center', marginTop: 24 }}>
                    <Text style={styles.textTitle}>Sách</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>

                </View>
            </View>
            <View style={styles.viewRow}>
                <Text style={styles.textFill}>{countTypeBook} Loại sách</Text>
            </View>
            <TouchableOpacity
                style={styles.buttonBook}
                onPress={() => navigation.navigate('AddTypeBook')} >
                <Text style={styles.textBook}>+  Thêm loại sách</Text>
            </TouchableOpacity>

            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reloadData} />}
                data={listTypeBook.data}
                renderItem={({ item }) => <ItemType item={item} navigation={navigation} />}
                keyExtractor={(item) => item.id}
                style={{ marginTop: 16 }}
            />
        </View>
    )
}

export default TypeBook

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6F4',
    },
    title: {
        flexDirection: 'row',
        width: '100%',
        height: 90,
        backgroundColor: '#CB9180',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnBack: {
        padding: 5,
    },
    textTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 5,
        marginTop: 10
    },
    viewRow: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
    },
    textFill: {
        fontSize: 20,
        textAlign: 'left',
    },
    iconFill: {
        marginLeft: 210
    },
    textBook: {
        fontSize: 18,
        color: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        paddingTop: 8,
        textAlign: 'left',
    },
    buttonBook: {
        backgroundColor: '#CB9180',
        borderRadius: 16,
        marginLeft: 16,
        paddingLeft: 8,
        paddingRight: 8,
        marginRight: 16,
        marginTop: 8,
        width: 200
    },
})