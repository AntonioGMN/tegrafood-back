import * as userService from '../../src/service/userService';
import * as productsService from '../../src/service/productsService';
import connection from '../../src/database/connection.js';
import User from '../../src/repositories/userRepository';

export async function createToken(): Promise<string> {
  const user: User = {
    name: 'user_test',
    email: 'user_test' + Date.now() + '@gmail.com',
    password: '123',
    image: 'testImage.png',
    is_adm: false,
  };
  await userService.signUp(user);
  const { token } = await userService.login({
    email: user.email,
    password: user.password,
  });
  return token;
}

export async function createProduct(): Promise<string> {
  const product = {
    name: 'produto_test',
    price: '100',
    category: 'sobremesa',
    description: 'muito bom',
    image: 'testImage.png',
  };
  await productsService.create(product);
  const response = await connection.query('SELECT * FROM products');
  return response.rows[0].id;
}
