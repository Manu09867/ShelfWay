import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../Resources/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

function RegisterSC() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const navigation = useNavigation();
    const passwordsMatch = password === confirmPassword || confirmPassword === '';

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert(t('register.alert.error'), t('register.passwordMismatch'));
            return;
        }

        try {
            // Crear usuario
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Enviar email de verificación
            await sendEmailVerification(user);

            // Guardar nombre y correo en Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
            });

            // Alerta de éxito
            Alert.alert(
                t('register.alert.successTitle'),
                t('register.alert.successMessage'),
                [
                    {
                        text: t('register.alert.ok'),
                        onPress: () => navigation.goBack(),
                    },
                ],
                { cancelable: false }
            );

        } catch (error) {
            let mensaje = "";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    mensaje = t('register.alert.emailInUse');
                    break;
                case 'auth/invalid-email':
                    mensaje = t('register.alert.invalidEmail');
                    break;
                case 'auth/weak-password':
                    mensaje = t('register.alert.weakPassword');
                    break;
                case 'auth/missing-password':
                    mensaje = t('register.alert.missingPassword');
                    break;
                default:
                    mensaje = error.message;
            }
            Alert.alert(t('register.alert.error'), mensaje);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.container, { backgroundColor: '#fff' }]}>
                        <IconButton icon="arrow-left" size={28} onPress={() => navigation.goBack()} style={styles.backButton} />

                        <Text style={styles.text}>{t('register.welcome')}</Text>

                        <Text style={styles.text2}>{t('register.emailLabel')}</Text>
                        <TextInput
                            mode='outlined'
                            label={t('register.emailLabel')}
                            style={styles.input}
                            outlineColor="#26A69A"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={styles.text2}>{t('register.nameLabel')}</Text>
                        <TextInput
                            mode='outlined'
                            label={t('register.nameLabel')}
                            style={styles.input}
                            outlineColor="#26A69A"
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.text2}>{t('register.passwordLabel')}</Text>
                        <TextInput
                            label={t('register.passwordLabel')}
                            mode="outlined"
                            style={styles.input}
                            outlineColor="#26A69A"
                            secureTextEntry={!visible}
                            value={password}
                            onChangeText={setPassword}
                            right={
                                <TextInput.Icon
                                    icon={visible ? "eye-off" : "eye"}
                                    onPress={() => setVisible(!visible)}
                                />
                            }
                        />

                        <Text style={styles.text2}>{t('register.confirmPasswordLabel')}</Text>
                        <TextInput
                            label={t('register.confirmPasswordLabel')}
                            mode="outlined"
                            style={styles.input}
                            outlineColor={passwordsMatch ? "#26A69A" : "#D32F2F"}
                            secureTextEntry={!visibleConfirm}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            right={
                                <TextInput.Icon
                                    icon={visibleConfirm ? "eye-off" : "eye"}
                                    onPress={() => setVisibleConfirm(!visibleConfirm)}
                                />
                            }
                        />
                        {!passwordsMatch && (
                            <Text style={{ color: '#D32F2F', marginBottom: 10, marginLeft: 45, alignSelf: 'flex-start' }}>
                                {t('register.passwordMismatch')}
                            </Text>
                        )}

                        <Button
                            mode='contained'
                            style={styles.button}
                            labelStyle={{ fontSize: 18 }}
                            onPress={handleRegister}
                        >
                            {t('register.registerButton')}
                        </Button>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default RegisterSC;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
    },
    text: {
        fontSize: 50,
        color: '#000000ff',
        alignContent: 'center',
        marginTop: 80,
    },
    text2: {
        fontSize: 20,
        color: '#000000ff',
        textAlign: 'left',
        marginBottom: 10,
        marginTop: 25,
        alignSelf: 'flex-start',
        marginLeft: 45,
    },
    button: {
        width: 300,
        height: 43,
        marginBottom: 30,
        marginTop: 30,
    },
    input: {
        backgroundColor: '#fff',
        activeOutlineColor: '#1976D2',
        width: 300,
        height: 60,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'transparent',
    },
});
