import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react';
import { API_IP } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import queryString from 'query-string';

const DetailMember = (props) => {
    //
    let item = props.route.params.item;

    const [nameUpdate, setNameUpdate] = useState(item.name);
    const [phoneUpdate, setPhoneUpdate] = useState(item.phone);
    const [addressUpdate, setAddressUpdate] = useState(item.address);
    const [imgUpdate, setImageUpdate] = useState(item.img);
    const isValidatePhoneNumber = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
    const cancleFuncion = () => {
        setName("");
        setPhone("");
        setImg("");
        setAddress("");
    }
    //
    const updateMember = async () => {
        if (!nameUpdate || !phoneUpdate || !addressUpdate) {
            Alert.alert('Lỗi', 'Dữ liệu không hợp lệ');
            return;
        }
        //object update
        try {
            const dataUpdate = {
                _id: item._id,
                name: nameUpdate,
                img: imgUpdate,
                phone: phoneUpdate,
                address: addressUpdate,
            };
            const fromData = queryString.stringify(dataUpdate);
            const response = await fetch(`http://${API_IP}:3000/api/updatemember`, {
                method: 'PUT',
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
            else if (isValidatePhoneNumber(phoneUpdate)) {
                Alert.alert('Lỗi', 'Số điện thoại không đúng định dạng');
                return;
            }
            const data = await response.json();
            console.log(data.name + ' dữ liệu update');
            Alert.alert('Thành công', 'Sửa thành công');
            onRequestClose();
        } catch (e) {
            console.log(e);
        }

    };

    //Delete

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
            return deletedData; // Trả về dữ liệu sau khi xóa thành công (tùy vào cấu trúc phản hồi của bạn)
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleScreenSwitching = () => {
        props.navigation.navigate('ListMember')
    }

    // function deleteMe
    const deleteMember = async () => {
        Alert.alert('Xác nhận', 'Bạn có muốn xóa người dùng này đi không?', [
            {
                text: 'Có',
                onPress: () => {
                    Delete(item._id);
                    handleScreenSwitching();
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
        <View style={styles.viewContainer}>
            <View style={styles.title}>
                <View style={{ flex: 1, marginTop: 24 }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('ListMember') }} style={styles.btnBack}>
                        <Icon name="arrow-left" size={24} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, alignItems: 'center', marginTop: 24 }}>
                    <Text style={styles.textTitle}>Thông tin thành viên</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>

                </View>
            </View>

            {imgUpdate ? (
                <Image source={{ uri: imgUpdate }} style={styles.image} />
            ) : null}
            <TextInput
                placeholder='Link ảnh'
                value={item.img}
                onChangeText={(text) => setImageUpdate(text)}
                style={styles.textInput}
            />
            <TextInput placeholder='Tên thành viên' value={nameUpdate} onChangeText={(text) => setNameUpdate(text)} style={styles.textInput} />
            <TextInput placeholder='Địa chỉ' value={addressUpdate} onChangeText={(text) => setAddressUpdate(text)} style={styles.textInput} />
            <TextInput placeholder='Điện thoại' value={phoneUpdate} onChangeText={(text) => setPhoneUpdate(text)} style={styles.textInput} />
            <View style={styles.viewBtn}>
                <TouchableOpacity style={styles.btn} onPress={updateMember}>
                    <Text style={styles.textBtn}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={deleteMember}>
                    <Text style={styles.textBtn2}>Xóa</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default DetailMember

const styles = StyleSheet.create({
    viewContainer: {
        alignItems: 'center'
    }, view2: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
        marginTop: 10
    }, textTitleModal: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 7,
    }, listMemberModal: {
        width: '95%',
        height: 120,
    },
    viewBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    }, textInput: {
        width: '70%',
        height: 45,
        padding: 5,
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 7,
    }, btn: {
        width: '40%',
        height: 45,
        backgroundColor: '#C78D7A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginVertical: 7,
        marginHorizontal: 7,
    }, btn2: {
        width: '40%',
        height: 45,
        borderColor: '#C78D7A',
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginVertical: 7,
        marginHorizontal: 7,
    }, image: {
        width: 120,
        height: 120,
        borderRadius: 12,
        resizeMode: 'contain',
    }, textBtn: {
        color: 'white',
    }
})