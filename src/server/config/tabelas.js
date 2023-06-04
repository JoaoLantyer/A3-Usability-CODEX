class Tabelas{
    init(conexao) {
        this.conexao = conexao;
        this.criarContas();
    }

    criarContas(){
        const sql = 'CREATE TABLE IF NOT EXISTS contas (id INTEGER PRIMARY KEY, usuario varchar(20) UNIQUE NOT NULL, email varchar(254) UNIQUE NOT NULL, senha varchar(128) NOT NULL)';
        
        this.conexao.serialize(() => {
            this.conexao.run(sql);
        });
    }

}

module.exports = new Tabelas;