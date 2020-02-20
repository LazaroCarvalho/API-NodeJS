const baseQuery = require("./baseQuery");

class Usuarios {

    insere(usuario) {

        return baseQuery("INSERT INTO usuarios SET ?", usuario)

    }

    buscaPorEmail(email) {
        console.log('chegou o emal' + email)
        return baseQuery("SELECT * FROM usuarios WHERE email = ?", email)

    }

}

module.exports = Usuarios;