import { ScrollView } from 'moti'
import { Text } from 'packages/app/design/typography'
import { View } from 'packages/app/design/view'

export default function Messages({ messages }) {
  return (
    <ScrollView
      ref={(ref) => {
        this.scrollView = ref
      }}
      onContentSizeChange={() =>
        this.scrollView.scrollToEnd({ animated: true })
      }
    >
      {messages &&
        messages.map((message, idx) => {
          return (
            <View
              key={idx}
              className={
                message.sent
                  ? 'flex flex-row justify-end'
                  : 'flex flex-row justify-start'
              }
            >
              <View
                className={
                  message.sent
                    ? 'm-2 rounded-lg bg-blue-400 p-2'
                    : 'm-2 rounded-lg bg-gray-200 p-2'
                }
              >
                <Text className={message.sent ? 'text-white' : 'text-black'}>
                  {message.body}
                </Text>
              </View>
            </View>
          )
        })}
    </ScrollView>
  )
}
