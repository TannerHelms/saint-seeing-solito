import { SolitoImage } from 'solito/image'
import { View } from '../../design/view'

export default function UserPhotos({ user }) {
  return (
    <View className="relative aspect-square w-full">
      <SolitoImage
        src={user.photo_background}
        className="aspect-square rounded-xl object-contain"
        fill
        alt="user photo"
        style={{
          borderRadius: 8,
        }}
      />
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
      </View>
    </View>
  )
}
