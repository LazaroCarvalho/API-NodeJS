const express = require('express');
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');

const customExpress = () => {

    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    // Injeção de dependências no app.
    consign()
    .include('controllers')
    .include('models')
    .into(app);

    return app;

}

module.exports = customExpress();

