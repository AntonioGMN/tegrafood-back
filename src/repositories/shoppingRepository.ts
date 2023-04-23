import connection from '../database/connection.js';

export default interface Shopping {
  id: number;
  user_id: number;
  products_id: number;
  quantity: number;
}

export async function create(userId: number, productId: number) {
  try {
    return await connection.query(
      `INSERT INTO shopping (user_id, product_id) VALUES ($1, $2)`,
      [userId, productId],
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getIncompleteByUserId(userId: number) {
  try {
    const response = await connection.query(
      `SELECT p.*, s.quantity, s.finished, s.finished_date, s.id as shopping_id FROM products p JOIN  shopping s
       ON p.id = s.product_id WHERE s.user_id = $1 AND finished = false ORDER BY s.id`,
      [userId],
    );
    return response.rows;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteById(shoppingId: number): Promise<void> {
  try {
    await connection.query(`DELETE FROM shopping WHERE id = $1`, [shoppingId]);
  } catch (err) {
    console.log(err);
  }
}

export async function updateQuantity(
  shoppingId: number,
  newQuatity: number,
): Promise<void> {
  try {
    return await connection.query(
      `UPDATE shopping SET quantity = $1 WHERE id = $2;`,
      [newQuatity, shoppingId],
    );
  } catch (err) {
    console.log(err);
    return;
  }
}

export async function findbyId(shoppingId: number): Promise<Shopping> {
  try {
    const response = await connection.query(
      `SELECT FROM shopping WHERE id = $1`,
      [shoppingId],
    );
    return response.rows;
  } catch (err) {
    console.log(err);
  }
}

export async function finish(shoppingId: number): Promise<void> {
  try {
    await connection.query("SET TIME ZONE 'America/Sao_Paulo'");
    return await connection.query(
      `UPDATE shopping SET finished = true, finished_date = NOW() WHERE id = $1`,
      [shoppingId],
    );
  } catch (err) {
    console.log(err);
  }
}
