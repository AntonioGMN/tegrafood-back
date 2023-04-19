import connection from '../database/connection.js';

export async function create(userId: number, productId: number) {
  console.log(userId);
  console.log(productId);
  try {
    return await connection.query(
      `INSERT INTO shopping (user_id, product_id) VALUES ($1, $2)`,
      [userId, productId],
    );
  } catch (err) {
    console.log(err);
  }
}
