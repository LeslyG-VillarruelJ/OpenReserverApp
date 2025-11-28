import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ErrorScreen() {
    return (
        <View className="flex-1 bg-gray-100 items-center justify-center px-6">

            {/* Tarjeta */}
            <View className="bg-white w-full rounded-2xl p-8 items-center shadow-lg">

                <View className="w-20 h-20 rounded-full bg-red-500 items-center justify-center">
                    <Text className="text-white text-3xl font-bold">e</Text>
                </View>

                <Text className="text-2xl font-bold text-red-500 my-4 text-center">
                    Error
                </Text>

                <Text className="text-gray-600 text-center">
                    Ha ocurrido un error.
                </Text>

                {/* Botón de regreso */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-full bg-red-600 py-3 rounded-xl my-6"
                >
                    <Text className="text-white text-center font-semibold text-base">
                        Regresar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
