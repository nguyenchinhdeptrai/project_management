import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from "./Comp/ScreenBotNavi/Home";
import Book from "./Comp/ScreenBotNavi/Book";
import Loan from "./Comp/ScreenBotNavi/Loan";
import Person from "./Comp/ScreenBotNavi/Person";

const Tab = createBottomTabNavigator();

const TabNav = ({ route }) => {

    return (
        <Tab.Navigator
            initialRouteName={"Trang chủ"}
            screenOptions={{
                headerShown: false,
                keyboardHidesTabBar: false,
                tabBarActiveTintColor: '#97240090',
                tabBarInactiveTintColor: '#4B4B4B',
                tabBarLabelStyle: { fontSize: 12, },
          
            }}>

            <Tab.Screen name={"Trang Chủ"} component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
                }}
            />

            <Tab.Screen name={"Sách"} component={Book}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='book' color={color} size={size} />
                }}
            />

            <Tab.Screen name={"Phiếu mượn"} component={Loan}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name='list-alt' color={color} size={size} />
                }}
            />

            <Tab.Screen name={"Cá nhân"} component={Person}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='person' color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNav;