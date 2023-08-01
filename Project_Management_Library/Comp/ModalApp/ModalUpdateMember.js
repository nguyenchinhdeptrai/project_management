import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { API_IP } from '../config';
import { Alert } from 'react-native';
import queryString from 'query-string';



const ModalUpdateMember = ({ visible, onRequestClose, memberInfo }) => {
    //
    const [nameUpdate, setNameUpdate] = useState(memberInfo.item.name);
    const [phoneUpdate, setPhoneUpdate] = useState(memberInfo.item.phone);
    const [addressUpdate, setAddressUpdate] = useState(memberInfo.item.address);
    const [imgUpdate, setImageUpdate] = useState(memberInfo.item.img);
    //function cancleUpdate
    const cancleUpdate = () => {
        setNameUpdate("");
        setAddressUpdate("");
        setPhoneUpdate("");
        setImageUpdate("");
    }
    //function updateMember
    const updateMember = async () => {
        if (!nameUpdate || !phoneUpdate || !addressUpdate) {
            Alert.alert('Lỗi', 'Dữ liệu không hợp lệ');
            return;
        }
        //object update
        try {
            const dataUpdate = {
                _id: memberInfo.item._id,
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
            const data = await response.json();
            console.log(data.name + ' dữ liệu update');
            Alert.alert('Thành công', 'Sửa thành công');
            onRequestClose();
        } catch (e) {
            console.log(e);
        }

    };
    return (
        <Modal visible={visible} animationType='slide' onRequestClose={onRequestClose}>
            <View style={styles.viewContainer}>
                <View style={styles.view2}>
                    <TouchableOpacity onPress={onRequestClose} style={{
                        position: 'absolute',
                        right: 250,
                    }}>
                        <FontAwesome name="arrow-left" size={20} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.textTitle}>Sửa thành viên:</Text>
                </View>

                {imgUpdate ? (
                    <Image source={{ uri: imgUpdate }} style={styles.image} />
                ) : null}
                <TextInput
                    placeholder='Link ảnh'
                    value={memberInfo.item.img}
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
                    <TouchableOpacity style={styles.btn2} onPress={cancleUpdate}>
                        <Text style={styles.textBtn2}>Hủy</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    )
}

export default ModalUpdateMember

const styles = StyleSheet.create({
    viewContainer: {
        alignItems: 'center'
    }, view2: {
        flexDirection: 'row',
        alignItems: 'center',
    }, textTitleModal: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 7,
    }, listMemberModal: {
        width: '95%',
        height: 120,
    }, textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 8,
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