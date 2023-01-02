# Trybe Futebol Clube

Trybe Futebol Clube é uma aplicação Full Stack que permite ao usuário ter acesso a um informativo sobre partidas e classificações de futebol. Ao realizar login na aplicação, o usuário, além de visualizar as informações, também poderá alterar resultados das partidas e inserir partidas que estão em andamento.

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos técnicos necessários para a entrega do desafio.

---

# Habilidades desenvolvidas

Neste projeto, fui capaz de:

- Utilizar TypeScript;
- Utilizar os princípios do POO para criar uma estrutura de um campeonato de futebol;
- Utilizar os princípios da arquitetura SOLID para organizar o projeto e deixá-lo com uma manutenibilidade muito maior;
- Construir um backend dockerizado utilizando modelagem de dados através do ORM Sequelize;
- CRUD para criação, leitura, atualização e/ou remoção de usuários, times, partidas e tabela (placar do campeonato);
- Organização do código respeitando também o modelo MSC (Model-Service-Controller), de forma a dividir a responsabilidade do código e das funções/métodos de acordo com suas propostas;
- Construção de testes de integração utilizando **Mocha**, **Chai** e **Sinon**.

---

# Funcionamento da aplicação

Para rodar está aplicação é necessário ter **Git**, **Docker**, **Node** e o **Docker Compose** instalados no seu computador. O Docker Compose precisa estar na versão **1.29** ou superior e o Node na versão **16**.

### 1 - Clone o repositório e entre na pasta do projeto

```
git clone git@github.com:GJMKauer/trybe-futebol-clube.git && cd trybe-futebol-clube
```

### 2 - Execute o comando para criação dos containers do Docker

```
npm run compose:up
```

### 3 - Acesse a aplicação no seu navegador pelo link

http://localhost:3000/

### 4 - Utilize uma das credenciais abaixo para logar na aplicação e testar

#### Administrador

* email: admin@admin.com
* password: secret_admin

#### Usuário comum

* email: user@user.com
* password: secret_user

O projeto trata-se de um desafio para consolidar todo o aprendizado até então em backend. Sendo o projeto mais desafiador da Trybe até o momento, tivemos que utilizar todos os conceitos ensinados e praticados desde então - utilização de HOFs, CRUD, Sequelize, manipulação do banco de dados, criação e validação de tokens JWT para login/cadastro de usuários, validação/criptografia de senhas com o BCrypt e muito mais.

Com isso, o projeto trata-se de um sistema de gerenciamento de campeonato do *Trybe Futebol Clube* (vide nome do projeto). Nele, é possível realizar login como um usuário comum ou como um administrador; visualizar partidas em andamento e já finalizadas; alterar o placar das partidas em andamento; finalizar partidas em andamento; adicionar novas partidas e visualizar o placar geral do campeonato.

A parte do frontend da aplicação já veio pronta pela Trybe. No entanto, todo o Backend e validações foram realizadas por mim. Além de tudo isso, implementei testes de integração que garantem o funcionamento do código.

---

# Cobertura de testes da aplicação

Execute o comando abaixo no diretório raíz do projeto para verificar a cobertura de testes.

```
cd app/backend/ && npm install && npm run test:coverage
```

---

## 📚 Documentação (endpoints)

### 🔑 Login
| Método | Funcionalidade                          | URL                         |
| ------ | --------------------------------------- | --------------------------- |
| `POST` | Realiza o login no Backend da aplicação | http://localhost:3001/login |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>All fields must be filled</code> caso o campo email não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>All fields must be filled</code> caso o campo email não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>Incorrect email or password</code> caso o campo email seja inválido no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>Incorrect email or password</code> caso o campo password seja inválido no body da requisição;<br>
</details>
<br>
<br>

| Método | Funcionalidade                         | URL                                  |
| ------ | -------------------------------------- | ------------------------------------ |
| `GET`  | Valida o login no Backend da aplicação | http://localhost:3001/login/validate |

Essa requisição deve, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido após realizar o login).

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{ "role": "admin" }
```

</details>
<br>

### 🫂 Teams
| Método | Funcionalidade                          | URL                         |
| ------ | --------------------------------------- | --------------------------- |
| `GET`  | Retorna uma lista dos times cadastrados | http://localhost:3001/teams |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  // ...
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                                    | URL                             |
| ------ | ----------------------------------------------------------------- | ------------------------------- |
| `GET`  | Retorna um time no banco de dados (substitua `:id` por um número) | http://localhost:3001/teams/:id |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  // ...
]
```

</details>
<br>

### ⚽ Matches
| Método | Funcionalidade                             | URL                           |
| ------ | ------------------------------------------ | ----------------------------- |
| `GET`  | Retorna uma lista das partidas cadastradas | http://localhost:3001/matches |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  // ...
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                              | URL                                           |
| ------ | ------------------------------------------- | --------------------------------------------- |
| `GET`  | Retorna uma lista das partidas em andamento | http://localhost:3001/matches?inProgress=true |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                             | URL                                            |
| ------ | ------------------------------------------ | ---------------------------------------------- |
| `GET`  | Retorna uma lista das partidas finalizadas | http://localhost:3001/matches?inProgress=false |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                      | URL                           |
| ------ | --------------------------------------------------- | ----------------------------- |
| `POST` | Adiciona uma partida em andamento ao banco de dados | http://localhost:3001/matches |

Essa requisição deve, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido após realizar o login).

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true 
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>

```json
{
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>401</code>, com a mensagem <code>It is not possible to create a match with two equal teams</code> caso informe o mesmo valor para ambos os campos homeTeam e awayTeam body da requisição;<br>
  - A rota retorna o código <code>404</code>, com a mensagem <code>There is no team with such id!</code> caso informe um id de time inválido no body da requisição;<br>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token must be a valid token</code> caso informe um token de autenticação inválido no campo authorization dos headers da requisição;<br>
</details>

<br>
<br>

| Método  | Funcionalidade                                                            | URL                                      |
| ------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| `PATCH` | Finaliza uma partida que está em andamento (substitua `id` por um número) | http://localhost:3001/matches/:id/finish |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{ "message": "Finished" }
```

</details>
<br>
<br>

| Método  | Funcionalidade                                                                               | URL                               |
| ------- | -------------------------------------------------------------------------------------------- | --------------------------------- |
| `PATCH` | Altera os dados de uma partida em andamento no banco de dados (substitua `id` por um número) | http://localhost:3001/matches/:id |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 3,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": true,
}
```

</details>
<br>

### 🏆 Leaderboards
| Método | Funcionalidade                                 | URL                               |
| ------ | ---------------------------------------------- | --------------------------------- |
| `GET`  | Retorna o placar geral do campeonato, ordenado | http://localhost:3001/leaderboard |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  // ...
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 12,
    "goalsBalance": -9,
    "efficiency": "13.33"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                               | URL                                    |
| ------ | ------------------------------------------------------------ | -------------------------------------- |
| `GET`  | Retorna o placar dos `jogos da casa` do campeonato, ordenado | http://localhost:3001/leaderboard/home |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  // ...
  {
    "name": "Bahia",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 0,
    "goalsOwn": 4,
    "goalsBalance": -4,
    "efficiency": "0.00"
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                                    | URL                                    |
| ------ | ----------------------------------------------------------------- | -------------------------------------- |
| `GET`  | Retorna o placar dos `jogos fora de casa` do campeonato, ordenado | http://localhost:3001/leaderboard/away |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  // ...
  {
    "name": "Napoli-SC",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 1,
    "goalsOwn": 10,
    "goalsBalance": -9,
    "efficiency": "0.00"
  }
]
```

</details>

---

# Requisitos técnicos do desafio:

- ✅ 1. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela users.

- ✅ 2. Desenvolva testes que cubram no mínimo 5% dos arquivos back-end em /src, com um mínimo de 7 linhas cobertas.

- ✅ 3. Desenvolva o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end.

- ✅ 4. Desenvolva testes que cubram no mínimo 10% dos arquivos back-end em /src, com um mínimo de 19 linhas cobertas.

- ✅ 5. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar um email no front-end.

- ✅ 6. Desenvolva testes que cubram no mínimo 15% dos arquivos back-end em /src, com um mínimo de 25 linhas cobertas.

- ✅ 7. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso sem informar uma senha no front-end.

- ✅ 8. Desenvolva testes que cubram no mínimo 20% dos arquivos back-end em /src, com um mínimo de 35 linhas cobertas.

- ✅ 9. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com um email inválido no front-end.

- ✅ 10. Desenvolva testes que cubram no mínimo 30% dos arquivos back-end em /src, com um mínimo de 45 linhas cobertas.

- ✅ 11. Desenvolva o endpoint /login no back-end de maneira que ele não permita o acesso com uma senha inválida no front-end.

- ✅ 12. Desenvolva o endpoint /login/validate no back-end de maneira que ele retorne os dados corretamente no front-end.

- ✅ 13. Desenvolva testes que cubram no mínimo 45% dos arquivos back-end em /src, com um mínimo de 70 linhas cobertas.

- ✅ 14. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de teams.

- ✅ 15. Desenvolva o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente.

- ✅ 16. Desenvolva o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico.

- ✅ 17. Desenvolva testes que cubram no mínimo 60% dos arquivos back-end em /src, com um mínimo de 80 linhas cobertas.

- ✅ 18. Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matches.

- ✅ 19. Desenvolva o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end..

- ✅ 20. Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end.

- ✅ 21. Desenvolva o endpoint /matches de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end.

- ✅ 23. Desenvolva o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados.

- ✅ 24. Desenvolva o endpoint /matches/:id/finish de modo que seja possível alterar o status inProgress de uma partida para false no banco de dados.

- ✅ 25. Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com times iguais.

- ✅ 26. Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida com um time que não existe na tabela teams.

- ✅ 27. Desenvolva o endpoint /matches de forma que não seja possível inserir uma partida sem um token válido.

- ✅ 28. Desenvolva o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento.

- ✅ 29. Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados.

- ✅ 30. Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.

- ✅ 31. Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados.

- ✅ 32. Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional.

- ✅ 33. Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados.

- ✅ 34. Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC.

- ✅ 35. Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Minas Brasília 1 X 0 Ferroviária.

# REQUISITOS BÔNUS

- ✅ 22. Desenvolva testes que cubram no mínimo 80% dos arquivos back-end em /src, com um mínimo de 100 linhas cobertas.
