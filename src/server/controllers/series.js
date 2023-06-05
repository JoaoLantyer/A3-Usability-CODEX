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
};