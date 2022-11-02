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
