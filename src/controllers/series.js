const serieDAO = new (require('../models/Series'))();

module.exports = {

    async lista(req, res) {
        try {
            const series = await serieDAO.lista();

            if(series) return res.send(series);

            return res.status(404).send({"Erro" : "Nenhuma série foi encontrada"});
        } catch(erro) {
            return res.status(500).send(erro);
        }

    },

    async insere(req, res) {
        let serie = req.body;
        console.log(req.body)
        try {
            const resultado = await serieDAO.insere(serie);
            const insertId = resultado.insertId;
            serie = {id : insertId, ...serie}

            return res.status(201).send(serie);
        } catch(erro) {
            return res.status(500).send(erro);
        }

    },

    async buscaPorId(req, res) {
        try {
            const id = req.params.id;
            let serie = await serieDAO.buscaPorId(id);
            serie = serie[0];

            if(!serie)
                return res.status(404).send({"Erro" : "Série não encontrada"});

            res.send(serie);
        } catch(erro) {
            res.status(500).send(erro);
        }

    },

    async atualiza(req, res) {
        try {
            const id = req.params.id;
            let serie = req.body;
            serie.id = id;

            const retorno = await serieDAO.atualiza(serie);

            if(!retorno.affectedRows){
                return res.status(404).send({"erro" : "Série não encontrada"});
            }

            res.send(serie);
        } catch(erro) {
            res.status(500).send(erro);
        }
    },

    async delete(req, res) {
        const id = req.params.id;

        const resposta = await serieDAO.delete(id);

        if(!resposta.affectedRows)
            return res.status(404).send({"Erro" : "Série não encontrada"})

        res.send(resposta);
    }

}