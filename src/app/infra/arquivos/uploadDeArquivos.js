const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {
    const extensoesValidas = ['jpg', 'png', 'jpeg'];
    const extensao = path.extname(caminho);
    const extensaoEhValida = extensoesValidas.some(item => item === extensao.substring(1));
    let erro = '';

    if (!extensaoEhValida) {
        erro = "Extensão inválida";
        callbackImagemCriada(erro, '');
    }
    else {
        const novoCaminho = `./assets/imagens/${nomeArquivo}${extensao}`;
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(erro, novoCaminho));
    }

}