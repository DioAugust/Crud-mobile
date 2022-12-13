// React import
import { View, Text, TouchableOpacity, Vibration, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { showMessage } from "react-native-flash-message";
import { useState } from 'react';
// Componentes
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'
// Style import
import { styles } from './styles';


export function Cadastro({ navigation }) {

  // Botar o seu na hora de rodar
  const enderecoLocal = '192.168.1.8'

  const [Email, setEmail] = useState()
  const [Senha, setSenha] = useState()
  const [Nome, setNome] = useState()

  async function novoUser() {
    if (Email == null || Senha == null || Nome == null) {
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
      nome: Nome
    })
      .then(function (response) {
        showMessage({
          message: "Login criado!",
          type: "success",
          position: "center"
        });
        navigation.navigate('TelaLogin')
        console.log(response)
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Entypo
            name="chevron-thin-left"
            size={25}
            color={'black'}
          />
        </TouchableOpacity>
        <Text style={styles.texto}>
          Cadastro de usuario
        </Text>
      </View>

      <View style={styles.dados}>

        <Text style={styles.text}>Nome</Text>
        <TextInput
          style={styles.caixa}
          onChangeText={(texto) => setNome(texto)}
          value={Nome} />

        <Text style={styles.text}>Email</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.caixa}
          onChangeText={(texto) => setEmail(texto)}
          value={Email} />

        <Text style={styles.text}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.caixa}
          onChangeText={(texto) => setSenha(texto)}
          value={Senha} />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => novoUser()}>
          <Text style={styles.textBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}