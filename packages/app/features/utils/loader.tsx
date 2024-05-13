import { View } from 'moti'
import { ActivityIndicator } from 'react-native'

export default function Loader() {
  return (
    <View className="flex h-full items-center justify-center">
      <ActivityIndicator size="small" color="#A6B6A1" className="p-[2px]" />
    </View>
  )
}
