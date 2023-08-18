import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Comp/Login';
import Splashscreen from './Comp/Splashscreen';
import ChangePass from './Comp/ChangePass';
import ChangePass2 from './Comp/ChangePass2';
import Home from './Comp/ScreenBotNavi/Home';
import TypeBook from './Comp/Screen/ScreenTypeBook/TypeBook';
import TabNav from './TabNav';
import AddTypeBook from './Comp/Screen/ScreenTypeBook/AddTypeBook';
import DeTailTypeBook from './Comp/Screen/ScreenTypeBook/DetailTypeBook'
import AddBook from './Comp/Screen/ScreenBook/AddBook';
import DetailBook from './Comp/Screen/ScreenBook/DetailBook';
import AddMember from './Comp/Screen/ScreenMember/AddMember';
import ListMember from './Comp/Screen/ScreenMember/ListMember';
import AddNewLoan from './Comp/Screen/ScreenLoan/AddNewLoan';
import ChagneInfo from './Comp/Screen/ScreenPerson/ChagneInfo';
import ChangePassPerson from './Comp/Screen/ScreenPerson/ChangePassPerson';
import DetailMember from './Comp/Screen/ScreenMember/DetailMember';
import ScreenSearch from './Comp/Screen/ScreenSearch/ScreenSearch';
import ScreenSearchType from './Comp/Screen/ScreenSearch/ScreenSearchType';
import ScreenDeitalLoan from './Comp/Screen/ScreenLoan/ScreenDeitalLoan';




const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Splashscreen'>
        <Stack.Screen name="Splashscreen" component={Splashscreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePass" component={ChangePass} options={{ headerShown: false }} />
        <Stack.Screen name='ChangePass2' component={ChangePass2} options={{ headerShown: false }} />
        <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Trang chủ' }} />
        <Stack.Screen name="TypeBook" component={TypeBook} options={{ headerShown: false }} />
        <Stack.Screen name="AddTypeBook" component={AddTypeBook} options={{ headerShown: false }} />
        <Stack.Screen name="DeTailTypeBook" component={DeTailTypeBook} options={{ headerShown: false }} />
        <Stack.Screen name="AddBook" component={AddBook} options={{ headerShown: false }} />
        <Stack.Screen name="DetailBook" component={DetailBook} options={{ headerShown: false }} />
        <Stack.Screen name="AddMember" component={AddMember} options={{ headerShown: false }} />
        <Stack.Screen name='ListMember' component={ListMember} options={{ headerShown: false }} />
        <Stack.Screen name='AddNewLoan' component={AddNewLoan} options={{ headerShown: false }} />
        <Stack.Screen name='ChangeInfo' component={ChagneInfo} options={{ headerShown: false }} />
        <Stack.Screen name='ChangePassPerson' component={ChangePassPerson} options={{ headerShown: false }} />
        <Stack.Screen name='DetailMember' component={DetailMember} options={{ headerShown: false }} />
        <Stack.Screen name='ScreenSearch' component={ScreenSearch} options={{ headerShown: false }} />
        <Stack.Screen name='ScreenSearchType' component={ScreenSearchType} options={{ headerShown: false }} />
        <Stack.Screen name='ScreenDeitalLoan' component={ScreenDeitalLoan} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
