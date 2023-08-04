import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, differenceInDays } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import queryString from 'query-string';
import { API_IP } from '../../config';



const AddNewLoan = ({ route, navigation }) => {
    // call router
    const { item } = route.params;
    //
    const [name, setName] = useState(item.name);
    const [author, setAuthor] = useState(item.author);
    const [nameThuThu , setNameThuThu] = useState('');
    //get day
    const [returnDate, setReturnDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentDate, setCurrentDate] = useState('');

    const handleDateChange = (event, date) => {
        if (date) {
            setShowDatePicker(false);
            setReturnDate(date);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    React.useEffect(() => {
        calculatePrice();
    }, [returnDate]);

    const calculatePrice = () => {
        const daysDiff = differenceInDays(returnDate, new Date());
        const pricePerDay = 100000;
        const totalPrice = daysDiff * pricePerDay;
        console.log('daysDiff:', daysDiff);
        console.log('totalPrice:', totalPrice);
        setTotalPrice(totalPrice);
    };

    const formatDate = (date) => {
        return format(date, 'dd/MM/yyyy');
    };
    const getCurrentDate = () => {
        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setCurrentDate(formattedDate);
    };
    //call function getCurrentDate
    React.useEffect(() => {
        getCurrentDate();
        getUserInfo();
    }, []);
    // Hàm gửi yêu cầu API và truyền token qua phần x-www-form-urlencoded
    const getUserInfo = async () => {
        try {
            // Lấy token từ AsyncStorage
            const token = await AsyncStorage.getItem('userToken');
            console.log(token + ' đây là token');
            if (!token) {
                console.log('Token không tồn tại hoặc đã hết hạn.');
                return;
            }

            const tokenCheck = {
                token: token
            }

            // Chuyển đổi dữ liệu thành x-www-form-urlencoded
            const formData = queryString.stringify(tokenCheck);

            // Gửi yêu cầu API với phần x-www-form-urlencoded
            const response = await fetch(`http://${API_IP}:3000/api/accurary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });
            console.log(response + ' đây là respoen');

            // Xử lý phản hồi từ server
            if (!response.ok) {
                throw new Error('Lỗi khi gọi API');
            }

            const responseData = await response.json();
            console.log('Thông tin người dùng:', responseData.data);
            setNameThuThu(responseData.data.name);
            console.log(nameThuThu);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.viewTitle}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate('DetailBook', { item: item })}>
                    <Icon name="arrow-left" size={24} color="white" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Tạo phiếu mượn</Text>
            </View>
            <View style={styles.viewContent1}>
                <Image source={{ uri: item.img }} style={styles.img} />
                <View style={styles.viewContentInfo}>
                    <View style={styles.viewContentInfo1}>
                        <Text>Tên sách </Text>
                        <TextInput placeholder="" value={name} onChangeText={(text) => setName(text)} style={styles.textInput} />
                    </View>
                    <View style={styles.viewContentInfo1}>
                        <Text>Tác giả </Text>
                        <TextInput placeholder="" value={author} onChangeText={(text) => setAuthor(text)} style={styles.textInput} />
                    </View>
                    <View style={styles.viewContentInfo1}>
                        <Text>Thủ thư </Text>
                        <TextInput placeholder="" value={nameThuThu} onChangeText={(text) => setName(text)} style={styles.textInput} />
                    </View>
                </View>
            </View>

            <View style={styles.viewContent2}>
                <View style={styles.viewContent2Info}>
                    <Text>Người mượn </Text>
                    <TextInput placeholder="" style={styles.textInput2} />
                </View>
                <View style={styles.viewContent2Info}>
                    <Text>Số điện thoại </Text>
                    <TextInput placeholder="" style={styles.textInput2} />
                </View>
                <View style={styles.viewDay}>
                    <View style={{ width: '50%' }}>
                        <Text style={{}}>Ngày mượn</Text>
                        <TextInput
                            style={styles.textInputDay}
                            value={currentDate}
                            editable={false}
                        />
                    </View>
                    <TouchableOpacity onPress={() => showDatepicker()} style={{ width: '50%' }}>
                        <View >
                            <Text style={{}}>Ngày trả</Text>
                            <TextInput
                                style={styles.textInputDay2}
                                value={formatDate(returnDate)}
                                editable={false}
                            />
                        </View>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={returnDate}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                        />
                    )}

                </View>
                <View style={{ with: '100%' }}>
                    <Text style={{}}>Giá thuê</Text>
                    <TextInput
                        style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: '#D9D9D9',
                            borderRadius: 10,
                            padding: 7,
                            color: 'black'
                        }}
                        value={totalPrice.toString()}
                        editable={false} />
                </View>

            </View>
            <TouchableOpacity style={styles.btnCreateLoan}>
                <Text style={styles.textBtn}>Tạo phiếu</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddNewLoan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,

    }, viewTitle: {
        backgroundColor: '#C78D7A',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }, btnBack: {
        // alignItems:'flex-start'
        position: 'absolute',
        left: '0%',
    }, textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }, viewContent1: {
        flexDirection: 'row',
        width: '95%',
        marginVertical: 10,
    }, viewContent2: {

    }, img: {
        width: 160,
        height: 220,
    }, viewContentInfo: {
        width: '100%',
        marginLeft: 10,
    },
    textInput: {
        width: '55%',
        height: 45,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 7,
    }, viewContentInfo1: {
        marginVertical: 5,
    }, viewContent2: {
        width: '95%',
    }, textInput2: {
        width: '100%',
        height: 45,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 7,
    }, viewContent2Info: {
        marginVertical: 7,
    }, viewDay: {
        marginVertical: 7,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',

    }, textInputDay: {
        width: '100%',
        height: 50,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 7,
        color: 'black'
    }, viewDayInfo: {
        width: '48%',
    }, textInputDay2: {
        width: '100%',
        height: 50,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        padding: 7,
        color: 'black'
    }, btnCreateLoan: {
        backgroundColor: "#C78D7A",
        marginTop: '20%',
        width: '40%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }, textBtn: {
        color: 'white',
        fontSize: 18,
    }
})