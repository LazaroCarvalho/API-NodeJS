const conexao = require('../infra/conexao');

class Series {

    lista(){
        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM series";

            conexao.query(sql, (erro, retorno) => {

                if(erro) 
                    reject('Erro ao consultar: ' + erro);
                else {
                    console.log('Foi!');
                    resolve(retorno);
                }

            });

        });
    }

    insere(serie){
        return new Promise((resolve, reject) => {

            const sql = "INSERT INTO series SET ?";

            conexao.query(sql, serie, (erro, retorno) => {

                if(erro)
                    reject("Erro ao inserir: " + erro)
                else
                    resolve(retorno);

            });

        });
    }

}

module.exports = new Series();