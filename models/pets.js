const conexao = require('../infra/conexao');
const uploadArquivo = require('../arquivos/uploadDeArquivos');

class Pets {
    adiciona(pet) {
        return new Promise((resolve, reject) => {
            uploadArquivo(pet.imagem, pet.nome, (err, novoCaminho) => {
                if (err) {
                    reject(err);
                } else {
                    const sql = 'INSERT INTO pets SET ?';
                    const novoPet = { nome: pet.nome, imagem: novoCaminho }
                    conexao.query(sql, novoPet, (err, resultado) => {
                        if (err) reject(err);
                        else resolve(novoPet);
                    });
                }
            });
        });
    }
}

module.exports = new Pets();