import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import queryString from 'query-string';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_IP } from '../config';


const Person = ({ navigation, route }) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //infomation user
  const [nameUser, setNameUser] = useState('');
  const [statusUser, setStatusUser] = useState('');
  const [image, setImage] = useState('');

  //useState data
  const [dataAll, setDataAll] = useState('');



  const Lougout = () => {
    Alert.alert('Cảnh báo', 'Bạn có muốn đăng xuất không', [
      {
        text: 'CÓ',
        onPress: handleLogout,
      },
      {
        text: 'Không',
        style: 'cancel',
      }
    ]);
  };
  //function logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log(AsyncStorage.getItem('userToken'));
      navigation.navigate('Login')
    } catch (e) {
      console.log(e + ' lỗi đăng xuất');
    }
  };

  //function get infomation user
  const getInfoUserLogin = async () => {
    try {
      // Lấy token từ AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
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

      // Xử lý phản hồi từ server
      if (!response.ok) {
        throw new Error('Lỗi khi gọi API');
      }

      const responseData = await response.json();

      setNameUser(responseData.data.name);
      setStatusUser(responseData.data.status);
      setImage(responseData.data.img);
      setDataAll(responseData.data);
    } catch (e) {
      console.log(e + " lỗi khi call api");
    }
  };
  const [prevDataAll, setPrevDataAll] = useState(dataAll);
  React.useEffect(() => {
    
    if (dataAll.name == prevDataAll.name) {
      getInfoUserLogin();
      console.log(prevDataAll.name);
      console.log(dataAll.name + ' list 1');
      setPrevDataAll(dataAll);
    }
  }, [dataAll , prevDataAll]);


  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.textTitle}>Thông tin </Text>
      </View>
      <View style={styles.viewContent}>
        <View style={styles.viewBackGroup}>

        </View>
        <View style={styles.viewInffo}>
          <View style={styles.viewInfo1}>
            {image ?
              <Image source={{ uri: image }} style={styles.imgInfo} /> :
              <Image source={require('../../assets/imgupdate.png')} style={styles.imgInfo} />}

            <View style={styles.viewTextInfo}>

              <Text style={styles.textTitleName}>{nameUser}</Text>
              <Text style={styles.textTitleStatus}>{statusUser}</Text>
            </View>
          </View>
          <View style={styles.viewTextEmail}>
            <Text style={styles.textEmail}>Email: polylib@fpt.edu.vn</Text>
          </View>
          <View style={styles.line}>

          </View>
          <Text style={styles.textEstablish}>Thiết lập tài khoản</Text>
          <View style={styles.viewChangeProfile}>
            <TouchableOpacity onPress={() => navigation.navigate('ChangeInfo', { data: dataAll })}>
              <View style={styles.viewChangP}>
                <Text style={styles.textChangeP}>Chỉnh sửa thông tin</Text>
                <View style={{ alignItems: 'flex-end', alignItems: 'center', paddingTop: 5, }}>
                  <Image source={require('../../assets/change.png')} style={{ alignItems: 'flex-end' }} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChangePassPerson', { data: dataAll })}>
              <View style={styles.viewChangP}>
                <Text style={styles.textChangeP}>Đổi mật khẩu</Text>
                <View style={{ alignItems: 'flex-end', alignItems: 'center', paddingTop: 5, }}>
                  <Image source={require('../../assets/change.png')} style={{ alignItems: 'flex-end' }} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.viewChangP}>
                <Text style={styles.textChangeP}>Sách mượn được bao nhiêu</Text>
                <View style={{ alignItems: 'flex-end', alignItems: 'center', paddingTop: 5, }}>
                  <Image source={require('../../assets/change.png')} style={{ alignItems: 'flex-end' }} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.viewChangP}>
              <Text style={styles.textChangeP}>Thông báo</Text>
              <View style={{ alignItems: 'flex-end', alignItems: 'center' }}>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </View>
          <View style={styles.line}>

          </View>
          <Text style={styles.textEstablish}>Thông tin thêm</Text>
          <View style={styles.viewChangeProfile}>
            <TouchableOpacity>
              <View style={styles.viewChangP}>
                <Text style={styles.textChangeP}>Về chúng tôi </Text>
                <View style={{ alignItems: 'flex-end', alignItems: 'center', paddingTop: 5, }}>
                  <Image source={require('../../assets/change.png')} style={{ alignItems: 'flex-end' }} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.viewChangP}>
                <Text style={styles.textChangeP}>Hỗ trợ khách hàng</Text>
                <View style={{ alignItems: 'flex-end', alignItems: 'center', paddingTop: 5, }}>
                  <Image source={require('../../assets/change.png')} style={{ alignItems: 'flex-end' }} />
                </View>
              </View>
            </TouchableOpacity>

          </View>
          <View style={styles.viewBtnLogout}>
            <TouchableOpacity style={styles.btnLogout} onPress={Lougout}>
              <View style={styles.viewBtnLogou}>
                <Text style={styles.textBtnLogout}>Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Person

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  viewTitle: {
    backgroundColor: '#C78D7A',
    height: 70,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 4,
    color: 'white',
    paddingTop: 25,
  }, viewContent: {
    width: '100%',
  }, viewBackGroup: {
    width: '100%',
    height: '55%',
    backgroundColor: '#D9B3A6',
    borderBottomLeftRadius: 12,
    borderBottomEndRadius: 12,
  }, viewInffo: {
    width: '90%',
    height: '130%',
    backgroundColor: 'white',
    position: 'absolute',
    top: '15%',
    left: '5%', // Điều chỉnh vị trí của "viewInffo" theo yêu cầu
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    borderRadius: 12,
    padding: 10,
  }, viewInfo1: {
    flexDirection: 'row',
    width: '100%',
  }, imgInfo: {
    width: 70,
    height: 70,
    borderRadius: 45,
  }, viewTextInfo: {
    marginLeft: 20,
  }, textTitleName: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  }, textTitleStatus: {
    fontSize: 16,
    paddingLeft: 5,
  }, line: {
    height: 1,
    backgroundColor: '#CACACA',
    width: '105%',
    marginTop: 15,
  }, textEstablish: {
    color: 'gray',
    paddingVertical: 7,
  }, viewChangeProfile: {

  }, viewChangP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  }, textChangeP: {
    fontSize: 18
  }, textEmail: {
    fontSize: 18,
    color: 'gray',
    padding: 5,
  }, viewTextEmail: {
    alignItems: 'center',
  }, viewBtnLogou: {
    flexDirection: 'row',
    alignItems: 'center',
  }, btnLogout: {
    width: '50%',
    height: 45,
    backgroundColor: '#C78D7A',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }, textBtnLogout: {
    color: 'white',
    padding: 5,
  }, viewBtnLogout: {
    alignItems: 'center',
    marginTop: 12,
  }
})