import { Feather } from '@expo/vector-icons'; // Para íconos
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import HeaderOptions from './options-header';

interface HeaderProps {
    onPress?: () => void;
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <View className="flex-row justify-between items-center px-5 bg-green-100 shadow-md">
            {/* Logo */}
            <Image
                source={require('../../../../assets/open-reserveer-logo.jpeg')}
                className='w-40 h-20'
                resizeMode="contain"
            />

            {/* Botón para seleccionar algo */}
            <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                className="p-3 rounded-lg hover:bg-gray-100"
            >
                <Feather name="menu" size={24} color="#000" />
            </TouchableOpacity>

            {isOpen && (
                <HeaderOptions selectedValue={'user'} />
            )}
        </View>
    );
};

export default Header;
