import { Text, TouchableOpacity, View } from "react-native";

interface HeaderOptionsProps {
    selectedValue: string;
}

const options = [
    { key: "user", label: "Usuario" },
    { key: "provider", label: "Proveedor" },
    { key: "admin", label: "Administrador" },
];

const HeaderOptions = ({ selectedValue }: HeaderOptionsProps) => {
    const selectedOption = options.find(option => option.key === selectedValue);
    return (
        <View className="w-50 h-50 absolute top-full bg-white border border-gray-300 mt-2 z-10"
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
            {options.map((option) => (
                    <TouchableOpacity
                        key={option.key}
                        className=""
                    >
                        <Text>{option.label}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}

export default HeaderOptions;