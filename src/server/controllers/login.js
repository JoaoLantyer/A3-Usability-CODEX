const db = require('../config/conexao');
const Conta = require('../models/conta');

module.exports = app => {
    app.post('/login', (req, res) => {
        const{ usuario, senha } = req.body
        db.all(`SELECT * FROM contas WHERE usuario = '${usuario}' AND senha = '${senha}'`, (err, rows) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
          }
          if(rows.length > 0){
            res.send({validation: true})
          }else{
            res.send({validation: false})
          };        
          });
        });
      };
