// Importando arquivos
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const app = express();

// Inclui alterações e dependências em app
const customExpress = () => {

    app.use(bodyParser.json());

    consign()
    .include('controllers')
    .include('models')
    .into(app);

    return app;

}

module.exports = customExpress();