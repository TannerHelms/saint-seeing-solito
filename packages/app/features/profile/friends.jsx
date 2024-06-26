import { P, Text } from 'packages/app/design/typography'
import { View } from 'packages/app/design/view'
import { useEffect, useState } from 'react'
import { Me } from '../utils/users'
import { SetFriends } from '../utils/friends'
import { ActivityIndicator, Pressable, ScrollView } from 'react-native'
import { Row } from 'packages/app/design/layout'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'

export default function FriendsScreen() {
  const [me, setMe] = useState(null)
  const [friends, setFriends] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    Me().then(setMe)
  }, [])

  useEffect(() => {
    if (me) {
      SetFriends(me.ref, setFriends, setLoading)
    }
  }, [me])

  if (loading)
    return (
      <ActivityIndicator
        size="small"
        color="#A6B6A1"
        className="my-auto p-[2px]"
      />
    )

  return (
    <View className="flex justify-center p-2 pt-5">
      {friends.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
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
                {/* <Pressable
                  onPress={() => {
                    // TODO: delete friend
                  }}
                  className="rounded-xl bg-red-500 px-5 py-2"
                >
                  <Text>Delete</Text>
                </Pressable> */}
                <Pressable
                  onPress={() => {
                    router.replace('/Messages')
                  }}
                  className="bg-primary rounded-xl px-5 py-4"
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
