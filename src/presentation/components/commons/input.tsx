import { Feather } from "@expo/vector-icons";
import React, { ReactNode, useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  className?: string;
  isPassword?: boolean;
  leftIcon?: ReactNode;
}

export const Input = ({
  className,
  isPassword = false,
  leftIcon,
  ...restOfProps
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`flex flex-row items-center rounded-xl px-3 h-16 ${isFocused
        ? "border-2 border-gray-400 bg-white"
        : "border-2 border-gray-400/40 bg-white/30"
        } ${className}`}
    >
      {leftIcon && <View className="mr-2">{leftIcon}</View>}
      <TextInput
        className="flex-1"
        secureTextEntry={isPassword && !showPassword}
        placeholderTextColor="#9CA3AF"
        style={{ color: "#000000" }}
        onFocus={(e) => {
          setIsFocused(true);
          restOfProps.onFocus && restOfProps.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          restOfProps.onBlur && restOfProps.onBlur(e);
        }}
        {...restOfProps}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
