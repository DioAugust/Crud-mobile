// React import
import { View, Text, TouchableOpacity, Vibration, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { showMessage } from "react-native-flash-message";
import { useEffect, useState } from 'react';
// Componentes
import { Entypo } from '@expo/vector-icons'
import axios from 'axios';
// Styles
import { styles } from './styles';
import { useColorScheme } from 'react-native';

export function AlterarProduto({ navigation, route }) {

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


  const [getNome, setNome] = useState()
  const [getArmazenamento, setArmazenamento] = useState()
  const [getValor, setValor] = useState()
  const [getFoto, setFoto] = useState()
  const [getId, setId] = useState()

  useEffect(() => {
    if (route.params) {
      const { nome } = route.params
      const { armazenamento } = route.params
      const { valor } = route.params
      const { foto } = route.params
      const { id } = route.params

      setNome(nome)
      setArmazenamento(armazenamento)
      setValor(valor)
      setId(id)
      setFoto(foto)
    }
  }, [])

  function alterarDados() {
    axios.put(`http://${enderecoLocal}:3000/produtos/` + getId, {
      nome: getNome,
      armazenamento: getArmazenamento,
      valor: getValor,
      foto: getFoto
    }).then(function (response) {
      showMessage({
        message: "Produto alterado com sucesso!",
        type: "success",
        position: "center"
      });
      navigation.navigate('Home')
    }).catch(function (error) {
      showMessage({
        message: "Não foi possível alterar o produto",
        type: "danger",
        position: "center"
      });
      Vibration.vibrate()
      console.log(error);
    })
  }


  function excluirDados() {
    axios.delete(`http://${enderecoLocal}:3000/produtos/` + getId)
      .then(function (response) {
        setNome(null)
        setArmazenamento(null)
        setValor(null)
        setId(null)
        setFoto(null)

        showMessage({
          message: "Produto excluido com sucesso!",
          type: "success",
          position: "center"
        });
        navigation.navigate('Home')
        Vibration.vibrate()
      }).catch(function (error) {
        showMessage({
          message: "Não foi possível excluir o produto",
          type: "danger",
          position: "center"
        });
        Vibration.vibrate()
        console.log(error);
      });
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
          Alterar produto
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
          placeholder="Capacidade (Gb)"
          placeholderTextColor="#bdb7af"
          keyboardType="numeric"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          onChangeText={(texto) => setArmazenamento(texto)}
          value={getArmazenamento} />

        <TextInput
          placeholder="Preço (R$)"
          placeholderTextColor="#bdb7af"
          keyboardType="numeric"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          onChangeText={(texto) => setValor(texto)}
          value={getValor} />

        <TextInput
          placeholder="Foto (Url)"
          placeholderTextColor="#bdb7af"
          style={[styles.caixa, {
            borderBottomColor: textColor,
            color: textColor
          }]}
          onChangeText={(texto) => setFoto(texto)}
          value={getFoto} />

        <TouchableOpacity
          style={[styles.botao,
          {
            borderWidth: 0.5,
            borderColor: textColor,
            color: textColor
          }]}
          onPress={() => alterarDados()}>

          <Text style={styles.textBotao}>
            Alterar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: `#c20036` }]}
          onPress={() => excluirDados()}>

          <Text style={styles.textBotao}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}