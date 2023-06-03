const db = require('../config/conexao');

class Conta {
    adicionar(conta){
        conta.status = 'criada';

        const sql = `INSERT INTO contas(nome, email, senha, status) VALUES('${conta.nome}', '${conta.email}', '${conta.senha}', '${conta.status}')`;

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