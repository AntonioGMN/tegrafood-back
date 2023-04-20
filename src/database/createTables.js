import connection from './connection.js';

async function createTables() {
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
        user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    const queryCreateProducts = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL CHECK (category IN ('pizza', 'sobremesa', 'lanche', 'açaí', 'bebidas')),
        description VARCHAR(255) DEFAULT NULL,
        image VARCHAR(255) NOT NULL
      );
    `;

    const queryCreateShopping = `
      CREATE TABLE IF NOT EXISTS shopping (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        product_id INTEGER REFERENCES products(id) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1
      );
    `;

    await connection.query('BEGIN');
    await connection.query(queryCreateUsers);
    await connection.query(queryCreateSessions);
    await connection.query(queryCreateProducts);
    await connection.query(queryCreateShopping);
    await connection.query('COMMIT');

    console.log('Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar as tabelas', err);
    await connection.query('ROLLBACK');
  } finally {
    await connection.end();
  }
}

createTables();
