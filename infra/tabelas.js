class Tabelas {
    init(conexao){
        this.conexao = conexao;
        this.criarAtendimentos();
    }

    criarAtendimentos(){
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos 
        (
            id INT NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(50) NOT NULL, 
            pet VARCHAR(20),
            servico VARCHAR(20) NOT NULL,
            status VARCHAR(20) NOT NULL,
            observacoes TEXT,
            data DATETIME, 
            dataCriacao DATETIME NOT NULL,
            PRIMARY KEY(id)
        )`;
        this.conexao.query(sql, (err) => {
            if(err) console.log(err);
        });
    }
}

module.exports = new Tabelas();