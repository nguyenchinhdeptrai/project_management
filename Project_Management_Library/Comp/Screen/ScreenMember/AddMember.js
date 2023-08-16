import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react';
import { API_IP } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import queryString from 'query-string';

const AddMember = ({ navigation }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [img, setImg] = useState("");
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
            //Check trùng phone
            const responsePhone = await fetch(`http://${API_IP}:3000/api/checkPhoneMember?phone=${phone}`);
            if (!responsePhone.ok) {
                throw new Error('Lỗi mạng khi kiểm tra trùng dữ liệu');
            }
            const duplicateCheckResult = await responsePhone.json();

            if (duplicateCheckResult.isDuplicate) {
                Alert.alert('Lỗi', 'Số điện thoại đã tồn tại trong dữ liệu');
                return;
            }

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
            if (data.status = 1) {
                return Alert.alert('Lỗi', data.message);
            }

            Alert.alert('Thành công', 'Thêm thành viên thành công');
            navigation.navigate('TabNav', { screen: 'Trang Chủ' });
            setImg("");
            setName("");
            setPhone("");
            setAddress("");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <View style={styles.container}>

            <View style={styles.viewTitle}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('TabNav')}>
                    <Icon name="arrow-left" size={24} color="white" style={{ marginRight: 8 }} />
                </TouchableOpacity>
                <View style={{ flex: 2 }}></View>
                <Text style={styles.textTitle}>Thêm thành viên</Text>
                <View style={{ flex: 2 }}></View>
            </View>
            <View style={styles.viewContent}>
                {img ? (
                    <Image source={{ uri: img }} style={styles.image} />
                ) : <Image source={require('../../../assets/choooseimg.png')} style={styles.image} />}
                <TextInput
                    placeholder='Link ảnh'
                    value={img}
                    onChangeText={(text) => setImg(text)}
                    style={styles.textInput}
                />

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
    )
}

export default AddMember

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F6F4',
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
    },
    viewTitle: {
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
        flex: 4,
        color: 'white'
    },
    viewContent: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        height: '75%'
    }, textInput: {
        width: 320,
        height: 45,
        borderWidth: 0.8,
        borderColor: 'black',
        padding: 7,
        borderRadius: 12,
        marginVertical: 12,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius: 40,
    }, viewFooter: {
        flexDirection: 'row',
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
    },
})