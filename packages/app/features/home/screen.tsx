import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'

import { MotiLink } from 'solito/moti'
import { AuthGate } from '../auth/auth-gate'

export function HomeScreen() {
  return (
    <AuthGate>

    <View className="flex-1 items-center justify-center p-3">
      <H1>Welcome to Solito.</H1>
      <View className="max-w-xl">
        <P className="text-center">
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P className="text-center">
          Solito is made by{' '}
          <A
            href="https://twitter.com/fernandotherojo"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
            >
            Fernando Rojo
          </A>
          .
        </P>
        <P className="text-center">
          NativeWind is made by{' '}
          <A
            href="https://twitter.com/mark__lawlor"
            hrefAttrs={{
              target: '_blank',
              rel: 'noreferrer',
            }}
            >
            Mark Lawlor
          </A>
          .
        </P>
      </View>
      <View className="h-[32px]" />
      <Row className="space-x-8">
        <TextLink href="/signin">Sign in</TextLink>
      </Row>
    </View>
    </AuthGate>
  )
}
