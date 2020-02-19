const { validationResult } = require('express-validator');
const usuarioDao = new (require('../models/Usuarios'))();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');

const gerarToken = params => {

    return jwt.sign(params, authConfig.secret, {
        "expiresIn" : 60
    });

}

module.exports = {

    async registra(req, res) {
        const erros = validationResult(req);

        if(!erros.isEmpty()) {
            res.status(400).send(erros)
            return
        }

        let usuario = req.body;

        try {
            usuario.senha = await bcrypt.hash(usuario.senha, 10);

            const resultado = await usuarioDao.insere(usuario);
            usuario = {"id" : resultado.insertId, ...usuario}

            return res.status(201).send({
                usuario,
                token: gerarToken({id : usuario.id})
            })
        } catch(erro) {
            res.status(500).send(erro);
        }
    },

    async autentica(req, res) {
        const { email, senha } = req.body;
        try {
            const usuario = await usuarioDao.buscaPorEmail(email)
            if(!usuario)
                return res.status(400).send({erro : "usuario não cadastrado"})

            if(!await bcrypt.compare(senha, usuario[0].senha))
                return res.status(400).send({erro : "Senha incorreta"});

            res.send({
                usuario,
                token: gerarToken({id : usuario.id})
            });
        }catch(erro) {
            res.status(500).send(erro);
        }
    }

}