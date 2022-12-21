import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 28,
    justifyContent: 'space-between'
  },
  dados: {
    marginTop: 150
  },
  texto: {
    fontSize: 25,
    marginRight: 85
  },
  caixa: {
    width: 300,
    color: 'white',
    borderRadius: 5,
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
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