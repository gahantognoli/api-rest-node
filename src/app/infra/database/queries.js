const conexao = require('./conexao');

const executaQuery = (query, parametros = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (err, resultado, campos) => {
            if (err) {
                reject(err)
            } else {
                resolve(resultado);
            }
        });
    });
}

module.exports = executaQuery;