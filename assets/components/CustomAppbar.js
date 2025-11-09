import * as React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

/**
 * @param {object} props 
 * @param {string} props.title 
 * @returns {JSX.Element} 
 */
export default function CustomAppbar({ title }) {
    const theme = useTheme(); 
    const navigation = useNavigation();

    return (
        <Appbar.Header 
            style={{ 
                backgroundColor: theme.colors.primary, 
                elevation: 0, 
                // ⭐ Alinear elementos en el centro para el centrado visual
                alignItems: 'center', 
                justifyContent: 'flex-start', // Mantener el botón de retroceso a la izquierda
            }}
        >
            <Appbar.BackAction 
                onPress={() => navigation.goBack()} 
                color={theme.colors.onPrimary} // Color blanco para la flecha
            />
            
            {/* ⭐ CAMBIO CLAVE: Usamos absoluteFillObject para forzar al Appbar.Content
              a ocupar todo el espacio y centrar su contenido, ignorando el BackAction. 
            */}
            <Appbar.Content 
                title={title.toUpperCase()} 
                titleStyle={{ 
                    color: theme.colors.onPrimary, 
                    fontSize: 14, 
                    fontWeight: 'bold',
                    // ⭐ ESTILO PARA CENTRADO GLOBAL
                    textAlign: 'center', 
                }}
                // ⭐ FUERZA EL CENTRADO IGNORANDO EL BOTÓN BACK
                style={{ 
                    position: 'absolute', 
                    left: 0, 
                    right: 0, 
                    zIndex: -1, // Poner detrás para que el botón Back sea clickeable
                }}
            />
        </Appbar.Header>
    );
}