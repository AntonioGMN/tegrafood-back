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
