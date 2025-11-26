import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, Alert } from 'react-native';
import { Button, TextInput, IconButton, Portal, Dialog } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../Resources/firebaseConfig';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Resources/ThemeProvider';


function LogginSC() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [resetDialogVisible, setResetDialogVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const navigation = useNavigation();
    const { theme, isDarkTheme } = useTheme();
    const colors = theme.colors;



    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(t('loginScreen.alert.error'), t('loginScreen.alert.emptyFields'));
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await user.reload();

            if (!user.emailVerified) {
                await sendEmailVerification(user);
                Alert.alert(
                    t('loginScreen.alert.emailNotVerifiedTitle'),
                    t('loginScreen.alert.emailNotVerifiedMessage')
                );
                return;
            }

            Keyboard.dismiss();
            setTimeout(() => {
                Alert.alert(
                    t('loginScreen.alert.welcomeTitle'),
                    t('loginScreen.alert.welcomeMessage'),
                    [
                        {
                            text: t('loginScreen.alert.continue'),
                            onPress: () => navigation.reset({
                                index: 0,
                                routes: [{ name: 'Main' }],
                            })
                        }
                    ],
                    { cancelable: false }
                );
            }, 50);

        } catch (error) {
            let mensaje = "";
            switch (error.code) {
                case 'auth/invalid-email':
                    mensaje = t('loginScreen.alert.invalidEmail');
                    break;
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    mensaje = t('loginScreen.alert.wrongCredentials');
                    break;
                default:
                    mensaje = t('loginScreen.alert.otherError');
            }
            Alert.alert(t('loginScreen.alert.error'), mensaje);
        }
    };

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetDialogVisible(false);
            Alert.alert(
                t('loginScreen.alert.success'),
                t('loginScreen.alert.resetEmailGeneric')
            );
            setResetEmail('');
        } catch (error) {
            setResetDialogVisible(false);
            Alert.alert(
                t('loginScreen.alert.success'),
                t('loginScreen.alert.resetEmailGeneric')
            );
            setResetEmail('');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, { backgroundColor: '#fff' }]}>
                <IconButton icon="arrow-left" size={28} onPress={() => navigation.goBack()} style={styles.backButton} />
                <Text style={styles.text}>{t('loginScreen.welcome')}</Text>

                <Text style={styles.text2}>{t('loginScreen.emailLabel')}</Text>
                <TextInput
                    mode='outlined'
                    label={t('loginScreen.emailLabel')}
                    style={styles.input}
                    outlineColor="#26A69A"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.text2}>{t('loginScreen.passwordLabel')}</Text>
                <TextInput
                    label={t('loginScreen.passwordLabel')}
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

                <Button
                    mode="text"
                    onPress={() => setResetDialogVisible(true)}
                    style={{ alignSelf: 'flex-end', marginRight: 45, marginTop: 5 }}
                >
                    {t('loginScreen.forgotPassword')}
                </Button>

                <Button
                    mode='contained'
                    style={styles.button}
                    labelStyle={{ fontSize: 18 }}
                    onPress={handleLogin}
                >
                    {t('loginScreen.loginButton')}
                </Button>

                <Portal>
                    <Dialog visible={resetDialogVisible} onDismiss={() => setResetDialogVisible(false)}
                        style={{ backgroundColor: colors.surface }}>
                        <Dialog.Title>{t('loginScreen.forgotPassword')}</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label={t('loginScreen.emailLabel')}
                                mode="outlined"
                                value={resetEmail}
                                onChangeText={setResetEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                outlineColor="#26A69A"
                                style={{ backgroundColor: '#fff' }}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setResetDialogVisible(false)}>{t('loginScreen.cancel')}</Button>
                            <Button onPress={handleResetPassword}>{t('loginScreen.send')}</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default LogginSC;

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
        marginTop: 180,
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
