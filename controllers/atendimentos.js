const atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        atendimento.lista()
            .then(atendimentos => res.json(atendimentos))
            .catch(err => res.status(500).json(err));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const { id } = req.params;
        atendimento.obterPorId(id)
            .then(atendimento => res.json(atendimento))
            .catch(err => res.status(500).json(err));
    });

    app.post('/atendimentos', (req, res) => {
        atendimento.adiciona(req.body)
            .then(() => res.status(201).json({ message: 'Atendimento criado com sucesso' }))
            .catch(err => res.status(400).json(err));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const { id } = req.params;
        const valores = req.body;
        atendimento.altera(id, valores)
            .then(() => res.json({ message: 'Atendimento alterado com sucesso' }))
            .catch(err => res.status(400).json(err));
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const { id } = req.params;
        atendimento.deleta(id)
            .then(() => res.json({ message: 'Atendimento removido com sucesso' }))
            .catch(err => res.status(500).json(err));
    });
}