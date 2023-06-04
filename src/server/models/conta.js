const db = require('../config/conexao');

class Conta {
    adicionar(conta){

        const sql = `INSERT INTO contas(usuario, email, senha) VALUES('${conta.usuario}', '${conta.email}', '${conta.senha}')`;

        db.run(sql, function (error) {
            if (error) {
              console.error(error.message);
              console.error(error.stack);
            } else {
              console.log('Conta salva com sucesso!');
            }
          });
    }
}

module.exports = new Conta();