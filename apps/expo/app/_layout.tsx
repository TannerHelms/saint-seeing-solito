import { Provider } from 'app/provider'
import { Stack } from 'expo-router'

export default function Root() {
  return (
    <Provider>
      <Stack>

        <Stack.Screen name="index" options={
          { title: 'Home' }
        } />

        <Stack.Screen name="user/[id]" options={
          { title: 'User Details' }
        } />

      </Stack>
    </Provider>
  )
}
