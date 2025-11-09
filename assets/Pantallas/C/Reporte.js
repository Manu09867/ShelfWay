import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { TextInput, Button, useTheme, Dialog, Portal } from 'react-native-paper'; 
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'; 

import CustomAppbar from '../../components/CustomAppbar'; 
import { useTheme as useAppTheme } from '../../Resources/ThemeProvider'; 

function ReporteScreen() {
    const paperTheme = useTheme(); 
    // ⭐ Extraemos i18n para la traducción y theme.baseFontSize para la escala
    const { theme, i18n } = useAppTheme(); 
    const [nombre, setNombre] = React.useState('');
    const [apellidos, setApellidos] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [problema, setProblema] = React.useState('');
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const navigation = useNavigation();

    const hideDialog = () => setDialogVisible(false);

    // ⭐ Tamaños de fuente basados en theme.baseFontSize
    const baseSize = theme.baseFontSize || 16;
    const subtitleSize = baseSize - 2;
    const regularSize = baseSize;
    const dialogTitleSize = baseSize + 4; // Título de diálogo un poco más grande

    // ⭐ Adaptatividad: Obtener dimensiones de la pantalla en tiempo real
    const { width, height } = Dimensions.get('window');
    const isPortrait = height >= width; 

    const handleSubmit = () => {
        const requiredFields = [nombre, apellidos, correo, problema];
        if (requiredFields.some(field => !field.trim())) {
            // ⭐ CAMBIO AQUÍ: Usamos la clave traducida del diccionario
            alert(i18n.error_complete_fields); 
            return;
        }
        console.log('Enviando reporte:', { nombre, apellidos, correo, problema });
        setDialogVisible(true);
    };

    const CONTACT_EMAIL = 'shelway@soporte.com'; 
    
    // Diccionario de traducciones simplificado para uso local
    const translations = {
        report_help_title: i18n.report_help_title || "¿Necesitas ayuda?",
        report_description: i18n.report_description || "Completa tu reporte aquí para poder brindarte atención personalizada.",
        form_name_label: i18n.form_name_label || "Nombre:",
        form_name_placeholder: i18n.form_name_placeholder || "Ingresa tu nombre",
        form_lastname_label: i18n.form_lastname_label || "Apellidos:",
        form_lastname_placeholder: i18n.form_lastname_placeholder || "Ingresa tus apellidos",
        form_email_label: i18n.form_email_label || "Correo electrónico:",
        form_email_placeholder: i18n.form_email_placeholder || "Ingresa tu correo electrónico",
        form_problem_label: i18n.form_problem_label || "Describe a continuación tu problema:",
        button_send: i18n.button_send || "ENVIAR",
        dialog_title_received: i18n.dialog_title_received || "REPORTE RECIBIDO",
        dialog_content_contact_part1: i18n.dialog_content_contact_part1 || "Nos pondremos en contacto contigo a través de ",
        dialog_content_contact_part2: i18n.dialog_content_contact_part2 || ".",
        button_ok: i18n.button_ok || "OK",
    };


    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <StatusBar style="light" backgroundColor={theme.colors.primary} />
            
            {/* Título traducido */}
            <CustomAppbar title={i18n.header_title_reporte || "REPORTE"} />

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Contenido principal del reporte (textos y formulario) */}
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.helpText, { 
                        color: theme.colors.text, 
                        fontSize: subtitleSize, // Escalar ayuda
                        fontWeight: 'bold' 
                    }]}>
                        {translations.report_help_title}
                    </Text>
                    <Text style={[styles.instructionText, { 
                        color: theme.colors.onSurfaceVariant,
                        fontSize: regularSize // Escalar instrucción
                    }]}>
                        {translations.report_description}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {/* Input Nombre */}
                    <TextInput 
                        label={translations.form_name_label} 
                        value={nombre} 
                        onChangeText={setNombre} 
                        mode="outlined" 
                        placeholder={translations.form_name_placeholder} 
                        style={styles.input} 
                        outlineStyle={styles.inputOutline} 
                        activeOutlineColor={theme.colors.primary} 
                        keyboardType="default" 
                        // Aplicar la fuente escalada al TextInput
                        theme={{ colors: { text: theme.colors.text, placeholder: theme.colors.placeholder }, fonts: { regular: { fontSize: regularSize } } }}
                    />
                    
                    {/* Input Apellidos */}
                    <TextInput 
                        label={translations.form_lastname_label} 
                        value={apellidos} 
                        onChangeText={setApellidos} 
                        mode="outlined" 
                        placeholder={translations.form_lastname_placeholder} 
                        style={styles.input} 
                        outlineStyle={styles.inputOutline} 
                        activeOutlineColor={theme.colors.primary} 
                        keyboardType="default" 
                        theme={{ colors: { text: theme.colors.text, placeholder: theme.colors.placeholder }, fonts: { regular: { fontSize: regularSize } } }}
                    />
                    
                    {/* Input Correo electrónico */}
                    <TextInput 
                        label={translations.form_email_label} 
                        value={correo} 
                        onChangeText={setCorreo} 
                        mode="outlined" 
                        placeholder={translations.form_email_placeholder} 
                        style={styles.input} 
                        outlineStyle={styles.inputOutline} 
                        activeOutlineColor={theme.colors.primary} 
                        keyboardType="email-address" 
                        theme={{ colors: { text: theme.colors.text, placeholder: theme.colors.placeholder }, fonts: { regular: { fontSize: regularSize } } }}
                    />
                    
                    {/* Área de texto adaptable */}
                    <TextInput 
                        label={translations.form_problem_label} 
                        value={problema} 
                        onChangeText={setProblema} 
                        mode="outlined" 
                        multiline={true} 
                        numberOfLines={isPortrait ? 5 : 3}
                        style={[styles.input, isPortrait ? styles.textAreaPortrait : styles.textAreaLandscape]} 
                        outlineStyle={styles.inputOutline} 
                        activeOutlineColor={theme.colors.primary} 
                        textAlignVertical="top" 
                        theme={{ colors: { text: theme.colors.text, placeholder: theme.colors.placeholder }, fonts: { regular: { fontSize: regularSize } } }}
                    />

                    {/* Botón ENVIAR */}
                    <Button
                        mode="contained"
                        onPress={handleSubmit} 
                        style={styles.button}
                        icon="check" 
                        labelStyle={{ fontSize: regularSize }} // Escalar el texto del botón
                    >
                        {translations.button_send}
                    </Button>
                </View>
            </ScrollView>

            {/* Componente de Diálogo (Portal) */}
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog} style={{backgroundColor: theme.colors.surface}}>
                    <Dialog.Title style={{textAlign: 'center', fontSize: dialogTitleSize, color: theme.colors.onSurface}}>
                        {translations.dialog_title_received}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text style={{textAlign: 'center', color: theme.colors.onSurfaceVariant, fontSize: regularSize, lineHeight: regularSize * 1.5}}>
                            {translations.dialog_content_contact_part1}
                            <Text style={{fontWeight: 'bold', color: theme.colors.primary}}>{CONTACT_EMAIL}</Text>
                            {translations.dialog_content_contact_part2}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog} mode="text" labelStyle={{color: theme.colors.primary}}>
                            {translations.button_ok}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </SafeAreaView>
    );
}

// --- Estilos ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 10,
        paddingBottom: 40,
    },
    headerTextContainer: {
        marginBottom: 20,
    },
    helpText: {
        // Fuente aplicada dinámicamente
        marginBottom: 5,
    },
    instructionText: {
        // Fuente aplicada dinámicamente
        lineHeight: 22, // Mantener line height adaptable
    },
    formContainer: {
        // Contenedor para los campos y el botón
    },
    input: {
        marginBottom: 20,
    },
    inputOutline: {
        borderRadius: 4, 
    },
    // Estilos condicionales para el área de texto
    textAreaPortrait: {
        minHeight: 150, 
    },
    textAreaLandscape: {
        minHeight: 100, 
    },
    button: {
        marginTop: 10,
        paddingVertical: 5,
        borderRadius: 4,
    },
});

export default ReporteScreen;