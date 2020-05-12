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

    async lista() {
        return atendimentoRepository.lista();
    }

    async obterPorId(id) {
        return atendimentoRepository.obterPorId(id)
            .then(resultado => resultado[0]);
    }

    async adiciona(atendimento) {
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

    async altera(id, atendimento) {
        let dataCriacao = 0;
        atendimentoRepository.obterPorId(id)
            .then(resultado => {
                dataCriacao = resultado[0].dataCriacao;

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
                    console.log(atendimentoDatado);
                    return atendimentoRepository.atualiza(atendimentoDatado, id)
                        .then(resultado => {
                            const id = resultado.insertId;
                            return { ...atendimento, id };
                        });
                }
            })
            .catch(err => err);
    }

    async deleta(id) {
        return atendimentoRepository.deleta(id);
    }
}

module.exports = new Atendimento();