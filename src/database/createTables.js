import connection from './connection.js';

async function createTableUsers() {
  try {
    const queryCreateUsers = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
      )
    `;

    const queryCreateSessions = `
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        token VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    const queryCreateProducts = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        description VARCHAR(255) DEFAULT NULL,
        image VARCHAR(255) NOT NULL
      )
    `;

    await connection.query('BEGIN');
    await connection.query(queryCreateUsers);
    await connection.query(queryCreateSessions);
    await connection.query(queryCreateProducts);
    await connection.query('COMMIT');

    console.log(
      'Tabelas "users", "sessions" e "products" criadas com sucesso!',
    );
  } catch (err) {
    console.error('Erro ao criar as tabelas', err.stack);
    await connection.query('ROLLBACK');
  } finally {
    await connection.end();
  }
}

createTableUsers();
