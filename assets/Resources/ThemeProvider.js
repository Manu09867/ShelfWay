import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

/* -------------------------------------------------------------------------- */
/* DICCIONARIO DE TRADUCCIONES (i18n) */
/* -------------------------------------------------------------------------- */
const I18N = {
  ESPAÑOL: {
    // --- Común a Configuración ---
    header_title_preferences: "Preferencias",
    header_title_notifications: "Notificaciones",
    header_title_language: "Idioma",
    theme_title: "TEMA",
    theme_description: "Elige un tema:",
    theme_light: "CLARO",
    theme_dark: "OSCURO",
    font_size_title: "TAMAÑO LETRA",
    font_size_description: "Elige un tamaño de letra:",

    // --- Cadenas de REPORTE ---
    header_title_reporte: "REPORTE",
    report_help_title: "¿Necesitas ayuda?",
    report_description: "Completa tu reporte aquí para poder brindarte atención personalizada.",
    form_name_label: "Nombre:",
    form_name_placeholder: "Ingresa tu nombre",
    form_lastname_label: "Apellidos:",
    form_lastname_placeholder: "Ingresa tus apellidos",
    form_email_label: "Correo electrónico:",
    form_email_placeholder: "Ingresa tu correo electrónico",
    form_problem_label: "Describe a continuación tu problema:",
    button_send: "ENVIAR",
    dialog_title_received: "REPORTE RECIBIDO",
    dialog_content_contact_part1: "Nos pondremos en contacto contigo a través de ",
    dialog_content_contact_part2: ".",
    button_ok: "OK",
    error_complete_fields: "Por favor, completa todos los campos antes de enviar.",

    // --- Cadenas de NOTIFICACIONES --- (¡NUEVO!)
    notifications_description: "Configura las notificaciones según tus preferencias:",
    notifications_warning: "Las notificaciones están bloqueadas a nivel del sistema operativo. Por favor, habilítelas en la configuración de tu teléfono.",
    notifications_label_offers: "DESACTIVAR/ACTIVAR\nNOTIFICACIONES DE NUEVAS OFERTAS",
    notifications_label_events: "DESACTIVAR/ACTIVAR\nNOTIFICACIONES DE NUEVOS EVENTOS",
    notifications_label_products: "DESACTIVAR/ACTIVAR\nNOTIFICACIONES DE NUEVOS PRODUCTOS",
  },
  ENGLISH: {
    // --- Common Configuration ---
    header_title_preferences: "PREFERENCES",
    header_title_notifications: "NOTIFICATIONS",
    header_title_language: "LANGUAGE",
    theme_title: "THEME",
    theme_description: "Choose a theme:",
    theme_light: "LIGHT",
    theme_dark: "DARK",
    font_size_title: "FONT SIZE",
    font_size_description: "Choose a font size:",

    // --- Report Strings ---
    header_title_reporte: "REPORT",
    report_help_title: "DO YOU NEED SOME HELP?",
    report_description: "Complete your report here so we can provide you with personalized assistance.",
    form_name_label: "First Name:",
    form_name_placeholder: "Enter your first name",
    form_lastname_label: "Last Name:",
    form_lastname_placeholder: "Enter your last name",
    form_email_label: "Email:",
    form_email_placeholder: "Enter your email",
    form_problem_label: "Describe your problem below:",
    button_send: "SEND",
    dialog_title_received: "REPORT RECEIVED",
    dialog_content_contact_part1: "We will contact you via ",
    dialog_content_contact_part2: ".",
    button_ok: "OK",
    error_complete_fields: "Please complete all fields before submitting.",

    // --- Notifications Strings --- (¡NUEVO!)
    notifications_description: "Set up notifications according to your preferences:",
    notifications_warning: "Notifications are blocked at the operating system level. Please enable them in your phone's settings.",
    notifications_label_offers: "DISABLE/ENABLE\nNOTIFICATIONS FOR NEW OFFERS",
    notifications_label_events: "DISABLE/ENABLE\nNOTIFICATIONS FOR NEW EVENTS",
    notifications_label_products: "DISABLE/ENABLE\nNOTIFICATIONS FOR NEW PRODUCTS",
  },
};

/* -------------------------------------------------------------------------- */
/* ESCALA DE FUENTES */
/* -------------------------------------------------------------------------- */
const FONT_SCALES = { 0: -2, 1: 0, 2: 2 }; // CH, M, G
const BASE_FONT_SIZE = 16;

/* -------------------------------------------------------------------------- */
/* TEMAS */
/* -------------------------------------------------------------------------- */
const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#1976D2',
    accent: '#26A69A',
    background: '#F4F6FA',
    surface: '#FFFFFF',
    text: '#1E1E1E',
    disabled: '#B0BEC5',
    placeholder: '#9E9E9E',
    backdrop: '#00000080',
    card: '#FFFFFF',
    border: '#E0E0E0',
    notification: '#FF5252',
    menuBg: '#FFFFFF',
    menuText: '#37474F',
    buttonBg: '#1976D2',
    buttonText: '#FFFFFF',
    textM: '#1976D2',
    btIcon: '#1a088fff',
    red: '#E53935',
    dialogS: '#FFFFFF',
    btIconIn: '#5f7faaff',
    inactiveT: '#3e6aa8ff',
    activeT: '#8aeee444',
  },
};

const darkTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#90CAF9',
    accent: '#80CBC4',
    background: '#121826',
    surface: '#1F2937',
    text: '#ECEFF1',
    disabled: '#6B7280',
    placeholder: '#9CA3AF',
    backdrop: '#00000080',
    card: '#1E293B',
    border: '#334155',
    notification: '#FF6B6B',
    menuBg: '#1F2937',
    menuText: '#E0E0E0',
    buttonBg: '#2563EB',
    buttonText: '#FFFFFF',
    textM: '#90CAF9',
    btIcon: '#90CAF9',
    red: '#F87171',
    dialogS: '#1E293B',
    btIconIn: '#5782bbff',
    inactiveT: '#2564b0ff',
    activeT: '#577c9aff',
  },
};

/* -------------------------------------------------------------------------- */
/* CONTEXTO */
/* -------------------------------------------------------------------------- */
export const ThemeContext = React.createContext({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => { },
  toggleThemeType: () => { },
  fontSizeScale: 1,
  setFontSizeScale: () => { },
  currentLanguage: 'ESPAÑOL',
  setLanguage: () => { },
  i18n: I18N.ESPAÑOL,
});

export const useTheme = () => useContext(ThemeContext);

/* -------------------------------------------------------------------------- */
/* PROVIDER */
/* -------------------------------------------------------------------------- */
export const ThemeContextProvider = ({ children }) => {
  const [themeType, setThemeType] = useState('light');
  const [fontSizeScale, setFontSizeScale] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('ESPAÑOL');

  const toggleThemeType = useCallback(
    () => setThemeType(prev => (prev === 'dark' ? 'light' : 'dark')),
    []
  );

  const setLanguage = useCallback(lang => setCurrentLanguage(lang), []);

  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);
  const fontAdjustment = FONT_SCALES[fontSizeScale] || 0;

  const appliedTheme = useMemo(() => {
    const base = isDarkTheme ? darkTheme : lightTheme;
    return {
      ...base,
      baseFontSize: BASE_FONT_SIZE + fontAdjustment,
      fonts: { ...base.fonts },
    };
  }, [isDarkTheme, fontAdjustment]);

  const i18n = useMemo(() => I18N[currentLanguage] || I18N.ESPAÑOL, [currentLanguage]);

  const contextValue = useMemo(
    () => ({
      theme: appliedTheme,
      themeType,
      isDarkTheme,
      setThemeType,
      toggleThemeType,
      fontSizeScale,
      setFontSizeScale,
      currentLanguage,
      setLanguage,
      i18n,
    }),
    [
      appliedTheme,
      themeType,
      isDarkTheme,
      toggleThemeType,
      fontSizeScale,
      setFontSizeScale,
      currentLanguage,
      setLanguage,
      i18n,
    ]
  );

  return (
    <PaperProvider theme={appliedTheme}>
      <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
    </PaperProvider>
  );
};