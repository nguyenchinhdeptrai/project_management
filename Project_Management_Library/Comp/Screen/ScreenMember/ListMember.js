import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { API_IP } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import queryString from 'query-string';
import ItemListMember from '../../Item/ItemListMember';



const ListMember = ({ navigation }) => {
    const [listMember, setListMember] = useState([]);
    //
    // Function to handle member deletion
    const onDeleteMember = (_id) => {

        setListMember((prevData) => prevData.filter((member) => member._id !== _id));
    };

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
    useEffect(() => {
        const apiListMember = `http://${API_IP}:3000/api/member`;
        fetchListMember(apiListMember)
            .then((data) => setListMember(data))
            .catch((error) => {
                console.log(error + " lỗi fetch link");
            });
    }, []);
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
                    data={listMember}
                    renderItem={({ item }) => <ItemListMember item={item} onDeleteMember={onDeleteMember} />}
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
        marginTop: 25,
    }, viewTitle: {
        flexDirection: 'row',
        backgroundColor: '#C78D7A',
        height: 50,
        width: '100%',
        alignItems: 'center'
    }, btnBack: {
        flex: 1,
    }, textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 5,
        color: 'white'
    }, viewList: {

    }
})