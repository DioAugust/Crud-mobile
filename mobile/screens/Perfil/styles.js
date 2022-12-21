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
    height: 500,
    width: 350,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 30,
  },
  texto: {
    fontSize: 25,
    marginRight: 140
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
    fontSize: 30,
    color: 'white',
  }
});