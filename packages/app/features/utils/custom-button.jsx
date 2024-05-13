import { P } from 'packages/app/design/typography'
import { ActivityIndicator, Pressable } from 'react-native'

export default function CustomButton({
  text,
  loading = false,
  textColor = 'text-white',
  ...props
}) {
  return (
    <Pressable {...props} disabled={loading}>
      {!loading && (
        <P className={`m-auto font-semibold ${textColor}`}>{text}</P>
      )}
      {loading && (
        <ActivityIndicator size="small" color="#fff" className="p-[2px]" />
      )}
    </Pressable>
  )
}
