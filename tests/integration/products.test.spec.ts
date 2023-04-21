import supertest from 'supertest';
import app from '../../src/app.js';
import { clearDB, getToken } from '../ultils/index.js';

describe('products test', () => {
  let token: string;

  const product = {
    name: 'produto_test',
    value: '100',
    category: 'lanche',
    description: 'muito bom',
    image: 'userTestImage.png',
  };

  beforeAll(async () => {
    token = await getToken();
  });

  it('create a product and receive 201', async () => {
    const response = await supertest(app)
      .post('/products')
      .field('name', product.name)
      .field('price', product.value)
      .field('category', product.category)
      .field('description', product.description)
      .attach('image', 'uploads/userTestImage.png');

    expect(response.status).toEqual(201);
  });

  afterAll(() => {
    clearDB();
  });
});
