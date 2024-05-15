import { useHeaderHeight } from '@react-navigation/elements'
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { Text } from 'packages/app/design/typography'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, KeyboardAvoidingView } from 'react-native'
import { createParam } from 'solito'
import { View } from '../../design/view'
import { auth, db } from '../auth'
import CustomTextInput from '../utils/custom-text-input'
import SendMessage from './send-message'
import { sendMessage } from '../utils/chats'
import Messages from './message'
type Params = {
  id?: string
  screen: string
}
const { useParams } = createParam<Params>()
export default function DetailsScreen({ navigation }) {
  const ref = useParams().params.screen
  const userUid = auth.currentUser!!.uid
  const [messages, setMessages] = useState<DocumentData[]>([])
  const [body, setBody] = useState<any>()
  const headerHeight = useHeaderHeight()

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
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
      <View
        className="flex justify-between"
        style={{
          height: Dimensions.get('window').height - headerHeight,
        }}
      >
        <View className="flex-1">
          <Messages messages={messages} />
        </View>
        <View className="bg-white pb-[40px]">
          <SendMessage
            value={body}
            setBody={setBody}
            handleChangeText={setBody}
            sendMessage={sendMessage}
            userRef={ref}
            messageBody={body}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
