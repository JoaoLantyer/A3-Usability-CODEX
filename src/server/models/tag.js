const db = require('../config/conexao');

class Tag {
    adicionar(nome, usuario, serie_id){

        const sql = `INSERT INTO tags (nome, usuario, serie_id) VALUES('${nome}', '${usuario}', '${serie_id}')`;

        db.run(sql, function (error) {
            if (error) {
              console.error(error.message);
              console.error(error.stack);
            } else {
              console.log('Tag salva com sucesso!');
            }
          });
    }

    excluir(nome, usuario, serie_id) {
      const sql = `DELETE FROM tags WHERE nome = '${nome}' AND usuario = '${usuario}' AND serie_id = '${serie_id}'`;
      console.log('Deleting tag with SQL:', sql);
    
      db.run(sql, function (error) {
        if (error) {
          console.error(error.message);
          console.error(error.stack);
        } else {
          console.log('Tag excluída com sucesso!');
        }
      });
    }
    
}

module.exports = new Tag();