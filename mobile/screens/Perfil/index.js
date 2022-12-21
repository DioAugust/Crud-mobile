// React import
import { View, Text, TouchableOpacity, Vibration, TextInput, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { showMessage } from "react-native-flash-message";
import { useState, useEffect } from 'react';
import { Avatar } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'
// Componentes
import { Entypo } from '@expo/vector-icons'
import axios from 'axios'
// Style import
import { styles } from './styles';


export function Perfil({ navigation, route }) {

  // Botar o seu na hora de rodar
  const enderecoLocal = '192.168.1.6'

  const refresh = useIsFocused()

  const [Email, setEmail] = useState()
  const [Foto, setFoto] = useState()
  const [Nome, setNome] = useState()

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

  const image_url = { uri: Foto }

  useEffect(() => {
    function getUser(valor) {
      console.log(Email)
      axios.get(`http://${enderecoLocal}:3000/usuario/` + valor)
        .then((response) => {
          setNome(response.data[0].nome)
          setFoto(response.data[0].foto)
        }).catch((error) => {
          console.log(error)
        })
    }

    if (route.params) {
      const { email } = route.params

      setEmail(email)
      getUser(email)
    }

  }, [refresh])

  async function alterarUser() {
    if (Email == null || Foto == null || Nome == null) {
      showMessage({
        message: "Preencha os campos!",
        type: "danger",
        position: "center"
      });
      Vibration.vibrate()
      return
    }
    await axios.put(`http://${enderecoLocal}:3000/usuario/atualizar`, {
      email: Email,
      foto: Foto,
      nome: Nome
    })
      .then(function (response) {
        showMessage({
          message: "Usuario atualizado",
          type: "success",
          position: "center"
        });
        navigation.navigate('Home')
      }).catch(function (error) {
        showMessage({
          message: "Não foi possivel alterar os dados",
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

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, { color: textColor, borderBottomColor: textColor }]}
          onChangeText={(texto) => setNome(texto)}
          value={Nome} />

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#bdb7af"
          keyboardType="email-address"
          style={[styles.caixa, { color: textColor, borderBottomColor: textColor }]}
          onChangeText={(texto) => setEmail(texto)}
          value={Email} />

        <TextInput
          placeholder="Foto"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, { color: textColor, borderBottomColor: textColor }]}
          onChangeText={(texto) => setFoto(texto)}
          value={Foto} />

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: `#c20036` }]}
          onPress={() => alterarUser()}>
          <Text style={styles.textBotao}>
            Atualizar
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}