import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Splashscreen = ({ navigation }) => {
    React.useEffect(() =>{
        setTimeout(() =>{
            navigation.navigate('Login');
        },2000)
    },[])
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logoapp.png')} />
        </View>
    )
}

export default Splashscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFBF8',
        alignItems: 'center',
        justifyContent: 'center'
    }, logo: {
        width: 250, height: 250
    }
})