import { ActivityIndicator, Text, View } from "react-native";

export default function LoadingScreen({ message = "Loading..." }) {
    return (
        <View className="flex-1 bg-white items-center justify-center">
            <ActivityIndicator size="large" color="#7c3aed" />
            <Text className="mt-4 text-gray-600">{message}</Text>
        </View>
    );
}
