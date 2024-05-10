import { P, Text } from 'app/design/typography'
import { View } from 'app/design/view'

import { collection, getDocs } from 'firebase/firestore'
import { ScrollView } from 'moti'
import { useEffect, useState } from 'react'
import { SolitoImage } from 'solito/image'
import { db } from '../auth'
import { Pressable } from 'react-native'
import { Row } from '../../design/layout'
import { useRouter } from 'solito/router'
import UserPhotos from '../profile/user-photos'
import UserDetails from '../profile/user-details'
import { Users } from '../utils/users'

export function HomeScreen() {
  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function get() {
      const users = await Users()
      setData(users)
    }
    get()
  }, [])

  return (
    // <AuthGate>
    <View className="w-full flex-1 p-3">
      {data && (
        <ScrollView>
          {data.map((user, idx) => (
            <View
              key={idx}
              className="relative m-2 mx-auto w-full max-w-[400px] rounded-xl bg-[#C2CCBC] p-3"
            >
              <UserPhotos user={user} />
              <UserDetails user={user} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
    // </AuthGate>
  )
}
