import { Ionicons } from '@expo/vector-icons'
import { View } from 'packages/app/design/view'
import { TextInput } from 'react-native-gesture-handler'

export default function CustomTextInput({
  color = 'bg-white',
  icon,
  onChange,
  ...props
}) {
  return (
    <View
      className={`relative z-50 ${color} flex flex-row items-center space-x-2 rounded-full p-2 pr-4`}
    >
      <Ionicons
        name={icon}
        size={24}
        color="black"
        className="size-5 z-50 text-gray-500"
      />
      <TextInput
        {...props}
        className="flex-1 rounded-full text-gray-700 focus:shadow-lg"
        onChangeText={onChange}
      />
    </View>
  )
}
