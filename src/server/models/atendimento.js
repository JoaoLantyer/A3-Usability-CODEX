const db = require('../config/conexao');

class Atendimento {
    adicionar(atendimento){
        atendimento.status = 'marcado';
        atendimento.observacoes = "";

        const sql = `INSERT INTO atendimentos(nome, servico, pet, status, observacoes) VALUES('${atendimento.nome}', '${atendimento.servico}', '${atendimento.pet}', '${atendimento.status}', '${atendimento.observacoes}')`;

        db.run(sql);
    }
}

module.exports = new Atendimento();