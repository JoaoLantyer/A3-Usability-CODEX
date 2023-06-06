const db = require('../config/conexao');
const Serie = require('../models/serie');

module.exports = app => {
    app.get('/series', (req, res) => {
        db.all('SELECT * FROM series', (err, rows) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
          } else {
            res.json(rows);
          }
        });
      });

    app.post('/series', (req, res) => {
        const serie = req.body;
        Serie.adicionar(serie);
        res.send('Serie salva com sucesso!');
    });


  app.delete('/series/:id', (req, res) => {
    const id = req.params.id;
    Serie.excluir(id, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Serie excluída com sucesso!');
      }
    });
  });

  app.put('/series/:id', (req, res) => {
    const id = req.params.id;
    const updatedSerie = req.body;
    Serie.atualizar(id, updatedSerie, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Série atualizada com sucesso!');
      }
    });
  });
};