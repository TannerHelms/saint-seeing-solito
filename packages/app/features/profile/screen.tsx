import { doc, getDoc } from 'firebase/firestore'

import { useEffect, useState } from 'react'
import { H1, P } from '../../design/typography'
import { View } from '../../design/view'
import { db } from '../auth'
import UserDetails from './user-details'
import UserPhotos from './user-photos'

import { createParam } from 'solito'
import { ScrollView } from 'react-native'
import Loader from '../utils/loader'
type Params = {
  id?: string
  path?: string
}
const { useParams } = createParam<Params>()

export default function ProfileScreen() {
  const id = useParams().params.path?.split('/').slice(-1)[0]
  const [profile, setProfile] = useState<any>(null)
  useEffect(() => {
    async function get() {
      const docRef = doc(db, 'users', id as string)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const profile = docSnap.data()
        profile.ref = docSnap.id
        setProfile(profile)
      }
    }
    if (id) {
      get()
    }
  }, [id])

  if (!profile) return <Loader />

  if (profile) {
    return (
      <View className="bg-primary w-full flex-1">
        <ScrollView>
          <View className="relative mx-auto flex w-full max-w-[450px]">
            <View className="p-3">
              <UserPhotos user={profile} />
              <UserDetails user={profile} button={false} />
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
