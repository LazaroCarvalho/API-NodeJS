const series = (app) => {

    app.get('/series', (req, res) => {

        const seriesDAO = app.models.Series;

        seriesDAO.lista()
            .then(resposta => {
                res.status(200).send(resposta);
            })
            .catch(erro => {
                res.status(500).send({ "erro": "Erro ao buscar registros" });
            });

    });

    app.get('/series/:id', (req, res) => {

        const idSerie = req.params.id;
        const seriesDAO = app.models.Series;

        seriesDAO.listaPorId(idSerie)
            .then(resposta => {

                if (resposta[0]) res.status(200).send(resposta)
                else res.status(404).send({ "alerta": "A série não foi encontrada!" })

            })
            .catch(erro => res.status(500).send({ "erro": "Erro ao buscar registo" }));

    });

    app.post('/series', (req, res) => {

        const seriesDAO = app.models.Series;
        const serie = req.body.body;

        console.log(req.body);

        seriesDAO.insere(serie)
            .then(resposta => {
                res.send({
                    "id": resposta.insertId,
                    serie
                });
            })
            .catch(erro => {
                res.status(500).send(erro);
            });

    });

    app.patch('/series', (req, res) => {

        const seriesDAO = app.models.Series;
        const serie = req.body;

        seriesDAO.edita(serie)
            .then(resposta => res.status(204).send({ "Sucesso": "Série alterada com sucesso!" }))
            .catch(erro => res.status(500).send({ "erro": "Erro ao cadastrar série" }));

    });

    app.delete('/series/:id', (req, res) => {

        const seriesDAO = app.models.Series;
        const id = req.params.id;

        seriesDAO.deleta(id)
            .then(resposta => {

                if (resposta.affectedRows)
                    res.status(204).send({ "INFO": "Registro excluido com sucesso" })
                else
                    res.status(202).send({ "INFO": "Registro não encontrado" })

            })
            .catch(erro => res.status(500).send({ "erro": "Erro ao excluir série" }));

    });

}

module.exports = series;