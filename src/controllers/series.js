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
        const serie = req.body;

        try {
            const resultado = await seriesDao.insere(serie);
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
            const serie = await serieDAO.buscaPorId(id);

            if(!serie)
                return res.status(404).send({"Erro" : "Série não encontrada"});

            res.status(201).send(serie);
        } catch(erro) {
            res.status(500).send(erro);
        }

    },

    async atualiza(req, res) {
        try {
            const id = req.params.id;
            const serie = req.body;
            serie.id = id;

            const retorno = await seriesDao.atualiza(serie);

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

        const retorno = await serieDAO.delete(id);

        if(!retorno.affectedRows)
            return res.status(404).send({"erro" : "Série não encontrada"});

        res.status(204).send({"Erro" : "Erro ao deletar"});
    }

}