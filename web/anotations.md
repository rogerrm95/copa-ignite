# Tópicos

 - React JS;
 - Next JS;
 -

# React JS

 - Dependência "react-dom" permite o react funcionar na WEB;
 -- React Native: Dispositivos Móvies;
 -- React TV: Smart Tv's;
 -- React VR: Realidade Virtual;

 - JSX = Javascript + XML (HTML);
 - TSX = Typescript + JSX;
 
# Next JS
 
 - Framework para React JS, Next não substitui o React;

 - Criar Projeto: npx create-next-app@latest --use-npm;
 
 - Possui suporte ao SSR e SSG;
 - SSR 
 -- Server Side Rendering | Fornecer uma maneira de construir/renderizar a interface da aplicação porém pelo lado do servidor;
 -- Next trás consigo um pequeno servidor em node.js;
 -- Permite criar a interface da aplicação sem precisar carregar o javascript pelo browser, a página já vem carregada, caso o javascript esteja desabilitado, este fator facilita os motores de buscas encontrarem nossa aplicação;
 -- Função: getServerSideProps = async () => { return {props: {} } } | Estrutura Básica
 
 - File System Routing
 -- Cada arquivo dentro da pasta "pages" é uma Rota;

# Aplicação Web
- Criar pasta assets (Exportando os assets do Figma);

# Tailwind CSS
 - Instalação: npm install -D tailwindcss postcss autoprefixer;
 - Configuração: npx tailwindcss init -p;
 -- "Content": ['./src/**/*.tsx']
 -- Criar arquivo global.css e exportar os módulos do tailwind;

 -- Instalar a font Roboto, 400-500-700;
 -- Criar arquivo chamado _document.tsx e importar os componentes especificos do Next: HTML, Head, Main, Nextscript;
 -- Adicionar as fonts dentro da tag <Head></Head>;
 -- No tailwind.config.js adicionar a fonte Roboto em theme/extend;
 -- Configurar a cor de fundo no arquivo _document.tsx;
 -- Configurar as cores da aplicação;

# HTML / CSS
 - 1 Criando a estrutura HMTL (Puro);
 - 2 Aplicando os estilos com o Tailwind (CSS);
 - 2.1: Utilizando flex e grid na construção do layout;
 - 2.2: Aplicando Background image;
 - 3 Aplicando Javascript (Chamadas API);

 - No arquivo global.css: -webkit-font-smoothing: antialiased (Melhora a renderização das fonts no Chrome);

 # Javascript / API 
  - SSR - Server Side Rendering;
  - Utilizando Promise.all() para encadear as chamadas à API;
  -- Realizando chamada API para capturar a quantidade de bolões, palpites e usuários;
  -- Realizando a criação de um bolão | api.post('/pools', data);

 # DESAFIO
 - Implementar SSG - Static Side Generation;
 - Ler documentação sobre;
 - Observações:
 --  revalidate: 300 // Tempo para realizar uma nova atualização/chamada API em SEGUNDOS //