import { P, Text } from 'packages/app/design/typography'
import { View } from 'packages/app/design/view'
import { useEffect, useState } from 'react'
import { Me } from '../utils/users'
import { SetFriends } from '../utils/friends'
import { Pressable, ScrollView } from 'react-native'
import { Row } from 'packages/app/design/layout'
import { SolitoImage } from 'solito/image'

export default function FriendsScreen() {
  const [me, setMe] = useState(null)
  const [friends, setFriends] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Me().then(setMe)
  }, [])

  useEffect(() => {
    if (me) {
      SetFriends(me.ref, setFriends, setLoading)
    }
  }, [me])

  if (loading) return <Text>Loading...</Text>

  return (
    <View className="flex justify-center pt-5">
      {friends.length > 0 && (
        <ScrollView>
          {friends.map((friend, idx) => (
            <View key={idx}>
              <Row className="m-3 items-center justify-between">
                <Row className="items-center justify-center space-x-4">
                  <View className="relative h-16 w-16">
                    <SolitoImage
                      src={friend.photoURL}
                      fill
                      style={{
                        borderRadius: 180,
                      }}
                      alt="profile picture"
                    />
                  </View>
                  <View>
                    <P>{friend.name}</P>
                  </View>
                </Row>
                <Pressable
                  onPress={() => {
                    // TODO: delete friend
                  }}
                  className="rounded-xl bg-red-500 px-5 py-2"
                >
                  <Text>Delete</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    // TODO: Message Friend
                  }}
                  className="bg-primary rounded-xl px-5 py-2"
                >
                  <Text>Message</Text>
                </Pressable>
              </Row>
              <View className="m-2 h-[2px] bg-gray-300" />
            </View>
          ))}
        </ScrollView>
      )}
      {friends.length === 0 && (
        <Text className="text-center">No friend requests</Text>
      )}
    </View>
  )
}
