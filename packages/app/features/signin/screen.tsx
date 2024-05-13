import { signInWithEmailAndPassword } from 'firebase/auth'
import { View } from 'moti'
import { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native'
import { useRouter } from 'solito/router'
import { auth } from '../auth/index'
import CustomTextInput from '../utils/custom-text-input'
import CustomButton from '../utils/custom-button'
import { SolitoImage } from 'solito/image'
import image from './logo.png'

const IMAGE_SIZE = 120

export default function SignInScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (auth.currentUser) {
      router.replace('/')
    }
  }, [])

  const submitForm = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Signed in')
    } catch (error) {
      console.log(error)
      console.log('Invalid email or password')
    }
  }

  return (
    <View className="s flex flex-1 items-center justify-center p-4">
      <SolitoImage
        src={image}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        alt="logo"
      />
      <View className="h-8" />
      <CustomTextInput icon="mail" placeholder="Email" onChange={setEmail} />
      <View className="h-8" />
      <CustomTextInput
        type="password"
        icon="lock-closed"
        placeholder="Password"
        onChange={setPassword}
      />
      <View className="h-8" />
      <CustomButton
        text="Sign In"
        onPress={submitForm}
        className="bg-primary w-full rounded-xl py-2"
        textColor="text-black"
      />
    </View>
  )
}
