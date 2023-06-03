class Tabelas{
    init(conexao) {
        this.conexao = conexao;
        this.criarContas();
    }

    criarContas(){
        const sql = 'CREATE TABLE IF NOT EXISTS contas (id INTEGER PRIMARY KEY, nome varchar(50) NOT NULL, email varchar(20) NOT NULL, senha varchar(20) NOT NULL, status varchar(20))';
        
        this.conexao.serialize(() => {
            this.conexao.run(sql);
        });
    }

}

module.exports = new Tabelas;