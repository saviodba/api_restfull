# Sistema de Gerenciamento de Filmes

Este sistema utiliza uma API em Express para gerenciar filmes armazenados em um banco de dados SQLite. A aplicação permite importar um arquivo CSV com uma lista de filmes e fornece uma documentação interativa via Swagger.

## Dependências Utilizadas

1. **Express**: Framework para criação da API e definição das rotas.
2. **Jest**: Framework de testes para garantir o funcionamento da aplicação.
3. **Swagger**: Utilizado para gerar a documentação interativa da API.
4. **SQLite**: Banco de dados baseado em arquivos para armazenar as informações dos filmes.

## Instalação e Execução

### Pré-requisitos

Antes de executar a aplicação, é necessário configurar o arquivo `.env` na pasta raiz da aplicação com as seguintes variáveis de ambiente:

```bash
PORT=3000
FILE_PATH="./files/Movielist.csv"
FILE_DB_PATH="./db/movies.db"

***PORT:*** Define a porta em que a aplicação será executada. O valor padrão é 3000, mas pode ser alterado para qualquer outra porta disponível.

***FILE_PATH:*** Caminho para o arquivo CSV contendo a lista de filmes. Este arquivo deve ser nomeado como Movielist.csv e estar presente na pasta indicada.

***FILE_DB_PATH:*** Caminho onde o banco de dados SQLite será criado. O sistema criará automaticamente o banco de dados nesta pasta, se necessário.


### Passos para Instalação

1. Clone o repositório em seu ambiente local.
2. Instale as dependências com o seguinte comando:

**npm install**

3. Compile o código com o comando:

**npm run build**

4. Inicie a aplicação:

**npm start**

A aplicação estará acessível na URL http://localhost:3000, com a documentação da API disponível em http://localhost:3000/docs.


### Testes
Para executar os testes de integração, execute o seguinte comando:

npm run test
O projeto já inclui um mock na pasta src/infrastructure/database para facilitar os testes.