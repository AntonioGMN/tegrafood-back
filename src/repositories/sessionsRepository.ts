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
  const { rows } = await connection.query(
    'SELECT * FROM sessions WHERE token=$1',
    [token],
  );

  return rows[0];
}

export async function updateToken(token: string, userId: number) {
  return await connection.query(
    `UPDATE sessions SET token=$1 WHERE user_id=$2;`,
    [token, userId],
  );
}
