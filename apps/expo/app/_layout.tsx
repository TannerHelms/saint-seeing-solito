import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from 'app/features/home/screen';
import MeScreen from 'app/features/me/screen';
import ProfileScreen from 'app/features/profile/screen';
import SignInScreen from './signin';
import MessageScreen from 'app/features/messages/screen';
import DetailsScreen from 'app/features/messages/details';
const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator();
const MessageStack = createNativeStackNavigator();

export default function Root() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
        name="index" 
        component={Home}  
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen 
        name="messages" 
        component={Messages}  
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen 
        name="me" 
        component={Profile}  
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        />

        <Tab.Screen 
        name="signin" 
        component={SignInScreen}  
        options={{
          tabBarLabel: 'Signin',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        />
        
      </Tab.Navigator>
  </NavigationContainer>
  )
}
 

function Home() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}   />
      <HomeStack.Screen name="profile" component={ProfileScreen} />
  </HomeStack.Navigator>
  )
}

function Profile() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Profile" component={MeScreen}   />
  </HomeStack.Navigator>
  )
}

function Messages() {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen name="Messages" component={MessageScreen}   />
      <MessageStack.Screen name="details" component={DetailsScreen}   />
  </MessageStack.Navigator>
  )
}