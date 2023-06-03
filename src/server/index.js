const customExpress = require('./config/customExpress');
const db = require('./config/conexao');
const Tabelas = require('./config/tabelas');

Tabelas.init(db);

const app = customExpress();

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));

app.get('/', (req, res) => res.send('Servidor rodando, tudo ok'));

