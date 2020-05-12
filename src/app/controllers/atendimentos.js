const atendimento = require('../models/atendimentos');

module.exports = {
    async lista(req, res) {
        atendimento.lista(req, res)
            .then(atendimentos => res.json(atendimentos))
            .catch(err => res.status(500).json(err));
    },
    async obterPorId(req, res) {
        const { id } = req.params;
        atendimento.obterPorId(id)
            .then(atendimento => res.json(atendimento))
            .catch(err => res.status(500).json(err));
    },
    async adiciona(req, res) {
        atendimento.adiciona(req.body)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(err => res.status(400).json(err));
    },
    async atualiza(req, res) {
        const { id } = req.params;
        const valores = req.body;
        atendimento.altera(id, valores)
            .then(() => res.json({ message: 'Atendimento alterado com sucesso' }))
            .catch(err => res.status(400).json(err));
    },
    async deleta(req, res) {
        const { id } = req.params;
        atendimento.deleta(id)
            .then(() => res.json({ message: 'Atendimento removido com sucesso' }))
            .catch(err => res.status(500).json(err));
    }
}