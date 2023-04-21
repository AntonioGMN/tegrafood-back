import connection from '../../src/database/connection';
import fs from 'fs';
import * as userService from '../../src/service/userService';

export async function clearDB() {
  try {
    await connection.query('BEGIN');
    await connection.query('TRUNCATE shopping CASCADE');
    await connection.query('TRUNCATE products CASCADE');
    await connection.query('TRUNCATE users CASCADE');
    await connection.query('TRUNCATE sessions CASCADE');
    await connection.query('COMMIT');
  } catch (err) {
    console.error('Erro ao limpar tabelas', err);
    await connection.query('ROLLBACK');
  } finally {
    await connection.end();
  }
}

export function deleteFile(path: string) {
  fs.unlink('uploads/' + path, (err) => {
    if (err) console.error(err);
  });
}

export async function getToken(): Promise<string> {
  const user = {
    name: 'user_test',
    email: 'user_test@gmail.com',
    password: '123',
    image: 'userTestImage.png',
  };
  await userService.signUp(user);
  const { token } = await userService.login({
    email: user.email,
    password: user.password,
  });
  return token;
}