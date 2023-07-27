import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const ChangePass2 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logoapp.png')} style={styles.logo} />
            <Text style={styles.textChangePass}>Thay đổi mật khẩu</Text>
            <View style={styles.viewFromLogin}>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray' }}>Mật khẩu mới</Text>
                    <TextInput placeholder='' style={styles.textInput} />
                </View>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray' }}>Nhập lại mật khẩu</Text>
                    <TextInput placeholder='' style={styles.textInput} />
                </View>

            </View>
            <View style={styles.viewButtonLogin} >
                <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('ChangePass2')}>
                    <Text style={{ color: 'white', fontSize: 15 }} onPress={() => navigation.navigate('Login')}>Thay đổi</Text>
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

export default ChangePass2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FDFBF8',
    }, textChangePass: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6E6C6C'
    }, viewFromLogin: {
        flex: 5,
        width: '100%',
        marginTop: 30,
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
    }, btnLogin: {
        width: 250,
        height: 50,
        backgroundColor: '#972400',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
})