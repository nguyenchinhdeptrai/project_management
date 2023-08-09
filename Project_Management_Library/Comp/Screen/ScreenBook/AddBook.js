import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';
import { API_IP } from '../../config';
import queryString from 'query-string';

const AddBook = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [name, setname] = useState("");
    const [years, setyears] = useState("");
    const [count, setcount] = useState("");
    const [img, setimg] = useState("");
    const [author, setauthor] = useState("");

    const cancleFuncion = () => {
        setname("");
        setyears("");
        setcount("");
        setimg("");
        setValue("Chọn loại tin tức");
        setauthor("");
    }
    //

    const getDataTypeBook = () => {
        fetch(`http://${API_IP}:3000/api/typebook`)
            .then((res) => { return res.json(); })
            .then((res_json) => {
                //chuyển mảng json thành mảng khớp DropDown
                let List_For_DropList = res_json.data.map((item, index, src_arr) => {
                    return { label: item.name, value: item._id }
                });

                setItems(List_For_DropList); //Gắn vào state
            })

    }

    //
    const addBook = async () => {
        let objBook = { name: name, years: years, count: count, img: img, _idType: value, author: author };

        if (!name || !years || !count || !img || !author || value == null) {
            Alert.alert('Lỗi', 'Chưa nhập đủ thông tin');
            return;
        }
        if (isNaN(years) || isNaN(count)) {
            Alert.alert('Lỗi', 'Năm và số lượng phải là số');
            return;
        }
        try {
            const formData = queryString.stringify(objBook);
            const response = await fetch(`http://${API_IP}:3000/api/addbook`, {
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
            if(data.status = 1){
               return Alert.alert("Lỗi:" , data.message);
            }
            console.log(data);

            Alert.alert('Thành công', 'Thêm sách thành công', navigation.navigate('Sách'));
            setname("");
            setyears("");
            setcount("");
            setimg("");
            setValue("Chọn loại tin tức");
            setauthor("");
            console.log('Data successfully uploaded');
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getDataTypeBook();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{ flex: 1, marginTop: 24 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Sách') }} style={styles.btnBack}>
                        <Icon name="arrow-left" size={24} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, alignItems: 'center', marginTop: 24 }}>
                    <Text style={styles.textTitle}>Thêm sách</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>

                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 32, marginBottom: 16 }}>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray', left: 8, fontSize: 16, marginBottom: 8 }}>Tên sách <Text style={{ color: 'red' }}>*</Text> </Text>
                    <TextInput value={name} onChangeText={(text) => setname(text)} placeholder='Nhập tên loại sách' style={styles.textInput} />
                </View>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray', left: 8, fontSize: 16, marginBottom: 8 }}>Năm sản xuất <Text style={{ color: 'red' }}>*</Text> </Text>
                    <TextInput value={years} onChangeText={(text) => setyears(text)} placeholder='Nhập Năm sản xuất' style={styles.textInput} />
                </View>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray', left: 8, fontSize: 16, marginBottom: 8 }}>Số lượng kho <Text style={{ color: 'red' }}>*</Text> </Text>
                    <TextInput value={count} onChangeText={(text) => setcount(text)} placeholder='Nhập Số lượng' style={styles.textInput} />
                </View>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray', left: 8, fontSize: 16, marginBottom: 8 }}>Tác giả <Text style={{ color: 'red' }}>*</Text> </Text>
                    <TextInput value={author} onChangeText={(text) => setauthor(text)} placeholder='Nhập Tác giả' style={styles.textInput} />
                </View>
                <View style={styles.containerDropdown}>
                    <Text style={{ color: 'gray', left: 8, fontSize: 16, marginBottom: 8 }}>Thể loại <Text style={{ color: 'red' }}>*</Text> </Text>
                    <DropDownPicker
                        placeholder='Chọn loại sách'
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray', left: 8, fontSize: 16, marginBottom: 8 }}>Ảnh <Text style={{ color: 'red' }}>*</Text> </Text>
                    <TextInput value={img} onChangeText={(text) => setimg(text)} placeholder='Nhập link ảnh' style={styles.textInput} />
                </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.btnAdd} onPress={addBook}>
                    <Text style={{ color: 'white', fontSize: 15 }} >Thêm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCancel} onPress={cancleFuncion}>
                    <Text style={{ color: '#97240090', fontSize: 15 }} >Hủy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddBook

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
    containerDropdown: {
        width: 250,
        zIndex: 1000,
        elevation: 20, // đẩy dropdown lên phía trước màn hình
        marginBottom: 16,
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
        height: 40,
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