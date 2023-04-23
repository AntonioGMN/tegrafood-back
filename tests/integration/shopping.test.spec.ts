import supertest from 'supertest';
import app from '../../src/app.js';
import { createProduct, createToken } from '../factory/index.js';
import { clearDB } from '../utils/index.js';

describe('products test', () => {
  let token: string;
  let productId: string;
  let shoppingId: number;

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

    shoppingId = response.body[0].shopping_id;

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  });

  it('update shopping quantity', async () => {
    const response = await supertest(app)
      .patch('/shopping/quantity')
      .send({ newQuantity: 2, shoppingId: shoppingId })
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toEqual(200);
  });

  it('update shopping finished property to true and receive 204', async () => {
    const response = await supertest(app)
      .patch('/shopping/finish')
      .send({ shoppingId: shoppingId })
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toEqual(204);
  });

  it('delete shopping and receive 204', async () => {
    const response = await supertest(app)
      .delete('/shopping')
      .send({ shoppingId: shoppingId })
      .set('Authorization', 'Bearer ' + token);

    console.log(shoppingId);

    expect(response.status).toEqual(204);
  });

  afterAll(async () => {
    await clearDB();
  });
});
