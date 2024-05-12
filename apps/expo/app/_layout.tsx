import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from 'app/features/auth';
import { HomeScreen } from 'app/features/home/screen';
import { MeScreen } from 'app/features/me/screen';
import DetailsScreen from 'app/features/messages/details';
import MessageScreen from 'app/features/messages/screen';
import ProfileScreen from 'app/features/profile/screen';
import { Provider } from 'app/provider';
import { Stack } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator();
const MessageStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

export default function Root() {
  const [user, setUser] = useState(auth.currentUser)
  
  useEffect(() => {
    const event = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => event()
  }, [])

  if (!user || user == undefined) return (
    <Provider>
      <Stack>
        <Stack.Screen name="index" options={
          { title: 'Home' ,
            headerShown: false
          }
        } />
      </Stack>
    </Provider>
  )
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