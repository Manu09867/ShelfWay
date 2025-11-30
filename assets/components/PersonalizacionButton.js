import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native'; 
import { Button, useTheme } from 'react-native-paper';

export default function PersonalizacionButton({ title, iconName, onPress }) {
    const theme = useTheme();
    

    const { width, height } = Dimensions.get('window');
    const isPortrait = height >= width;

    return (
        <Button
            mode="contained"
            onPress={onPress}
            icon={iconName}
            contentStyle={styles.buttonContent}

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

    },

    labelPortrait: {
        fontSize: 18, 
    },

    labelLandscape: {
        fontSize: 16, 
    },
});