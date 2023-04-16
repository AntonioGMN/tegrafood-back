import { Request, Response } from 'express';
import * as productsService from '../service/productsService.js';

export async function getAll(req: Request, res: Response) {
  console.log('ok');
  const products = await productsService.getAll();
  res.send(products);
}
