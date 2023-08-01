import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import ItemListMember from '../Item/ItemListMember'

import { FontAwesome } from '@expo/vector-icons';

const ModalListMember = ({ modalVisible, closeModal, listMember }) => {
    return (
        <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal}>
            <View style={styles.container}>
                <View style={styles.view2}>
                    <TouchableOpacity onPress={closeModal} style={{
                        position: 'absolute',
                        left: -70,
                    }}>
                        <FontAwesome name="arrow-left" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.textTitleModal}>Danh sách thành viên</Text>
                </View>
                <FlatList
                    data={listMember}
                    renderItem={({item}) => <ItemListMember item={item} closeModal={closeModal} />}
                    keyExtractor={(item) => item.id}
                    style={styles.listMemberModal}
                    numColumns={2} // Set the number of columns to 2
                />

            </View>
        </Modal>
    )
}

export default ModalListMember

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    view2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTitleModal: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 7,
    }, listMemberModal: {
        width: '95%',
        height: 120,
    }
})