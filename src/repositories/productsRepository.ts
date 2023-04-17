import connection from '../database/connection.js';

export async function create(userId: number, token: string) {
  return await connection.query(
    `INSERT INTO sessions (user_id, token) VALUES ($1, $2)`,
    [userId, token],
  );
}

export async function getAll() {
  const response = await connection.query('SELECT * FROM products');
  return response.rows;
}

export async function getWithAlphabeticalOrde() {
  const response = await connection.query(
    'SELECT * FROM products ORDER BY name ASC;',
  );
  return response.rows;
}

export async function getByPriceBetween(
  valor1: number,
  value2: number,
  onAlphabeticalOrde: boolean,
) {
  const alphabeticalOrde = 'ORDER BY name ASC';
  const response = await connection.query(
    `SELECT * FROM products WHERE price BETWEEN $1 AND $2${
      onAlphabeticalOrde ? alphabeticalOrde : ';'
    }`,
    [valor1, value2],
  );
  return response.rows;
}

export async function getByPriceBiggerThen(
  value: number,
  onAlphabeticalOrde: boolean,
) {
  try {
    const alphabeticalOrde = 'ORDER BY name ASC';
    const response = await connection.query(
      `SELECT * FROM products WHERE price > $1${
        onAlphabeticalOrde ? ' ' + alphabeticalOrde : ';'
      }`,
      [value],
    );
    return response.rows;
  } catch (err) {
    console.log(err);
  }
}
