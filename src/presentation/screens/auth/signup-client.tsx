import { SignUpClientDto } from "@/src/models/auth/infraestructure/dtos/signup-client.dto";
import { useSignUpClient } from "@/src/models/auth/infraestructure/mutations/useSignupClient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CheckBox from "../../components/commons/checkbox";
import { Input } from "../../components/commons/input";

interface SingUpClientProps {
    name: string;
    lastname: string;
    email: string;
    password: string;
    termsAccepted: boolean;
    role: string;
}

const SignUpScreen = () => {
    const [formData, setFormData] = useState<SingUpClientProps>({
        name: "",
        lastname: "",
        email: "",
        password: "",
        termsAccepted: false,
        role: "USER"
    });

    const { mutate: signUp, isPending, isError, error, isSuccess } = useSignUpClient();

    useEffect(() => {
        if (isSuccess) {
            alert("Usuario ingresado exitosamente");
            router.push("/auth/signin")
        }
    }, [isPending]);

    const handleSignUp = () => {
        const data: SignUpClientDto = {
            name: formData.name + " " + formData.lastname,
            email: formData.email,
            password: formData.password,
            termsAccepted: false,
            role: "USER"
        }
        console.log("Información que ha entrado: ", data);
        signUp(data);

    };

    return (
        <ScrollView
            className="flex-1 bg-gray-100 px-6 py-5 w-full"
            contentContainerStyle={{ justifyContent: "center" }}
        >
            {/* Logo */}
            <View className="items-center mb-5">
                <View className="w-20 h-20 rounded-full bg-emerald-500 items-center justify-center">
                    <Text className="text-white text-3xl font-bold">R</Text>
                </View>

                <Text className="mt-4 text-3xl font-bold text-gray-900">
                    Crea tu cuenta
                </Text>

                <Text className="mt-1 text-gray-600">únete a la comunidad de viajeros</Text>
            </View>

            <View className="w-full px-4 py-4 mb-12 rounded-xl bg-white">
                <View className="flex-row gap-4">
                    {/* Name */}
                    <View className="flex-1 mb-4">
                        <Text className="text-gray-600 text-base font-medium mb-1">Nombre</Text>
                        <Input
                            placeholder="Nombre"
                            leftIcon={<Feather name="user" size={20} color="gray" />}
                            keyboardType="default"
                            value={formData.name}
                            onChangeText={(value) => setFormData({ ...formData, name: value })}
                            className="mb-0"
                        />
                    </View>

                    {/* Last Name */}
                    <View className="flex-1 mb-4">
                        <Text className="text-gray-600 text-base font-medium mb-1">Apellido</Text>
                        <Input
                            placeholder="Apellido"
                            leftIcon={<Feather name="user" size={20} color="gray" />}
                            keyboardType="default"
                            value={formData.lastname}
                            onChangeText={(value) => setFormData({ ...formData, lastname: value })}
                            className="mb-0"
                        />
                    </View>
                </View>

                {/* Email */}
                <View className="mb-4">
                    <Text className="text-gray-600 text-base font-medium mb-1">Email</Text>
                    <Input
                        placeholder="Correo electrónico"
                        leftIcon={<Feather name="mail" size={20} color="gray" />}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={formData.email}
                        onChangeText={(value) => setFormData({ ...formData, email: value })}
                        className="mb-0"
                    />
                </View>

                {/* Password */}
                <View className="mb-0">
                    <Text className="text-gray-600 text-base font-medium mb-1">Contraseña</Text>
                    <Input
                        placeholder="Tu contraseña"
                        isPassword={true}
                        leftIcon={<Feather name="lock" size={20} color="gray" />}
                        value={formData.password}
                        onChangeText={(value) => setFormData({ ...formData, password: value })}
                        className="mb-0"
                    />
                </View>

                {/* Remember me */}
                <View className="w-full flex-row justify-between mt-6 flex-wrap">
                    <CheckBox />
                    <Text className="flex-1 ml">Acepto los términos y condiciones y la política de privacidad</Text>
                </View>

                {/* Errores */}
                {isError && (
                    <View className="mx-10 mt-4 p-2 rounded-full bg-red-100 border-2 border-red-400">
                        <Text className="text-red">{error.message}</Text>
                    </View>
                )}

                {/* Botón Registrarse */}
                <TouchableOpacity
                    className="bg-emerald-500 p-4 rounded-xl items-center mt-4"
                    disabled={isPending}
                    onPress={handleSignUp}
                >
                    {isPending ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-medium text-lg">Crear Cuenta</Text>
                    )}
                </TouchableOpacity>

                {/* Part with Google or Twitter */}
                <View className="flex-row items-center my-5">
                    <View className="flex-1 border-2 border-gray-200 rounded-xl" />

                    {/* Text */}
                    <Text style={{ marginHorizontal: 10, color: '#757575', fontSize: 14 }}>
                        O continúa con
                    </Text>

                    <View className="flex-1 border-2 border-gray-200 rounded-xl" />
                </View>

                <View className="flex-row gap-6">
                    <TouchableOpacity
                        className="flex-row flex-1 bg-white border-2 border-gray-300 rounded-xl items-center justify-center mt-2 gap-2"
                        disabled={isPending}
                        onPress={handleSignUp}
                    >
                        <Icon name="google" size={24} color="gray" />
                        <Text className="text-gray-600 font-semibold">Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-row flex-1 bg-white border-2 border-gray-300 rounded-xl items-center justify-center mt-2 py-2 gap-2"
                        disabled={isPending}
                        onPress={handleSignUp}
                    >
                        <Icon name="twitter" size={24} color="gray" />
                        <Text className="text-gray-600 font-semibold">Twitter</Text>
                    </TouchableOpacity>
                </View>

                {/* Registro */}
                <View className="flex-row justify-center items-center mt-6">
                    <Text className="text-gray-600">¿Ya tienes una cuenta?{" "}</Text>
                    <TouchableOpacity onPress={() => router.push("/auth/signin")}>
                        <Text className="text-emerald-600 font-bold">Inicia sesión aquí</Text>
                    </TouchableOpacity>
                </View>

                <View className="w-full flex-row justify-center items-center mt-0 flex-wrap">
                    <Text className="text-gray-600">¿Quieres registrarte como proveedor?{" "}</Text>
                    <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                        <Text className="text-emerald-600 font-bold">Regístrate como proveedor</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <HeaderOptions selectedValue={'user'} /> */}
        </ScrollView>
    );
}

export default SignUpScreen