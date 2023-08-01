import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity, Text, StyleSheet, Image, View, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import queryString from 'query-string';
import { API_IP } from '../config';



const AddMember = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [img, setImg] = useState("");
    //modal
    const handlePress = () => {
        setModalVisible(true);
    };

    const handleAddMember = () => {
        setModalVisible(false);
    };
    //function chooose img
    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };
    //
    const cancleFuncion = () => {
        setName("");
        setPhone("");
        setImg("");
        setAddress("");
    }
    //
    const isValidatePhoneNumber = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
    //add member
    const addMember = async () => {
        if (!name || !phone || !address) {
            Alert.alert('Lỗi', 'Dữ liệu không hợp lệ');
            return;
        }
        if (!isValidatePhoneNumber(phone)) {
            Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
            return;
        }
        const dataToSend = {
            name: name,
            phone: phone,
            address: address,
            img: img,
        }

        try {
            const formData = queryString.stringify(dataToSend);
            const response = await fetch(`http://${API_IP}:3000/api/addmember`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.ok) {
                let errorMessage = 'Lỗi mạng';
                if (response.status === 400) {
                    const errorData = await response.json(); // Trích xuất dữ liệu lỗi từ phản hồi JSON
                    if (errorData && errorData.message) {
                        errorMessage = errorData.message; // Lấy thông báo lỗi cụ thể từ dữ liệu phản hồi JSON (nếu có)
                    }
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log(data);
            Alert.alert('Thành công', 'Thêm thành viên thành công');
            setModalVisible(false);
            setImg("");
            setName("");
            setPhone("");
            setAddress("");
            console.log('Data successfully uploaded');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.container}>
                    <Image source={require('../../assets/add.png')} style={{
                        width: 80,
                        height: 80,
                    }} />
                    <Text style={styles.addProductText}>Thêm thành viên</Text>
                </View>
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.viewTitleModal}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={handleAddMember} style={styles.btnBack}>
                                <Icon name="arrow-left" size={24} color="white" style={{ marginRight: 8 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2, alignItems: 'center' }}>
                            <Text style={styles.textTitle}>Thêm thành viên</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>

                        </View>
                    </View>

                    <View style={styles.viewContent}>
                        <TextInput
                            placeholder='Link ảnh'
                            value={img}
                            onChangeText={(text) => setImg(text)}
                            style={styles.textInput}
                        />
                        {img ? (
                            <Image source={{ uri: img }} style={styles.image} />
                        ) : null}
                        <TextInput
                            placeholder='Tên thành viên'
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder='Địa chỉ'
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder='Số điện thoại'
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.viewFooter}>
                        <TouchableOpacity style={styles.btnFooterSave} onPress={addMember}>
                            <Text>Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnFooterCancle} onPress={cancleFuncion}>
                            <Text>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AddMember

const styles = StyleSheet.create({

    container: {
        height: 100,
        backgroundColor: '#F8F6F4',
        marginRight: 10,
        alignItems: 'center',
    },
    addProductItem: {
        width: 100,
        height: 20,

    },
    addProductText: {
        color: 'black',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    }, viewTitleModal: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C78D7A',
        width: '100%',
        height: 50,
        flexDirection: 'row'
    },
    textTitle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
    }, btnBack: {
        padding: 5,
    },
    viewContent: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        height: '75%'
    },
    chooseImg: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginLeft: -20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: 320,
        height: 45,
        borderWidth: 0.8,
        borderColor: 'black',
        padding: 7,
        borderRadius: 12,
        marginVertical: 12,
    }, btnChooseImg: {
        padding: 7,
        width: 120,
        height: 150,
    }, viewFooter: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }, btnFooterSave: {
        width: '38%',
        height: 40,
        backgroundColor: '#C78D7A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderRadius: 12,
    }, btnFooterCancle: {
        width: '38%',
        height: 40,
        borderWidth: 0.7,
        borderColor: '#C78D7A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    }, image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 12,
    }
})