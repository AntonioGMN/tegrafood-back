import * as userService from '../../src/service/userService';
import * as productsService from '../../src/service/productsService';

export async function createToken(): Promise<string> {
  const user = {
    name: 'user_test',
    email: 'user_test3@gmail.com',
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

export async function createProduct(): Promise<string> {
  const product = {
    name: 'produto_test',
    price: '100',
    category: 'lanche',
    description: 'muito bom',
    image: 'userTestImage.png',
  };
  await productsService.create(product);
  const response = await productsService.getAll();
  const { id } = response[0];
  return id;
}
