const generosDAO = new (require('../models/Generos'))();

module.exports = {

    async listar(req, res) {

        try {
            const generos = await generosDAO.listar();

            if(!generos)
                return res.status(404).send({"Erro" : "Nenhum gênero foi encontrado!"})
            
            if(generos.length == 1)
                res.status(200).send(generos[0])

            res.status(200).send(generos)
        } catch(erro) {
            res.status(500).send(erro)
        }

    }

}