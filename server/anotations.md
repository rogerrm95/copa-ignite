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


## Diagrama ERD (Prisma)
 - Diagrama de Entidade de Relacionamentos
 - Instalação: npm i prisma-erd-generator @mermaid-js/mermaid-cli -D
 -- Mermaid: Lib para geração de Diagramas através de código;

 - Configuração:
 -- Criar um generator "erd" (schema.prisma);
 -- Comando: npx prisma generate;

## Anotações Gerias 
 - Node não suporta typescript, logo há necessidade de converter o código para javascript;
 -- Typescript: npx tsc | Cria um arquivo .js do nosso código
 -- Dependência: npm i tsx -D | TSX = Automatiza o processo de compilar o codigo e executar;
 -- Script: Adicionar no package.json -> "dev": "tsx watch src/server.ts";