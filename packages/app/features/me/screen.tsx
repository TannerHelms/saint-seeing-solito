import { View } from 'app/design/view'
import { DocumentData, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { auth, db } from '../auth'
import { ScrollView } from 'react-native'
import UserProfile from '../profile/user-profile'
import UserPhotos from '../profile/user-photos'
import UserDetails from '../profile/user-details'
export function MeScreen() {
  const [user, setUser] = useState<DocumentData>()
  useEffect(() => {
    const docRef = doc(db, 'users', auth.currentUser?.uid as string)
    onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const profile = docSnap.data()
        profile.ref = docSnap.id
        setUser(profile)
      }
    })
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
  return null
}
