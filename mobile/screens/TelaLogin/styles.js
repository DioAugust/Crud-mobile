import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      caixa: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 5,
        height: 35,
        borderColor: 'black', 
        borderWidth: 1, 
        marginBottom: 10
      },
      text: {
        fontSize: 25,
        marginBottom: 5
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