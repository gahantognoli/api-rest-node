const query = require('../infra/database/queries');

class AtendimentoRepository {

    adiciona(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ? ';
        return query(sql, atendimento);
    }

    lista() {
        const sql = 'SELECT * FROM atendimentos';
        return query(sql);
    }

}

module.exports = new AtendimentoRepository();