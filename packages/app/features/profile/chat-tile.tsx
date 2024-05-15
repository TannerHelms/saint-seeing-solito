import { SolitoImage } from 'solito/image'
import { Row } from '../../design/layout'
import { View } from '../../design/view'
import { P } from '../../design/typography'
import { Feather } from '@expo/vector-icons'

export function ChatTile({ chat }) {
  return (
    <>
      <Row key={chat.ref} className="m-3 items-center justify-between">
        <Row className="items-center justify-center space-x-4">
          <View className="relative h-16 w-16">
            <SolitoImage
              src={chat.user_b.photo_url}
              fill
              style={{
                borderRadius: 180,
              }}
              alt="profile picture"
            />
          </View>
          <View>
            <P>{chat.user_b.display_name}</P>
            <P className="text-gray-500">{chat.last_message}</P>
          </View>
        </Row>
        <Feather name="arrow-right" size={24} color="black" />
      </Row>
      <View className="m-2 h-[2px] bg-gray-300" />
    </>
  )
}
