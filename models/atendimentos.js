const moment = require('moment');
const atendimentoRepository = require('../repository/atendimento');

class Atendimento {

    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteEhValido = ({ tamanho }) => tamanho > 3;
        this.erros = 0;
        this.validacoes = [
            {
                nome: 'data',
                mensagem: 'Data deve ser maior ou igual a data atual',
                valido: this.dataEhValida
            },
            {
                nome: 'cliente',
                mensagem: 'Cliente deve ter pelo menos 5 caracteres',
                valido: this.clienteEhValido
            }
        ];
        this.valida = parametros => {
            this.erros = this.validacoes.filter(campo => {
                const { nome } = campo;
                const parametro = parametros[nome];

                return !campo.valido(parametro);
            });
        }
    }

    lista() {
        return atendimentoRepository.lista();
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
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');;
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');;

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        this.valida(parametros);
        const temErros = this.erros.length;

        if (temErros) return new Promise((resolve, reject) => reject(this.erros));
        else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };
            return atendimentoRepository.adiciona(atendimentoDatado)
                .then(resultado => {
                    const id = resultado.insertId;
                    return { ...atendimento, id };
                });
        }
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