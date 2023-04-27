# Tecnologias

As seguinte tecnologias foram usadas para construir esse projeto:<br>

<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white'>
  <img alt="mui" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img style='margin: 5px;' src='https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white'>
</p>

# Pré-requisitos
- Node
- postgreSQL

# Endpoints
- **POST /signUp** Cria um novo usuário. Também pode criar um administrador se na hora da criação receber os campos name e password com os valores especificados no arquivo .env
- **POST /login** Criar uma sessão para um usuário.
- **DELETE /logout** Deleta uma sessão do usuário.
- **PUT /user/refresh** Atualiza o token de uma sessão.

- **POST /products** Cria um novo produto.
- **GET /products** Recebe todos os produtos avisando se cada produto está ou não no carrinhode um determinado usuário.
- **GET /products/filters?alphabeticalOrder** Recebe todos os produtos em ordem alfabética.
- **GET /products/filters?category=CategoriaEscolhica** Recebe todos os produtos de uma categoria escolhida.
- **GET /products/filters?start=ValorInicial** Recebe todos os produtos com preço a partir do valor incial.
- **GET /products/filters?start=ValorInicial&end=ValorFinal** Recebe todos os produtos com preço entre valor inicial e final.
- **PUT /product/update** Atualiza todas as propriedade de um produto.
- **PATCH /product/update** Pode atualiza todas as propriedade de um produto menos a imagem.

- **POST /shopping** Cria um compra.
- **GET /shopping/user** Recebe todas as compras de um usuário.
- **DELETE /shopping** Deleta uma compra.
- **PATCH /shopping/quantity** Atualiza a quantidade de produtos que foram comprados.
- **PATCH /shopping/finish** Atualiza a propriedade finished de um compra para true.

# Como rodar

### 1- Clone esse repositório

```
git clone https://github.com/AntonioGMN/tegrafood-front.git
```

### 2- Clone o back-end desse repositório

```
https://github.com/AntonioGMN/tegrafood-back.git
```

### 3- Crie um arquivo .env com:

```
NODE_ENV=prod

POSTGRES_USER=usuario do seu postgress
POSTGRES_PASSWORD=senha para do seu postgress
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=nome que quiser para o banco

DATABASE_URL=postgres://usuario do seu postgress:senha para do seu postgress@localhost:5432/nome que quiser para o banco

JWT_SECRET=superSenha
ADM_SECRET=souAdm

PORT=5000

```

### 4. Instale as dependências com:

```bash
npm i
```

### 5. Crie o banco:

```bash
npm run setupDB
```

### 6. Popule o banco:

```bash
npm run seed
```

### 7. Rode com:

```bash
npm run dev
```

# Testes

### 1- Crie um arquivo .env.test seguindo o exemplo abaixo:

```
NODE_ENV=prod

POSTGRES_USER=usuario do seu postgress
POSTGRES_PASSWORD=senha para do seu postgress
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=nome que quiser para o banco

DATABASE_URL=postgres://usuario do seu postgress:senha para do seu postgress@localhost:5432/nome que quiser para o banco

JWT_SECRET=superSenha
ADM_SECRET=souAdm

PORT=5000
```

### 2- Crie o banco de teste com:

```
npm run test:setupDB
```

### 3- Execute os testes com:

```
npm run test
```

#Docker

### 1- Crie um arquivo .docker.env seguindo o exemplo abaixo:

```
NODE_ENV=prod

POSTGRES_USER=usuario do seu postgress
POSTGRES_PASSWORD=senha para do seu postgress
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=nome que quiser para o banco

DATABASE_URL=postgres://usuario do seu postgress:senha para do seu postgress@db:5432/nome que quiser para o banco

JWT_SECRET=superSenha
ADM_SECRET=souAdm

PORT=5000
```

### 2- Exercute:

```
docker-compose up
```

