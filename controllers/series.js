const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
series = (app) => {

    app.use((req, res, next) => {
        const authHeader = req.headers.authorization;

        if(!authHeader)
            res.status(401).send({erro : "Token não encontrado"});

        const parts = authHeader.split(' ');

        if(!parts.length == 2)
            return res.status(401).send({erro : "Token mal formatado"});

        const [ bearer, token ] = parts;

        jwt.verify(token, authConfig.secret, (erro, user) => {

            if(erro) return res.status(401).send({erro : "token inválido"})

            req.userId = user.id

            return next();

        });

    });

    app.get('/series', (req, res) => {
        
        var seriesDao = app.models.Series

        seriesDao.lista()
        .then(resultado => {
            res.send(resultado);
        })
        .catch(erro => {
            console.log('Erro ao consultar: ' + erro);
            res.status(500).send(erro);
        });

    });

    app.get('/series/:id', (req, res) => {
        const seriesDao = app.models.Series;
        const id = req.params.id;

        seriesDao.buscaPorId(id)
            .then(serie => {
                if(!serie){
                    res.status(404).send({"erro" : "Série não encontrada"});
                    return
                }
                else
                    res.send(serie);
                
            })
            .catch(erro => {
                console.log('Erro ao buscar serie');
                res.status(500).send({"erro" : "erro ao buscar"});
            })

    });

    app.post('/series', (req, res) => {
        const seriesDao = app.models.Series;

        let serie = req.body;

        seriesDao.insere(serie)
        .then(resultado => {
            const insertedId = resultado.insertId;
            serie = {"id" : insertedId, ...serie}
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
        serie.id = id;

        seriesDao = app.models.Series;

        seriesDao.atualiza(serie)
        .then(retorno => {
            if(!retorno.affectedRows){
                res.status(404).send({"erro" : "Série não encontrada"});
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
                if(!resposta.affectedRows){
                    res.status(404).send({"erro" : "série não encontrada"});
                    return
                }
                res.status(204).send("Registro deletado com sucesso!");
            })
            .catch(erro => {
                console.log("Erro");
                res.status(500).send({"erro" : "Erro ao remover"});
            });
        
    });

}

module.exports = series;