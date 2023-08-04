import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { API_IP } from '../config';
import { RefreshControl } from 'react-native';
import ItemLoan from '../Item/ItemLoan';

const Loan = ({ navigation }) => {
  const url = `http://${API_IP}:3000/api/loandeltail`;

  const [isLoading, setisLoading] = useState(false);
  const [listLoan, setlistLoan] = useState([]);

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setlistLoan(json);

        console.log(json);
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

  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Phiếu mượn</Text>
      </View>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reloadData} />}
        data={listLoan.data}
        renderItem={({ item }) => <ItemLoan item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 40 }}
      />
    </View >
  )
}

export default Loan

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
})