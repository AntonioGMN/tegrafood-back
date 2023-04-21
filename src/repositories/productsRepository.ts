import connection from '../database/connection.js';

export default interface Product {
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export async function create(product: Product): Promise<void> {
  const { name, price, category, description, image } = product;
  try {
    await connection.query(
      `INSERT INTO products (name, price, category, description, image) VALUES ($1, $2, $3, $4, $5)`,
      [name, price, category, description, image],
    );
  } catch (err) {
    console.log(err.message);
  }
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
  const alphabeticalOrder = onAlphabeticalOrde
    ? ' ORDER BY name ASC;'
    : 'ORDER BY price ASC;';
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
  const alphabeticalOrder = onAlphabeticalOrde
    ? ' ORDER BY name ASC;'
    : 'ORDER BY price ASC;';
  const findByCategory = category ? `AND category = '${category}'` : '';
  const response = await connection.query(
    `SELECT * FROM products WHERE price > $1 ${
      findByCategory + alphabeticalOrder
    }`,
    [value],
  );
  return response.rows;
}
