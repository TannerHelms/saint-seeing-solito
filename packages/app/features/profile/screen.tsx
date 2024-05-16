import { doc, getDoc } from 'firebase/firestore'

import { useEffect, useState } from 'react'
import { H1, P, Text } from '../../design/typography'
import { View } from '../../design/view'
import { db } from '../auth'
import UserDetails from './user-details'
import UserPhotos from './user-photos'
import { AntDesign } from '@expo/vector-icons'
import { createParam } from 'solito'
import { ActivityIndicator, Pressable, ScrollView } from 'react-native'
import Loader from '../utils/loader'
import { GetStatus, SendFriendRequest } from '../utils/friends'
import { Me } from '../utils/users'
import Toast from 'react-native-toast-message'
type Params = {
  id?: string
  path?: string
}
const { useParams } = createParam<Params>()

export default function ProfileScreen() {
  const id = useParams().params.path?.split('/').slice(-1)[0]
  const [profile, setProfile] = useState<any>(null)
  const [status, setStatus] = useState<string>('')
  const [me, setMe] = useState<any>(null)

  useEffect(() => {
    Me().then((me) => setMe(me))
  }, [])

  useEffect(() => {
    async function get() {
      const me = await Me()
      const docRef = doc(db, 'users', id as string)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const profile = docSnap.data()
        profile.ref = docSnap.id
        GetStatus(me!!.ref, profile.ref, (status) => {
          setStatus(status)
          setProfile(profile)
        })
      }
    }
    if (id) {
      get()
    }
  }, [id])

  useEffect(() => {
    if (profile && me != null) {
      GetStatus(me.ref, profile.ref, setStatus)
    }
  }, [db])

  async function handleAddFriend() {
    const me = await Me()
    SendFriendRequest(me!!, profile)
    Toast.show({
      type: 'success',
      text1: 'Friend Request Sent',
      text2: 'Your friend request has been sent.',
    })
  }

  if (!profile)
    return (
      <ActivityIndicator
        size="small"
        color="#A6B6A1"
        className="my-auto p-[2px]"
      />
    )

  if (profile) {
    return (
      <View className="bg-primary w-full flex-1">
        {status === 'not friends' && (
          <Pressable
            className="absolute bottom-3 right-3 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500"
            onPress={handleAddFriend}
          >
            <AntDesign name="adduser" size={30} color="white" />
          </Pressable>
        )}
        <ScrollView>
          <View className="relative mx-auto flex w-full max-w-[450px]">
            <View className="p-3">
              <UserPhotos user={profile} />
              <UserDetails user={profile} button={false} />
              <View className="mt-3 flex flex-row justify-between">
                <P>Status</P>
                <P>{status}</P>
              </View>
            </View>
            <View className="rounded-t-xl bg-white px-3 pb-6">
              <H1>Bio</H1>
              <P>{profile.bio}</P>
              <H1>House Rules</H1>
              {profile.house_rules &&
                profile.house_rules.map((rule: string, idx: number) => (
                  <P key={rule}>
                    {idx + 1}) {rule}
                  </P>
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
  return null
}
