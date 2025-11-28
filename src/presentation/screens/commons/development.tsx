import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function UnderDevelopmentScreen() {
    return (
        <View className="flex-1 bg-gray-100 items-center justify-center px-6">

            {/* Tarjeta */}
            <View className="bg-white w-full rounded-2xl p-8 items-center shadow-lg">

                <View className="w-20 h-20 rounded-full bg-emerald-500 items-center justify-center">
                    <Text className="text-white text-3xl font-bold">D</Text>
                </View>

                <Text className="text-2xl font-bold text-emerald-500 my-4 text-center">
                    Pantalla en Desarrollo
                </Text>

                <Text className="text-gray-600 text-center">
                    Estamos trabajando arduamente para terminar esta sección. ¡Estará disponible muy pronto!
                </Text>

                {/* Botón de regreso */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-full bg-emerald-600 py-3 rounded-xl my-6"
                >
                    <Text className="text-white text-center font-semibold text-base">
                        Regresar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
