import 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { auth } from 'app/features/auth'
import { HomeScreen } from 'app/features/home/screen'
import { MeScreen } from 'app/features/me/screen'
import DetailsScreen from 'app/features/messages/details'
import MessageScreen from 'app/features/messages/screen'
import ProfileScreen from 'app/features/profile/screen'
import PasswordScreen from 'app/features/profile/password'
import SignOutScreen from 'app/features/profile/sign-out'
import EditProfileScreen from 'app/features/profile/edit'
import FriendRequsts from 'app/features/profile/friend-requests'
import { Provider } from 'app/provider'
import { Stack } from 'expo-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Toast from 'react-native-toast-message'

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()
const MessageStack = createNativeStackNavigator()
const ProfileDrawer = createDrawerNavigator()

export default function Root() {
  const [user, setUser] = useState(auth.currentUser)

  useEffect(() => {
    const event = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => event()
  }, [])

  if (!user || user == undefined)
    return (
      <Provider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: 'Home', headerShown: false }}
          />
        </Stack>
      </Provider>
    )
  return (
    <>
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
      <Toast />
    </>
  )
}

function Home() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  )
}

function Profile() {
  return (
    <ProfileDrawer.Navigator>
      <ProfileDrawer.Screen name="Profile" component={MeScreen} />
      <ProfileDrawer.Screen name="Edit Profile" component={EditProfileScreen} />
      <ProfileDrawer.Screen name="Edit Password" component={PasswordScreen} />
      <ProfileDrawer.Screen name="Friend Requests" component={FriendRequsts} />

      <ProfileDrawer.Screen name="Sign Out" component={SignOutScreen} />
    </ProfileDrawer.Navigator>
  )
}

function Messages() {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen name="Messages" component={MessageScreen} />
      <MessageStack.Screen name="details" component={DetailsScreen} />
    </MessageStack.Navigator>
  )
}
