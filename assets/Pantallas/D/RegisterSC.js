import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../Resources/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function RegisterSC() {
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
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }

        try {
            // 1️⃣ Crear usuario
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2️⃣ Enviar email de verificación
            await sendEmailVerification(user);

            // 3️⃣ Guardar nombre y correo en Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
            });

            // 4️⃣ Alerta de éxito
            Alert.alert(
                "Registro exitoso",
                "Tu cuenta ha sido creada correctamente. Revisa tu correo para verificar tu cuenta.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ],
                { cancelable: false }
            );

        } catch (error) {
            let mensaje = "";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    mensaje = "El correo ya está registrado";
                    break;
                case 'auth/invalid-email':
                    mensaje = "Correo electrónico inválido";
                    break;
                case 'auth/weak-password':
                    mensaje = "La contraseña debe tener al menos 6 caracteres";
                    break;
                case 'auth/missing-password':
                    mensaje = "Ingresa una contraseña";
                    break;
                default:
                    mensaje = error.message;
            }
            Alert.alert("Error", mensaje);
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

                        <Text style={styles.text}>¡Bienvenido!</Text>

                        <Text style={styles.text2}>Correo Electrónico</Text>
                        <TextInput
                            mode='outlined'
                            label="Correo Electrónico"
                            style={styles.input}
                            outlineColor="#26A69A"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={styles.text2}>Nombre</Text>
                        <TextInput
                            mode='outlined'
                            label="Nombre"
                            style={styles.input}
                            outlineColor="#26A69A"
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.text2}>Contraseña</Text>
                        <TextInput
                            label="Contraseña"
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

                        <Text style={styles.text2}>Confirmar Contraseña</Text>
                        <TextInput
                            label="Confirmar Contraseña"
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
                                Las contraseñas no coinciden
                            </Text>
                        )}

                        <Button
                            mode='contained'
                            style={styles.button}
                            labelStyle={{ fontSize: 18 }}
                            onPress={handleRegister}
                        >
                            Registrarse
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