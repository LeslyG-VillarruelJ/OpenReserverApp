import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// import { useAuthStore } from "@/src/shared/stores/authStore";
import CheckBox from "@/src/presentation/components/commons/checkbox";
import { Input } from "@/src/presentation/components/commons/input";
import { DropdownOption, DropdownSelector } from "@/src/presentation/components/commons/picker";
import { Feather } from "@expo/vector-icons";
import HeaderOptions from "../../components/layouts/options-header";

const roles: DropdownOption[] = [
  { key: "user", label: "Usuario" },
  { key: "provider", label: "Proveedor" },
  { key: "admin", label: "Administrador" },
];

export interface LoginValues {
  email: string;
  password: string;
  role: string;
}

const LoginScreen = () => {
  const router = useRouter();
  // const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState<LoginValues>({
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    /* setLoading(true);

    setTimeout(() => {
      const userData = {
        id: 1,
        name: formData.email.split("@")[0],
        email: formData.email,
        role: formData.role,
        avatar: `https://ui-avatars.com/api/?name=${formData.email.split("@")[0]}&background=1ABC9C&color=fff`,
      };

      login(userData, "mock-token");
      setLoading(false);

      // Navegación por rol
      switch (formData.role) {
        case "admin":
          router.push("/admin");
          break;
        case "provider":
          router.push("/provider");
          break;
        default:
          router.push("/user");
      }
    }, 1000); */
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
          disabled={loading}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-medium text-lg">Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        {/* Part with Google or Twitter */}
        {/* <View className="flex-row items-center my-5">
          <View className="flex-1 border-2 border-gray-200 rounded-xl" /> */}

          {/* Text */}
          {/* <Text style={{ marginHorizontal: 10, color: '#757575', fontSize: 14 }}>
            O continúa con
          </Text>

          <View className="flex-1 border-2 border-gray-200 rounded-xl" />
        </View> */}

        {/* <View className="flex-row gap-6">
          <TouchableOpacity
            className="flex-row flex-1 bg-white border-2 border-gray-300 rounded-xl items-center justify-center mt-2 gap-2"
            disabled={loading}
            onPress={handleLogin}
          >
            <Icon name="google" size={24} color="gray" />
            <Text className="text-gray-600 font-semibold">Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row flex-1 bg-white border-2 border-gray-300 rounded-xl items-center justify-center mt-2 py-2 gap-2"
            disabled={loading}
            onPress={handleLogin}
          >
            <Icon name="twitter" size={24} color="gray" />
            <Text className="text-gray-600 font-semibold">Twitter</Text>
          </TouchableOpacity>
        </View> */}

        {/* Registro */}
        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-gray-600">¿No tienes cuenta?{" "}</Text>
          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text className="text-emerald-600 font-bold">Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </View>

      <HeaderOptions selectedValue={'user'} />
    </ScrollView>
  );
};

export default LoginScreen;
