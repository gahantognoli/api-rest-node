const customExpress = require('./src/config/custom-express');
const conexao = require('./src/app/infra/database/conexao');
const Tabelas = require('./src/app/infra/database/tabelas');

conexao.connect(err => {
    if (err) console.log(err)
    else {
        Tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log('Server is running in port 3000'));
    }
});