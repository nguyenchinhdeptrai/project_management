import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'


const ChagneInfo = ({ route, navigation }) => {


    const { data } = route.params;

    const [name, setName] = useState(data.name)
    const [img, setImg] = useState(data.img);
    const [phone, setPhone] = useState(data.phone);
    const [address, setAddress] = useState(data.address);
    //function cancle

    const CancleFunction = () => {
        setName("");
        setImg("");
        setPhone("");
        setAddress("");
    }
    return (
        <View style={styles.container}>
            <View style={styles.viewTitle}>
                <TouchableOpacity onPress={() => navigation.navigate('TabNav')} style={styles.btnBack}>
                    <Image source={require('../../../assets/back_icon.png')} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Chỉnh sửa thông tin</Text>
            </View>
            <View style={styles.viewContent}>
                <View style={styles.viewImage}>
                    {img ?
                        <Image source={{ uri: img }} style={styles.styleImg} /> :
                        <Image source={require('../../../assets/choooseimg.png')} style={styles.styleImg} />}
                    <TextInput placeholder='nhập link ảnh' value={img} onChangeText={(text) => setImg(text)} style={styles.textInput} />
                </View>
                <View style={styles.viewTextInput}>
                    <View style={{ width: '75%', marginBottom: -7 }}>
                        <Text>Tên người dùng </Text>
                    </View>
                    <TextInput placeholder='Nhập tên người dùng' value={name} onChangeText={(text) => setName(text)} style={styles.textInput} />
                </View>
                <View style={styles.viewTextInput}>
                    <View style={{ width: '75%', marginBottom: -7 }}>
                        <Text>Địa chỉ </Text>
                    </View>
                    <TextInput placeholder='Nhập tên người dùng' value={address} onChangeText={(text) => setName(text)} style={styles.textInput} />
                </View>
                <View style={styles.viewTextInput}>
                    <View style={{ width: '75%', marginBottom: -7 }}>
                        <Text>Điện thoại </Text>
                    </View>
                    <TextInput placeholder='Nhập tên người dùng' value={phone} onChangeText={(text) => setName(text)} style={styles.textInput} />
                </View>
            </View>
            <View style={styles.viewFooter}>
                <TouchableOpacity style={[styles.btnFooter2, {}]}>
                    <Text style={[styles.textBtn, { color: 'white' }]}>Lưu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnFooter1]} onPress={CancleFunction}>
                    <Text style={[styles.textBtn, { color: 'black' }]}>Hủy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChagneInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    }, viewTitle: {
        flexDirection: 'row',
        backgroundColor: '#C78D7A',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        color: 'white',
        fontSize: 18,
    }, btnBack: {
        position: 'absolute',
        left: '2%'
    }, viewContent: {
        height: '75%',
        width: '100%',
        alignItems: 'center',
    }, styleImg: {
        width: 140,
        height: 140,
        borderRadius: 70,
    }, viewImage: {
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
    }, textInput: {
        width: '75%',
        height: 45,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 6,
        marginTop: 10,
        borderRadius: 12,
        marginBottom: 10,
    }, viewTextInput: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 7,
    }, viewFooter: {
        flexDirection: 'row',
        alignItems: 'center'
    }, btnFooter1: {
        width: '42%',
        height: 45,
        borderWidth: 1,
        borderColor: '#C78D7A',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    }, btnFooter2: {
        width: '42%',
        height: 45,
        backgroundColor: '#C78D7A',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    }, textBtn: {
        fontSize: 16,

    }
})