// React import
import { TouchableOpacity, View, Text, useColorScheme } from 'react-native'
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
    <SafeAreaView style={[styles.container, {backgroundColor: backColor}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Entypo
            name="chevron-thin-left"
            size={25}
            color={textColor}
          />
        </TouchableOpacity>
        <Text style={[styles.texto, {color: textColor}]}>
          Lista de produtos
        </Text>

        <TouchableOpacity onPress={() => { navigation.navigate('CadastroProdutos') }}>
          <AntDesign
            name="plus"
            size={25}
            color={textColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate('Perfil', {
          email: Email
        }) }}>
          <AntDesign
            name="user"
            size={25}
            color={textColor}/>
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
              <Card  theme={{backgroundColor: backColor}}>
                <Card.Divider />
                <Card.Image
                  style={styles.image}
                  source={{
                    uri:
                      `${l.foto}`,
                  }}
                />
                <View >
                  <Text style={{color: textColor}}><Card.Title style={{color: textColor}}>Produto: </Card.Title>{l.nome}</Text>
                  <Text style={{color: textColor}}><Card.Title style={{color: textColor}}>Armazenamento: </Card.Title>{l.armazenamento}gb</Text>
                  <Text ><Card.Title style={{color: textColor}}>Valor: R${l.valor}</Card.Title> </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}