import { Ionicons } from '@expo/vector-icons'
import { P } from 'packages/app/design/typography'
import { View } from 'packages/app/design/view'
import { TextInput } from 'react-native'

export default function CustomTextInput({
  color = 'bg-white',
  icon,
  onChange,
  type = 'text',
  value = null,
  number = null,
  ...props
}) {
  return (
    <View
      className={`relative z-50 ${color} flex flex-row items-center space-x-2 rounded-xl p-4 pr-4`}
    >
      {number && (
        <View className="size-5 z-50 text-gray-500">
          <P className="text-black">{number}</P>
        </View>
      )}
      <Ionicons
        name={icon}
        size={24}
        color="black"
        className="size-5 z-50 text-gray-500"
      />
      <TextInput
        secureTextEntry={type === 'password'}
        {...props}
        className="flex-1 rounded-full text-[16px] focus:shadow-lg"
        onChangeText={onChange}
        type={type}
        value={value}
      />
    </View>
  )
}
