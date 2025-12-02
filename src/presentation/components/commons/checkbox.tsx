import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CheckBoxProps {
    text?: string;
}

export default function CheckBox({ text }: CheckBoxProps) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)} className={`w-6 h-6 mx-2 border-2 border-gray-300 ${isChecked ? "bg-emerald-600" : "bg-white"} items-center justify-center`}>
                {isChecked && <Text className="text-white text-sm font-bold text-center">✓</Text>}
            </TouchableOpacity>
        </View>
    );
}
