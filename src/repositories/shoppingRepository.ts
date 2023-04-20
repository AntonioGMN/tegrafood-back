import connection from '../database/connection.js';

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

export async function getByUserId(userId: number) {
  try {
    const response = await connection.query(
      `SELECT p.* FROM products p JOIN  shopping s
       ON p.id = s.product_id WHERE s.user_id = $1`,
      [userId],
    );
    return response.rows;
  } catch (err) {
    console.log(err);
  }
}
