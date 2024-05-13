import { View } from 'packages/app/design/view'
import { useEffect, useState } from 'react'
import CustomButton from '../utils/custom-button'
import CustomTextInput from '../utils/custom-text-input'
import { updatePassword } from 'firebase/auth'
import { auth } from '../auth'
import { useRouter } from 'solito/router'
import Toast from 'react-native-toast-message'
export default function PasswordScreen({ navigation }) {
  const router = useRouter()
  const [password, setPassword] = useState<string>('')

  const showToast = (success = true) => {
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Password Updated',
        text2: 'Your password has been updated successfully',
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'There was an error updating your password. Please try again.',
      })
    }
  }

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    })
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      })
  }, [navigation])

  async function handleSubmit() {
    updatePassword(auth.currentUser!!, password)
      .then(() => {
        showToast()
        setPassword('')
        router.replace('/Profile')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View className="space-y-4 px-2 pt-4">
      <CustomTextInput
        onChange={setPassword}
        icon="lock-closed"
        placeholder="New Password..."
      />
      <CustomButton
        text="Change Password"
        onPress={handleSubmit}
        className="bg-primary rounded-xl py-2"
        textColor="text-black"
      />
    </View>
  )
}
