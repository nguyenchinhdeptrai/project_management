import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
const Login = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logoapp.png')} style={styles.logo} />
            <View style={styles.viewFromLogin}>
                <View style={styles.viewTextinput}>
                    <Text style={{color:'gray'}}>Tên đăng nhập</Text>
                    <TextInput placeholder='' style={styles.textInput} />
                </View>
                <View style={styles.viewTextinput}>
                    <Text style={{color:'gray'}}>Mật khẩu</Text>
                    <TextInput placeholder='' style={styles.textInput} />
                </View>
                <Text style={styles.textForgotpassword}>Quên mật khẩu</Text>
            </View>
            <View style={styles.viewButtonLogin} >
                <TouchableOpacity style={styles.btnLogin}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Đăng Nhập</Text>
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
        marginTop:12,
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
        padding:10,
    }, textForgotpassword: {
        marginLeft: '68%',
        color:'gray'
    }, btnLogin: {
        width: 250,
        height: 50,
        backgroundColor: '#972400',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },


})