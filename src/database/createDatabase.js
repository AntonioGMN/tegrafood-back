import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado com sucesso!');

  connection.query(`CREATE DATABASE ${process.env.DB_NAME}`, (err, result) => {
    if (err) throw err;
    console.log('Banco de dados criado com sucesso!');
  });
});

connection.end();
