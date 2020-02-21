const { validationResult } = require('express-validator');
const usuarioDao = new (require('../models/Usuarios'))();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');

const gerarToken = params => {

    return jwt.sign(params, authConfig.secret, {
        "expiresIn" : 3600
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
          
            let usuario = await usuarioDao.buscaPorEmail(email)
            usuario = usuario[0]
            // console.log(usuario)
            if(!usuario)
                return res.status(400).send({erro : "Usuario não cadastrado"})

            if(!await bcrypt.compare(senha, usuario.senha))
                return res.status(400).send({erro : "Senha incorreta"});

            res.send({
                usuario,
                token: gerarToken({id : usuario.id})
            });
        }catch(erro) {
            res.status(500).send(erro);
            console.log(erro)
        }
    }

}