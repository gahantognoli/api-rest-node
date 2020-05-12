const query = require('../infra/database/queries');

class AtendimentoRepository {

    async lista() {
        const sql = 'SELECT * FROM atendimentos';
        return query(sql);
    }

    async obterPorId(id) {
        let sql = 'SELECT * FROM atendimentos WHERE id = ?';
        return query(sql, id);
    }

    async adiciona(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ? ';
        return query(sql, atendimento);
    }

    async atualiza(atendimento, id) {
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?';
        return query(sql, [atendimento, id]);
    }

    async deleta(id) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?';
        return query(sql, id);
    }
}

module.exports = new AtendimentoRepository();