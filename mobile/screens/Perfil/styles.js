import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: 'space-between'
  },
  dados: {
    marginTop: 180,
    backgroundColor: 'lightgray',
    height: 500,
    width: 350,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 30,
  },
  texto: {
    fontSize: 25,
    marginRight: 150
  }, 
  caixa: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 5,
    height: 35,
    borderColor: 'black', 
    borderWidth: 1, 
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
  },
  botao: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 30,
    width: 300,
    marginTop: 20,
    backgroundColor: '#3693ff'
  },
  textBotao: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  }
});