import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { API_IP } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    //function login
    const LoginApp = () => {
        if (!phone || !password) {
            Alert.alert('Lỗi', 'Dữ liệu không hợp lệ');
            return;
        }
        // Chuyển đổi dữ liệu thành x-www-form-urlencoded.
        const formData = `phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`;
        console.log(formData + ' dữ liệu đã được chuyển');
        // Gửi dữ liệu lên server để thực hiện đăng nhập.
        fetch(`http://${API_IP}:3000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Xử lý phản hồi từ server.
                if (data.token) {
                    // Lưu token vào AsyncStorage
                    AsyncStorage.setItem('userToken', data.token)
                        .then(() => {
                            // Điều hướng đến màn hình 'TabNav' sau khi đã lưu token thành công

                            setPhone('');
                            setPassword('');
                            console.log(AsyncStorage.getItem('userToken'));
                            navigation.navigate('TabNav');

                        })
                        .catch(error => {
                            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu token');
                            console.error('AsyncStorage Error:', error);
                        });
                } else {
                    // Đăng nhập thất bại, hiển thị thông báo lỗi từ server (nếu có).
                    Alert.alert('Lỗi', data.error || 'Đăng nhập thất bại');
                }
            })
            .catch(error => {
                // Xử lý lỗi nếu có.
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gọi API đăng nhập');
                console.error('API Error:', error);
            });

    }
    //chưa dùng đăng nhập

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logoapp.png')} style={styles.logo} />
            <View style={styles.viewFromLogin}>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray' }}>Số điện thoại</Text>
                    <TextInput placeholder='' style={styles.textInput} onChangeText={(text) => setPhone(text)} value={phone} />
                </View>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray' }}>Mật khẩu</Text>
                    <TextInput placeholder='' style={styles.textInput} secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} />
                </View>
                <Text style={styles.textForgotpassword} onPress={() => navigation.navigate('ChangePass')}>Quên mật khẩu</Text>
            </View>
            <View style={styles.viewButtonLogin} >
                <TouchableOpacity style={styles.btnLogin} onPress={LoginApp}>
                    <Text style={{ color: 'white', fontSize: 15 }} >Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewFooter}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, flex: 1 }} />
                    <Text style={{ marginHorizontal: 5 }}>2023</Text>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, flex: 1 }} />
                </View>
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBF8',
        alignItems: 'center',
    }, viewFromLogin: {
        flex: 5,
        width: '100%',
    }, viewFooter: {
        flex: 1,
        width: '55%',
        marginTop: 12,
    }, viewTextinput: {
        marginHorizontal: 30,
        marginBottom: 20,
    }, viewButtonLogin: {
        flex: 1,
    }, logo: {
        width: 250,
        height: 250
    }, textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: "white",
        height: 40,
        padding: 10,
    }, textForgotpassword: {
        marginLeft: '68%',
        color: 'gray'
    }, btnLogin: {
        width: 250,
        height: 50,
        backgroundColor: '#97240090',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },


})