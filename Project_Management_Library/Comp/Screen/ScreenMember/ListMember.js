import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { API_IP } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import queryString from 'query-string';
import ItemListMember from '../../Item/ItemListMember';
import { RefreshControl } from 'react-native';



const ListMember = ({ navigation }) => {
    const [listMember, setListMember] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const [isLoading1, setLoadding1] = useState(false);
    //
    // Function to handle member deletion
    // const onDeleteMember = (_id) => {

    //     setListMember((prevData) => prevData.filter((member) => member._id !== _id));
    // };

    const fetchListMember = (linkAPI) => {
        return fetch(linkAPI)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((jsonData) => {
                if (jsonData && jsonData.data) {
                    return jsonData.data;
                } else {
                    throw new Error('Invalid data format');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                throw error;
            });
    };
    const getData = () => {
        if (!isLoading1) {
            setLoadding1(true); // Bắt đầu quá trình tải dữ liệu
            const apiListMember = `http://${API_IP}:3000/api/member`;
            fetchListMember(apiListMember)
                .then((data) => {
                    setListMember(data);
                })
                .catch((error) => {
                    console.log(error + " lỗi fetch link");
                })
                .finally(() => {
                    setLoadding1(true);
                    console.log(isLoading1 + ' check 1');
                });
        }
    };

    useEffect(() => {
        if (!isLoading1) {
            getData();
            console.log('my check');
        }
    }, [listMember, isLoading1]);

    const reloadData = React.useCallback(() => {
        getData();
        setisLoading(true);
        setTimeout(() => {
            setisLoading(false);
        }, 1000);
    })
    return (
        <View style={styles.contaier}>
            <View style={styles.viewTitle}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('TabNav')}>
                    <Icon name="arrow-left" size={24} color="white" style={{ marginRight: 8 }} />
                </TouchableOpacity>
                <View style={{ flex: 2 }}></View>
                <Text style={styles.textTitle}>Danh sách thành viên</Text>
                <View style={{ flex: 2 }}></View>
            </View>
            <View style={styles.viewList}>
                <FlatList
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reloadData} />}
                    data={listMember}
                    renderItem={({ item }) => <ItemListMember item={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Set the number of columns to 2
                />
            </View>

        </View>
    )
}

export default ListMember

const styles = StyleSheet.create({
    contaier: {
        flex: 1,
        alignItems: 'center',

    }, viewTitle: {
        flexDirection: 'row',
        backgroundColor: '#C78D7A',
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        paddingRight: 8
    }, btnBack: {
        flex: 1,
        paddingLeft: 14
    }, textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 6,
        color: 'white'
    }, viewList: {

    }
})