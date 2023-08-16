import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import React, { useState } from 'react';
import queryString from 'query-string';
import { API_IP } from '../../config';



const ScreenDeitalLoan = ({ route, navigation }) => {
    const updateLoanDetail = async () => {
        let objBook = {
            _id: item._id,
            userName: item.userName,
            bookTitle: item.bookName,
            librarianName: item.nameMember,
            startDate: item.startDate,
            endDate: item.endDate,
            phoneUser: item.phoneMember,
            price: item.price,
            status: 'yes'
        };
        console.log(objBook);
        try {
            const formData = queryString.stringify(objBook);
            const response = await fetch(`http://${API_IP}:3000/api/updateloan`, {
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

            Alert.alert('Thành công', 'Sửa trạng thái thành công', navigation.navigate('TabNav'));

            console.log('Data successfully uploaded');
        } catch (error) {
            console.error(error);
        }
    }

    const item = route.params.item;
    return (
        <View style={styles.container}>
            <View style={styles.viewTitle}>
                <TouchableOpacity onPress={() => navigation.navigate('TabNav')} style={styles.btnBack}>
                    <Image source={require('../../../assets/back_icon.png')} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Chi tiết phiếu mượn</Text>
            </View>
            <View style={styles.viewContent}>
                <Text style={styles.textLoan}>Phiếu mượn</Text>
                <Image source={{ uri: item.bookImage }} style={styles.imgContent} />
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.textConten}>Họ tên: </Text>
                        <Text style={styles.textConten}>Số điện thoại: </Text>
                        <Text style={styles.textConten}>Địa chỉ: </Text>
                        <Text style={styles.textConten}>Tên sách: </Text>
                        <Text style={styles.textConten}>Ngày mượn: </Text>
                        <Text style={styles.textConten}>Ngày trả: </Text>
                        <Text style={styles.textConten}>Thủ thư: </Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.textConten}>{item.nameMember}</Text>
                        <Text style={styles.textConten}>{item.phoneMember}</Text>
                        <Text style={styles.textConten}>{item.addressMember}</Text>
                        <Text style={styles.textConten}>{item.bookName}</Text>
                        <Text style={styles.textConten}>{item.startDate}</Text>
                        <Text style={styles.textConten}>{item.endDate}</Text>
                        <Text style={styles.textConten}>{item.userName}</Text>

                    </View>
                </View>
            </View>
            <View style={styles.viewFooter}>
                <Text style={item.status === 'no' ? styles.textStatusNo : styles.textStatusYes}>
                    Trạng thái: {item.status === 'no' ? 'chưa trả' : 'đã trả'}
                </Text>
                <TouchableOpacity style={styles.btnComplete} onPress={updateLoanDetail}>
                    <Text style={styles.textBtn}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default ScreenDeitalLoan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    viewContent: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 5,
    },
    viewFooter: {
        flex: 1,
        alignItems: 'center',
    },
    textLoan: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 5,
    },
    imgContent: {
        width: 220,
        height: 225,
        borderRadius: 12,
        resizeMode: 'stretch'
    }, btnComplete: {
        backgroundColor: '#C78D7A',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    }, textBtn: {
        color: 'white',
        fontSize: 17,
    }, textStatusNo: {
        color: 'red',
        padding: 5,
        fontSize: 15,
    }, textConten: {
        paddingVertical: 3,
        fontSize: 18,
    }, textStatusYes: {
        color: 'green',
        padding: 5,
        fontSize: 15,
    },
})