const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('database/mydatabase.db');

module.exports = db;