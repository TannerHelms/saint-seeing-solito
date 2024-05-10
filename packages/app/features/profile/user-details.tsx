import { useRouter } from 'solito/router'
import { View } from '../../design/view'
import { P, Text } from '../../design/typography'
import { Pressable } from 'react-native'

export default function UserDetails({ user, button = true }) {
  const router = useRouter()
  return (
    <View className="space-y-3">
      <View
        className="mt-16"
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <P>{user.display_name}</P>
        <P>20mi</P>
      </View>
      <View
        className="m-0"
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <P className="m-0">{user.location}</P>
        <P>Traveler</P>
      </View>
      {button && (
        <View className="bg-secondary flex cursor-pointer justify-center rounded-full py-2 shadow-lg">
          <Pressable
            onPress={() => {
              router.push('/profile/' + user.ref)
            }}
          >
            <P className="m-auto font-semibold text-white">View Profile</P>
          </Pressable>
        </View>
      )}
    </View>
  )
}
