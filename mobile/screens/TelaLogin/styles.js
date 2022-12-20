import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
      },
      logo: {
        width: 300,
        height: 300,
      }
});