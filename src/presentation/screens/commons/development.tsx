import { useAuthStore } from "@/src/core/store/auth.store";
import { User } from "@/src/models/auth/domain/entities/user";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function UnderDevelopmentScreen() {
    const userData = useAuthStore((state) => state.user);
    const [user, setUser] = useState<User | null>(null);

    // Se vuelve a renderizar cuando el usuario cambia
    useEffect(() => {
        setUser(userData);
    }, [userData]);

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

                <Text className="text-gray-600 text-center">
                    Usuario Registrado: {user?.name} {user?.lastname}
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
