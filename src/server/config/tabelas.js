class Tabelas{
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
    }


    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id INTEGER PRIMARY KEY, nome varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text)';

        this.conexao.serialize(() => {
            this.conexao.run(sql);
        });
    }

}

module.exports = new Tabelas;