const router = require('express').Router();
const generosCtrl = require('../controllers/generos');

router.get('/', generosCtrl.listar)

module.exports = router;

