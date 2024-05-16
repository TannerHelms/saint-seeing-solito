import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Me, Users } from '../utils/users'
import { db } from '../auth'
import { CreateChat } from '../utils/chats'
import { Modal, Pressable } from 'react-native'
import { View } from '../../design/view'
import { Text } from '../../design/typography'
import { Row } from '../../design/layout'
import { Ionicons } from '@expo/vector-icons'
import { SetCreateChats, SetFriends } from '../utils/friends'
import { SolitoImage } from 'solito/image'

export function CreateChatModal({ toggle, visible }) {
  const [users, setUsers] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function get() {
      const me = await Me()
      SetCreateChats(me!!.ref, setUsers, setLoading)
    }
    get()
  }, [db])

  async function createChat(user) {
    CreateChat(user)
    toggle()
  }
  if (users) {
    return (
      <Modal visible={visible} transparent={true} animationType="fade">
        <Pressable
          className="flex-1 cursor-pointer bg-[#00000080]"
          onPress={toggle}
        >
          <View
            className=" absolute mx-auto w-[80%] space-y-4 rounded-xl bg-white p-4"
            style={{
              top: '15%',
              left: '10%',
            }}
          >
            <Row className="items-center justify-between">
              <Text>Create New Chat</Text>
              <Ionicons name="exit" size={24} color="black" />
            </Row>
            {users.length === 0 && (
              <View>
                <Text className="mt-4 text-center">
                  You already have a chat with each of your friends!
                </Text>
              </View>
            )}
            {users.map((user: any) => (
              <Row key={user.ref} className="items-center justify-between">
                <Row className="items-center space-x-3">
                  <View className="relative h-[60px] w-[60px] ">
                    <SolitoImage
                      src={user.photoURL}
                      fill
                      style={{
                        borderRadius: 180,
                      }}
                      alt="profile picture"
                    />
                  </View>
                  <Text className="text-lg">{user.name}</Text>
                </Row>
                <Pressable onPress={() => createChat(user)}>
                  <Ionicons name="add" size={24} color="black" />
                </Pressable>
              </Row>
            ))}
          </View>
        </Pressable>
      </Modal>
    )
  }
}
