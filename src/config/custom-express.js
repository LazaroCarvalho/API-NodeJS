const express = require ('express');
const app = express();
const consign = require ('consign');
const bodyParser = require('body-parser')

const customExpress = () => {

    app.use(bodyParser.json());

    app.use((req, res, next) => {
        const authHeader = req.headers.authorization;

        if(!authHeader)
            return res.status(401).send({erro: 'Token não encontrado'})

        const parts = authHeader.split('')

        if(!parts.lenght === 2)
            return res.status(401).send({erro: 'Token mal formatado'})

        const [ bearer, token] = parts;

        jwt.verify(token, authConfig.secret, (erro, user) => {
            if(erro)
                return res.status(401).send({erro: 'Token invalido'})
            req.userId = user.id;

            return next()
        })
    })


    consign()
    .include('controllers')
    .include('models')
    .into(app);

    return app;
}

module.exports = customExpress();