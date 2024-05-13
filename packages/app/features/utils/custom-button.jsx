import { P } from 'packages/app/design/typography'
import { Pressable } from 'react-native'

export default function CustomButton({
  text,
  textColor = 'text-white',
  ...props
}) {
  return (
    <Pressable {...props}>
      <P className={`m-auto font-semibold ${textColor}`}>{text}</P>
    </Pressable>
  )
}
