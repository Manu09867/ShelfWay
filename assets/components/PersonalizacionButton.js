import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native'; // ⭐ Importar Dimensions
import { Button, useTheme } from 'react-native-paper';

export default function PersonalizacionButton({ title, iconName, onPress }) {
    const theme = useTheme();
    
    // ⭐ Obtener dimensiones para adaptabilidad del texto
    const { width, height } = Dimensions.get('window');
    const isPortrait = height >= width;

    return (
        <Button
            mode="contained"
            onPress={onPress}
            icon={iconName}
            contentStyle={styles.buttonContent}
            // ⭐ Usar estilo condicional para la etiqueta
            labelStyle={[
                styles.buttonLabel, 
                isPortrait ? styles.labelPortrait : styles.labelLandscape
            ]}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
            {title}
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '80%', 
        marginVertical: 10, 
        borderRadius: 30,   
        elevation: 4,       
    },
    buttonContent: {
        height: 60, 
    },
    buttonLabel: {
        color: 'white',   
        fontWeight: 'bold',
        // El tamaño de la fuente se define condicionalmente
    },
    // ⭐ Estilo para orientación Vertical (mayor tamaño de fuente)
    labelPortrait: {
        fontSize: 18, 
    },
    // ⭐ Estilo para orientación Horizontal (menor tamaño de fuente)
    labelLandscape: {
        fontSize: 16, // Reducir ligeramente el tamaño para evitar desbordamiento
    },
});