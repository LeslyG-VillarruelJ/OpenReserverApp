import { SignInDto } from "@/src/models/auth/infraestructure/dtos/sign.dto";
import { useSignIn } from "@/src/models/auth/infraestructure/mutations/useSignin";
import CheckBox from "@/src/presentation/components/commons/checkbox";
import { Input } from "@/src/presentation/components/commons/input";
import { DropdownOption, DropdownSelector } from "@/src/presentation/components/commons/picker";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const roles: DropdownOption[] = [
  { key: "USER", label: "Usuario" },
  { key: "SUPPLIER", label: "Proveedor" },
  { key: "ADMIN", label: "Administrador" },
];

export interface LoginValues {
  email: string;
  password: string;
  role: string;
}

const LoginScreen = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginValues>({
    email: "",
    password: "",
    role: "USER",
  });

  const { mutate: signIn, isPending, isError, error, isSuccess } = useSignIn();

  useEffect(() => {
    if (isSuccess) {
      Alert.alert("Éxito", "Usuario ingresado exitosamente");
      router.push("/auth/forget-password");
    }
  }, [isPending]);

  const handleLogin = () => {
    console.log("Ingreso a la sesión como: " + formData.email + " " + formData.password + " " + formData.role);

    const signInData: SignInDto = {
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    signIn(signInData);
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-100 px-6 py-5"
      contentContainerStyle={{ justifyContent: "center" }}
    >
      {/* Logo */}
      <View className="items-center mb-5">
        <View className="w-20 h-20 rounded-full bg-emerald-500 items-center justify-center">
          <Text className="text-white text-3xl font-bold">R</Text>
        </View>

        <Text className="mt-4 text-3xl font-bold text-gray-900">
          Iniciar Sesión
        </Text>

        <Text className="mt-1 text-gray-600">Inicia sesión en tu cuenta</Text>
      </View>

      <View className="w-full px-4 py-4 rounded-xl bg-white">
        {/* Picker */}
        <DropdownSelector
          label="Rol"
          placeholder="Seleccionar rol"
          options={roles}
          selectedValue={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
          leftIcon={<Feather name="users" size={20} color="#6b7280" />}
        />

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
        <View className="mb-4">
          <Text className="text-gray-600 text-base font-medium mb-1">Contraseña</Text>
          <Input
            placeholder="Tu contraseña"
            isPassword
            leftIcon={<Feather name="lock" size={20} color="gray" />}
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
            className="mb-0"
          />
        </View>

        {/* Errores */}
        {isError && (
          <View className="mx-10 mt-4 p-2 rounded-full bg-red-100 border-2 border-red-400">
            <Text className="text-red">{error.message}</Text>
          </View>
        )}

        {/* Remember me */}
        <View className="flex-row justify-between items-center mt-6">
          <CheckBox text="Recordarme" />
          <TouchableOpacity onPress={() => router.push("/auth/forget-password")}>
            <Text className="text-emerald-600 font-bold">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botón Login */}
        <TouchableOpacity
          className="bg-emerald-500 p-4 rounded-xl items-center mt-4"
          disabled={isPending}
          onPress={handleLogin}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-medium text-lg">Iniciar Sesión</Text>
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
            onPress={handleLogin}
          >
            <Icon name="google" size={24} color="gray" />
            <Text className="text-gray-600 font-semibold">Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row flex-1 bg-white border-2 border-gray-300 rounded-xl items-center justify-center mt-2 py-2 gap-2"
            disabled={isPending}
            onPress={handleLogin}
          >
            <Icon name="twitter" size={24} color="gray" />
            <Text className="text-gray-600 font-semibold">Twitter</Text>
          </TouchableOpacity>
        </View>

        {/* Registro */}
        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-gray-600">¿No tienes cuenta?{" "}</Text>
          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text className="text-emerald-600 font-bold">Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <HeaderOptions selectedValue={'user'} /> */}
    </ScrollView>
  );
};

export default LoginScreen;
