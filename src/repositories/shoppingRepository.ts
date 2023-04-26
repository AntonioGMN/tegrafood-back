import connection from '../database/connection.js';

export default interface Shopping {
  id: number;
  user_id: number;
  products_id: number;
  quantity: number;
}

export async function create(userId: number, productId: number) {
  return await connection.query(
    `INSERT INTO shopping (user_id, product_id) VALUES ($1, $2)`,
    [userId, productId],
  );
}

export async function getIncompleteByUserId(userId: number) {
  const response = await connection.query(
    `SELECT p.*, s.quantity, s.finished, s.finished_date, s.id as shopping_id FROM products p JOIN  shopping s
       ON p.id = s.product_id WHERE s.user_id = $1 AND finished = false ORDER BY s.id`,
    [userId],
  );
  return response.rows;
}

export async function deleteById(shoppingId: number): Promise<void> {
  await connection.query(`DELETE FROM shopping WHERE id = $1`, [shoppingId]);
}

export async function updateQuantity(
  shoppingId: number,
  newQuatity: number,
): Promise<void> {
  return await connection.query(
    `UPDATE shopping SET quantity = $1 WHERE id = $2;`,
    [newQuatity, shoppingId],
  );
}

export async function findbyId(shoppingId: number): Promise<Shopping> {
  const response = await connection.query(
    `SELECT FROM shopping WHERE id = $1`,
    [shoppingId],
  );
  return response.rows;
}

export async function finish(shoppingId: number): Promise<void> {
  await connection.query("SET TIME ZONE 'America/Sao_Paulo'");
  return await connection.query(
    `UPDATE shopping SET finished = true, finished_date = NOW() WHERE id = $1`,
    [shoppingId],
  );
}
