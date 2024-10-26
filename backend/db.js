const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'rules_db', 
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = db;
