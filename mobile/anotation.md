# Tópicos 

- React Native
- Expo
- Typescript
- Splash Screen
- Fonts (Google Fonts)
- Native Base
- SVG
- Contexto Autenticação
-- Context API
- Autenticação (Google)


# REACT NATIVE 
 - Desenvolver aplicações Android e iOS usando React;
 - Criar Aplicações Nativas;
 - Renderiza atraves de interfaces declarativas;
 - Renderiza utilizando os componentes nativos do dispositivo;

 - RN utiliza componentes pré-criados, como Text, View, FlatList, StatusBar etc;
 - Não é permitido utilizar HTML no RN;
 - Estilos: Densidade de Pixels, não é utilizado px, em, rem etc...;
 - SVG: RN por padrão não consegue lidar com SVG's sendo necessário utilziar algumas libs para manipila-los;

 - Configuração Adicional:
  -- Em package.json | "overrides": { "react: "18.0.0" }
 
# EXPO
 - Descrição: Tecnologia que facilita o desenvolvimento com o RN trazendo consigo inúmeras configurações já prontas;
 - Instalação: npm i -g expo-cli / npx create-expo-app web;

 - Expo permite automatizar o processo de instalação de diversas libs quando necessárias;
 - Comando: expo install <nome_da_lib> | instala e já configura em código nativo a lib para utilização;

 - Material Complementar contendo o passo a passo para realizar as configurações básicas do Expo:
 -- Link: https://react-native.rocketseat.dev/

# Typescript
 - Criar um arquivo tsconfig.json;
 - Renomear os arquivos .js => .ts | .jsx => .tsx;

# Splash Screen
 - Configuração: 
 -- Cor de fundo;
 -- resizeMode: "cover";

# Fonts (Google Fonts)
 Instalação: npx expo install expo-font @expo-google-fonts/roboto
 Utilização: const [fontsloaded] = useFonts({nome_das_fontes})

# Native Base 
 - Component library;
 - Biblioteca que possui inúmeros componentes já prontos para serem utilizados;
 - As propriedades dos componentes são os estilos CSS;

 - Instalação: npx install native-base
 -- SVG: npx expo install react-native-svg@12.1.1
 -- Safe Area: npx expo install react-native-safe-area-context@3.3.2

 - Configurar Tema da Aplicação
 -- Criar um arquivo theme.ts em src/styles;
 -- Este será o nosso token da aplicação e iremos sobrescrever o theme padrão do Native Base com o método extendTheme;

 - StatusBar:
 -- Costumizando: exportar a StatusBar;

 - Icon:
 -- Utilizar a tag Icon do Native base para renderizar os icones do @expo-vector-icons;

# SVG
 - Além de ter instalado a lig react-native-svg, é necessário instalar a lib: react-native-svg-transformer;
 -- Instalação: expo install react-native-svg-transformer -D;
 -- Criar um arquivo chamado metro.config.js na raiz do projeto e copiar o código que há na documentação da Lib;
 -- Criar uma pasta @types e copiar o código na documentação para que o typescript permita utilizar o SVG como um componente;

# Contexto Autenticação
 - Compartilhar o estado se o usuário está LOGADO ou NÃO;
 - Contextos são utilizados quando há a necessidade de compartilhar informações para diferentes partes da aplicação (diferentes componentes utilizam a mesma informação);
 - Exemplos: Context API / Redux / Recoil;
 
## Context API
- Criar uma pasta "contexts" na pasta "src";
- Para o contexto de autenticação, criar um arquivo chamado AuthContext.tsx;
- Importar a context API;
- Criar o Contexto e o Provider no arquivo de autenticação;
- Envolver o Provider por toda a aplicação ou parte da aplicação no qual irá usufruir das infomações do contexto de autenticação;
- Opcionalmente mas recomendado, criar um hook personalizado para cada contexto criado, no caso, useAuth numa pasta "src/hooks";

# Autenticação (Google)
- Conceito de OAuth;
- OAuth = Protocolo de Autenticação (Mais completo e seguro existente);
- FLUXO:
-- 1. Registrar o APP no identificador (cadastrar o APP no provider no caso, a Google);
-- 2. A Função SignIn acionar o provider da Google, no qual será aberto a página de autenticação da Google, e o APP ficará em segundo plano;
-- 3. Após preencher os dados, a API do Google irá validar os dados e retornar um token em caso de sucesso;
-- 4. Com o token (Chave) em mãos, a aplicação deve redirecionar o usuário de volta a aplicação (Deep Link);
-- 5. Com o token, o usuário irá usufruir das informações de seu perfil;
-- 6. O Token então, será enviado para o Back-end, no qual irá tratar essa informação e buscar as informações deste usuário;

- Configuração:
-- Instalação: npx expo install expo-auth-session expo-random;
-- Instalação: npx expo install expo-web-browser | Processo de abrir o browser e retornar para a aplicação;

-- Seguir a configuração do AuthSession na documentação;
-- Seguir a configuração do acesso e registro da aplicação no console Google;
--- Configurar tela de consentimento E credenciais;
--- Método de autenticação (ID), selecionar escopo, e inserir as URI conforme a documentação do Expo Auth Google;
-- Após realizar as configurações, será gerado uma chave de acesso e um ID Client;
-- A Chave de acesso deve ser armanzenada em um local seguro, logo deve ser utilizada dentro um arquivo .env por questões de segurança;

- Arquivo: AuthContext.tsx;
-- promptAsync: responsável por disparar a autenticação;

- Como descobrir as URI:
-- Importar em qualquer arquivo, o expo-auth-session;
-- utilizar no console.log o comando -> AuthSession.makeRedirectUri({ useProxy: true });
-- Este comando irá lhe trazer a URI que deve ser configurado no Console da Google;
-- Lembrar deestar logado no Expo-CLI;
-- Comando: npx expo whoami | Traz a conta logada atualmente;

