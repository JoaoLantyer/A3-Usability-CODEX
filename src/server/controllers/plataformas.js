const db = require('../config/conexao');
const Plataforma = require('../models/plataforma');

module.exports = app => {
    app.get('/plataformas', (req, res) => {
        db.all('SELECT * FROM plataformas', (err, rows) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
          } else {
            res.json(rows);
          }
        });
      });

    app.post('/plataformas', (req, res) => {
        const plataforma = req.body;
        Plataforma.adicionar(plataforma);
        res.send('Plataforma salva com sucesso!');
    });


  app.delete('/plataformas/:id', (req, res) => {
    const id = req.params.id;
    Plataforma.excluir(id, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Plataforma excluída com sucesso!');
      }
    });
  });

  app.put('/plataformas/:id', (req, res) => {
    const id = req.params.id;
    const updatedPlataforma = req.body;
    Plataforma.atualizar(id, updatedPlataforma, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Plataforma atualizada com sucesso!');
      }
    });
  });
};