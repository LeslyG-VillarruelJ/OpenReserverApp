import Header from "@/src/presentation/components/layouts/header";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import '../global.css';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#ffffff"
          translucent={false}
          hidden={false}
        />

        {/* Header global */}
        <Header />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth/signin" />
          <Stack.Screen name="auth/forget-password" />
          <Stack.Screen name="auth/signup" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}