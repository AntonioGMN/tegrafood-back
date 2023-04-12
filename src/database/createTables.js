import database from './connection.js';

const createTableUsers = `
  CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    image VARCHAR(255)
  )
`;

database.query(createTableUsers, function (err, results, fields) {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Tabela criada com sucesso!');
  }

  // Encerrar a conexão
  database.end();
});
