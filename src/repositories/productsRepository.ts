import { BlobOptions } from 'buffer';
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

export async function getWithAlphabeticalOrde(
  category: boolean | string,
  alphabeticalOrder: boolean | string,
) {
  const findByCategory = category ? ` WHERE category = '${category}'` : '';
  const onAlphabeticalOrder = alphabeticalOrder ? ' ORDER BY name ASC;' : ';';

  const response = await connection.query(
    `SELECT * FROM products ${findByCategory + onAlphabeticalOrder}`,
  );
  return response.rows;
}

export async function getByPriceBetween(
  valor1: number,
  value2: number,
  onAlphabeticalOrde: boolean,
  category: string | boolean,
) {
  const alphabeticalOrder = onAlphabeticalOrde ? ' ORDER BY name ASC;' : ';';
  const findByCategory = category ? ` AND category = '${category}'` : '';

  const response = await connection.query(
    `SELECT * FROM products WHERE price BETWEEN $1 AND $2${
      findByCategory + alphabeticalOrder
    }`,
    [valor1, value2],
  );
  return response.rows;
}

export async function getByPriceBiggerThen(
  value: number,
  onAlphabeticalOrde: boolean,
  category: string | boolean,
) {
  const alphabeticalOrder = onAlphabeticalOrde ? ' ORDER BY name ASC;' : ';';
  const findByCategory = category ? `AND category = '${category}'` : '';
  const response = await connection.query(
    `SELECT * FROM products WHERE price > $1 ${
      findByCategory + alphabeticalOrder
    }`,
    [value],
  );
  return response.rows;
}
