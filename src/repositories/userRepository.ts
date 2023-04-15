import connection from '../database/connection.js';

export default interface user {
  name: string;
  email: string;
  password: string;
  image: string;
}

export async function create(userDate: user) {
  const { name, email, password, image } = userDate;
  return await connection.query(
    `INSERT INTO users(name, email, password, image) VALUES ($1, $2, $3, $4)`,
    [name, email, password, image],
  );
}

export async function findByEmail(email: string) {
  const response = await connection.query(
    'SELECT * FROM users WHERE email=$1',
    [email],
  );
  console.log(response);
  return response.rows[0];
}

export async function findById(userId: number) {
  const response = await connection.query(
    'SELECT id, name, image FROM users where id=$1',
    [userId],
  );
  return response.rows[0];
}
