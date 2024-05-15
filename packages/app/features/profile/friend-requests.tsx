import { DocumentData } from '@google-cloud/firestore'
import { Row } from 'packages/app/design/layout'
import { P, Text } from 'packages/app/design/typography'
import { View } from 'packages/app/design/view'
import { useEffect, useState } from 'react'
import { Pressable, ScrollView } from 'react-native'
import { SolitoImage } from 'solito/image'
import { db } from '../auth'
import { AcceptFriendRequest, GetFriendRequests } from '../utils/friends'
import { Me } from '../utils/users'

export default function FriendReqests() {
  const [me, setMe] = useState<DocumentData>()
  const [requests, setRequests] = useState<DocumentData[]>([])

  useEffect(() => {
    Me().then((me) => setMe(me!!))
  }, [])

  useEffect(() => {
    console.log('here')
    if (me) {
      GetFriendRequests(me!!.ref).then((resp) => setRequests(resp))
    }
  }, [me, db])

  return (
    <View className="flex justify-center pt-5">
      {requests.length > 0 && (
        <ScrollView>
          {requests.map((request, idx) => (
            <View key={idx}>
              <Row className="m-3 items-center justify-between">
                <Row className="items-center justify-center space-x-4">
                  <View className="relative h-16 w-16">
                    <SolitoImage
                      src={request.fromPhotoURL}
                      fill
                      style={{
                        borderRadius: 180,
                      }}
                      alt="profile picture"
                    />
                  </View>
                  <View>
                    <P>{request.fromName}</P>
                  </View>
                </Row>
                <Pressable
                  onPress={() => {
                    AcceptFriendRequest(request.ref)
                  }}
                  className="bg-primary rounded-xl p-4 px-8"
                >
                  <Text>Add</Text>
                </Pressable>
              </Row>
              <View className="m-2 h-[2px] bg-gray-300" />
            </View>
          ))}
        </ScrollView>
      )}
      {requests.length === 0 && <Text>No friend requests</Text>}
    </View>
  )
}
