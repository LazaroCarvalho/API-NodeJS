const baseQuery = require('./baseQuery');

class Generos {

    listar() {
        return baseQuery('SELECT * FROM generos');
    }

    listarById(id) {
        return baseQuery('SELECT * FROM generos WHERE id = ?', id)
    }

}

module.exports = Generos