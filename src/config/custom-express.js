const express = require('express');
const bodyParser = require('body-parser');
const atendimentosRouter = require('../app/routes/atendimento');

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/atendimentos', atendimentosRouter);
    
    return app;
}