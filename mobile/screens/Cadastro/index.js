// React import
import { View, Text, TouchableOpacity, Vibration, TextInput, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { showMessage } from "react-native-flash-message";
import { useEffect, useState } from 'react';
// Componentes
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'
// Style import
import { styles } from './styles';


export function Cadastro({ navigation }) {

  // Botar o seu na hora de rodar
  const enderecoLocal = '192.168.1.6'

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

  const [Email, setEmail] = useState()
  const [Senha, setSenha] = useState()
  const [Nome, setNome] = useState()
  const [Foto, setFoto] = useState()


  async function novoUser() {
    if (Email == null || Senha == null || Nome == null || Foto == null) {
      showMessage({
        message: "Preencha os campos!",
        type: "danger",
        position: "center"
      });
      Vibration.vibrate()
      return
    }
    await axios.post(`http://${enderecoLocal}:3000/usuarios/cadastro`, {
      email: Email,
      senha: Senha,
      nome: Nome,
      foto: Foto
    })
      .then(function (response) {
        showMessage({
          message: "Login criado!",
          type: "success",
          position: "center"
        });
        navigation.navigate('TelaLogin')
      }).catch(function (error) {
        showMessage({
          message: "Não foi possivel criar o login",
          type: "danger",
          position: "center"
        });
        Vibration.vibrate()
        console.log(error)
      })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: backColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Entypo
            name="chevron-thin-left"
            size={25}
            color={textColor}
          />
        </TouchableOpacity>
        <Text style={[styles.texto, { color: textColor }]}>
          Cadastro de usuario
        </Text>
      </View>

      <View style={styles.dados}>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          onChangeText={(texto) => setNome(texto)}
          value={Nome} />

        <TextInput
          placeholder="Email"
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
          secureTextEntry={true}
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          onChangeText={(texto) => setSenha(texto)}
          value={Senha} />

        <TextInput
          placeholder="Foto (url)"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          onChangeText={(texto) => setFoto(texto)}
          value={Foto} />

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#c20036' }]}
          onPress={() => novoUser()}>
          <Text style={styles.textBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}