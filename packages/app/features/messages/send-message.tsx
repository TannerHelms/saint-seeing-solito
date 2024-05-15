import { Feather, Ionicons } from '@expo/vector-icons'
import { View } from 'packages/app/design/view'
import { Pressable, TextInput } from 'react-native'

export default function SendMessage({
  handleChangeText,
  sendMessage,
  userRef,
  messageBody,
  setBody,
  value,
}) {
  return (
    <View className="h-22 w-full bg-white">
      <View className="relative z-50 mx-2 my-2 flex flex-row items-center space-x-2 rounded-full bg-gray-100 px-4">
        <Ionicons
          name="add"
          size={24}
          color="black"
          className="size-5 z-50 m-6 text-gray-500"
        />
        <TextInput
          placeholder="Message..."
          className="h-full flex-1 rounded-full p-2 text-gray-700 focus:shadow-lg"
          onChangeText={handleChangeText}
          value={value}
        />
        <Pressable
          className="my-2 flex items-center justify-center rounded-full bg-blue-400 p-1.5"
          onPress={() => {
            sendMessage(userRef, messageBody)
            setBody('')
          }}
        >
          <Feather name="send" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  )
}
