// React import
import { View, Text, TouchableOpacity, Vibration, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { showMessage } from "react-native-flash-message";
import { useState, useEffect } from 'react';
import { Avatar } from 'react-native-elements'
// Componentes
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'
// Style import
import { styles } from './styles';


export function Perfil({ navigation, route }) {

  // Botar o seu na hora de rodar
  const enderecoLocal = '192.168.1.8'

  const [Email, setEmail] = useState()
  const [Nome, setNome] = useState()
  const [Id, setId] = useState()

  const image_url = { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC52Ojk0Y6DHZh-C0-BZSRznWqPCBv4YGzOWcUCWrWK14rav99njKGf3dXuFGqu5HlP9E&usqp=CAU" }

  useEffect(() => {
    if (route.params != null) {
      setId(route.params.id)
    }
  })

  async function novoUser() {
    if (Email == null || Nome == null) {
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
          Perfil
        </Text>
      </View>

      <View style={styles.dados}>
        <TouchableOpacity>
          <Avatar
            size={150}
            rounded
            source={image_url}
          />
        </TouchableOpacity>

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

        <TouchableOpacity
          style={styles.botao}
          onPress={() => novoUser()}>
          <Text style={styles.textBotao}>
            Atualizar
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}