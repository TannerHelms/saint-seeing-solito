import { View } from 'app/design/view'
import { ScrollView } from 'moti'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import UserDetails from '../profile/user-details'
import UserPhotos from '../profile/user-photos'
import { Users } from '../utils/users'

export function HomeScreen() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function get() {
      const users = await Users()
      setData(users)
    }
    get()
  }, [])

  return (
    <View className="w-full flex-1 ">
      {!data && (
        <ActivityIndicator
          size="small"
          color="#A6B6A1"
          className="my-auto p-[2px]"
        />
      )}
      {data && (
        <ScrollView showsVerticalScrollIndicator={false}>
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
  )
}
