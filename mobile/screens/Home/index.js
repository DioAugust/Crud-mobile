// React import
import { TouchableOpacity, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-elements'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
// Componentes
import { Entypo, AntDesign } from '@expo/vector-icons'
import axios from 'axios'
// Styles
import { styles } from './styles'


export function Home({ navigation, route }) {

  // Botar o seu na hora de rodar
  const enderecoLocal = '192.168.1.6'
  
  const refresh = useIsFocused()

  useEffect(() => {
    function listarProdutos() {
      axios.get(`http://${enderecoLocal}:3000/produtos`)
        .then(function (response) {
          setLista(response.data);
        }).catch(function (error) {
          console.log(error);
        });
    }
    listarProdutos()
  }, [refresh])

  const [lista, setLista] = useState([]);
  const [Email, setEmail] = useState()

  useEffect(() => {
    if (route.params) {
      const { email } = route.params

      setEmail(email)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Entypo
            name="chevron-thin-left"
            size={25}
            color={'black'}
          />
        </TouchableOpacity>
        <Text style={styles.texto}>
          Lista de produtos
        </Text>

        <TouchableOpacity onPress={() => { navigation.navigate('CadastroProdutos') }}>
          <AntDesign
            name="plus"
            size={25}
            color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate('Perfil', {
          email: Email
        }) }}>
          <AntDesign
            name="user"
            size={25}
            color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        {
          lista.map((l, i) => (
            <TouchableOpacity key={i} onPress={() => navigation.navigate('AlterarProduto',
              {
                nome: l.nome,
                armazenamento: l.armazenamento,
                valor: l.valor,
                id: l.id,
                foto: l.foto
              }
            )}>
              <Card >
                <Card.Divider />
                <Card.Image
                  style={styles.image}
                  source={{
                    uri:
                      `${l.foto}`,
                  }}
                />
                <View>
                  <Text><Card.Title>Produto: </Card.Title>{l.nome}</Text>
                  <Text><Card.Title>Armazenamento: </Card.Title>{l.armazenamento}gb</Text>
                  <Text><Card.Title>Valor: R${l.valor}</Card.Title> </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}