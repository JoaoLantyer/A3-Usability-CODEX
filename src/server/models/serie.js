const db = require('../config/conexao');

class Serie {
    adicionar(serie){

        const sql = `INSERT INTO series(titulo, url, plataforma, plataforma2, plataforma3) VALUES('${serie.titulo}', '${serie.url}', '${serie.plataforma}', '${serie.plataforma2}', '${serie.plataforma3}')`;

        db.run(sql, function (error) {
            if (error) {
              console.error(error.message);
              console.error(error.stack);
            } else {
              console.log('Serie salva com sucesso!');
            }
          });
    }
}

module.exports = new Serie();