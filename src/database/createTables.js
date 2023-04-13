import connection from './connection.js';

async function createTableUsers() {
  try {
    const queryCreateUsers = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        image TEXT NOT NULL
      )
    `;

    const queryCreateSessions = `
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        token VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    await connection.query('BEGIN');
    await connection.query(queryCreateUsers);
    await connection.query(queryCreateSessions);
    await connection.query('COMMIT');

    console.log('Tabelas "users" e "sessions" criadas com sucesso!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Erro ao criar as tabelas "users" e "sessions"', err.stack);
  } finally {
    await connection.end();
  }
}

createTableUsers();
