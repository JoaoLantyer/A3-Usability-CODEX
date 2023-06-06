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

    excluir(id) {
      const sql = `DELETE FROM series WHERE id = ${id}`;
    
      db.run(sql, function (error) {
        if (error) {
          console.error(error.message);
          console.error(error.stack);
        } else {
          console.log('Série excluída com sucesso!');
        }
      });
    }

    atualizar(id, updatedSerie) {
      const sql = `UPDATE series SET titulo = '${updatedSerie.titulo}',url = '${updatedSerie.url}',plataforma = '${updatedSerie.plataforma}',plataforma2 = '${updatedSerie.plataforma2}',plataforma3 = '${updatedSerie.plataforma3}'WHERE id = ${id}`;
    
      db.run(sql, function (error) {
        if (error) {
          console.error(error.message);
          console.error(error.stack);
        } else {
          console.log('Série atualizada com sucesso!');
        }
      });
    }
}

module.exports = new Serie();