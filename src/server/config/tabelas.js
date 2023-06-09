class Tabelas{
    init(conexao) {
        this.conexao = conexao;
        this.criarContas();
        this.criarSeries();
        this.criarPlataformas();
        this.criarTags();
    }

    criarContas(){
        const sql = 'CREATE TABLE IF NOT EXISTS contas (id INTEGER PRIMARY KEY, usuario varchar(20) UNIQUE NOT NULL, email varchar(254) UNIQUE NOT NULL, senha varchar(128) NOT NULL)';
        
        this.conexao.serialize(() => {
            this.conexao.run(sql);
        });
    }

    criarSeries(){
        const sql = 'CREATE TABLE IF NOT EXISTS series (id INTEGER PRIMARY KEY, titulo varchar(20) UNIQUE NOT NULL, url varchar(2048) UNIQUE NOT NULL, plataforma varchar(20) NOT NULL, plataforma2 varchar(20), plataforma3 varchar(20))';
        
        this.conexao.serialize(() => {
            this.conexao.run(sql);
        });
    }

    criarPlataformas(){
        const sql = 'CREATE TABLE IF NOT EXISTS plataformas (id INTEGER PRIMARY KEY, nome varchar(20) UNIQUE NOT NULL, url varchar(2048) UNIQUE NOT NULL)';
        
        this.conexao.serialize(() => {
            this.conexao.run(sql);
        });
    }

    criarTags(){
        const sql = `CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY, nome varchar(20), usuario varchar(20), serie_id INTEGER, FOREIGN KEY (usuario) REFERENCES contas(usuario), FOREIGN KEY (serie_id) REFERENCES series(id))`;
        
        this.conexao.serialize(() => {
            this.conexao.run(sql);
        });
    }

}

module.exports = new Tabelas;