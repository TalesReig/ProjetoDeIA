<div align="center">
  <img width="100" height="100" src="https://storeassure.net/wp-content/uploads/2022/11/StoreAssure_Icon_2c_large.png">
  <br>
  <br>

  [![npm][npm]][npm-url]

  [![node][node]][node-url]

  <br>

  <h1>Projeto IA</h1>
  <p>
    Usando Webpack com TypeScript.
  </p>

  <br>
  <p>Utiliza TypeScript e css como linguagem de programação e folha de estilos respectivamente.</p>
</div>



<h2 align="center">Setup</h2>

Na pasta do projeto, instale as dependências:

```bash
npm install

npm install webpack webpack-cli --save-dev
```

<h2 align="center">Como executar</h2>

Servidor de desenvolvimento webpack:

```bash
npm run start
```

Build da aplicação com webpack:

```bash
npm run build
```

<h2 align="center">Gerência de Recursos</h2>

Este projeto inclui configuração do webpack para servir imagens e fontes a partir da pasta src/assets.

Você pode acessar estas mídias nos arquivos HTML utilizando o atalho /assets/{nome-do-arquivo}

```html
<img src="/assets/favicon.svg">
```

[npm]: https://img.shields.io/npm/v/webpack.svg
[npm-url]: https://npmjs.com/package/webpack
[node]: https://img.shields.io/node/v/webpack.svg
[node-url]: https://nodejs.org