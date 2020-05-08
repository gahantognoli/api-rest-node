const mySql = require('mysql');

const conexao = mySql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'agenda-petshop'
});

module.exports = conexao;