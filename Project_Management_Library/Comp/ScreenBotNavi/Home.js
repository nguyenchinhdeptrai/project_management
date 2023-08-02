import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, FlatList } from 'react-native';
import ItemMember from '../Item/ItemMember';
import ItemType from '../Item/ItemType';
import ItemListType from '../Item/ItemListType';

//import file config
import { API_IP } from '../config';
import ModalListMember from '../ModalApp/ModalListMember';



function Home({ navigation }) {
    //list members 1
    const [dataMember, setDataMember] = useState([]);
    //list member 2
    const [listMember, setListMember] = useState([]);

    //
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
        //
        const apiListMember = `http://${API_IP}:3000/api/member`;
        fetchListMember(apiListMember)
            .then((data) => setListMember(data))
            .catch((error) => {
                console.log(error + " lỗi fetch link");
            });

        // Gọi API để lấy dữ liệu JSON
        fetch(`http://${API_IP}:3000/api/member`)
            .then((response) => response.json())
            .then((jsonData) => {
                if (jsonData && jsonData.data) {
                    // Giới hạn dữ liệu để chỉ có 3 sản phẩm đầu tiên
                    const limitedData = jsonData.data.slice(0, 3);
                    console.log(jsonData + " data check");
                    // Thêm phần tử "Thêm sản phẩm" vào cuối mảng dữ liệu
                    const newData = [...limitedData, { id: 'addProduct', title: 'Thêm sản phẩm' }];
                    setDataMember(newData);
                } else {
                    console.error('Invalid data format:', jsonData);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, []);


    console.log('Data from API:', dataMember);
    console.log('Full data of member list: ' + listMember);

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

    ];

    //
    const dataListType = [

        { id: 1, name: 'Truyện kể về anh chăn trâu', des: 'Tình cảm', count: '12', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, name: 'Truyện kể về anh chăn trâu', des: 'Tình cảm', count: '12', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, name: 'Truyện kể về anh chăn trâu', des: 'Tình cảm', count: '12', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 4, name: 'Truyện kể về anh chăn trâu', des: 'Tình cảm', count: '12', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },


    ]

    //
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

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
            <Text style={styles.textHello} onPress={() => navigation.navigate('ListMember')}>Danh sách thành viên</Text>
            {/* ModalListAllMember */}
            <ModalListMember
                modalVisible={modalVisible}
                closeModal={closeModal}
                listMember={listMember}
            />

            <View>
                <FlatList
                    data={dataMember}
                    horizontal={true}
                    renderItem={({ item }) => {
                        if (item.id === 'addProduct') {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('AddMember')}
                                    style={{ width: 120, height: 100, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../assets/add.png')} style={{ width: 80, height: 80, }} />
                                    <Text style={{ color: 'black' }}>Thêm thành viên</Text>
                                    {/* //<AddMember /> */}
                                </TouchableOpacity>
                            );
                        }
                        return <ItemMember name={item.name} img={item.img} />;
                    }}
                    keyExtractor={(item) => item.id}
                    style={styles.listMember}
                />

            </View>
            <Text style={styles.textHello}>Thể loại mượn nhiều nhất</Text>
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
        width: '100%',
        height: 60,
        backgroundColor: '#CB9180',
        alignItems: 'center',
        justifyContent: 'center'
    }, textTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
        marginTop: 10
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
    }, listType: {
        height: 50,
        marginLeft: 10
    }, viewlistMember: {
        alignItems: 'center',

    }, textTitleModal: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
    }, listMemberModal: {
        width: '90%',
        height: '100%',
        backgroundColor: 'gray',

    }

});
