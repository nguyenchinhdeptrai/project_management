import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import ItemListBook from '../../Item/ItemListBook';
import { Alert } from 'react-native';
import queryString from 'query-string';
import { API_IP } from '../../config';


const ScreenSearch = ({ navigation }) => {
    //
    const [searchName, setSearchName] = useState('');
    const [data, setData] = useState([]);
    //

    const searchNameBook = async (searchTerm) => {
        if (searchTerm === "") {
            console.log("my check");
            setData([]);
        } else {
            try {
                let search = { name: searchTerm };
                const fromData = queryString.stringify(search);
                const response = await fetch(`http://${API_IP}:3000/api/searchname`, {
                    method: 'POST',
                    body: fromData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                const data = await response.json();

                if (data.data) {
                    setData(data.data);
                    console.log(data);
                } else {
                    setData([]);
                }
            } catch (e) {
                console.log(e);
                setData([]);
            }
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>Tìm kiếm</Text>
                    </View>
                    <View style={styles.viewSearch}>
                        <AntDesign name="search1" size={24} color="black" style={styles.styleIcon} />
                        <TextInput
                            placeholder='Nhập sách cần tìm kiếm'
                            onChangeText={(text) => { setSearchName(text); searchNameBook(text) }}
                            value={searchName}
                            style={styles.styleTextInput}
                        />
                    </View>
                    <View style={styles.view2}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <ItemListBook title={item.title} item={item} />}
                            keyExtractor={(item) => item.id}
                            style={styles.listType}
                        />
                    </View>
                    <View style={styles.view3}>
                        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('TabNav')}>
                            <Text style={{ color: 'white' }}>Quay lại</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>



    )
}

export default ScreenSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }, styleTextInput: {
        width: '75%',
        height: 45,
    }, viewSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 12,
        padding: 5,
    }, styleIcon: {
        paddingHorizontal: 5,
    }, listType: {
        height: '100%',
        width: '100%',
    }, view2: {
        flex: 15,
        width: '90%'
    }, view3: {
        flex: 2,
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }, btnBack: {
        backgroundColor: '#97240090',
        width: '40%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 5,
        color: 'white'
    }, title: {
        width: '100%',
        height: 70,
        backgroundColor: '#CB9180',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    }, textTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
        marginTop: 10
    },
})