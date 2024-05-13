import { Feather, Ionicons } from '@expo/vector-icons'
import { useEffect, useLayoutEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native'
import { createParam } from 'solito'
import { Text } from '../../design/typography'
import { View } from '../../design/view'
import { getMessages, sendMessage } from '../utils/chats'
import { auth, db } from '../auth'
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
type Params = {
  id?: string
  screen: string
}
const { useParams } = createParam<Params>()

export default function DetailsScreen({ navigation }) {
  const ref = useParams().params.screen
  const userUid = auth.currentUser!!.uid
  const [messages, setMessages] = useState<DocumentData[]>([])
  const [message, setMessage] = useState<string>()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
    })
  }, [navigation])

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    })
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      })
  }, [navigation])

  useEffect(() => {
    async function get() {
      const messagesRef = collection(db, 'chats', ref, 'messages')
      const q = query(messagesRef, orderBy('timestamp'))
      onSnapshot(q, (snapshot) => {
        let messages = snapshot.docs.map((doc) => {
          let data = doc.data()
          data.ref = doc.id
          userUid === data.sender ? (data.sent = true) : (data.sent = false)
          return data
        })
        setMessages(messages)
      })
    }
    get()
  }, [db])

  return (
    <ScrollView className="min-screen">
      <KeyboardAvoidingView behavior="position" className="flex-1">
        <View className="flex-1">
          <View className="p-3">
            <ScrollView
              ref={(ref) => {
                this.scrollView = ref
              }}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({ animated: true })
              }
            >
              {messages &&
                messages.map((message, idx) => {
                  return (
                    <View
                      key={idx}
                      className={
                        message.sent
                          ? 'flex flex-row justify-end'
                          : 'flex flex-row justify-start'
                      }
                    >
                      <View
                        className={
                          message.sent
                            ? 'm-2 rounded-lg bg-blue-400 p-2'
                            : 'm-2 rounded-lg bg-gray-200 p-2'
                        }
                      >
                        <Text
                          className={message.sent ? 'text-white' : 'text-black'}
                        >
                          {message.body}
                        </Text>
                      </View>
                    </View>
                  )
                })}
              <View className="h-36" />
            </ScrollView>
          </View>
          <View className="h-22 absolute bottom-0 w-full bg-white">
            <View className="relative z-50 mx-2 my-2 flex flex-row items-center space-x-2 rounded-full bg-gray-100 p-2 pr-4">
              <Ionicons
                name="add"
                size={24}
                color="black"
                className="size-5 z-50 text-gray-500"
              />
              <TextInput
                placeholder="Message..."
                className="flex-1 rounded-full text-gray-700 focus:shadow-lg"
                onChangeText={setMessage}
              />
              <Pressable
                className="flex items-center justify-center rounded-full bg-blue-400 p-1.5"
                onPress={() => sendMessage(ref, message)}
              >
                <Feather name="send" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
