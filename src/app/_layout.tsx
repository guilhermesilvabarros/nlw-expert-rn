import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native'
import colors from 'tailwindcss/colors'

import { Loading } from '@/components/loading'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.slate[900],
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="cart" />
      </Stack>
    </SafeAreaView>
  )
}
