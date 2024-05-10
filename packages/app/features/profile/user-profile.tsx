import { H1, P } from '../../design/typography'
import { View } from '../../design/view'

export default function UserProfile({ user }) {
  return (
    <View className="rounded-t-xl bg-white px-3 pb-6">
      <H1>Bio</H1>
      <P>{user.bio}</P>
      <H1>House Rules</H1>
      {user.house_rules &&
        user.house_rules.map((rule, idx) => (
          <P key={rule}>
            {idx + 1}) {rule}
          </P>
        ))}
    </View>
  )
}
