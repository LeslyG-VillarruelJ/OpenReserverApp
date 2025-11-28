import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface DropdownOption {
    key: string;
    label: string;
}

interface DropdownSelectorProps {
    label: string;
    placeholder: string;
    options: DropdownOption[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    leftIcon?: React.ReactNode;
    disabled?: boolean;
}

export const DropdownSelector = ({
    label,
    placeholder,
    options,
    selectedValue,
    onValueChange,
    leftIcon,
    disabled = false,
}: DropdownSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(option => option.key === selectedValue);

    return (
        <View className="mb-4">
            <Text className="text-gray-600 text-base font-medium mb-1">{label}</Text>

            <View className="relative">
                <TouchableOpacity
                    onPress={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`p-4 border-2 rounded-xl flex-row items-center ${disabled ? "bg-gray-100 border-gray-300" : "bg-white border-gray-300"
                        }`}
                    style={{
                        shadowOpacity: disabled ? 0 : 0.05,
                        shadowRadius: 4,
                        elevation: 0,
                    }}
                >
                    {leftIcon && (
                        <View className="mr-3">
                            {leftIcon}
                        </View>
                    )}

                    <View className="flex-1">
                        <Text className={`text-base ${selectedOption ? "text-gray-800" : "text-gray-500"
                            }`}>
                            {selectedOption?.label || placeholder}
                        </Text>
                    </View>

                    <Feather
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#6b7280"
                    />
                </TouchableOpacity>

                {isOpen && !disabled && (
                    <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-xl mt-2 z-10"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={option.key}
                                onPress={() => {
                                    onValueChange(option.key);
                                    setIsOpen(false);
                                }}
                                className={`p-4 ${index < options.length - 1 ? "border-b border-gray-100" : ""
                                    } ${selectedValue === option.key ? "bg-emerald-50" : ""
                                    }`}
                            >
                                <Text className={`text-base ${selectedValue === option.key ? "text-emerald-600 font-semibold" : "text-gray-800"
                                    }`}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};
