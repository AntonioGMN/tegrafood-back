import connection from '../database/connection.js';

export default interface Product {
  id?: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export async function create(product: Product): Promise<void> {
  const { name, price, category, description, image } = product;
  await connection.query(
    `INSERT INTO products (name, price, category, description, image) VALUES ($1, $2, $3, $4, $5)`,
    [name, price, category, description, image],
  );
}

export async function getAll(userId: number): Promise<Array<Product>> {
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
}

export async function getWithAlphabeticalOrde(
  category: boolean | string,
  alphabeticalOrder: boolean | string,
  userId: number,
): Promise<Array<Product>> {
  const findByCategory = category ? ` WHERE category = $2 ` : '';
  const onAlphabeticalOrder = alphabeticalOrder
    ? 'ORDER BY name ASC;'
    : 'ORDER BY p.id;';
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
}

export async function getByPriceBetween(
  start: number,
  end: number,
  onAlphabeticalOrde: boolean,
  category: string | boolean,
  userId: number,
): Promise<Array<Product>> {
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
): Promise<Array<Product>> {
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

export async function updateAll(newProduct: Product): Promise<void> {
  const { id, name, price, description, category, image } = newProduct;
  return await connection.query(
    `UPDATE products SET name = $1, price = $2, description = $3, category = $4, image = $5 WHERE id = $6`,
    [name, price, description, category, image, id],
  );
}

export async function update(newProduct: Product): Promise<void> {
  const { id, name, price, description, category } = newProduct;
  return await connection.query(
    `UPDATE products SET name = $1, price = $2, description = $3, category = $4 WHERE id = $5`,
    [name, price, description, category, id],
  );
}

export async function find(productId: number): Promise<Product> {
  const response = await connection.query(
    `SELECT * FROM  products WHERE id = $1`,
    [productId],
  );
  return response.rows[0];
}
