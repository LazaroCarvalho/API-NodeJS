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

    insere(serie) {
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

    buscaPorId(id) {

        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM series WHERE id = ?";

            conexao.query(sql, id, (erro, retorno) => {

<<<<<<< HEAD
                if(erro) reject(erro);
                else resolve(retorno);
=======
                if(erro) reject('Erro ao buscar: ' + erro);
                else {
                    resolve(retorno[0]);
                }
>>>>>>> 0dd7a2bba0e89602a2e25d117789c329768b7416

            });

        });

    }

    delete(id) {

        return new Promise((resolve, reject) => {
           
            const sql = "DELETE FROM series WHERE id = ?";

            conexao.query(sql, id, (erro, retorno) => {

                if(erro)
                    reject("Erro ao deletar registro: " + erro);
                else
                    resolve(retorno);

            });
            
        });

    }

    atualiza(serie) {
        return new Promise((resolve, reject) => {

            const sql = "UPDATE series SET ? WHERE id = ?";

            conexao.query(sql, [serie, serie.id], (erro, retorno) => {

                if(erro)
                    reject("Erro ao atualizar: " + erro)
                else
                    resolve(retorno);

            });

        });
    }

}

module.exports = new Series();