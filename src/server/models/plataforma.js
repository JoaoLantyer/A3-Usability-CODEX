const db = require('../config/conexao');

class Plataforma {
    adicionar(plataforma){

        const sql = `INSERT INTO plataformas(nome, url) VALUES('${plataforma.nome}', '${plataforma.url}')`;

        db.run(sql, function (error) {
            if (error) {
              console.error(error.message);
              console.error(error.stack);
            } else {
              console.log('Plataforma salva com sucesso!');
            }
          });
    }

    excluir(id) {
      const sql = `DELETE FROM plataformas WHERE id = ${id}`;
    
      db.run(sql, function (error) {
        if (error) {
          console.error(error.message);
          console.error(error.stack);
        } else {
          console.log('Plataforma excluída com sucesso!');
        }
      });
    }

    atualizar(id, updatedPlataforma) {
      const sql = `UPDATE plataformas SET nome = '${updatedPlataforma.nome}',url = '${updatedPlataforma.url}' WHERE id = ${id}`;
    
      db.run(sql, function (error) {
        if (error) {
          console.error(error.message);
          console.error(error.stack);
        } else {
          console.log('Plataforma atualizada com sucesso!');
        }
      });
    }
}

module.exports = new Plataforma();