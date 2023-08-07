<h1 align="center">
  <img alt="fincheck" title="fincheck" src=".github/fincheck-logo.svg" width="220px">
</h1>

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- NestJS
- TypeScript
- Prisma

## 💻 Projeto

O Fincheck é uma plataforma simples e intuitiva para que você possa controlar suas finanças pessoais.

Neste repositório, há o código da API (BackEnd) do projeto Fincheck construido em **NestJS**. O projeto possui um sistema de autenticação com base em JWT, rotas privadas para o usuário autenticado acessar, criar ou editar suas contas, transações ou categorias.

Este projeto tem outra parte: o site ([FrontEnd](https://github.com/jotahdavid/fincheck)) que utiliza esta API em conjunto.

## 📥 Instalando o Projeto

### Programas necessários

- Git **(ou baixe o repositório como .zip)**
- Node **(preferência na versão v18.13.0 ou maior)**
- Docker

### Etapas

- Vá até a pasta do projeto `fincheck-api` e rode o comando `yarn` ou `npm install` para instalar as dependências do projeto;
- Crie o arquivo `.env` na raíz do projeto e adicione as variáveis necessárias como mostra o arquivo `.env.example`;
- Com as suas variáveis de ambiente configuradas e com o docker instalado, suba o container do banco de dados na sua máquina, usando o `docker-compose`, com o seguinte comando:
  ```bash
  docker compose up -d
  ```
- Agora precisaremos criar as tabelas do nosso banco de dados. Vamos utilizar as migrations geradas pelo prisma:
  ```bash
  npx prisma migrate dev
  ```
- Por fim, rode o projeto com o comando `yarn start` ou `npm start`;
