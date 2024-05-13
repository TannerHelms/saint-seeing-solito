import { View } from 'moti'
import { H1, P } from 'packages/app/design/typography'
import { useEffect, useState } from 'react'
import { SolitoImage } from 'solito/image'
import { Me } from '../utils/users'
import { FontAwesome } from '@expo/vector-icons'
import CustomTextInput from '../utils/custom-text-input'
import { Row } from 'packages/app/design/layout'
import { AntDesign } from '@expo/vector-icons'
import { KeyboardAvoidingView, Pressable, ScrollView } from 'react-native'
import CustomButton from '../utils/custom-button'
import { db, storage } from '../auth'
import { doc, updateDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import Divider from '../utils/divider'
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
const DIVIDER_HEIGHT = 'h-4'

export default function EditProfileScreen() {
  const [user, setUser] = useState()

  const showToast = (success = true) => {
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile has been updated successfully',
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'There was an error updating your profile. Please try again.',
      })
    }
  }

  useEffect(() => {
    Me().then((me) => setUser(me))
  }, [])

  async function handleSubmit() {
    const me = await Me()
    const userRef = doc(db, 'users', user.ref)

    let photo_url = user.photo_url
    let photo_background = user.photo_background
    if (me.photo_url !== user.photo_url) {
      const blob = await fetch(user.photo_url).then((r) => r.blob())
      const storageRef = ref(storage, `users/${user.email}/photo_url`)
      await uploadBytes(storageRef, blob)
      photo_url = await getDownloadURL(storageRef)
    }

    if (me.photo_background !== user.photo_background) {
      const blob = await fetch(user.photo_background).then((r) => r.blob())
      const storageRef = ref(storage, `users/${user.email}/photo_background`)
      await uploadBytes(storageRef, blob)
      photo_background = await getDownloadURL(storageRef)
    }

    const docRef = await updateDoc(userRef, {
      ...user,
      photo_url,
      photo_background,
    })
    if (!docRef) {
      showToast(true)
    } else {
      showToast(false)
    }
  }

  async function confirmPicture(profile = true) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      if (profile) {
        setUser({
          ...user,
          photo_url: result.assets[0].uri,
          photo_url_data: result.assets[0],
        })
      } else {
        setUser({
          ...user,
          photo_background: result.assets[0].uri,
          photo_background_data: result.assets[0],
        })
      }
    }
  }

  if (!user) return null

  return (
    <ScrollView className="min-screen">
      <KeyboardAvoidingView behavior="position" className="flex-1">
        <ScrollView>
          <View className="p-4">
            {/* User Photos */}
            <View className="relative mb-14 aspect-square w-full">
              <SolitoImage
                src={user.photo_background}
                className="aspect-square rounded-xl object-contain"
                fill
                alt="user photo"
                style={{
                  borderRadius: 8,
                }}
              />
              <Pressable
                className="bg-primary tope absolute right-5 top-3 flex h-10 w-10 items-center justify-center rounded-full"
                onPress={() => confirmPicture(false)}
              >
                <FontAwesome name="camera" size={24} color="black" />
              </Pressable>
              <View
                className="absolute rounded-full"
                style={{
                  bottom: '0%',
                  left: '50%',
                  transform: [{ translateX: -70 }, { translateY: 35 }],
                }}
              >
                <SolitoImage
                  src={user.photo_url}
                  width={140}
                  height={140}
                  alt="user photo"
                  style={{
                    borderRadius: 180,
                  }}
                />
                <Pressable
                  className="bg-primary tope absolute right-0 flex h-10 w-10 items-center justify-center rounded-full"
                  onPress={() => confirmPicture(true)}
                >
                  <FontAwesome name="camera" size={24} color="black" />
                </Pressable>
              </View>
            </View>
            {/* User Details */}
            <CustomTextInput
              icon="mail"
              placeholder="Email"
              value={user.email}
              onChange={(value) => setUser({ ...user, email: value })}
            />
            <Divider height={DIVIDER_HEIGHT} />
            <CustomTextInput
              icon="person"
              placeholder="Name"
              value={user.display_name}
              onChange={(value) => setUser({ ...user, display_name: value })}
            />
            <Divider height={DIVIDER_HEIGHT} />
            <CustomTextInput
              multiline={true}
              icon="information-circle"
              placeholder="Name"
              value={user.bio}
              onChange={(value) => setUser({ ...user, display_name: value })}
            />
            <Divider height={DIVIDER_HEIGHT} />
            <View className="h-3" />
            <Row className="justify-between">
              <P className="font-semibold">House Rules</P>
              <Pressable
                className="bg-primary rounded-full p-1"
                onPress={() =>
                  setUser({ ...user, house_rules: user.house_rules.concat('') })
                }
              >
                <AntDesign name="plus" size={20} color="black" />
              </Pressable>
            </Row>
            {user.house_rules.map((rule, idx) => (
              <View key={idx}>
                <CustomTextInput
                  number={idx + 1}
                  placeholder="House Rule"
                  value={rule}
                  onChange={(value) => {
                    const rules = [...user.house_rules]
                    rules[idx] = value
                    setUser({ ...user, house_rules: rules })
                  }}
                />
                <Divider height={DIVIDER_HEIGHT} />
              </View>
            ))}
            <CustomButton
              text="Save"
              className="bg-secondary w-full rounded-xl p-3"
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
