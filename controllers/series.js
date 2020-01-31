const jwt = require("jsonwebtoken")
const authConfig = require('../config/auth')
series = (app)=>{

    app.use((req,res,next)=>{
        
        const authHeader = req.headers.Authorization;
        
        if(!authHeader)
          return  res.status(401).send({erro:"Token não encontrado"})

        const parts = authHeader.split(' ');
        
        if(!parts.length === 2)
            return res.status(401).send({erro:'token mal formatado'});
        //recuperando beares e token de parts
        const [bearer, token] = parts;
        
        jwt.verify(token,authConfig.secret, (erro,user)=>{
            if(erro){
                return res.status(401).send({erro:"token inavalido"})
            }else{
                req.userId = user.id;

                return next()
            }
        })
    })

    //Criando a roda /series
    app.get('/series',(req,res)=>{
        var seriesDao = app.models.Series;
        seriesDao.lista().then(resultado => {
            res.send(resultado)
        }).catch(erro =>{
            console.log('Erro ao consultar' + erro)
            res.status(500).send('erro')
        })
    })

    app.post('/series', (req,res)=>{
        const seriesDao = app.models.Series;
        let serie =   req.body;

        seriesDao.insere(serie).
        then(resultado=>{
            const insertId = resultado.insertId;
            serie = { id:insertId, ...serie};
            res.status(201).send(serie)
        }).catch(erro => {res.status(500).send(erro)})
    })


    app.get('/series/:id', (req,res)=>{
        const id = req.params.id;

        const seriesDao = app.models.Series;

        seriesDao.buscaPorId(id).then(serie=>{
            if(!serie){
                res.status(404).send();
            }else{
                res.send(serie);
            }
        }).catch(erro =>{
            console.log('erro ao bucsar serie')
            res.status(500).send({erro:'erro ao buscar'})
        })

    })

    app.delete('/series/:id', (req,res)=>{
        const id = req.params.id;

        const seriesDao = app.models.Series;

        seriesDao.delete(id).then(serie => {
            if(!serie.affectedRows){
                res.status(404).send({'erro':'serie nao encontrada'})
                return
            }
            res.status(204).send('ok')
        }).catch(erro => {
            res.status(500).send({erro:'erro ao deletar'})
        })
    })

    app.put('/series/:id',(req,res)=>{
        const id = req.params.id;
        const serie = req.body;
        serie.id = id;

        var seriesDao = app.models.Series;

        seriesDao.atualiza(serie)
        .then(retorno=>{
            if(!retorno.affectedRows){
                res.status(404).send({erro:'serie nao encontrada'});

                return
            }
                res.status(200).send('Serie alterada com sucesso' + serie);
            
        }).catch(erro=>res.status(500).send(erro))
    })

    
}

module.exports = series;
