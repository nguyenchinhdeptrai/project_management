import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { API_IP } from '../../config';
import { Alert } from 'react-native';
import queryString from 'query-string';

const ChangePassPerson = ({ navigation, route }) => {

  const { data } = route.params;

  const [old, setOld] = useState('');
  const [newP, setNew] = useState('');
  const [returnP, setReturn] = useState('');


  const ChangePassword = async () => {
    let changePass = { old: old, newP: newP, returnP: returnP, _id: data._id };
    try {
      const fromChange = queryString.stringify(changePass);
      console.log(fromChange + ' check from change');
      const response = await fetch(`http://${API_IP}:3000/api/changepassword`, {
        method: 'PUT',
        body: fromChange,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      if (!response.ok) {
        let errorMessage = 'Lỗi mạng';
        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      if (responseData.status === 0) {
        Alert.alert("Thành công", responseData.message);
      } else if (responseData.status === 1) {
        Alert.alert("Lỗi", responseData.message);
      } else if (responseData.status === 2) {
        Alert.alert("Lỗi", responseData.message);
      } else if (responseData.status === 3) {
        Alert.alert("Lỗi", responseData.message);
      } else if (responseData.status === 4) {
        Alert.alert("Lỗi", responseData.message);
      } else {
        Alert.alert("Lỗi", "Lỗi không xác định từ máy chủ");
      }
    } catch (e) {
      Alert.alert("Lỗi" + e.message);
    }
  };

  const Cancle = () => { }
  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <TouchableOpacity onPress={() => navigation.navigate('TabNav')} style={styles.btnBack}>
          <Image source={require('../../../assets/back_icon.png')} />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Đổi mật khẩu</Text>
      </View>
      <View style={styles.viewContent}>

        <View style={styles.viewTextInput}>
          <View style={{ width: '75%', marginBottom: -7 }}>
            <Text>Mật khẩu cũ </Text>
          </View>
          <TextInput placeholder='Nhập mật khẩu cũ' value={old} onChangeText={(text) => setOld(text)} style={styles.textInput} />
        </View>
        <View style={styles.viewTextInput}>
          <View style={{ width: '75%', marginBottom: -7 }}>
            <Text>Mật khẩu mới </Text>
          </View>
          <TextInput placeholder='Nhập mật khẩu mới' value={newP} onChangeText={(text) => setNew(text)} style={styles.textInput} />
        </View>
        <View style={styles.viewTextInput}>
          <View style={{ width: '75%', marginBottom: -7 }}>
            <Text>Nhập lại mật khẩu </Text>
          </View>
          <TextInput placeholder='Nhập lại mật khẩu' value={returnP} onChangeText={(text) => setReturn(text)} style={styles.textInput} />
        </View>
      </View>
      <View style={styles.viewFooter}>
        <TouchableOpacity style={[styles.btnFooter2, {}]} onPress={ChangePassword}>
          <Text style={[styles.textBtn, { color: 'white' }]}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnFooter1]} onPress={Cancle}>
          <Text style={[styles.textBtn, { color: 'black' }]}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChangePassPerson

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
    justifyContent: 'center',
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
    marginVertical: 5,
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