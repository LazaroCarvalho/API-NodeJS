const conexao = require('../infra/conexao');

class Series {

    // Traz todas as séries
    lista() {

        return new Promise((resolve, reject) => {

            const sql = 'SELECT * FROM series';

            conexao.query(sql, (erro, retorno) => {

                if(erro) reject({"Descrição" : erro});
                else resolve(retorno);

            });

        });

    }

    // Traz uma série pelo seu ID.
    listaPorId(id) {

        return new Promise((resolve, reject) => {

            const sql = "SELECT * FROM series WHERE id = ?";

            conexao.query(sql, id, (erro, retorno) => {

                if(erro) reject({"Descrição" : erro});
                else resolve(retorno);

            });

        });

    }

    insere(serie) {

        return new Promise((resolve, reject) => {

            const sql = "INSERT INTO series SET ?";

            conexao.query(sql, serie, (erro, retorno) => {

                if(erro) reject(erro);
                else resolve(retorno);

            });

        });

    }

    edita(serie) {

        return new Promise((resolve, reject) => {

            const sql = "UPDATE series SET ? WHERE id = ?";

            conexao.query(sql, [serie, serie.id], (erro, retorno) => {

                if(erro) reject({"Descrição" : erro});
                else resolve(retorno);

            });

        });

    }

    deleta(id) {

        return new Promise((resolve, reject) => {

            const sql = "DELETE FROM series WHERE id = ?";

            conexao.query(sql, id, (erro, retorno) => {

                if(erro) reject({"Descrição" : erro});
                else resolve(retorno);

            });

        });

    }

}

module.exports = new Series();