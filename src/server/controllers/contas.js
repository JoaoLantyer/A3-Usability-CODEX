const db = require('../config/conexao');
const Conta = require('../models/conta');

module.exports = app => {
    app.get('/contas', (req, res) => {
        db.all('SELECT * FROM contas', (err, rows) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
          } else {
            res.json(rows);
          }
        });
      });

    app.post('/contas', (req, res) => {
        const conta = req.body;
        Conta.adicionar(conta);
        res.send('Conta salva com sucesso!');
    });
};