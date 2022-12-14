// React import
import { View, Text, TouchableOpacity, Vibration, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { showMessage } from "react-native-flash-message";
import { useEffect, useState } from 'react';
// Componentes
import { Entypo } from '@expo/vector-icons'
import axios from 'axios';

import { styles } from './styles';
import { useColorScheme } from 'react-native';

export function CadastroProdutos({ navigation }) {

  // Botar o seu na hora de rodar
  const enderecoLocal = '192.168.1.6'

  const [getNome, setNome] = useState()
  const [getArmazenamento, setArmazenamento] = useState()
  const [getValor, setValor] = useState()
  const [getFoto, setFoto] = useState()

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


  async function inserirDados() {
    if (getNome == null || getArmazenamento == null || getValor == null || getFoto == null) {
      showMessage({
        message: "Preencha os campos!",
        type: "danger",
        position: "center"
      });
      Vibration.vibrate()
      return
    }

    await axios.post(`http://${enderecoLocal}:3000/produtos/cadastro`, {
      nome: getNome,
      armazenamento: getArmazenamento,
      valor: getValor,
      foto: getFoto
    }).then(function (response) {
      showMessage({
        message: "Produto cadastrado com sucesso!",
        type: "success",
        position: "center"
      });
      setNome(null)
      setArmazenamento(null)
      setValor(null)
      setFoto(null)
    }).catch(function (error) {
      showMessage({
        message: "Não foi possível cadastrar o produto",
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
            color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.texto, { color: textColor }]}>
          Cadastro de produto
        </Text>
      </View>

      <View style={styles.dados}>

        <TextInput
          placeholder="Produto"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          onChangeText={(texto) => setNome(texto)}
          value={getNome} />

        <TextInput
          placeholder="Capacidade"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          keyboardType="numeric"
          onChangeText={(texto) => setArmazenamento(texto)}
          value={getArmazenamento} />

        <TextInput
          placeholder="Preço (R$)"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          keyboardType="numeric"
          onChangeText={(texto) => setValor(texto)}
          value={getValor} />

        <TextInput
          placeholder="Foto (url)"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          onChangeText={(texto) => setFoto(texto)}
          value={getFoto} />

        <TouchableOpacity
          style={[styles.botao, {backgroundColor: `#c20036`}]}
          onPress={() => inserirDados()}>

          <Text style={styles.textBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}