// Componentes
import FlashMessage from "react-native-flash-message";
import { TelaLogin } from './screens/TelaLogin';
import { Cadastro } from './screens/Cadastro';
import { AlterarProduto } from './screens/AlterarProduto';
import { CadastroProdutos } from './screens/CadastroProdutos';
import { Home } from './screens/Home';
// Rotas
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="TelaLogin"
      screenOptions={ {headerShown: false} }>
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="AlterarProduto" component={AlterarProduto} />
        <Stack.Screen name="CadastroProdutos" component={CadastroProdutos} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}