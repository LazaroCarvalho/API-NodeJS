const router = require('express').Router();
const authCtrl = require('../controllers/autenticacao');
const UsuarioValidator = require('../validators/Usuario');

router.post('/registrar', UsuarioValidator.validacoes(), authCtrl.registra);
router.post('/autenticar', authCtrl.autentica);

module.exports = router; 