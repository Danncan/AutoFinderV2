import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';

const MenuComponent = () => {
    const { setSelectedCategory } = useAppContext();

    const categories = [
        { name: 'Dimensiones', icon: <FontAwesome5 name="car" size={24} color="black" /> },
        { name: 'Confort', icon: <MaterialIcons name="weekend" size={24} color="black" /> },
        { name: 'Tecnología', icon: <FontAwesome5 name="microchip" size={24} color="black" /> },
        { name: 'Rendimiento', icon: <FontAwesome5 name="tachometer-alt" size={24} color="black" /> },
        { name: 'Motor', icon: <FontAwesome5 name="cogs" size={24} color="black" /> },
        { name: 'Seguridad', icon: <Entypo name="shield" size={24} color="black" /> },
    ];

    return (
        <View style={styles.menuContainer}>
            {categories.map((category, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => setSelectedCategory(category.name)}
                >
                    <View style={styles.icon}>{category.icon}</View>
                    <Text style={styles.text}>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default MenuComponent;