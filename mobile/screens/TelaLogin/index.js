// Componentes
import axios from 'axios';
// React import
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TextInput, TouchableOpacity, Vibration, View, Image, useColorScheme } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { useState, useEffect } from 'react';
// Styles import
import { styles } from './styles';


export function TelaLogin({ navigation }) {
    // Botar o seu na hora de rodar
    const enderecoLocal = '192.168.1.6'


    const [Email, setEmail] = useState()
    const [Senha, setSenha] = useState()


    const deviceColorScheme = useColorScheme();
    const [backColor, setBackColor] = useState('')
    const [textColor, setTextColor] = useState('')

    useEffect(() => {
        if (deviceColorScheme == 'dark') {
            setBackColor('#181a1b')
            setTextColor('#FFF')
        } else {
            setBackColor('#FFF')
            setTextColor('#000')
        }
    })



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
        <SafeAreaView style={[styles.container, { backgroundColor: backColor }]}>
            <View>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://images.vexels.com/media/users/3/207818/isolated/preview/df04bb2bfb541b8110f2c70ba7cfb164-silhueta-de-aguia-com-emblema-de-heraldica.png',
                    }} />

                <TextInput
                    placeholder="E-mail cadastrado"
                    placeholderTextColor="#bdb7af"
                    keyboardType="email-address"
                    style={[styles.caixa, {
                        borderBottomColor: textColor,
                        color: textColor
                    }]}
                    onChangeText={(texto) => setEmail(texto)}
                    value={Email} />

                <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#bdb7af"
                    style={[styles.caixa, {
                        borderBottomColor: textColor,
                        color: textColor
                    }]}
                    
                    secureTextEntry={true}
                    onChangeText={(texto) => setSenha(texto)}
                    value={Senha} />

                <TouchableOpacity
                    style={[styles.botao, {backgroundColor: `#c20036`}]}
                    onPress={() => validarLogin()}>
                    <Text style={[styles.textBotao]}>
                        LOG-IN
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botao,
                    {
                        borderWidth: 0.5,
                        borderColor: textColor,
                        color: textColor
                    }]}
                    onPress={() => { navigation.navigate('Cadastro') }}>
                    <Text style={[styles.textBotao, {color: textColor}]}>
                        CADASTRE-SE
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}