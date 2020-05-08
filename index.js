const customExpress = require('./config/custom-express');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

conexao.connect(err => {
    if(err) console.log(err)
    else {
        Tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log('Server is running in port 3000'));
    }
});