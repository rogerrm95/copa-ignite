# Tópicos 

- React Native
- Expo
- Typescript
- Splash Screen
- Fonts (Google Fonts)
- Native Base

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
