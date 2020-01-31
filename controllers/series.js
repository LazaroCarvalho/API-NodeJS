const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

series = (app) => {

    app.use((req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            res.status(401).send({ erro: "Token não encontrado" });

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
            });

    });

    app.get('/series/:id', (req, res) => {
        const seriesDao = app.models.Series;
        const id = req.params.id;

        seriesDao.buscaPorId(id)
            .then(serie => {
                if (!serie) {
                    res.status(404).send({ "erro": "Série não encontrada" });
                    return
                }
                else
                    res.send(serie);

            })
            .catch(erro => {
                console.log('Erro ao buscar serie');
                res.status(500).send({ "erro": "erro ao buscar" });
            })
            .catch(erro => res.status(500).send({ "erro": "Erro ao buscar registo" }));

    });

    app.post('/series', (req, res) => {
        const seriesDao = app.models.Series;

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
        let serie = req.body;

        seriesDao.insere(serie)
            .then(resultado => {
                const insertedId = resultado.insertId;
                serie = { "id": insertedId, ...serie }
                res.send(serie)
            })
            .catch(erro => {
                console.log("erro ao inserir");
                res.status(500).send(erro);
            });

    });

    app.put('/series/:id', (req, res) => {

        const id = req.params.id;
        const serie = req.body;

        seriesDAO.edita(serie)
            .then(resposta => res.status(204).send({ "Sucesso": "Série alterada com sucesso!" }))
            .catch(erro => res.status(500).send({ "erro": "Erro ao cadastrar série" }));
        serie.id = id;

        seriesDao = app.models.Series;

        seriesDao.atualiza(serie)
            .then(retorno => {
                if (!retorno.affectedRows) {
                    res.status(404).send({ "erro": "Série não encontrada" });
                    return
                }
                res.send(serie);
            })
            .catch(erro => {
                res.status(500).send(erro);
            });

    });

    app.delete('/series/:id', (req, res) => {

        const seriesDao = app.models.Series;
        const id = req.params.id;

        seriesDao.delete(id)
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