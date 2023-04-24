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

export async function getAll(userId: number) {
  try {
    const response = await connection.query(
      `
      SELECT p.*, s.id AS shopping_id
      FROM products p 
      LEFT JOIN shopping s ON p.id = s.product_id 
      AND s.user_id = $1 
      AND s.finished IS FALSE
      ORDER BY p.id
    `,
      [userId],
    );
    return response.rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getWithAlphabeticalOrde(
  category: boolean | string,
  alphabeticalOrder: boolean | string,
  userId: number,
) {
  const findByCategory = category ? ` WHERE category = $2 ` : '';
  const onAlphabeticalOrder = alphabeticalOrder
    ? 'ORDER BY name ASC;'
    : 'ORDER BY p.id;';

  try {
    if (category) {
      const response = await connection.query(
        `SELECT p.*, s.id AS shopping_id
        FROM products p 
        LEFT JOIN shopping s ON p.id = s.product_id 
        AND s.user_id = $1 
        AND s.finished IS FALSE ${findByCategory + onAlphabeticalOrder}`,
        [userId, category],
      );
      return response.rows;
    }

    const response = await connection.query(
      `SELECT p.*, s.id AS shopping_id
        FROM products p 
        LEFT JOIN shopping s ON p.id = s.product_id 
        AND s.user_id = $1 
        AND s.finished IS FALSE ${findByCategory + onAlphabeticalOrder}`,
      [userId],
    );
    return response.rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getByPriceBetween(
  start: number,
  end: number,
  onAlphabeticalOrde: boolean,
  category: string | boolean,
  userId: number,
) {
  const alphabeticalOrder = onAlphabeticalOrde
    ? ' ORDER BY name ASC;'
    : ' ORDER BY price ASC;';
  const findByCategory = category ? ` AND category = '${category}'` : '';

  const response = await connection.query(
    ` SELECT p.*, s.id AS shopping_id
      FROM products p 
      LEFT JOIN shopping s ON p.id = s.product_id 
      AND s.user_id = $1 
      AND s.finished IS FALSE WHERE price BETWEEN $2 AND $3${
        findByCategory + alphabeticalOrder
      }`,
    [userId, start, end],
  );
  return response.rows;
}

export async function getByPriceBiggerThen(
  value: number,
  onAlphabeticalOrde: boolean,
  category: string | boolean,
  userId: number,
) {
  const alphabeticalOrder = onAlphabeticalOrde
    ? ' ORDER BY name ASC;'
    : 'ORDER BY price ASC;';
  const findByCategory = category ? `AND category = '${category}'` : '';
  const response = await connection.query(
    ` SELECT p.*, s.id AS shopping_id
      FROM products p 
      LEFT JOIN shopping s ON p.id = s.product_id 
      AND s.user_id = $1 
      AND s.finished IS FALSE WHERE price > $2 ${
        findByCategory + alphabeticalOrder
      }`,
    [userId, value],
  );
  return response.rows;
}
