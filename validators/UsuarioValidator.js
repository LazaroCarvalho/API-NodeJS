const { check, body } = require('express-validator');
const usuarioDao = require('../models/Usuarios');

class UsuarioValidator {

    static validacoes() {

        return [

            check('nome').isLength({ min : 3, max : 50})
                .withMessage('Deve ter entre 3 e 50 caracteres'),

            check('email').isLength({ min : 3, max : 50})
                .withMessage('Deve ser um e-mail válido'),

            check('senha').isLength({ min : 3, max : 50})
                .withMessage('A senha deve ter entre 8 e 15 caracteres'),

            body('email').custom(email => {
                return usuarioDao.buscarPorEmail(email)
                            .then(usuario => {
                                if(usuario[0]) 
                                    return Promise.reject("Email já está em uso");
                            });
            })
             
        ]

    }

}

module.exports = UsuarioValidator;