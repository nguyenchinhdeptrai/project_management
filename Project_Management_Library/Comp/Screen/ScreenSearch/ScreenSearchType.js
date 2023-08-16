import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import queryString from 'query-string';
import { API_IP } from '../../config';
import ItemListSearchType from '../../Item/itemListSearchType';



const ScreenSearchType = ({ navigation }) => {
    const [searchName, setSearchName] = useState('');
    const [data, setData] = useState([]);
    const [nameType, setNameType] = useState('');
    const searchNameBook = async (searchTerm) => {
        if (searchTerm == "") {
            console.log("my check");
            setData([]);
        } else {
            try {
                let search = { name: searchTerm };
                const fromData = queryString.stringify(search);
                const response = await fetch(`http://${API_IP}:3000/api/searchdemo`, {
                    method: 'POST',
                    body: fromData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                const data = await response.json();

                if (data.data) {
                    setData(data.data);
                    setNameType(data.typeName);
                    console.log(nameType);
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
                    <View style={styles.viewTitle}>
                        <TouchableOpacity onPress={() => navigation.navigate('TabNav')} style={styles.btnBack}>
                            <Image source={require('../../../assets/back_icon.png')} />
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>Tìm sách theo tên loại sách</Text>
                    </View>
                    <View style={styles.viewSearch}>
                        <AntDesign name="search1" size={24} color="black" style={styles.styleIcon} />
                        <TextInput
                            placeholder='Nhập loại sách cần tìm kiếm'
                            onChangeText={(text) => { setSearchName(text); searchNameBook(text) }}
                            value={searchName}
                            style={styles.styleTextInput}
                        />
                    </View>
                    <View style={styles.view2}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <ItemListSearchType title={item.title} item={item} nameType={nameType} />}
                            keyExtractor={(item) => item.id}
                            style={styles.listType}
                        />
                    </View>
                    <View style={styles.view3}>
                        <TouchableOpacity style={styles.btnBack1} onPress={() => navigation.navigate('TabNav')}>
                            <Text style={{ color: 'white' }}>Quay lại</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}

export default ScreenSearchType

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
        marginTop: 5,
        height: '100%',
        width: '100%',
    }, view2: {
        flex: 15,
        width: '90%',

    }, view3: {
        flex: 2,
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }, btnBack1: {
        backgroundColor: '#97240090',
        width: '40%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 5,
        color: 'white'
    }, viewTitle: {
        flexDirection: 'row',
        backgroundColor: '#C78D7A',
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    textTitle: {
        color: 'white',
        fontSize: 20,
        paddingTop: 20,
        fontWeight: 'bold'
    }, btnBack: {
        position: 'absolute',
        left: '2%',
        paddingTop: 20,
    },

})