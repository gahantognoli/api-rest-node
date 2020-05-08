const conexao = require('../infra/conexao');
const moment = require('moment');

class Atendimento {

    lista() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM atendimentos';
            conexao.query(sql, (err, resultado) => {
                if (err) reject(err);
                else resolve(resultado);
            })
        });
    }

    obterPorId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM atendimentos WHERE id = ?';
            conexao.query(sql, id, (err, resultado) => {
                if (err) reject(err);
                else {
                    resolve(resultado[0])
                };
            });
        });
    }

    adiciona(atendimento) {
        return new Promise((resolve, reject) => {
            const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');;
            const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');;

            const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
            const clienteEhValido = atendimento.cliente.length > 3;

            const validacoes = [
                {
                    nome: 'data',
                    mensagem: 'Data deve ser maior ou igual a data atual',
                    valido: dataEhValida
                },
                {
                    nome: 'cliente',
                    mensagem: 'Cliente deve ter pelo menos 5 caracteres',
                    valido: clienteEhValido
                }
            ];

            const erros = validacoes.filter(campo => !campo.valido);
            const temErros = erros.length;

            if (temErros) {
                reject(erros);
            }
            else {
                const atendimentoDatado = { ...atendimento, dataCriacao, data };
                const sql = 'INSERT INTO atendimentos SET ? ';

                conexao.query(sql, atendimentoDatado, (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
            }
        });
    }

    altera(id, atendimento) {
        return new Promise((resolve, reject) => {
            if (atendimento.data)
                atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');;

            const sql = 'UPDATE atendimentos SET ? WHERE id = ?';
            conexao.query(sql, [atendimento, id], (err, resultado) => {
                if (err) reject(err);
                else resolve(resultado);
            });
        });
    }

    deleta(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM atendimentos WHERE id = ?';
            conexao.query(sql, id, (err, resultado) => {
                if (err) reject(err);
                else resolve(resultado);
            });
        });
    }
}

module.exports = new Atendimento();