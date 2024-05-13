import { Feather } from '@expo/vector-icons'
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
  or,
} from 'firebase/firestore'
import { use, useEffect, useState } from 'react'
import { Row } from '../../design/layout'
import { P } from '../../design/typography'
import { View } from '../../design/view'
import { db } from '../auth'
import { ChatTile } from '../profile/chat-tile'
import { CreateChatModal } from './create-chat-modal'
import { ActivityIndicator, Pressable } from 'react-native'
import { useRouter } from 'solito/router'
import { Me } from '../utils/users'

export default function MessageScreen() {
  const [loading, setLoading] = useState(true)
  const [chats, setChats] = useState<DocumentData[]>([])
  const [modal, setModal] = useState(false)
  const router = useRouter()
  useEffect(() => {
    async function get() {
      const me = await Me()
      const chatRef = collection(db, 'chats')
      const q = query(
        chatRef,
        or(
          where('user_a.ref', '==', me!!.ref),
          where('user_b.ref', '==', me!!.ref),
        ),
      )
      onSnapshot(q, (snapshot) => {
        const chats = snapshot.docs.map((doc) => {
          let data = doc.data()
          data.ref = doc.id
          return data
        })
        setChats(chats)
        setLoading(false)
      })
    }
    get()
  }, [db])

  function toggle() {
    setModal(!modal)
  }

  return (
    <View className="space-y-4 p-4">
      <CreateChatModal visible={modal} toggle={toggle} />
      <Row className="justify-between">
        <P>Below are your chats</P>
        <Feather
          name="edit"
          size={24}
          color="black"
          onPress={() => setModal(true)}
        />
      </Row>
      {loading && (
        <ActivityIndicator size="small" color="#A6B6A1" className="p-[2px]" />
      )}
      <View className="space-y-10">
        {chats.map((chat: any, idx) => {
          return (
            <Pressable
              onPress={() => {
                router.push('/details/' + chat.ref)
              }}
              key={idx}
            >
              <ChatTile chat={chat} />
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
