const baseQuery = require('./baseQuery');


class Usuarios{
    insere(usuario){
        return baseQuery('insert into usuarios set ?', usuario)
    }

    buscarPorEmail(email){
        return baseQuery('select * from usuarios where email = ?', email)
    } 
}

module.exports = Usuarios;