# Aula 1 - Iniciando o Projeto de ponta a ponta 

## Fastify: 
 - Microframework que auxilia a lidar com os roteamentos na aplicação; (Express JS)
 -- Tecnologia nova; 
 -- Configurar a lib;

 - Instalação:
 -- Lib: npm i fastify -D;
 -- Cors: npm i @fastify/cors | Mecanismo de segurança que permitir definir que tipo de aplicação estão aptas a consumir dados do nosso back-end;

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

  - Migration: Mecanismo de versionamento de BD;

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

# Dicas

 - 1: Nunca salvar valores monetários em float / decimal, mas sim multiplica por 100 e salva como priceInCents, mesma coisa com dados do tipo Time (salvando em segundos ou minutes);
 - 2: Salvar as datas sempre no modo timestamp "2022-11-02 18:00:00" | new Date().toISOString();
 - 3: Biblioteca Short Unique ID (UUID) - Geração de ID's únicos | Instalação: npm i short-unique-id;