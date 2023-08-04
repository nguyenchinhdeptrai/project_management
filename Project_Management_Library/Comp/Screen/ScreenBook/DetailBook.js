import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';
import { API_IP } from '../../config';
import queryString from 'query-string';
import { stringify } from 'query-string/base';
import AddNewLoan from '../ScreenLoan/AddNewLoan';

const DetailBook = (props) => {
    let item = props.route.params.item;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(item._idType);
    const [items, setItems] = useState([]);

    const [name, setname] = useState(item.name);
    const [years, setyears] = useState(item.years);
    const [count, setcount] = useState(item.count);
    const [img, setimg] = useState(item.img);
    const [author, setauthor] = useState(item.author);

    const deleteBook = () => {

        Alert.alert('Xác nhận', `Bạn có muốn xóa sách ${item.name} đi không?`, [
            {
                text: 'Có',
                onPress: async () => {
                    let _idBook = { _id: item._id }
                    try {
                        const formData = queryString.stringify(_idBook);
                        const response = await fetch(`http://${API_IP}:3000/api/deletebook`, {
                            method: 'DELETE',
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
                        console.log('Đã xóa Sách:', data);
                        Alert.alert('Thành công', 'Xóa sách thành công', props.navigation.navigate('Sách'));

                        return data;
                    } catch (error) {
                        console.error(error);
                    }
                },
                style: 'destructive',
            },
            {
                text: 'Không',
                onPress: () => {
                    console.log('Không');
                },
                style: 'cancel',
            }
        ]);
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
    const updateBook = async () => {
        let objBook = { _id: item._id, name: name, years: years, count: count, img: img, _idType: value, author: author };

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
            const response = await fetch(`http://${API_IP}:3000/api/updatebook`, {
                method: 'PUT',
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

            Alert.alert('Thành công', 'Sửa sách thành công', props.navigation.navigate('Sách'));
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

    //function change add new load
    const changeAddNewLoadn = () => {
        props.navigation.navigate('AddNewLoan', { item });
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={{ flex: 1, marginTop: 24 }}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Sách') }} style={styles.btnBack}>
                        <Icon name="arrow-left" size={24} color="white" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 2, alignItems: 'center', marginTop: 24 }}>
                    <Text style={styles.textTitle}>Thông tin sách</Text>
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
                    <TextInput value={years.toString()} onChangeText={(text) => setyears(text)} placeholder='Nhập Năm sản xuất' style={styles.textInput} />
                </View>
                <View style={styles.viewTextinput}>
                    <Text style={{ color: 'gray', left: 8, fontSize: 16, marginBottom: 8 }}>Số lượng kho <Text style={{ color: 'red' }}>*</Text> </Text>
                    <TextInput value={count.toString()} onChangeText={(text) => setcount(text)} placeholder='Nhập Số lượng' style={styles.textInput} />
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
                <TouchableOpacity style={styles.btnAdd} onPress={updateBook}>
                    <Text style={{ color: 'white', fontSize: 15 }} >Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnCancel} onPress={deleteBook}>
                    <Text style={{ color: '#97240090', fontSize: 15 }} >Xóa</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnLoan} onPress={changeAddNewLoadn}>
                <Text style={styles.textBtnLoan}>Cho mượn sách {name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DetailBook

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
        width: '40%',
        height: 45,
        backgroundColor: '#97240090',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    btnCancel: {
        width: '40%',
        height: 45,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#97240090',
        marginLeft: 16
    }, btnLoan: {
        width: '55%',
        height: 45,
        backgroundColor: '#97240090',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    }, textBtnLoan: {
        color: 'white',
        padding: 5,
    }
})