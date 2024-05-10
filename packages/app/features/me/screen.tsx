import { View } from 'app/design/view'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { auth, db } from '../auth'
import { ScrollView } from 'react-native'
import UserProfile from "../profile/user-profile"
import UserPhotos from "../profile/user-photos"
import UserDetails from "../profile/user-details"
export default function MeScreen() {
  const [user, setUser] = useState<DocumentData>()
  useEffect(() => {
    async function get() {
      if (auth.currentUser) {
        const querySnapshot = await getDoc(doc(db, 'users', auth.currentUser.uid))
        const data = querySnapshot.data()
        if (data) {
          setUser(data)
        }
      }
    }
    get()
  }, [auth.currentUser])

  if (user) {
    return (
      <View className="bg-primary w-full flex-1">
        <ScrollView>
          <View className="relative mx-auto flex w-full max-w-[450px]">
            <View className="p-3">
              <UserPhotos user={user} />
              <UserDetails user={user} button={false} />
            </View>
            <UserProfile user={user} />
          </View>
        </ScrollView>
      </View>
    )
  }
}
