import { useRouter } from 'solito/router'
import { P } from '../../design/typography'
import { View } from '../../design/view'
import CustomButton from '../utils/custom-button'
import { Ionicons } from '@expo/vector-icons'
import { Row } from 'packages/app/design/layout'
export default function UserDetails({ user, button = true, friends = false }) {
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
        {friends && (
          <Row className="items-center space-x-1">
            <P>{user.friends}</P>
            <Ionicons name="person" size={20} color="black" />
          </Row>
        )}
        {!friends && <P>{user.distance} mi</P>}
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
          <CustomButton
            text="View Profile"
            onPress={() => {
              router.push('/profile/' + user.ref)
            }}
          />
        </View>
      )}
    </View>
  )
}
