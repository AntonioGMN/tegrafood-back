import supertest from 'supertest';
import app from '../../src/app.js';
import { createToken } from '../factory/index.js';
import { clearDB, deleteFile } from '../utils/index.js';

describe('products test', () => {
  let token: string;
  let imagePath: string;

  const product = {
    name: 'produto_test',
    price: '100',
    category: 'lanche',
    description: 'muito bom',
    image: 'estImage.png',
  };

  beforeAll(async () => {
    token = await createToken();
  });

  it('create a product and receive 201', async () => {
    const response = await supertest(app)
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .field('name', product.name)
      .field('price', product.price)
      .field('category', product.category)
      .field('description', product.description)
      .attach('image', 'uploads/testImage.png');

    expect(response.status).toEqual(201);
  });

  it('get all products and receive 200', async () => {
    const response = await supertest(app)
      .get('/products')
      .set('Authorization', 'Bearer ' + token);

    imagePath = response.body[0].image;

    expect(response.status).toEqual(200);
  });

  it("find one products with category 'lanche', find zero products with category 'pizza' and receive 200", async () => {
    const seartPizza = await supertest(app)
      .get('/products/filters?category=pizza')
      .set('Authorization', 'Bearer ' + token);

    const seartLanche = await supertest(app)
      .get('/products/filters?category=lanche')
      .set('Authorization', 'Bearer ' + token);

    expect(seartLanche.status).toEqual(200);
    expect(seartPizza.status).toEqual(200);
    expect(seartLanche.body.length).toEqual(1);
    expect(seartPizza.body.length).toEqual(0);
  });

  afterAll(async () => {
    await clearDB();
    deleteFile(imagePath);
  });
});
