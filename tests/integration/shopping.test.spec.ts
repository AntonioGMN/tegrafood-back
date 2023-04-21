import supertest from 'supertest';
import app from '../../src/app.js';
import { createProduct, createToken } from '../factory/index.js';
import { clearDB } from '../utils/index.js';

describe('products test', () => {
  let token: string;
  let productId: string;

  beforeAll(async () => {
    token = await createToken();
    productId = await createProduct();
  });

  it('create a shopping and receive 201', async () => {
    const response = await supertest(app)
      .post('/shopping')
      .set('Authorization', 'Bearer ' + token)
      .send({ productId: productId });

    expect(response.status).toEqual(201);
  });

  it('get all products shopping by a user and receive 200', async () => {
    const response = await supertest(app)
      .get('/shopping/user')
      .set('Authorization', 'Bearer ' + token);

    console.log(response.body);

    expect(response.status).toEqual(200);
  });

  afterAll(async () => {
    await clearDB();
  });
});
