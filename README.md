
# Documentação do backend

## Primeiro passo acessar a pasta 'backend' e instalar as dependências
``` Npm install ```

## Após instalar as dependências criar o arquivo ".env" e preencher com seus dados no padrão mostrado
``` PORT=3000 
    DB_PORT=3306
    DB_USER="root"
    DB_PASSWORD="senha"
    DB="banco que esta usando"
    DB_HOST="localhost" 
```

## Rodar o script de criação do banco de dados no sgbd que você usa
``` scriptBD.sql ```


# Documentação do mobile

## Primeiro passo acessar a pasta 'mobile' e instalar as dependências
``` Npm install ```

## Mude a variavel "enderecoLocal" nos arquivos Home, Cadastro, AlterarProduto, CadastroProdutos e TelaLogin com seu endereço local como no exemplo
``` const enderecoLocal = '192.168.1.8' ```

## Após isso rode o comando 
``` Expo start ```