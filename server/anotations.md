# Anotações 

## Fastify: 
 - Microframework que auxilia a lidar com os roteamentos na aplicação; (Express JS)
 -- Tecnologia nova; 
 -- Configurar a lib;

 - Instalação:
 -- Lib: npm i fastify -D;
 -- Cors: npm i @fastify/cors | Mecanismo de segurança que permitir definir que tipo de aplicação estão aptas a consumir dados do nosso back-end;

 - Separando as rotas por arquivos;
 - Plugins (fastify) === Middleware (express);
 - Singleton: Pattern - Reaproveitar uma informação ao inves de recria-la;

## Prisma:
  - Realizar a comunicação com o banco de dados;
  - Realizar as querys;
  - Banco de Dados: SQLITE;
  - ORM;

  - Instalação:
  -- npm i prisma -D | Interface de linha de comando;
  -- npm i @prisma/client | Pacote utilizado para conecta com o BD na aplicação;

  - Comandos:
  -- npx prisma init --datasource-provider SQLite | o padrão é PostgreSQL
  -- npx prisma studio | Dashboard do BD no browser;

  - Criar Tabela (arquivo schema.prisma):
  -- Cada tabela é chamada de Model;
  -- Chave Primária: id String @id @default(cuid());
  
  -- Chave Única: em Guess: participantId, gameId
  --- Usuário não pode enviar mais de 1 palpite para o mesmo jogo no mesmo bolão;
  --- Adicionar no model Guess 

  - Migration: Mecanismo de versionamento de BD;
  - Adicionar ou alterar um campo no BD:
  -- 1. npx prisma migrate dev;
  -- 2. nome da alteração realizada (Ex: add google id to users);

  - Configurar o Prisma Client (server.ts);
  -- log: ['query'] -> Cada query irá gerar um log no terminal;
  
  - Métodos do prisma nas tabelas: count, findMany, delete etc...

  - RELACIONAMENTOS:
  - Criando relacionamentos:
  -- Na tabela desejada, escrever o nome do campo e a tabela no qual deseja se relacionar
  -- Ex: game Game | após escrever o comando no model Guess, basta realizar a formatação automática que o prisma criará o relacionamento;
  -- Observação 1: as colunas no BD serão sempre aquelas que possuem o tipo de dado após o nome da variável;
  -- Observação 2: utilizar nomes dos campos que sejam fácieis de se dar manutenção;

  - SEED:
  - Arquivo que pré popula o BD com dados fictícios (Ambiente de Desenvolvimento);
  - Arquivo: criar o arquivo "seed.ts" na pasta prisma;
  - Alimentar o arquivo seed.ts com os dados fictícios utilizando o prisma;
  - Criar no package.json uma propridade "prisma": {"seed": "tsx prisma/seed.ts"}
  -- Comando: npx prisma db seed | Popular o Banco de Dados com os dados ficticios criado no arquivo seed.ts;

## Schema Validation - ZOD
 - Instalação: npm i zod;
 - Biblioteca de validação de dados;


## Diagrama ERD (Prisma)
 - Diagrama de Entidade de Relacionamentos
 - Instalação: npm i prisma-erd-generator @mermaid-js/mermaid-cli -D
 -- Mermaid: Lib para geração de Diagramas através de código;

 - Configuração:
 -- Criar um generator "erd" (schema.prisma);
 -- Comando: npx prisma generate;

# Design de Software
 - Banco de Dados;
 -- Criando as demais tabelas da aplicação: Participant, User, Game, Guess;
 -- Relacionamento de Muitos pra Muitos (Tabela Pivô - Participant);

## Anotações Gerias 
 - Node não suporta typescript, logo há necessidade de converter o código para javascript;
 -- Typescript: npx tsc | Cria um arquivo .js do nosso código
 -- Dependência: npm i tsx -D | TSX = Automatiza o processo de compilar o codigo e executar;
 -- Script: Adicionar no package.json -> "dev": "tsx watch src/server.ts";

## JWT (JSON WEB TOKEN)
 - Token / Hash
 - Gerado por diversos tipos de algoritmos;
 - Ideia: Criamos dentro do back-end, possui data de validade, back-end devolve o token para o front, o front realiza o armazenamento deste token em algum lugar (storage, cookie por exemplo), e este token será enviado para toda e quaisquer requisição ao back-end após o login, desta forma será possivel validar se o usuário está ou não logado/autenticado;
 
 - A estrutura do JWT possui 3 partes:
 -- 1. Tipo do algoritmo utilizado;
 -- 2. Payload - Conteúdo;
 -- 3. Chave / Segredo - Informação que apenas o back-end possui;

  -- Stateless: Termo utilizado para dizer que token não precisa ser armazenado em nenhum lugar, logo o token possui uma assinatura (chave), através dela, o back-end saberá se o token é válido ou não;

  - Instalação: npm i @fastify/jwt | Módulo para trabalhar com o JWT;
  
  - Caso haja a necessesidade de manter o usuário logado após o token expirar, deve ser implementado a técnica de REFRESH TOKEN;
  -- Estudar possível implementação - Conteúdo complementar;
  -- Jamais colocar uma expiração alta no token;

  - VALIDAR O JWT
  - Criar uma rota para validação do token em auth;
  - Criar um plugin (middleware) para veriricar a validade do token, caso o token não seja validado a requisição não continuará;
  - Isto impede que um usuário não autenticado tenha acesso a aplicação ou parte da aplicação na qual somente usuários autenticados tenham permissão de acessar;

# Typescript
 - Arquivos com a extensão "**.d.ts": Arquivo que irá conter apenas definições de tipos do typescript;
 - Não possui código Javascript;
 - No projeto: Criar uma pasta "@types" em "src";
 - Criar um arquivo "fastify-jwt.d.ts", para definir os tipos de dados provenientes dos Tokens;  

# Dicas
 - 1: Nunca salvar valores monetários em float / decimal, mas sim multiplica por 100 e salva como priceInCents, mesma coisa com dados do tipo Time (salvando em segundos ou minutes);
 - 2: Salvar as datas sempre no modo timestamp "2022-11-02 18:00:00" | new Date().toISOString();
 - 3: Biblioteca Short Unique ID (UUID) - Geração de ID's únicos | Instalação: npm i short-unique-id;

# DESAFIOS - Versão 2.0
 - Refresh token;
 - Processo de Login na versão WEB;