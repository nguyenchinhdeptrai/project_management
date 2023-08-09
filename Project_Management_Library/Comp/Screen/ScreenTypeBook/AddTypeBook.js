import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';
import { API_IP } from '../../config';
import queryString from 'query-string';


const AddTypeBook = ({ navigation }) => {
    const [name, setname] = useState("");

    const cancleFuncion = () => {
        setname("");

    }
    //
    const addTypeBook = async () => {
        let objTypeBook = { name: name };

        if (!name) {
            Alert.alert('Lỗi', 'Chưa nhập đủ thông tin');
            return;
        }
        try {
            const formData = queryString.stringify(objTypeBook);
            const response = await fetch(`http://${API_IP}:3000/api/addtypebook`, {
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
            } else {
                const data = await response.json();
                console.log(data.message + ' check');
                if (data.status = 1) {
                    return Alert.alert("Lỗi " , data.message)
                } else {
                    Alert.alert('Thành công', 'Thêm loại sách thành công', navigation.navigate('TypeBook'));
                    setname("");
                }

            }

        } catch (error) {
            Alert.alert("Lỗi", error.message);
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{ flex: 1, marginTop: 24 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('TypeBook') }} style={styles.btnBack}>
                        <Icon name="arrow-left" size={24} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, alignItems: 'center', marginTop: 24 }}>
                    <Text style={styles.textTitle}>Thêm loại sách</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>

                </View>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray', left: 8, fontSize: 16, marginBottom: 8 }}>Tên loại sách <Text style={{ color: 'red' }}>*</Text> </Text>
                    <TextInput value={name} onChangeText={(text) => setname(text)} placeholder='Nhập tên loại sách' style={styles.textInput} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', bottom: 100 }}>
                <TouchableOpacity style={styles.btnAdd} onPress={addTypeBook}>
                    <Text style={{ color: 'white', fontSize: 15 }} >Thêm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCancel} onPress={cancleFuncion}>
                    <Text style={{ color: '#97240090', fontSize: 15 }} >Hủy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddTypeBook

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6F4',
        alignItems: 'center'
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
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 5,
        marginTop: 10
    },
    viewTextinput: {
        marginHorizontal: 30,
        marginBottom: 20,

    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        backgroundColor: "white",
        height: 50,
        padding: 10,
        width: 250,
    },
    btnAdd: {
        width: 150,
        height: 50,
        backgroundColor: '#97240090',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,

    },
    btnCancel: {
        width: 150,
        height: 50,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#97240090',
        marginLeft: 16
    }
})