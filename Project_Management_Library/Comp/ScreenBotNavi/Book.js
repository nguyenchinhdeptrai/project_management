import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import ItemListBook from '../Item/ItemListBook';
import { API_IP } from '../config';
import { RefreshControl } from 'react-native';




const Book = ({ navigation }) => {
  const url = `http://${API_IP}:3000/api/books`;
  const [isLoading, setisLoading] = useState(false);
  const [listBook, setlistBook] = useState([]);
  //count books
  const [countBook, setCountBook] = useState('');

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setlistBook(json);
        setCountBook(json.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const reloadData = React.useCallback(() => {
    getData();
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  })

  useEffect(() => {
    getData();
  }, [listBook]);
  //function handle modal
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Sách</Text>
      </View>
      <View style={styles.viewRow}>
        <Text style={styles.textFill}>{countBook} sản phẩm</Text>
        <TouchableOpacity onPress={toggleModal}>
          <AntDesign name="search1" size={24} color="black" style={styles.iconFill} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewRow}>

        <TouchableHighlight activeOpacity={0.6}
          underlayColor={'#CB9180'}
          style={styles.buttonBook}
          onPress={() => navigation.navigate('AddBook')} >
          <Text style={styles.textBook}>+  Thêm sách</Text>
        </TouchableHighlight>

        <TouchableOpacity activeOpacity={0.6}
          underlayColor={'#CB9180'}
          style={styles.buttonBook}
          onPress={() => { navigation.navigate('TypeBook') }} >
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ top: 10, left: 5 }} source={require('../../assets/iconTypeBook.png')}></Image>
            <Text style={styles.textBook}>Loại sách</Text>
          </View>

        </TouchableOpacity>
      </View>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reloadData} />}
        data={listBook.data}
        renderItem={({ item }) => <ItemListBook item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 16 }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          {/* Nội dung của bottom sheet */}
          <View style={styles.bottomSheet}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('ScreenSearch');
              toggleModal();
            }}
              style={styles.btnChangeScreen}
            >
              <Text style={{ color: 'white', fontSize: 17 }}>Tìm sách theo tên</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate('ScreenSearchType');
              toggleModal();
            }}
              style={styles.btnChangeScreen} >
              <Text style={{ color: 'white', fontSize: 17 }}>Tìm sách theo thể loại</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.btnClose} >
              <AntDesign name="closecircleo" size={24} color="black" />

            </TouchableOpacity>
          </View>

        </View>
      </Modal>



    </View >
  )
}

export default Book

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F4',
  },
  title: {
    width: '100%',
    height: 60,
    backgroundColor: '#CB9180',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    marginTop: 10
  },
  viewRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  textFill: {
    fontSize: 20,
    textAlign: 'left',
  },
  iconFill: {
    //marginLeft: 210
  },
  textBook: {
    fontSize: 18,
    color: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
    textAlign: 'left',
  },
  buttonBook: {
    backgroundColor: '#CB9180',
    borderRadius: 16,
    marginLeft: 16,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 16,
    marginTop: 8,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: '100%'
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }, btnChangeScreen: {
    width: '100%',
    height: 45,
    backgroundColor: '#CB9180',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 5,
  }, btnClose: {
    width: '25%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})