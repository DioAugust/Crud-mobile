// Componentes
import { Icon } from '@rneui/base';
import axios from 'axios';
// React import
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TextInput, TouchableOpacity, Vibration, View, Image } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { useState } from 'react';
// Styles import
import { styles } from './styles';


export function TelaLogin({ navigation }) {
    // Botar o seu na hora de rodar
    const enderecoLocal = '192.168.1.6'

    const [Email, setEmail] = useState()
    const [Senha, setSenha] = useState()

    async function validarLogin() {
        // Validar campos
        if (Email == null || Senha == null) {
            showMessage({
                message: "Preencha os campos!",
                type: "danger",
                position: "center"
            });
            Vibration.vibrate()
            return
        }

        await axios.post(`http://${enderecoLocal}:3000/usuarios/login`, {
            email: Email,
            senha: Senha
        }).then(function (response) {
            showMessage({
                message: "Login feito!",
                type: "success",
                position: "center"
            });
            navigation.navigate('Home', {
                email: Email
            })
            setEmail(null)
            setSenha(null)

        }).catch(function (error) {
            showMessage({
                message: "Login ou senha incorretos!",
                type: "danger",
                position: "center"
            });
            Vibration.vibrate()
            console.log(error)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image 
                    style={styles.logo}
                    source={{
                        uri: 'https://github.com/DioAugust/Crud-mobile/blob/master/mobile/assets/logo.png',
                        }}/>
                <Icon
                    color="red"
                    name="account-circle"
                    size={170}
                    type="material" />

                <Text style={styles.text}>Email</Text>
                <TextInput
                    keyboardType="email-address"
                    style={styles.caixa}
                    onChangeText={(texto) => setEmail(texto)}
                    value={Email} />

                <Text style={styles.text}>Senha</Text>
                <TextInput
                    style={styles.caixa}
                    secureTextEntry={true}
                    onChangeText={(texto) => setSenha(texto)}
                    value={Senha} />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => validarLogin()}>
                    <Text style={styles.textBotao}>
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botao, { backgroundColor: `red` }]}
                    onPress={() => { navigation.navigate('Cadastro') }}>
                    <Text style={styles.textBotao}>
                        Cadastro
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}