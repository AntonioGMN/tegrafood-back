import * as userService from '../../src/service/userService';
import * as productsService from '../../src/service/productsService';

export async function createToken(): Promise<string> {
  const user = {
    name: 'user_test',
    email: 'user_test' + Date.now() + '@gmail.com',
    password: '123',
    image: 'testImage.png',
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
  const response = await productsService.getAll();
  return response[0].id;
}
