const db = require('../config/conexao');
const Tag = require('../models/tag');

module.exports = app => {
    app.get('/tags', (req, res) => {
        db.all(`SELECT * FROM tags`, (err, rows) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
          } else {
            res.json(rows);
          }
        });
      });

    app.post('/tags', (req, res) => {
        const{ nome, usuario, serie_id } = req.body
        db.all(`SELECT * FROM contas WHERE usuario = '${usuario}'; SELECT * FROM series WHERE id = '${serie_id}'`, (err, rows) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
          }
          if(rows.length > 0){
            Tag.adicionar(nome, usuario, serie_id);
            res.send('Tag salva com sucesso!');
          }else{
            res.send('Erro ao salvar Tag');
          };
        });
    });

    app.delete('/tags/nome/:nome/usuario/:usuario/serie_id/:serie_id', (req, res) => {
      const { nome, usuario, serie_id } = req.params;
      Tag.excluir(nome, usuario, serie_id, (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Tag excluída com sucesso!');
        }
      });
    });    
    
};