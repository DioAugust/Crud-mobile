// React import
import { View, Text, TouchableOpacity, Vibration, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { showMessage } from "react-native-flash-message";
import { useState } from 'react';
// Componentes
import { Entypo } from '@expo/vector-icons'
import axios from 'axios';

import { styles } from './styles';

export function CadastroProdutos({ navigation }) {

  // Botar o seu na hora de rodar
  const enderecoLocal = '192.168.1.6'

  const [getNome, setNome] = useState()
  const [getArmazenamento, setArmazenamento] = useState()
  const [getValor, setValor] = useState()
  const [getFoto, setFoto] = useState()


  async function inserirDados() {
    if (getNome == null || getArmazenamento == null || getValor == null) {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Entypo
            name="chevron-thin-left"
            size={25}
            color={'black'} />
        </TouchableOpacity>
        <Text style={styles.texto}>
          Cadastro de produto
        </Text>
      </View>

      <View style={styles.dados}>

        <Text style={styles.text}>Nome</Text>
        <TextInput
          style={styles.caixa}
          onChangeText={(texto) => setNome(texto)}
          value={getNome} />

        <Text style={styles.text}>Capacidade</Text>
        <TextInput
          style={styles.caixa}
          keyboardType="numeric"
          onChangeText={(texto) => setArmazenamento(texto)}
          value={getArmazenamento} />

        <Text style={styles.text}>Preço (R$)</Text>
        <TextInput
          style={styles.caixa}
          keyboardType="numeric"
          onChangeText={(texto) => setValor(texto)}
          value={getValor} />

        <Text style={styles.text}>Foto (url)</Text>
        <TextInput
          style={styles.caixa}
          onChangeText={(texto) => setFoto(texto)}
          value={getFoto} />

        <TouchableOpacity
          style={styles.botao}
          onPress={() => inserirDados()}>

          <Text style={styles.textBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}