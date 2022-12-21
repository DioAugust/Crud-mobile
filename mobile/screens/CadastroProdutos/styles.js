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
    marginTop: 20,
    justifyContent: 'space-between'
  },
  dados: {
    marginTop: 180
  },
  texto: {
    fontSize: 25,
    marginRight: 50
  },
  caixa: {
    width: 300,
    color: 'white',
    borderRadius: 5,
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 18,
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
  },
  botao: {
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    width: 300,
    marginTop: 20,
  },
  textBotao: {
    textAlign: 'center',
    fontSize: 20,
    color: '#e8e6e3',
  }
});