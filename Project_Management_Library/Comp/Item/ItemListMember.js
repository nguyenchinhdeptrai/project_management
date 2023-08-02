import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import ModalUpdateMember from '../ModalApp/ModalUpdateMember';
import { API_IP } from '../config';
import queryString from 'query-string';
import { Alert } from 'react-native';


const ItemListMember = ({ item, onDeleteMember }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [memberInfo, setMemberInfo] = useState({ item });
    const handleEditMember = () => {
        // Cập nhật thông tin thành viên cần sửa vào state
        setMemberInfo({ item });

        // Hiển thị modal sửa thành viên
        setIsModalVisible(true);
    };
    //
    const Delete = async (_id) => {
        try {
            const dataToDelete = {
                _id: _id,
            };

            const fromData = queryString.stringify(dataToDelete);

            const response = await fetch(`http://${API_IP}:3000/api/deletemember`, {
                method: 'DELETE',
                body: fromData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.ok) {
                let errorMessage = 'Lỗi mạng';
                if (response.status === 400) {
                    const errorData = await response.json();
                    if (errorData && errorData.message) {
                        errorMessage = errorData.message;
                    }
                }
                throw new Error(errorMessage);
            }

            const deletedData = await response.json();
            console.log('Đã xóa thành viên:', deletedData);
            onDeleteMember(item._id);
            return deletedData; // Trả về dữ liệu sau khi xóa thành công (tùy vào cấu trúc phản hồi của bạn)
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // function deleteMe
    const deleteMember = async () => {
        Alert.alert('Xác nhận', 'Bạn có muốn xóa người dùng này đi không?', [
            {
                text: 'Có',
                onPress: () => {
                    Delete(item._id);
                },
                style: 'destructive',
            },
            {
                text: 'Không',
                onPress: () => {
                    console.log('Không');
                },
                style: 'cancel',
            }
        ]);
    };


    return (
        <View style={styles.container}>
            <Image source={{ uri: item.img }} style={styles.img} />
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.view2}>
                <TouchableOpacity style={styles.btn} onPress={handleEditMember}>
                    <FontAwesome name="pencil" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={deleteMember}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
            </View>

            {/* Modal sửa thành viên */}
            <ModalUpdateMember
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                memberInfo={memberInfo}
            />
        </View>
    )
}

export default ItemListMember

const styles = StyleSheet.create({
    view2: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-between',
    }, img: {
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
    }, btn: {
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})