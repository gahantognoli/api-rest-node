const Pet = require('../models/pets');

module.exports = app => {
    app.post('/pet', (req, res) => {
        Pet.adiciona(req.body)
            .then(pet => {
                res.status(201).json({ pet });
            })
            .catch(err => res.status(400).json({erro: err}));
    });
};