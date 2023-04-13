import connection from '../database/connection.js';

export async function create(userId: number, token: string) {
  return await connection.query(
    `INSERT INTO sessions (user_id, token) VALUES ($1, $2)`,
    [userId, token],
  );
}

export async function logout(userId: number) {
  return await connection.query(`DELETE FROM sessions WHERE user_id=$1`, [
    userId,
  ]);
}

export async function findByUserId(userId: number) {
  const response = await connection.query(
    'SELECT * FROM sessions WHERE user_id=$1',
    [userId],
  );
  return response.rows[0];
}

export async function findByToken(token: string) {
  const response = await connection.query(
    'SELECT * FROM sessions WHERE token=$1',
    [token],
  );
  return response.rows[0];
}
